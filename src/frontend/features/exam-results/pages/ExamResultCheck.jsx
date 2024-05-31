import { useParams } from "react-router";
import { examResultsApi } from "../api";
import { useEffect, useState } from "react";
import Loading from "../../../components/general/Loading";
import ExamDetailCard from "../../exams/component/ExamDetailCard";
import ExamResultDetailCard from "../components/ExamResultDetailCard";

const ExamResultCheck = (props) => {
  const { id } = useParams();
  const [examResult, setExamResult] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getExamResult = async () => {
    try {
      const res = await examResultsApi.get({ _id: id });
      console.log(res);
      setExamResult(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getExamResult();
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
        <h3 className="font-bold text-lg capitalize mb-3">Exam Result Of {examResult.exam.title}</h3>
        <ExamDetailCard examData={examResult.exam} />
        <ExamResultDetailCard examResultData={examResult}/>
      </div>
    );
  }

  return content;
};

export default ExamResultCheck;
