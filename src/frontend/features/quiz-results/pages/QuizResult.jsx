import { useParams } from "react-router-dom";
import { quizResultsApi } from "../api";
import { useEffect, useState } from "react";
import Loading from "../../../components/general/Loading";
import { Card, CardBody } from "@nextui-org/react";
import ListInfo from "../../../components/general/typography/ListInfo";
import ListDetail from "../../../components/general/typography/ListDetail";
import { v4 as uuidv4 } from "uuid";
import { dateForDisplay } from "../../../../util/Util";
import CustomButton from "../../../components/general/CustomButton";
import UserProfileCard from "../../learning-materials/components/UserProfileCard";

const getStudentAnswers = (ans, options) => {
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
};

const QuizResult = () => {
  const { resultId } = useParams();
  const [quizResult, setQuizResult] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getTotalMark = () => {
    return quizResult.updatedQuestions.reduce(
      (acc, question) => acc + question.mark,
      0
    );
  };

  const isCorrect = (question) => {
    let res = true;

    if (question.studentAnswer.length !== question.correctAnswer.length)
      return false;

    question.studentAnswer.map((each) => {
      if (!question.correctAnswer.includes(each)) res = false;
    });

    return res;
  };

  const getQuizResult = async () => {
    try {
      const res = await quizResultsApi.get({ _id: resultId });
      console.log(res);
      setQuizResult(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getQuizResult();
  }, []);

  let content;

  if (isLoading) {
    content = (
      <div className="h-[500px] flex justify-center items-center">
        <Loading />
      </div>
    );
  } else {
    content = (
      <div>
        <div className="flex items-center justify-between mb-12">
          <CustomButton type="back" title={`Back to quiz-results`} />
        </div>
        <Card>
          <CardBody>
            <h3 className="mb-3 text-2xl font-bold">
              {`${quizResult.quiz.title}'s Result`}
            </h3>
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
            <div className="flex justify-between items-center mb-3">
              <h3 className="mb-3 text-xl font-semibold">Results</h3>
              <div className="p-2 border rounded-xl">
                Total Mark: {quizResult.totalMark} / {getTotalMark()}
              </div>
            </div>
            <div className="space-y-3">
              {quizResult.updatedQuestions.map((each, index) => {
                return (
                  <div
                    key={uuidv4()}
                    className={`p-3 border rounded-xl ${isCorrect(each) ? 'bg-green-200' : 'bg-red-200'}`}
                  >
                    <ListInfo
                      className="mb-2 text-lg"
                      title={`${index + 1}. ${each.question}`}
                    />
                    <div className="mb-2">
                      <ListInfo title={`Correct Answer`} className="mb-1" />
                      <ListDetail
                        title={getStudentAnswers(
                          each.correctAnswer,
                          each.options
                        )}
                      />
                    </div>
                    <div>
                      <ListInfo title={`Student Answer`} className="mb-1" />
                      <ListDetail
                        title={getStudentAnswers(
                          each.studentAnswer,
                          each.options
                        )}
                      />
                    </div>
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

export default QuizResult;
