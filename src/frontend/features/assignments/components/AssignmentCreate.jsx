/* eslint-disable react/prop-types */
import { Button, Input } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import { useState } from "react";
import { assignmentsApi } from "../api";
import CustomButton from "../../../components/general/CustomButton";

const AssignmentCreate = (props) => {
    let { subjectId, successCallback } = props
    const [isSubmitting, setIsSubmitting] = useState(false)

    const variant = 'faded'

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        subject: subjectId,
        links: '[{"links":"www.google.com"},{"links":"www.msi.com"},{"links":"www.msiedu.com"}]',
        dueDate: '2023-12-02T04:56:17.771Z'
    })

    const handleSubmit = async (e) => {
        try {
            setIsSubmitting(true)
            let payload = { ...formData }
            e.preventDefault()
            await assignmentsApi.create(payload)
            successCallback()
        } catch (error) {
            console.log(error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3">
                    <Input
                        type="text"
                        label="Title"
                        placeholder="title"
                        variant={variant}
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        labelPlacement="outside"
                    />
                </div>
                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3">
                    <Input
                        type="text"
                        label="Description"
                        placeholder="description"
                        variant={variant}
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        labelPlacement="outside"
                    />
                </div>
                
                <div className="flex justify-center gap-5 mt-8">
                    <Link href="/instructor"><Button color="danger">
                        Cancel
                    </Button></Link>
                    <CustomButton color="primary" isLoading={isSubmitting} title="Create"/>
                </div>
            </form>
        </>
    )
}

export default AssignmentCreate