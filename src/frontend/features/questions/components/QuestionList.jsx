/* eslint-disable react/prop-types */
import { Card, CardBody } from "@nextui-org/react";
import { v4 as uuidv4 } from "uuid";
import ListInfo from "../../../components/general/typography/ListInfo";
import ListDetail from "../../../components/general/typography/ListDetail";
import CustomButton from "../../../components/general/CustomButton";
import QuestionUpdateModal from "./QuestionUpdateModal";
import { useState } from "react";

const QuestionList = (props) => {
  const [currentQuestionData, setCurrentQuestionData] = useState({});

  const { questions, setQuestions } = props;

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

  const removeQuestion = (index) => {
    setQuestions((prev) => prev.filter((each, i) => i !== index));
  };

  return (
    <div>
      <Card shadow="sm">
        <CardBody className="space-y-3">
          <QuestionUpdateModal questionData={currentQuestionData} />
          {questions &&
            questions.map((question, index) => {
              return (
                <div key={uuidv4()} className="p-3 border rounded-xl relative">
                  <div className="absolute right-1 top-1 gap-3 flex">
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
                    {question.mark && (
                      <div className="space-y-1">
                        <ListInfo title="Mark" />
                        <ListDetail title={question.mark} />
                      </div>
                    )}
                    <div>
                      <ListInfo title="Answer Type" />
                      <ListDetail title={question.answerType} />
                    </div>
                    <div>
                      <ListInfo title="Options" />
                      <ul>
                        {question.options.map((option) => {
                          return <li key={uuidv4()}>{option.answer}</li>;
                        })}
                      </ul>
                    </div>
                    {question.correctAnswer && question.correctAnswer.length > 0 && (
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
    </div>
  );
};

export default QuestionList;