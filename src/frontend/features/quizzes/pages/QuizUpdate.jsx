/* eslint-disable react/prop-types */
import { useLocation, useNavigate } from "react-router";
import QuizUpdateForm from "../components/QuizUpdateForm";
import { useEffect } from "react";
import CustomButton from "../../../components/general/CustomButton";

const QuizUpdate = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(state);
    if (!(state.type && state[state.type] && state.quizData)) {
      navigate(-1);
    }
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-12">
        <CustomButton type="back" title={`Back`} />
      </div>
      <QuizUpdateForm {...state} />
    </div>
  );
};

export default QuizUpdate;
