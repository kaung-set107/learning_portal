/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import CustomTable from "../../../components/general/CustomTable";
import TableHeading from "../../../components/general/typography/TableHeading";
import { getTableData } from "../data";
import Loading from "../../../components/general/Loading";
import { quizResultsApi } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import CustomButton from "../../../components/general/CustomButton";
import { quizzesApi } from "../../quizzes/api";
import { showError } from "../../../../util/noti";
import BatchesDropdown from "../../batches/components/BatchesDropdown";
import { batchesApi } from "../../batches/api";

const QuizResults = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(true);
  const [quizResults, setQuizResults] = useState([]);
  const [quiz, setQuiz] = useState({});
  const [currentBatch, setCurrentBatch] = useState()
  const [filters, setFilters] = useState({
    batch: "",
  });
  
  const navigate = useNavigate();
  const { id, quizId } = useParams();

  const getQuizResults = async () => {
    setIsFetching(true);
    try {
      let res = await quizResultsApi.getAll({ quiz: quiz._id, batch: filters.batch?._id });
      console.log(res);
      setQuizResults(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsFetching(false);
    }
  };

  const getQuiz = async () => {
    try {
      let res = await quizzesApi.get({ _id: quizId });
      console.log(res);
      setQuiz(res.data);
    } catch (error) {
      console.log(error);
      showError({ axiosResponse: error });
    }
  };

  const getCurrentBatch = async () => {
    try {
      let res = await batchesApi.getCurrentBatchBySubject({ subject: id });
      setCurrentBatch(res.data)
      setFilters(prev => ({...prev, batch: res.data}))
    } catch (error) {
      console.log(error);
      showError({ axiosResponse: error });
    }
  }

  const fetchData = () => {
    getQuizResults();
  };

  // const handleQuizResultDelete = async (id) => {
  //   setIsSubmitting(true);
  //   try {
  //     let res = await quizResultsApi.remove({ _id: id });
  //     console.log(res);
  //     showSuccess({ text: res.message, type: "noti-box" });
  //     getQuizResults();
  //   } catch (error) {
  //     showError({ axiosResponse: error });
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const getViewButton = (resultId) => {
    return (
      <CustomButton
        title="View"
        onClick={() =>
          navigate(
            `/by-instructor/quizzes/${quiz._id}/quiz-results/${resultId}`
          )
        }
      />
    );
  };

  // const getDeleteButton = (data) => {
  //   return (
  //     <CustomButton
  //       title="Delete"
  //       isLoading={isSubmitting}
  //       iconOnly
  //       type="delete"
  //       onClick={() => handleQuizResultDelete(data._id)}
  //     />
  //   );
  // };

  const tableData = getTableData({ getViewButton });

  useEffect(() => {
    getQuiz();
    getCurrentBatch();
  }, []);

  useEffect(() => {
    console.log(quiz);
    if(quiz._id && filters.batch) getQuizResults();
  }, [filters, quiz]);

  let content;

  if (isLoading) {
    content = (
      <div className="h-[500px] flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (!isLoading) {
    content = (
      <div className="relative">
        {isFetching && (
          <div className="absolute -top-10 right-0">
            <Loading />
          </div>
        )}
        <div className="flex items-center justify-between mb-12">
          <CustomButton type="back" title={`Back to Learning Material`} />
        </div>
        <div className="flex items-center justify-between mb-12">
          <TableHeading title={`${quiz.title}'s Quiz Results`} />
        </div>
        <div className="flex justify-between items-center mb-3">
          <div>
            <BatchesDropdown
              className="shrink-0 w-[200px]"
              filters={filters}
              setBatch={(value) =>
                setFilters((prev) => ({ ...prev, batch: value }))
              }
            />
          </div>
          <CustomButton
            onClick={() => fetchData()}
            isLoading={isFetching}
            title="Fetch"
          />
        </div>
        <div>
          <div>
            <CustomTable
              isLoading={isFetching}
              src={quizResults}
              tableData={tableData}
              isStriped
            />
          </div>
        </div>
      </div>
    );
  }

  return content;
};

export default QuizResults;
