/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import CustomTable from "../../../components/general/CustomTable"
import TableHeading from "../../../components/general/typography/TableHeading"
import { getTableData } from "../data"
import Loading from "../../../components/general/Loading"
import { learningMaterialApi } from "../api"
import { useLocation, useNavigate } from "react-router-dom"
import LearningMaterialCreateModal from "../components/LearningMaterialCreateModal"
import CustomButton from "../../../components/general/CustomButton"
import LearningMaterialUpdateModal from "../components/LearningMaterialUpdateModal"
import { showError, showSuccess } from "../../../../util/noti"

const LearningMaterials = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [isFetching, setIsFetching] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [learningMaterials, setLearningMaterials] = useState([])
    const { state } = useLocation()
    const [filters, setFilters] = useState({ subjectSection: {}, subject: {} })
    const navigate = useNavigate()

    console.log(state)

    const getViewButton = (id) => {
        return (
            <CustomButton title="View" onClick={() => navigate(`/by-instructor/learning-materials/${id}/brief`)} />
        )
    }

    const getUpdateButton = (data) => {
        return (
            <LearningMaterialUpdateModal subjectId={filters.subject._id} subjectSectionId={filters.subjectSection._id} learningMaterialData={data} successCallback={getLearningMaterials} />
        )
    }

    const getDeleteButton = (data) => {
        return (
            <CustomButton title="Delete" isLoading={isSubmitting} iconOnly type="delete" onClick={() => handleLearningMaterialDelete(data._id)} />
        )
    }

    const handleLearningMaterialDelete = async (id) => {
        setIsSubmitting(true)
        try {
            let res = await learningMaterialApi.remove({ _id: id })
            console.log(res)
            showSuccess({ text: res.message, type: 'noti-box' })
            getLearningMaterials()  
        } catch (error) {
            showError({ axiosResponse: error })
        } finally {
            setIsSubmitting(false)
        }
    }

    const tableData = getTableData({ getViewButton, getUpdateButton, getDeleteButton })

    const getLearningMaterials = async (defaultPayload) => {
        let payload = { ...{ subjectSection: filters.subjectSection._id, subject: filters.subject._id }, ...defaultPayload }
        setIsFetching(true)
        try {
            let res = await learningMaterialApi.getAll(payload)
            console.log(res)
            setLearningMaterials(res)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
            setIsFetching(false)
        }
    }

    // const fetchData = () => {
    //     getLearningMaterials()
    // }

    useEffect(() => {
        let data = {}
        let defaultPayload = {}

        if (state && state.subjectSection) {
            data.subjectSection = state.subjectSection
            defaultPayload.subjectSection = state.subjectSection._id
        }

        if (state && state.subject) {
            data.subject = state.subject
            defaultPayload.subject = state.subject._id
        }

        let newFilters = { ...filters, ...data }

        setFilters(newFilters)

        getLearningMaterials({ ...filters, ...defaultPayload })
    }, [])

    let content

    if (isLoading) {
        content = (<div className="h-[500px] flex justify-center items-center"><Loading /></div>)
    }

    if (!isLoading) {
        content = (<div className="relative">
            {
                isFetching && (<div className="absolute -top-10 right-0">
                    <Loading color="primary" />
                </div>)
            }
            <div className="flex items-center justify-between mb-12">
                <CustomButton type="back" title="Back to Subject"/>
            </div>
            {
                Object.keys(filters.subjectSection).length > 0 && (
                    <TableHeading title={`Section ${filters.subjectSection.title}'s`} />
                )
            }
            <div className="flex items-center justify-between mb-12">
                <TableHeading title="Learning Materials" />
                <LearningMaterialCreateModal subjectSectionId={filters.subjectSection._id} subjectId={filters.subject._id} successCallback={getLearningMaterials} />
            </div>
            <div>
                <div>
                    <CustomTable isLoading={isFetching} src={learningMaterials} tableData={tableData} isStriped />
                </div>
            </div>
        </div>)
    }

    return content
}

export default LearningMaterials