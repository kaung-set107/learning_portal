/* eslint-disable react/prop-types */
import QuizResultDetailCard from "../../quiz-results/components/QuizResultDetailCard";

const ExamResultDetailCard = (props) => {
  const { examResultData } = props;

  return (
    <div>
      <QuizResultDetailCard quizResult={examResultData.quizResult} />
    </div>
  );
};

export default ExamResultDetailCard;
