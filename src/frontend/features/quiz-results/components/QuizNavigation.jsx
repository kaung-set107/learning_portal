/* eslint-disable react/prop-types */
import { v4 as uuidv4 } from "uuid";

const isCorrect = (question) => {
  let res = true;

  if (question.studentAnswer.length !== question.correctAnswer.length)
    return false;

  question.studentAnswer.map((each) => {
    if (!question.correctAnswer.includes(each)) res = false;
  });

  return res;
};

const QuizNavigation = ({ updatedQuestions }) => {
  return (
    <div>
      <h3 className="font-bold text-xl">Quiz Navigation</h3>
      <div>
        <div className="space-y-3 space-x-3">
          {updatedQuestions.map((each, index) => {
            return (
              <a
                href={`#${each._id}`}
                key={uuidv4()}
                className={`border rounded-xl inline-block py-2 px-3 ${
                  isCorrect(each) ? "bg-green-300 border-green-400" : "bg-red-300 border-red-400"
                }`}
              >
                {index + 1}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuizNavigation;
