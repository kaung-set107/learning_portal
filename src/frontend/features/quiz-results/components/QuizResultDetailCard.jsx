/* eslint-disable react/prop-types */
import { Card, CardBody } from "@nextui-org/react";
import ListInfo from "../../../components/general/typography/ListInfo";
import ListDetail from "../../../components/general/typography/ListDetail";
import { v4 as uuidv4 } from "uuid";
import { dateForDisplay } from "../../../../util/Util";
import UserProfileCard from "../../learning-materials/components/UserProfileCard";
import QuizNavigation from "../components/QuizNavigation";
import CustomButton from "../../../components/general/CustomButton";
import _ from "lodash";
import Loading from "../../../components/general/Loading";

const getStudentAnswers = (ans, options, type) => {
  console.log(ans);
  if (!isInputQuestion(type)) {
    return (
      <>
        {ans.map((each) => {
          return (
            <span
              className="px-2 py-1 mr-1 rounded-xl bg-white border inline-block"
              key={uuidv4()}
            >
              {options[each - 1].answer}
            </span>
          );
        })}
      </>
    );
  } else {
    return (
      <>
        {ans.map((each) => {
          return (
            <span
              className="px-2 py-1 mr-1 rounded-xl bg-white border inline-block"
              key={uuidv4()}
            >
              {each}
            </span>
          );
        })}
      </>
    );
  }
};

const isInputQuestion = (type) => {
  if (type === "fillInTheBlank") {
    return true;
  } else {
    return false;
  }
};

const QuizResultDetailCard = (props) => {
  const { quizResult, checkActions, setQuizResult } = props;

  const getTotalMark = () => {
    return quizResult.updatedQuestionData.reduce(
      (acc, section) =>
        acc +
        section.questions.reduce(
          (questionAcc, question) => questionAcc + question.mark,
          0
        ),
      0
    );
  };

  const isCorrect = (question) => {
    if (!isInputQuestion(question.type)) {
      let res = true;

      if (question.studentAnswer.length !== question.correctAnswer.length)
        return false;

      question.studentAnswer.map((each) => {
        if (!question.correctAnswer.includes(each)) res = false;
      });

      return res;
    } else {
      return question.correct;
    }
  };

  const isQuestionAlreadyChecked = (question) => {
    if (question.checked) return true;
    return false;
  };

  const setCurrentQuestionStatus = (sectionIndex, questionIndex, status) => {
    // question.correct = status;
    // question.checked = checked;
    setQuizResult((prev) => {
      let newQuizResult = { ...prev };

      newQuizResult.updatedQuestionData[sectionIndex]["questions"][
        questionIndex
      ].correct = status;
      newQuizResult.updatedQuestionData[sectionIndex]["questions"][
        questionIndex
      ].checked = true;

      return newQuizResult;
    });
  };

  let content;

  if (_.isEmpty(quizResult)) {
    content = (
      <div className="h-[300px] flex justify-center items-center">
        <Loading />
      </div>
    );
  } else {
    content = (
      <div>
        <Card>
          <CardBody>
            <h3 className="mb-3 text-xl font-bold">
              {`${quizResult.quiz.title}'s Result`}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="mb-3 p-3 border rounded-xl flex gap-3">
                  <div className="p-3 border rounded-xl">
                    <ListInfo className="mb-1" title="Code" />
                    <ListDetail title={quizResult.code} />
                  </div>
                  <div className="p-3 border rounded-xl">
                    <ListInfo className="mb-1" title="Answer Date" />
                    <ListDetail title={dateForDisplay(quizResult.answerDate)} />
                  </div>
                </div>
                <div className="mb-3 p-3 border rounded-xl flex gap-3">
                  <UserProfileCard data={quizResult.student} />
                </div>
              </div>
              {/* <div className="mb-3 p-3 border rounded-xl flex gap-3">
              <QuizNavigation updatedQuestions={quizResult.updatedQuestionData} />
            </div> */}
            </div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="mb-3 text-xl font-semibold">Results</h3>
              <div className="p-2 border rounded-xl">
                Total Mark: {quizResult.totalMark} / {getTotalMark()}
              </div>
            </div>
            <div className="space-y-3">
              {quizResult.updatedQuestionData.map((section, sectionIndex) => {
                return (
                  <div
                    key={section._id}
                    className="space-y-3 border p-2 rounded-xl"
                  >
                    <h3 className="text-lg font-bold">{section.instruction}</h3>
                    <div className="space-y-3">
                      {section.paragraph.map((eachParagraph) => {
                        return <p key={uuidv4()}>{eachParagraph}</p>;
                      })}
                    </div>
                    <div className="mb-3 p-3 border rounded-xl flex gap-3">
                      <QuizNavigation updatedQuestions={section.questions} />
                    </div>
                    {section["questions"].map((each, questionIndex) => {
                      return (
                        <div
                          id={each._id}
                          key={uuidv4()}
                          className={`p-3 border rounded-xl relative ${
                            isCorrect(each) ? "bg-green-200" : "bg-red-200"
                          } ${
                            isInputQuestion(each.type) &&
                            !isQuestionAlreadyChecked(each)
                              ? "!bg-gray-400"
                              : ""
                          }`}
                        >
                          {isInputQuestion(each.type) && checkActions && (
                            <div className="absolute right-2 space-x-2">
                              <CustomButton
                                title="True"
                                onClick={() =>
                                  setCurrentQuestionStatus(
                                    sectionIndex,
                                    questionIndex,
                                    true
                                  )
                                }
                              />
                              <CustomButton
                                title="False"
                                className={"bg-red-600"}
                                onClick={() =>
                                  setCurrentQuestionStatus(
                                    sectionIndex,
                                    questionIndex,
                                    false
                                  )
                                }
                              />
                            </div>
                          )}
                          <ListInfo
                            className="mb-2 text-lg"
                            title={`${questionIndex + 1}. ${each.question}`}
                          />
                          <div className="mb-2">
                            <ListInfo
                              title={`Correct Answer`}
                              className="mb-1"
                            />
                            <ListDetail
                              title={getStudentAnswers(
                                isInputQuestion(each.type)
                                  ? each.inputCorrectAnswer
                                  : each.correctAnswer,
                                each.options,
                                each.type
                              )}
                            />
                          </div>
                          <div>
                            <ListInfo
                              title={`Student Answer`}
                              className="mb-1"
                            />
                            <ListDetail
                              title={getStudentAnswers(
                                each.studentAnswer,
                                each.options,
                                each.type
                              )}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  return content;
};

export default QuizResultDetailCard;
