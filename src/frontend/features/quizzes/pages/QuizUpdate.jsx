/* eslint-disable react/prop-types */
import { useLocation, useNavigate } from "react-router";
import QuizUpdateForm from "../components/QuizUpdateForm";
import { useEffect, useState } from "react";
import CustomButton from "../../../components/general/CustomButton";
import { quizzesApi } from "../api";

const QuizUpdate = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState({});

  const getQuiz = async () => {
    try {
      const res = await quizzesApi.get({ _id: state.quizData._id });
      console.log(res);
      setQuizData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(state);
    if (!(state.type && state[state.type] && state.quizData)) {
      navigate(-1);
    } else {
      setQuizData(state.quizData);
    }
  }, []);

  return (
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
  );
};

export default QuizUpdate;
