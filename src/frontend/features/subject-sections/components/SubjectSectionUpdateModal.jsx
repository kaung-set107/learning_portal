/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Button, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { subjectSectionsApi } from "../api";
import CustomButton from "../../../components/general/CustomButton";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox } from "@nextui-org/react";
import Loading from "../../../components/general/Loading";

export default function SubjectSectionUpdateModal(props) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    let { subjectId, subjectSectionData, subjectSectionId, successCallback } = props

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [subjectSection, setSubjectSection] = useState({})
    const [showToStudent, setShowToStudent] = useState(false)

    const variant = 'bordered'

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        subject: subjectId,
    })

    const handleSubmit = async (onClose) => {
        try {
            setIsSubmitting(true)
            let payload = { ...formData, _id: subjectSection.data._id, showToStudent }

            console.log(payload)
            await subjectSectionsApi.update(payload)
            successCallback()
            onClose()
        } catch (error) {
            console.log(error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const fillData = () => {
        setFormData({
            title: subjectSection.data.title,
            description: subjectSection.data.description,
            subject: subjectId,
        })

        setShowToStudent(subjectSection.data.showToStudent)
    }

    const getSubjectSection = async () => {
        if (subjectSectionData) {
            setSubjectSection({ data: subjectSectionData })
        } else if (!subjectSectionData && subjectSectionId) {
            try {
                let res = await subjectSectionsApi.get({ _id: subjectSectionId })
                setSubjectSection(res)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
    }

    useEffect(() => {
        getSubjectSection()
    }, [subjectSectionData, subjectSectionId, isOpen])

    useEffect(() => {
        if (subjectSection.data) fillData()
    }, [subjectSection])

    useEffect(() => {
        if (isLoading) {
            if (formData) setIsLoading(false)
        }
    }, [formData])

    let content

    if (isLoading) {
        content = (<Loading />)
    } else {
        content = <>
            <Button onPress={onOpen} color="success" size="sm">Update</Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                scrollBehavior="inside"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">SubjectSection Update</ModalHeader>
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
                                    <Checkbox isSelected={showToStudent} onValueChange={setShowToStudent}>
                                        Show to student?
                                    </Checkbox>
                                </form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onPress={onClose}>
                                    Close
                                </Button>
                                <CustomButton onClick={() => handleSubmit(onClose)} color="primary" isLoading={isSubmitting} title="Update" />
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    }

    return content
}
