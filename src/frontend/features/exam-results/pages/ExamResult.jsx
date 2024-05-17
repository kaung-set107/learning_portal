import { useParams } from "react-router";

const ExamResult = () => {
  const { id } = useParams();

  return <div>{id}</div>;
};

export default ExamResult;
