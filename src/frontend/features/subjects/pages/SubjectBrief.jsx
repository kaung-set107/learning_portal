import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { subjectsApi } from "./api"
import Loading from "../../../components/general/Loading"
import Heading from "../../../components/general/typography/Heading"
import SubHeading from "../../../components/general/typography/SubHeading"
import CustomButton from "../../../components/general/CustomButton"
import AssignmentCreateModal from "../../assignments/components/AssignmentCreateModal"

const SubjectBrief = () => {
    const { id } = useParams()
    const [subject, setSubject] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const getSubject = async () => {
        try {
            const res = await subjectsApi.get({ _id: id })
            console.log(res)
            setSubject(res)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getSubject()
    }, [])

    let content

    if (isLoading) {
        content = (<Loading />)
    } else {
        content = (
            <>
                <div>
                    <Heading title={subject.data.title} className="mb-3" />
                    <div>
                        <div className="flex items-center justify-between pb-3">
                            <SubHeading title='Assignments' className="mb-3" />
                            <AssignmentCreateModal subjectId={id} successCallback={getSubject} />
                        </div>
                        <div>
                            <div>
                                {
                                    subject.data.assignments.map(assignment => {
                                        return (
                                            <div key={assignment._id} className="p-3 border rounded-xl mb-3">
                                                <h3 className="font-bold text-lg capitalize mb-3">{assignment.title}</h3>
                                                <p>{assignment.description}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        content
    )
}

export default SubjectBrief