/* eslint-disable react/prop-types */
import { useLocation, useNavigate } from "react-router";
import QuizCreateForm from "../components/QuizCreateForm";
import { useEffect } from "react";
import CustomButton from "../../../components/general/CustomButton";

const QuizCreate = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(state);
    if (!(state.type && state[state.type])) {
      navigate(-1);
    }
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-12">
        <CustomButton type="back" title={`Back`} />
      </div>
      <QuizCreateForm {...state} />
    </div>
  );
};

export default QuizCreate;