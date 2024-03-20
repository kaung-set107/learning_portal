/* eslint-disable react/prop-types */
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { learningMaterialApi } from "../api";
import CustomButton from "../../../components/general/CustomButton";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox } from "@nextui-org/react";
import CustomFileDrag from "../../../components/general/CustomFileDrag";
import { showError } from "../../../../util/noti";

export default function LearningMaterialCreateModal(props) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    let { subjectId, subjectSectionId, successCallback } = props
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showToStudent, setShowToStudent] = useState(false)
    const variant = 'bordered'

    const [formData, setFormData] = useState({
        title: 'test',
        description: 'test',
        assets: '',
        video: "test",
        links: 'testing',
        duration: "10",
        showToStudent: false,
        subject: subjectId,
        subjectSection: subjectSectionId
    })

    const handleAssetChange = (value) => {
        console.log(value)
        setFormData(prev => ({ ...prev, assets: Array.from(value) }))
    }

    const handleSubmit = async (onClose) => {
        try {
            setIsSubmitting(true)
            let payload = { ...formData, showToStudent }

            console.log(payload)
            await learningMaterialApi.create(payload)
            successCallback()
            onClose()
        } catch (error) {
            console.log(error)
            showError({ axiosResponse: error })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <Button onPress={onOpen} color="primary">Add Learning Material</Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                scrollBehavior="inside"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Learning Material Create</ModalHeader>
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

                                    <div className="flex flex-col w-full flex-wrap md:flex-nowrap mb-6 md:mb-3 gap-2">
                                        <label htmlFor="assets">Assets</label>
                                        <CustomFileDrag id="assets" handleChange={handleAssetChange} multiple name="assets" />
                                    </div>
                                    <Checkbox isSelected={showToStudent} onValueChange={setShowToStudent}>
                                        Show to student?
                                    </Checkbox>
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
                                <CustomButton onClick={() => handleSubmit(onClose)} color="primary" isLoading={isSubmitting} title="Create" />
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
