/* eslint-disable react/prop-types */
import { Button, Input, Textarea } from "@nextui-org/react";
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
} from "@nextui-org/react";
import CustomMultiSelect from "../../../components/general/CustomMultiSelect";

export default function QuestionCreateModal(props) {
  const { addQuestion, isOpen, onOpenChange } = props;

  const [option, setOption] = useState("");
  const variant = "bordered";

  let questionTypes = [];

  if (!props.fixedQuestionTypes) {
    questionTypes = [
      { value: "trueFalse", label: "trueFalse" },
      { value: "fillInTheBlank", label: "fillInTheBlank" },
      { value: "openQuestion", label: "openQuestion" },
      { value: "multipleChoice", label: "multipleChoice" },
    ];
  } else {
    questionTypes = [...props.fixedQuestionTypes];
  }

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
    inputCorrectAnswer: "",
    inputCount: 1,
    mark: 1,
    status: "new",
    correctAnswerDescription: "",
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
    let payload = {
      answerType: formData.answerType,
      mark: formData.mark,
      question: formData.question,
      status: formData.status,
      type: formData.type,
    };

    if (!isQuestionTypeInput()) {
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

      payload.correctAnswerDescription = formData.correctAnswerDescription;
      payload.options = modifiedOptions;
      payload.correctAnswer = modifiedCorrectAnswers ?? [];
    } else {
      payload.inputCorrectAnswer = [formData.inputCorrectAnswer];
      payload.inputCount = formData.inputCount;
    }

    // return console.log(payload);

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

  const isQuestionTypeInput = () => {
    if (
      formData.type === "fillInTheBlank" ||
      formData.type === "openQuestion"
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
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
                Quiz Question Create
              </ModalHeader>
              <ModalBody>
                <form>
                  {/* {`${isQuestionTypeInput()()}`} */}

                  <div className="space-y-3">
                    <div className="flex">
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

                    <div className="flex">
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

                    <div className="flex">
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

                    <div className="flex">
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

                    {isQuestionTypeInput() && (
                      <>
                      <div className="flex">
                        <Textarea
                          label="Correct Answer"
                          placeholder="Input Correct Answer"
                          variant={variant}
                          value={formData.inputCorrectAnswer}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              inputCorrectAnswer: e.target.value,
                            }))
                          }
                          labelPlacement="outside"
                        />
                        </div>
                        <div className="flex">
                        <Input
                          type="number"
                          label="Input Count"
                          placeholder="Input Count"
                          variant={variant}
                          value={formData.inputCount}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              inputCount: e.target.value,
                            }))
                          }
                          labelPlacement="outside"
                        />
                        </div>
                      </>
                    )}

                    {!isQuestionTypeInput() && (
                      <div className="flex">
                      <CustomMultiSelect
                        label="Correct Answer"
                        placeholder="Select correct answer"
                        labelPlacement="outside"
                        selectedKeys={formData.correctAnswer}
                        data={formData.options}
                        setValues={handleMultipleSelect}
                      />
                      </div>
                    )}

                    {!isQuestionTypeInput() && (
                      <div className="flex">
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
                    )}

                    {!isQuestionTypeInput() && (
                      <>
                        <div className="flex justify-between items-end gap-4">
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
                                newOptions.push({
                                  key: uuidv4(),
                                  value: option,
                                });

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
                      </>
                    )}
                  </div>
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
