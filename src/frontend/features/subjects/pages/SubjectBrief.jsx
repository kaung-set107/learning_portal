import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { subjectsApi } from "./api"
import Loading from "../../../components/general/Loading"
import Heading from "../../../components/general/typography/Heading"
import SubHeading from "../../../components/general/typography/SubHeading"
import CustomButton from "../../../components/general/CustomButton"
import AssignmentCreateModal from "../../assignments/components/AssignmentCreateModal"
import AssignmentUpdateModal from "../../assignments/components/AssignmentUpdateModal"
import { assignmentsApi } from "../../assignments/api"
import { v4 as uuidv4 } from 'uuid'
import ImageLoader from "../../../components/general/ImageLoader"

const SubjectBrief = () => {
    const { id } = useParams()
    const [subject, setSubject] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)

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


    const handleAssignmentDelete = async (id) => {
        try {
            setIsSubmitting(true)
            let res = await assignmentsApi.remove({ _id: id })
            await getSubject()
            setIsSubmitting(false)
            console.log(res)
            alert('assignment is deleted!')
        } catch (error) {
            console.log(error)
        } finally {
            setIsSubmitting(false)
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
                    <p className="mb-3">{subject.data.description}</p>
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
                                            <div key={assignment._id} className="p-3 border rounded-xl mb-3 relative">
                                                <div className="flex gap-3 absolute right-2 top-2">
                                                    <AssignmentUpdateModal subjectId={id} assignmentData={assignment} successCallback={getSubject} />
                                                    <CustomButton size="sm" onClick={() => handleAssignmentDelete(assignment._id)} color="danger" isLoading={isSubmitting} title="Delete" />
                                                </div>
                                                <h3 className="font-bold text-lg capitalize mb-3">{assignment.title}</h3>
                                                <p className="mb-3">{assignment.description}</p>
                                                <div className="mb-3">
                                                    <h3 className="text-lg font-semibold mb-3">Question</h3>
                                                    <div className="bg-gray-100 p-3 rounded-xl border">
                                                    {assignment.question && (
                                                        <ImageLoader image={assignment.question} />
                                                    )
                                                    }
                                                    </div>
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold">Links</h3>
                                                    <ul>
                                                        {assignment.links &&
                                                            JSON.parse(assignment.links).map(link => {
                                                                return (<li className="underline text-blue-600" key={uuidv4()}>{link.links}</li>)
                                                            })
                                                        }
                                                    </ul>
                                                </div>
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