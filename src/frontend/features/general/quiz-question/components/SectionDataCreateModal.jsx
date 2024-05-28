/* eslint-disable react/prop-types */
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";
import CustomButton from "../../../../components/general/CustomButton";
import { isInstruction, isParagraph } from "../helper";

const sectionDataTypes = [
  {
    value: "instruction",
    label: "Instruction",
  },
  {
    value: "paragraph",
    label: "Paragraph",
  }
];

export default function SectionDataCreateModal(props) {
  const { addSectionData, isOpen, onOpenChange, sectionIndex } = props;

  const variant = "bordered";

  const initialForm = {
    sectionDataType: "",
    value: "", // if type is instruction or paragraph
  };

  const [formData, setFormData] = useState(initialForm);

  const resetForm = () => {
    setFormData(() => {
      return initialForm;
    });
  };

  const prepareForm = () => {
    let payload = {
      sectionDataType: formData.sectionDataType,
    };

    if (
      isInstruction(formData.sectionDataType) ||
      isParagraph(formData.sectionDataType)
    ) {
      payload.value = formData.value;
    }

    return payload;
  };

  const handleSubmit = (onClose) => {
    console.log("submitting");
    const form = prepareForm();
    console.log(form);
    addSectionData(sectionIndex, form);
    resetForm();
    onClose();
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
                Section Data Create
              </ModalHeader>
              <ModalBody>
                <form>
                  <div className="flex w-full flex-wrap md:flex-nowrap mb-6 gap-4 mt-3">
                    <Select
                      items={sectionDataTypes}
                      label="Type"
                      placeholder="Select an type"
                      labelPlacement="outside"
                      onSelectionChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          sectionDataType: e.currentKey,
                        }))
                      }
                    >
                      {(type) => (
                        <SelectItem key={type.value}>{type.label}</SelectItem>
                      )}
                    </Select>
                  </div>
                  {/* {`${isQuestionTypeInput()()}`} */}
                  {(isInstruction(formData.sectionDataType) ||
                    isParagraph(formData.sectionDataType)) && (
                    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-3 gap-4 mt-3">
                      <Input
                        type="text"
                        label="Title"
                        placeholder="title"
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
                    </div>
                  )}
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={onClose}>
                  Close
                </Button>
                <CustomButton
                  onClick={() => handleSubmit(onClose)}
                  color="primary"
                  title="Create"
                />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
