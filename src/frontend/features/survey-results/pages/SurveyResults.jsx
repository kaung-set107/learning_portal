/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import CustomTable from "../../../components/general/CustomTable";
import TableHeading from "../../../components/general/typography/TableHeading";
import { getTableData } from "../data";
import Loading from "../../../components/general/Loading";
import { surveyResultsApi } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import CustomButton from "../../../components/general/CustomButton";
import { surveysApi } from "../../surveys/data";
import { showError } from "../../../../util/noti";

const SurveyResults = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(true);
  const [surveyResults, setSurveyResults] = useState([]);
  const [survey, setSurvey] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const getSurveyResults = async () => {
    setIsFetching(true);
    try {
      let res = await surveyResultsApi.getAll({ survey: survey._id });
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
      let res = await surveysApi.get({ _id: id });
      console.log(res);
      setSurvey(res.data);
    } catch (error) {
      console.log(error);
      showError({ axiosResponse: error });
    }
  };

  const getViewButton = (resultId) => {
    return (
      <CustomButton
        title="View"
        onClick={() =>
          navigate(
            `/by-instructor/surveys/${survey._id}/survey-results/${resultId}`
          )
        }
      />
    );
  };

  const tableData = getTableData({ getViewButton });

  useEffect(() => {
    getSurvey();
  }, []);

  useEffect(() => {
    console.log(survey);
    if (survey._id) getSurveyResults();
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
        <div className="flex items-center justify-between mb-12">
          <TableHeading title={`${survey.title}'s Survey Results`} />
        </div>
        <div>
          <div>
            <CustomTable src={surveyResults} tableData={tableData} isStriped />
          </div>
        </div>
      </div>
    );
  }

  return content;
};

export default SurveyResults;
