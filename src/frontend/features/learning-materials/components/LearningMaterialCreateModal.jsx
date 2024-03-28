/* eslint-disable react/prop-types */
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { learningMaterialApi } from "../api";
import CustomButton from "../../../components/general/CustomButton";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox } from "@nextui-org/react";
import CustomFileDrag from "../../../components/general/CustomFileDrag";
import { v4 as uuidv4 } from "uuid";
import { showError } from "../../../../util/noti";

export default function LearningMaterialCreateModal(props) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    let { subjectId, subjectSectionId, successCallback } = props
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showToStudent, setShowToStudent] = useState(false)
    const [link, setLink] = useState('')
    const [links, setLinks] = useState([])
    const variant = 'bordered'

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        assets: '',
        video: "",
        duration: 1,
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
            let payload = { ...formData, video: JSON.stringify([{ links: formData.video }]), showToStudent, links: JSON.stringify(links) }
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

                                    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-3 gap-4 mt-3">
                                        <Input
                                            type="number"
                                            label="Duration"
                                            placeholder="duration"
                                            variant={variant}
                                            value={formData.duration}
                                            onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                                            labelPlacement="outside"
                                        />
                                    </div>

                                    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-3 gap-4 mt-3">
                                        <Input
                                            type="text"
                                            label="Video"
                                            placeholder="video"
                                            variant={variant}
                                            value={formData.video}
                                            onChange={(e) => setFormData(prev => ({ ...prev, video: e.target.value }))}
                                            labelPlacement="outside"
                                        />
                                    </div>

                                    <div className="flex w-full items-end flex-wrap md:flex-nowrap mb-6 md:mb-3 gap-4 mt-3">
                                        <Input
                                            type="text"
                                            label="Add link"
                                            placeholder="add link"
                                            variant={variant}
                                            value={link}
                                            onChange={e => setLink(e.target.value)}
                                            labelPlacement="outside"
                                        />
                                        {/* <Bu type="button" onClick={() => setLinks(prev => ([...prev, { links: link }]))}>
                                            Add
                                        </Bu> */}
                                        <CustomButton onClick={() => setLinks(prev => ([...prev, { links: link }]))} color="primary" title="Add" />
                                    </div>
                                    <div className="rounded-xl border space-y-2 p-3 mb-3">
                                        <h3 className="font-bold mb-3">Links</h3>
                                        {
                                            links.map((each, index) => {
                                                return (<div className="gap-3 rounded-xl flex items-center justify-between" key={uuidv4()}>
                                                    {/* <Input
                                                        type="text"
                                                        variant={variant}
                                                        value={each.links}
                                                        disabled
                                                        className="cursor-none"
                                                    /> */}
                                                    <span className="bg-white px-3 py-1 rounded-xl border w-full">{each.links}</span>
                                                    <span onClick={() => setLinks(prev => ([...prev.filter((each, linkIndex) => (index !== linkIndex))]))} className="font-bold text-red-800">X</span>
                                                </div>)
                                            })
                                        }
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
