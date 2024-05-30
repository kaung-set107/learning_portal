/* eslint-disable react/prop-types */
import { useLocation, useParams } from "react-router";
import QuizUpdateForm from "../components/QuizUpdateForm";
import { useEffect, useState } from "react";
import CustomButton from "../../../components/general/CustomButton";
import { quizzesApi } from "../api";
import Loading from "../../../components/general/Loading";

const QuizUpdate = () => {
  const { state } = useLocation();
  const [quizData, setQuizData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const {id} = useParams()

  const getQuiz = async () => {
    try {
      const res = await quizzesApi.get({ _id: id });
      console.log(res);
      setQuizData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log(state);
    // if (!(state.type && state[state.type] && state.quizData)) {
    //   navigate(-1);
    // } else {
    //   // setQuizData(state.quizData);
    //   getQuiz();
    // }
    getQuiz()
  }, []);

  return (
    <>
      {isLoading && (
        <div className="h-[500px] flex justify-center items-center">
          <Loading />
        </div>
      )}
      {!isLoading && (
        <div>
          {quizData && Object.keys(quizData).length > 0 && (
            <>
              <div className="flex items-center justify-between mb-12">
                <CustomButton type="back" title={`Back`} />
              </div>
              <QuizUpdateForm
                {...{ ...state, quizData, successCallback: getQuiz }}
              />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default QuizUpdate;
