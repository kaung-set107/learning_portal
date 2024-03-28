import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { learningMaterialApi } from "../api";
import Loading from "../../../components/general/Loading";
import Heading from "../../../components/general/typography/Heading";
import { Tabs, Tab } from "@nextui-org/react";
import SurveyCreateForm from "../../surveys/components/SurveyCreateForm";
import SurveyUpdateForm from "../../surveys/components/SurveyUpdateForm";
import SummaryForm from "../components/SummaryForm";
import CustomButton from "../../../components/general/CustomButton";

const LearningMaterialBrief = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [learningMaterial, setLearningMaterial] = useState({});

  const TabOptions = [
    { key: "summary", title: "Summary" },
    { key: "survey", title: "Survey" },
  ];

  const getLearningMaterial = async () => {
    try {
      let res = await learningMaterialApi.get({ _id: id });
      console.log(res);
      setLearningMaterial(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getLearningMaterial();
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
          <CustomButton type="back" title={`Back to Learning Material`} />
        </div>
        <Heading title={learningMaterial.title} className="mb-3" />
        <p className="mb-3">{learningMaterial.description}</p>
        <div className="space-y-6">
          <Tabs aria-label="Options">
            <Tab key={TabOptions[0].key} title={TabOptions[0].title}>
              <div>
                <SummaryForm
                  learningMaterial={learningMaterial}
                  successCallback={getLearningMaterial}
                />
              </div>
            </Tab>
            <Tab key={TabOptions[1].key} title={TabOptions[1].title}>
              <div>
                {!learningMaterial.survey && (
                  <SurveyCreateForm
                    successCallback={getLearningMaterial}
                    type="learningMaterial"
                    learningMaterial={learningMaterial}
                  />
                )}
                {learningMaterial.survey && (
                  <SurveyUpdateForm
                    successCallback={getLearningMaterial}
                    type="learningMaterial"
                    learningMaterial={learningMaterial}
                  />
                )}
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }

  return <div>{content}</div>;
};

export default LearningMaterialBrief;
