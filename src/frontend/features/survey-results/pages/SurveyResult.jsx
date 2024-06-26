import { useParams } from "react-router-dom";
import { surveyResultsApi } from "../api";
import { useEffect, useState } from "react";
import Loading from "../../../components/general/Loading";
import { Card, CardBody } from "@nextui-org/react";
import ListInfo from "../../../components/general/typography/ListInfo";
import ListDetail from "../../../components/general/typography/ListDetail";
import { v4 as uuidv4 } from "uuid";
import { dateForDisplay } from "../../../../util/Util";
import CustomButton from "../../../components/general/CustomButton";

const getStudentAnswers = (ans) => {
  return (
    <>
      {ans.map((each) => {
        return (
          <span
            className="px-2 py-1 mr-1 rounded-xl bg-white border inline-block"
            key={uuidv4()}
          >
            {each.answer ? each.answer : each}
          </span>
        );
      })}
    </>
  );
};

const SurveyResult = () => {
  const { resultId } = useParams();
  const [surveyResult, setSurveyResult] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getSurveyResult = async () => {
    try {
      const res = await surveyResultsApi.get({ _id: resultId });
      console.log(res);
      setSurveyResult(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSurveyResult();
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
        <div className="flex items-center justify-between mb-12">
          <CustomButton type="back" title={`Back`} />
        </div>
        <Card>
          <CardBody>
            <h3 className="mb-3 text-2xl font-bold">
              {`${surveyResult.survey.title}'s Result`}
            </h3>
            <div className="mb-3 p-3 border rounded-xl flex gap-3">
              <div className="p-3 border rounded-xl">
                <ListInfo className="mb-1" title="Code" />
                <ListDetail title={surveyResult.code} />
              </div>
              <div className="p-3 border rounded-xl">
                <ListInfo className="mb-1" title="Answer Date" />
                <ListDetail title={dateForDisplay(surveyResult.answerDate)} />
              </div>
            </div>
            <h3 className="mb-3 text-xl font-semibold">Results</h3>
            <div className="space-y-3">
              {surveyResult.updatedQuestions.map((each, index) => {
                return (
                  <div key={uuidv4()} className="p-3 border rounded-xl">
                    <h3>
                      {`${index + 1}. ${each.question}`}
                    </h3>
                    <div>
                      <ListInfo className="mb-2 text-lg" title="options" />
                      <ListDetail
                        title={getStudentAnswers(each.options)}
                      />
                    </div>
                    <div>
                      <ListInfo className="mb-2 text-lg" title="answer" />
                      <ListDetail
                        title={getStudentAnswers(each.studentAnswer)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  return content;
};

export default SurveyResult;
