import { useNavigate, useParams } from "react-router-dom";
import { quizResultsApi } from "../api";
import { useEffect, useState } from "react";
import Loading from "../../../components/general/Loading";
import CustomButton from "../../../components/general/CustomButton";
import QuizResultDetailCard from "../components/QuizResultDetailCard";


const QuizResult = () => {
  const { resultId } = useParams();
  const [quizResult, setQuizResult] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();

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

  const goToQuizResults = () => {
    navigate(`/by-instructor/quizzes/${id}/quiz-results`)
  }

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
          <CustomButton type="back" onClick={goToQuizResults} title={`Back to quiz-results`} />
        </div>
        <QuizResultDetailCard quizResult={quizResult}/>
      </div>
    );
  }

  return content;
};

export default QuizResult;
