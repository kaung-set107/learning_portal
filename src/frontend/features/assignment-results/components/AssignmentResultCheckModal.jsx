/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Button, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { assignmentResultsApi } from "../api";
import CustomButton from "../../../components/general/CustomButton";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import Loading from "../../../components/general/Loading";

export default function AssignmentResultCheckModal(props) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    let { assignmentResultId, successCallback } = props

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const variant = 'bordered'

    const [formData, setFormData] = useState({
        checkedFile: '',
        grade: '',
        remark: '',
    })

    const handleSubmit = async (onClose) => {
        try {
            setIsSubmitting(true)
            let payload = { ...formData, _id: assignmentResultId }

            console.log(payload)
            // return
            await assignmentResultsApi.check(payload)
            successCallback()
            onClose()
        } catch (error) {
            console.log(error)
        } finally {
            setIsSubmitting(false)
        }
    }

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
            <Button onPress={onOpen} color="success" size="sm">Check</Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                scrollBehavior="inside"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">AssignmentResult Update</ModalHeader>
                            <ModalBody>
                                <form>
                                    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-3 gap-4">
                                        <Input
                                            type="file"
                                            onChange={(e) => setFormData(prev => ({ ...prev, checkedFile: e.target.files[0] }))}
                                            label="Checked File"
                                            placeholder=" "
                                            labelPlacement="outside"
                                            variant={variant}
                                        />
                                    </div>
                                    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-3 gap-4 mt-3">
                                        <Input
                                            type="text"
                                            label="Remark"
                                            placeholder="remark"
                                            variant={variant}
                                            value={formData.remark}
                                            onChange={(e) => setFormData(prev => ({ ...prev, remark: e.target.value }))}
                                            labelPlacement="outside"
                                        />
                                    </div>
                                    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-3 gap-4 mt-3">
                                        <Input
                                            type="text"
                                            label="Grade"
                                            placeholder="grade"
                                            variant={variant}
                                            value={formData.grade}
                                            onChange={(e) => setFormData(prev => ({ ...prev, grade: e.target.value }))}
                                            labelPlacement="outside"
                                        />
                                    </div>
                                </form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onPress={onClose}>
                                    Close
                                </Button>
                                <CustomButton onClick={() => handleSubmit(onClose)} color="primary" isLoading={isSubmitting} title="Check" />
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    }

    return content
}
