import { useEffect, useState } from "react"
import CustomTable from "../../../components/general/CustomTable"
import TableHeading from "../../../components/general/typography/TableHeading"
import { getTableData } from "./data"
import Loading from "../../../components/general/Loading"
import { subjectsApi } from "../api"
import { useNavigate } from "react-router-dom"
import CustomButton from '../../../components/general/CustomButton'
import { getCurrentUserId } from "../../../../util/Util"

const Subjects = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [subjects, setSubjects] = useState([])
    const navigate = useNavigate()

    const getViewButton = (id) => {
        return (
            <CustomButton title="View" onClick={() => navigate(`/by-instructor/subjects/${id}/brief`)} />
        )
    }

    const tableData = getTableData({ getViewButton })

    const getSubjects = async () => {
        try {
            let res = await subjectsApi.getAll({instructors: getCurrentUserId()})
            setSubjects(res)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getSubjects()
    }, [])

    let content

    if (isLoading) {
        content = (<div className="flex h-[500px] justify-center items-center"><Loading /></div>)
    }

    if (!isLoading) {
        content = (<div>
            <TableHeading title="Subjects" className="mb-3" />
            <div>
                <div>
                    <CustomTable src={subjects} tableData={tableData} />
                </div>
            </div>
        </div>)
    }

    return content
}

export default Subjects