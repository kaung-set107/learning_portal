/* eslint-disable react/prop-types */
import { Card, CardBody, useDisclosure } from "@nextui-org/react";
import { v4 as uuidv4 } from "uuid";
import ListInfo from "../../../components/general/typography/ListInfo";
import ListDetail from "../../../components/general/typography/ListDetail";
import CustomButton from "../../../components/general/CustomButton";
import QuestionUpdateModal from "./QuestionUpdateModal";
import { useState } from "react";
import QuestionImageUploadModal from "./QuestionImageUploadModal";
import { getFile } from "../../../../util";
import QuestionInstructionCreateModal from "./QuestionInstructionCreateModal";

const QuestionList = (props) => {
  const [currentQuestionData, setCurrentQuestionData] = useState({});
  const { isOpen: isInstructionCreateOpen, onOpen: onInstructionCreateOpen, onOpenChange: onInstructionCreateOpenChange } = useDisclosure();

  const {
    srcId,
    questions,
    setQuestions,
    imageUploadApi,
    successCallback,
    setDeletedQuestions,
    deletedQuestions,
  } = props;

  const handleEditButtonClick = (index) => {
    setCurrentQuestionData({
      ...questions[index],
      updateQuestions: updateQuestions(index),
    });
  };

  const updateQuestions = (index) => (data) => {
    setQuestions((prev) =>
      prev.map((each, i) => {
        if (i === index) {
          return data;
        } else {
          return each;
        }
      })
    );
  };

  const removeQuestion = async (index) => {
    setQuestions((prev) => {
      if (questions[index]?.status !== "new")
        setDeletedQuestions([...deletedQuestions, questions[index]]);
      return prev.filter((question, qindex) => qindex !== index);
    });
  };

  const handleAddInstructionClick = (index) => {
    setCurrentQuestionData({
      ...questions[index],
      index,
      updateQuestions: updateQuestions(index),
    });
  }

  return (
    <div>
      <Card shadow="sm">
        <CardBody className="space-y-6">
          <QuestionUpdateModal questionData={currentQuestionData} />
          {questions &&
            questions.map((question, index) => {
              return (
                <div key={uuidv4()} className="group p-3 border rounded-xl relative">
                  <div onClick={onInstructionCreateOpen} className="hidden cursor-pointer group-hover:block border-2 rounded-xl bg-gray-400 absolute px-2 py-1 shadow top-0 -translate-y-1/2 right-1/2">+ Instruction</div>
                  <div className="absolute right-1 top-1 gap-3 flex">
                    {srcId && imageUploadApi && question?.status !== "new" && (
                      <QuestionImageUploadModal
                        successCallback={successCallback}
                        srcId={srcId}
                        questionIndex={index}
                        uploadApi={imageUploadApi}
                      />
                    )}
                    <CustomButton
                      iconOnly
                      type="edit"
                      onClick={() => handleEditButtonClick(index)}
                      title="Edit"
                    />
                    <CustomButton
                      iconOnly
                      type="delete"
                      onClick={() => removeQuestion(index)}
                      title="Remove"
                    />
                  </div>
                  <div className="space-y-3">
                    <ListInfo title={`No - ${index + 1}`} />
                    <div className="space-y-1">
                      <ListInfo title="Question" />
                      <ListDetail title={question.question} />
                    </div>
                    {question.images && (
                      <div className="space-y-1">
                        <ListInfo title="Uploaded Images" />
                        <div className="my-2 p-3 border bg-gray-50 rounded-xl flex gap-3">
                          {question.images.map((image) => {
                            return (
                              <div key={uuidv4()}>
                                <img
                                  src={getFile({ payload: image })}
                                  className="w-[200px] h-[200px] border bg-gray-50 rounded-xl"
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    {question.mark && (
                      <div className="space-y-1">
                        <ListInfo title="Mark" />
                        <ListDetail title={question.mark} />
                      </div>
                    )}
                    <div>
                      <ListInfo title="Question Type" />
                      <ListDetail title={question.type} />
                    </div>
                    <div>
                      <ListInfo title="Answer Type" />
                      <ListDetail title={question.answerType} />
                    </div>
                    {question.correctAnswerDescription && (
                      <div>
                        <ListInfo title="Correct Answer Description" />
                        <ListDetail title={question.correctAnswerDescription} />
                      </div>
                    )}
                    {question.options && (
                      <div>
                        <ListInfo title="Options" />
                        <ul>
                          {question.options.map((option) => {
                            return <li key={uuidv4()}>{option.answer}</li>;
                          })}
                        </ul>
                      </div>
                    )}
                    {question.correctAnswer &&
                      question.correctAnswer.length > 0 && (
                        <div>
                          <ListInfo title="Correct Answers" />
                          <ul>
                            {question.correctAnswer.map((each) => {
                              return (
                                <li key={uuidv4()}>
                                  {question.options[each - 1].answer}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                    {question.inputCorrectAnswer && (
                      <div>
                        <ListInfo title="Input Correct Answer" />
                        <ListDetail title={question.inputCorrectAnswer} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          {!(questions.length > 0) && (
            <div className="h-[400px] flex justify-center items-center">
              No Data!
            </div>
          )}
        </CardBody>
      </Card>
      <QuestionInstructionCreateModal isOpen={isInstructionCreateOpen} onOpen={onInstructionCreateOpen} onOpenChange={onInstructionCreateOpenChange}/>
    </div>
  );
};

export default QuestionList;
