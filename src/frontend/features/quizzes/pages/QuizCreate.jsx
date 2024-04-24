/* eslint-disable react/prop-types */
import { useLocation, useNavigate } from "react-router";
import QuizCreateForm from "../components/QuizCreateForm";
import { useEffect } from "react";

const QuizCreate = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(state)
    if (!state.type && state[state.type]) {
      navigate(-1);
    }
  }, []);

  return (
    <div>
      <QuizCreateForm {...state} />
    </div>
  );
};

export default QuizCreate;
