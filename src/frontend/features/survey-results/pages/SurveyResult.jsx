import { useParams } from "react-router-dom";
import { surveyResultsApi } from "../api";
import { useEffect, useState } from "react";
import Loading from "../../../components/general/Loading";

const SurveyResult = () => {
  const { resultId } = useParams;
  const [survey, setSurvey] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getSurvey = async () => {
    try {
      const res = await surveyResultsApi.get({ _id: resultId });
      setSurvey(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSurvey();
  }, []);

  let content;

  if (isLoading) {
    content = (
      <div>
        <Loading />
      </div>
    );
  } else {
    content = <div>{JSON.stringify(survey)}</div>;
  }

  return content;
};

export default SurveyResult;
