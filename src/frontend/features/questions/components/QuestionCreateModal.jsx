/* eslint-disable react/prop-types */
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import CustomButton from "../../../components/general/CustomButton";
import { v4 as uuidv4 } from "uuid";
import { Select, SelectItem } from "@nextui-org/select";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import CustomMultiSelect from "../../../components/general/CustomMultiSelect";

export default function QuestionCreateModal(props) {
  const { addQuestion } = props;

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [option, setOption] = useState("");
  const variant = "bordered";

  const questionTypes = [
    { value: "trueFalse", label: "trueFalse" },
    // { value: "fillInTheBlank", label: "fillInTheBlank" },
    // { value: "openQuestion", label: "openQuestion" },
    { value: "multipleChoice", label: "multipleChoice" },
  ];

  const answerTypes = [
    { value: "text", label: "text" },
    { value: "radio", label: "radio" },
    { value: "checkbox", label: "checkbox" },
  ];

  const [formData, setFormData] = useState({
    question: "",
    type: "",
    options: [],
    answerType: "text",
    correctAnswer: [],
    mark: 1,
    status: "new",
    correctAnswerDescription: ''
  });

  const optionRemoveHandler = (index) => {
    setFormData((prev) => {
      let newOptions = [...prev.options];
      newOptions = prev.options.filter((value, key) => key !== index);

      let newCorrectAnswer = [...prev.correctAnswer];
      newCorrectAnswer = prev.correctAnswer.filter(
        (each) => each !== prev.options[index].key
      );

      return { ...prev, options: newOptions, correctAnswer: newCorrectAnswer };
    });
  };

  const handleSubmit = async (onClose) => {
    let modifiedOptions = formData.options.map((option) => ({
      answer: option.value,
    }));

    let modifiedCorrectAnswers = formData.correctAnswer.map((each) => {
      let value;
      formData.options.map((option, oIndex) => {
        if (option.key === each) value = oIndex;
      });
      if (!isNaN(value + 1)) {
        return value + 1;
      }
    });

    let payload = {
      ...formData,
      options: modifiedOptions,
      correctAnswer: modifiedCorrectAnswers,
    };

    addQuestion(payload);
    onClose();
  };

  const handleMultipleSelect = (e) => {
    setFormData((prev) => ({
      ...prev,
      correctAnswer: [...e],
    }));
  };

  const onQuestionTypeChange = (e) => {
    if (e.currentKey == "trueFalse") {
      setFormData((prev) => ({
        ...prev,
        type: e.currentKey,
        answerType: "radio",
      }));
    } else if (e.currentKey == "multipleChoice") {
      setFormData((prev) => ({
        ...prev,
        type: e.currentKey,
        answerType: "checkbox",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        type: e.currentKey,
        answerType: "text",
      }));
    }
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Add Question
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Quiz Question Create
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

                  <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mt-3">
                    <Input
                      type="text"
                      label="Mark"
                      placeholder="mark"
                      variant={variant}
                      value={formData.mark}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          mark: e.target.value,
                        }))
                      }
                      labelPlacement="outside"
                    />
                  </div>

                  <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-3 gap-4 mt-3">
                    <Select
                      items={questionTypes}
                      label="Question Type"
                      placeholder="Select an question type"
                      className="max-w-xs"
                      labelPlacement="outside"
                      onSelectionChange={(e) => onQuestionTypeChange(e)}
                    >
                      {(type) => (
                        <SelectItem key={type.value}>{type.label}</SelectItem>
                      )}
                    </Select>
                  </div>

                  <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-9 gap-4 mt-3">
                    <Select
                      isDisabled
                      items={answerTypes}
                      selectedKeys={[formData.answerType]}
                      label="Answer Type"
                      placeholder="Select an answer type"
                      className="max-w-xs"
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

                  <CustomMultiSelect
                    label="Correct Answer"
                    placeholder="Select correct answer"
                    labelPlacement="outside"
                    selectedKeys={formData.correctAnswer}
                    data={formData.options}
                    setValues={handleMultipleSelect}
                  />

                  <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mt-3">
                    <Input
                      type="text"
                      label="Correct Answer Description"
                      placeholder="correctAnswerDescription"
                      variant={variant}
                      value={formData.correctAnswerDescription}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          correctAnswerDescription: e.target.value,
                        }))
                      }
                      labelPlacement="outside"
                    />
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
                          newOptions.push({ key: uuidv4(), value: option });

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
                            key={option.key}
                            className="p-2 border rounded-xl flex justify-between items-center"
                          >
                            <span>{option.value}</span>
                            <CustomButton
                              onClick={() => optionRemoveHandler(index)}
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
