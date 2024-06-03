/* eslint-disable react/prop-types */
import QuizResultDetailCard from "../../quiz-results/components/QuizResultDetailCard";

const ExamResultDetailCard = (props) => {
  const { quizResult, setQuizResult } = props;

  return (
    <div>
      <QuizResultDetailCard checkActions quizResult={quizResult} setQuizResult={setQuizResult} />
    </div>
  );
};

export default ExamResultDetailCard;
