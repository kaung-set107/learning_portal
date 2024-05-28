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
import { Select, SelectItem } from "@nextui-org/select";
import CustomButton from "../../../../components/general/CustomButton";
import { isInstruction, isParagraph } from "../helper";
import Loading from "../../../../components/general/Loading";

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

export default function SectionDataUpdateModal(props) {
  const { updateSectionData, isOpen, onOpenChange, sectionIndex, sectionData } =
    props;

  const variant = "bordered";

  const initialForm = {
    sectionDataType: "",
    value: "", // if type is instruction or paragraph

    // just for this component
    isLoading: true,
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
    console.log("updating");
    const form = prepareForm();
    console.log(form);
    updateSectionData(sectionIndex, form);
    resetForm();
    onClose();
  };

  const fillData = () => {
    setFormData((prev) => {
      let newData = {
        ...prev,
        sectionDataType: sectionData.sectionDataType,
      };

      if (isInstruction(sectionData.sectionDataType)) {
        newData.value = sectionData.instruction;
      }

      if (isParagraph(sectionData.sectionDataType)) {
        newData.value = sectionData.paragraph;
      }

      return {
        ...newData,
        isLoading: false,
      };
    });
  };

  useEffect(() => {
    fillData();
    console.log("here");
  }, [sectionData]);

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
                    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 gap-4 mt-3">
                      <Select
                        items={sectionDataTypes}
                        label="Type"
                        placeholder="Select an type"
                        labelPlacement="outside"
                        selectedKeys={[formData.sectionDataType]}
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
