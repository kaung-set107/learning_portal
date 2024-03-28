/* eslint-disable react/prop-types */
import { Button, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import CustomButton from "../../../components/general/CustomButton";
import { Select, SelectItem } from "@nextui-org/select";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

export default function QuestionUpdateModal(props) {
  const { questionData } = props;

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [option, setOption] = useState("");
  const variant = "bordered";

  const questionTypes = [
    { value: "trueFalse", label: "trueFalse" },
    { value: "fillInTheBlank", label: "fillInTheBlank" },
    { value: "openQuestion", label: "openQuestion" },
    { value: "multipleChoice", label: "multipleChoice" },
  ];

  const answerTypes = [
    { value: "radio", label: "radio" },
    { value: "checkbox", label: "checkbox" },
  ];

  const [formData, setFormData] = useState({
    question: "",
    type: "",
    options: [],
    answerType: "",
    description: "",
    isLoading: true,
    isOpen: false,
  });

  const handleSubmit = async (onClose) => {
    let modifiedOptions = formData.options.map((option) => ({
      answer: option,
    }));

    let payload = {
      ...formData,
      options: modifiedOptions,
    };

    delete payload.isLoading;
    delete payload.isOpen;

    console.log(questionData)

    questionData.updateQuestions(payload);
    onClose();
  };

  const fillData = () => {
    let modifiedOptions = questionData.options.map((option) => option.answer);

    setFormData((prev) => {
      return {
        ...prev,
        ...questionData,
        options: modifiedOptions,
        isLoading: false,
        isOpen: true,
      };
    });
  };

  useEffect(() => {
    console.log(questionData);
    if (Object.keys(questionData).length > 0) fillData();
  }, [questionData]);

  useEffect(() => {
    console.log(formData);

    if (formData.isOpen) onOpen();
  }, [formData]);

  let content;

  if (!formData.isLoading) {
    content = (
      <>
        {/* <Button onPress={onOpen} color="primary">
          Add Question
        </Button> */}
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          scrollBehavior="inside"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Question Update
                </ModalHeader>
                <ModalBody>
                  <form>
                    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-3 gap-4 mt-3">
                      <Input
                        type="text"
                        label="Question"
                        placeholder="question"
                        variant={variant}
                        value={formData.question}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            question: e.target.value,
                          }))
                        }
                        labelPlacement="outside"
                      />
                    </div>

                    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3">
                      <Select
                        items={questionTypes}
                        label="Question Type"
                        placeholder="Select an question type"
                        selectedKeys={[formData.type]}
                        className="max-w-xs"
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

                    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3">
                      <Select
                        items={answerTypes}
                        label="Answer Type"
                        placeholder="Select an answer type"
                        className="max-w-xs"
                        selectedKeys={[formData.answerType]}
                        labelPlacement="outside"
                        onSelectionChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            answerType: e.currentKey,
                          }))
                        }
                      >
                        {(type) => (
                          <SelectItem key={type.value}>{type.label}</SelectItem>
                        )}
                      </Select>
                    </div>

                    <div className="flex items-end w-full flex-wrap md:flex-nowrap mb-6 md:mb-3 gap-4 mt-3">
                      <Input
                        type="text"
                        label="Option"
                        placeholder="option"
                        variant={variant}
                        value={option}
                        onChange={(e) => setOption(e.target.value)}
                        labelPlacement="outside"
                      />
                      <CustomButton
                        onClick={() =>
                          setFormData((prev) => {
                            let newOptions = [...prev.options];
                            newOptions.push(option);

                            return { ...prev, options: newOptions };
                          })
                        }
                        title="Add"
                      />
                    </div>
                    {formData.options.length > 0 && (
                      <div className="p-3 border rounded-xl mb-3 space-y-3">
                        <h4 className="mb-3">Option List</h4>
                        {formData.options.map((option, index) => {
                          return (
                            <div
                              key={option}
                              className="p-2 border rounded-xl flex justify-between items-center"
                            >
                              <span>{option}</span>
                              <CustomButton
                                onClick={() =>
                                  setFormData((prev) => {
                                    let newOptions = [...prev.options];
                                    newOptions = prev.options.filter(
                                      (value, key) => key !== index
                                    );

                                    return { ...prev, options: newOptions };
                                  })
                                }
                                type="delete"
                                size="sm"
                                iconOnly
                                className="p-1"
                              />
                            </div>
                          );
                        })}
                      </div>
                    )}
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
                  <CustomButton
                    onClick={() => handleSubmit(onClose)}
                    type="edit"
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

  return content;
}
