/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import CustomTable from "../../../components/general/CustomTable";
import TableHeading from "../../../components/general/typography/TableHeading";
import { getTableData } from "../data";
import Loading from "../../../components/general/Loading";
import { surveyResultsApi } from "../api";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomButton from "../../../components/general/CustomButton";
import { surveysApi } from "../../surveys/data";
import { showError } from "../../../../util/noti";
// import BatchesDropdown from "../../batches/components/BatchesDropdown";
// import { batchesApi } from "../../batches/api";

const SurveyResults = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(true);
  const [surveyResults, setSurveyResults] = useState([]);
  const [survey, setSurvey] = useState({});
  const { id, subjectSectionId, learningMaterialId } = useParams();
  // const [currentBatch, setCurrentBatch] = useState()
  // const [filters, setFilters] = useState({
  //   batch: "",
  // });

  const navigate = useNavigate();

  // const {id} = useParams()

  const {
    state: { survey: surveyId },
  } = useLocation();

  const getSurveyResults = async () => {
    setIsFetching(true);
    try {
      let res = await surveyResultsApi.getAll({
        survey: survey._id,
        // batch: filters.batch?._id,
      });
      console.log(res);
      setSurveyResults(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsFetching(false);
    }
  };

  const getSurvey = async () => {
    try {
      let res = await surveysApi.get({ _id: surveyId });
      console.log(res);
      setSurvey(res.data);
    } catch (error) {
      console.log(error);
      showError({ axiosResponse: error });
    }
  };

  // const getCurrentBatch = async () => {
  //   try {
  //     let res = await batchesApi.getCurrentBatchBySubject({ subject: id });
  //     setCurrentBatch(res.data)
  //     setFilters(prev => ({...prev, batch: res.data}))
  //   } catch (error) {
  //     console.log(error);
  //     showError({ axiosResponse: error });
  //   }
  // }

  // const fetchData = () => {
  //   getSurveyResults();
  // };

  const getViewButton = (resultId) => {
    return (
      <CustomButton
        title="View"
        onClick={() =>
          // navigate(
          //   `/by-instructor/surveys/${survey._id}/survey-results/${resultId}`
          // )
          navigate(
            `/by-instructor/subjects/${id}/subject-sections/${subjectSectionId}/learning-materials/${learningMaterialId}/survey-results/${resultId}`
          )
        }
      />
    );
  };

  const tableData = getTableData({ getViewButton });

  useEffect(() => {
    getSurvey();
    // getCurrentBatch()
  }, []);

  useEffect(() => {
    if (Object.keys(survey).length > 0) {
      if (survey._id) getSurveyResults();
    }
  }, [survey]);

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

        <div className="flex justify-between items-center mb-3">
          {/* <div>
            <BatchesDropdown
              className="shrink-0 w-[200px]"
              filters={filters}
              setBatch={(value) =>
                setFilters((prev) => ({ ...prev, batch: value }))
              }
            />
          </div> */}
          {/* <CustomButton
            onClick={() => fetchData()}
            isLoading={isFetching}
            title="Fetch"
          /> */}
        </div>
        <div className="flex items-center justify-between mb-12">
          <TableHeading title={`${survey.title}'s Survey Results`} />
        </div>
        <div>
          <div>
            <CustomTable
              isLoading={isFetching}
              src={surveyResults}
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

export default SurveyResults;
