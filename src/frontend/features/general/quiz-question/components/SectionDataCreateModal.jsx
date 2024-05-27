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
import { isInstruction } from "../helper";

const sectionDataTypes = [
  {
    value: "instruction",
    label: "Instruction",
  },
  {
    value: "paragraph",
    label: "Paragraph",
  },
  {
    value: "questions",
    label: "Questions",
  },
];

export default function SectionDataCreateModal(props) {
  const { addSectionData, isOpen, onOpenChange, sectionIndex } = props;

  const variant = "bordered";

  const [formData, setFormData] = useState({
    type: "",
    value: "", // if type is instruction
  });

  const prepareForm = () => {
    return formData;
  };

  const handleSubmit = () => {
    console.log("submitting");
    const form = prepareForm();
    console.log(form);
    addSectionData(sectionIndex, form);
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
                          type: e.currentKey,
                        }))
                      }
                    >
                      {(type) => (
                        <SelectItem key={type.value}>{type.label}</SelectItem>
                      )}
                    </Select>
                  </div>
                  {/* {`${isQuestionTypeInput()()}`} */}
                  {isInstruction(formData.type) && (
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
                  onClick={() => handleSubmit()}
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
