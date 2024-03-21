/* eslint-disable react/prop-types */
import { Button, Input, Card, CardBody } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import { useState } from "react";
import CustomButton from "../../../components/general/CustomButton";
import SubHeading from "../../../components/general/typography/SubHeading";
import { Select, SelectItem } from "@nextui-org/select";
import { surveysApi } from "../data";
import QuestionCreateModal from "../../questions/components/QuestionCreateModal";
import QuestionList from "../../questions/components/QuestionList";

const SurveyCreateForm = (props) => {
  const { type, learningMaterial } = props;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const variant = "bordered";

  const status = [
    {
      value: "finished",
      label: "finished",
    },
    {
      value: "unfinished",
      label: "unfinished",
    },
    {
      value: "expired",
      label: "expired",
    },
  ];

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    questions: [],
    numOfQuestions: 0,
    status: "unfinished",
  });

  const addQuestion = (data) => {
    let newQuestions = [...formData.questions];
    newQuestions.push(data);

    setFormData((prev) => ({ ...prev, questions: newQuestions }));
  };

  const preparePayload = () => {
    let payload = {
      ...formData,
    };

    // if(type === 'learningMaterial') {
    //     payload['learningMaterial'] = learningMaterial._id
    // }

    payload[type] = props[type]._id;

    return payload;
  };

  const handleSubmit = async (e) => {
    let payload = preparePayload();
    alert(JSON.stringify(payload));
    return;
    try {
      setIsSubmitting(true);
      e.preventDefault();
      await surveysApi.create(payload);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Card>
        <CardBody>
          <SubHeading title="Survey Create Form" />
          <form>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3">
              <Input
                type="text"
                label="Title"
                placeholder="title"
                variant={variant}
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                labelPlacement="outside"
              />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3">
              <Input
                type="text"
                label="Description"
                placeholder="description"
                variant={variant}
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                labelPlacement="outside"
              />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3">
              <Input
                type="number"
                label="Number of questions"
                placeholder="Number of questions"
                variant={variant}
                value={formData.noOfQuestion}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    noOfQuestion: e.target.value,
                  }))
                }
                labelPlacement="outside"
              />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 gap-4 mt-3">
              <Select
                items={status}
                label="Status"
                placeholder="Select an status"
                className="max-w-xs"
                labelPlacement="outside"
                onSelectionChange={(e) =>
                  setFormData((prev) => ({ ...prev, status: e.currentKey }))
                }
              >
                {(status) => (
                  <SelectItem key={status.value}>{status.label}</SelectItem>
                )}
              </Select>
            </div>
            <div className="mb-3">
              <div className="flex w-full items-center justify-between">
                <h3 className="text-lg font-bold">Questions</h3>
                <QuestionCreateModal addQuestion={addQuestion} />
              </div>
              <div className="mt-3">
                <QuestionList questions={formData.questions} />
              </div>
            </div>
            <div className="flex justify-center gap-5 mt-8">
              <Link href="/instructor">
                <Button color="danger">Cancel</Button>
              </Link>
              <CustomButton
                color="primary"
                onClick={handleSubmit}
                isLoading={isSubmitting}
                title="Create"
              />
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default SurveyCreateForm;
