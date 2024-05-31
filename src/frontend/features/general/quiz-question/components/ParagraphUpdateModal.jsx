/* eslint-disable react/prop-types */
import { Button, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import CustomButton from "../../../../components/general/CustomButton";
import Loading from "../../../../components/general/Loading";

export default function ParagraphUpdateModal(props) {
  const { updateParagraph, isOpen, onOpenChange, paragraph } =
    props;

  const variant = "bordered";

  const initialForm = {
    value: "",
  };

  const [formData, setFormData] = useState(initialForm);

  const resetForm = () => {
    setFormData(() => {
      return initialForm;
    });
  };

  const handleSubmit = (onClose) => {
    updateParagraph(formData.value);
    resetForm();
    onClose();
  };

  const fillData = () => {
    setFormData(() => {
      return {
        value: paragraph.value,
        isLoading: false,
      };
    });
  };

  useEffect(() => {
    fillData();
  }, [paragraph]);

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
                Section Data Edit
              </ModalHeader>
              <ModalBody>
                {formData.isLoading && <Loading />}
                {!formData.isLoading && (
                  <form>
                    <Input
                      type="text"
                      label="Paragraph"
                      placeholder="paragraph"
                      variant={variant}
                      value={formData.value}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          value: e.target.value,
                        }))
                      }
                      labelPlacement="outside"
                    />
                  </form>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={onClose}>
                  Close
                </Button>
                <CustomButton
                  onClick={() => handleSubmit(onClose)}
                  color="primary"
                  title="Update"
                />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
