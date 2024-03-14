/* eslint-disable react/prop-types */
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { assignmentsApi } from "../api";
import CustomButton from "../../../components/general/CustomButton";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";

export default function AssignmentCreateModal(props) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
            console.log(payload)
            // e.preventDefault()
            // await assignmentsApi.create(payload)
            // successCallback()
        } catch (error) {
            console.log(error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <Button onPress={onOpen} color="primary">Open Modal</Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Assignment Create</ModalHeader>
                            <ModalBody>
                                <form>
                                    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-3 gap-4 mt-3">
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
                                    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-3 gap-4 mt-3">
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
                                    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-3 gap-4">
                                        <Input
                                            type="file"
                                            onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.files[0] }))}
                                            label="Profile"
                                            placeholder=" "
                                            labelPlacement="outside"
                                            variant={variant}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="dueDate" className="pb-1 inline-block">DueDate</label>
                                        <Input
                                            id="dueDate"
                                            type="date"
                                            onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                                            labelPlacement="outside"
                                            variant={variant}
                                        />
                                    </div>
                                </form>
                            </ModalBody>
                            <ModalFooter>
                                {/* <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Sign in
                                </Button> */}
                                <Button color="danger" onPress={onClose}>
                                    Close
                                </Button>
                                <CustomButton onClick={handleSubmit} color="primary" isLoading={isSubmitting} title="Create" />
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
