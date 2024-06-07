/* eslint-disable react/prop-types */
import { Button } from "@nextui-org/react";
import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
// import { showError, showSuccess } from "../../../../../util/noti";
import { showError, showSuccess } from "../../../../../util/noti";
import CustomButton from "../../../../components/general/CustomButton";
import CustomFileDrag from "../../../../components/general/CustomFileDrag";

export default function SectionImageUploadModal(props) {
  const { srcId, sectionIndex, uploadApi, successCallback, isOpen, onOpen, onOpenChange } = props;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    _id: srcId,
    sectionIndex: +sectionIndex
  });

  const handleAssetChange = (value) => {
    console.log(value);
    setFormData((prev) => ({ ...prev, images: Array.from(value) }));
  };

  const handleSubmit = async (onClose) => {
    setIsSubmitting(true);
    let payload = {
      ...formData,
    };

    console.log(payload);

    try {
      const res = await uploadApi(payload);
      console.log(res)
      await successCallback()
      showSuccess({text: res.message ?? res.data.message, type: 'noti-box'})
    } catch (error) {
      console.log(error);
      showError({ axiosResponse: error });
    } finally {
      setIsSubmitting(false);
      onClose();
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Quiz Section Image Upload
              </ModalHeader>
              <ModalBody>
                <form>
                  <div className="mb-3">
                    <label className="font-semibold mb-2 block">Image</label>

                    <CustomFileDrag
                      id="Images"
                      multiple
                      handleChange={handleAssetChange}
                      name="images"
                    />
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={onClose}>
                  Close
                </Button>
                <CustomButton
                  onClick={() => handleSubmit(onClose)}
                  isLoading={isSubmitting}
                  color="primary"
                  title="Upload"
                />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
