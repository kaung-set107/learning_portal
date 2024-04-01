/* eslint-disable react/prop-types */
import { Input, Card, CardBody } from "@nextui-org/react";
import { useEffect, useState } from "react";
import CustomButton from "../../../components/general/CustomButton";
import SubHeading from "../../../components/general/typography/SubHeading";
import { Select, SelectItem } from "@nextui-org/select";
import { quizzesApi } from "../api";
import QuestionCreateModal from "../../questions/components/QuestionCreateModal";
import QuestionList from "../../questions/components/QuestionList";
import { showError, showSuccess } from "../../../../util/noti";

const QuizCreateForm = (props) => {
  const { type, successCallback } = props;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [questions, setQuestions] = useState([]);

  const variant = "bordered";

  const status = [
    {
      value: "expired",
      label: "expired",
    },
    {
      value: "unfinished",
      label: "unfinished",
    },
  ];

  const [formData, setFormData] = useState({
    title: "testing",
    description: "",
    questions: [],
    numOfQuestions: 0,
    examDate: "",
    duration: 1,
    status: "unfinished",
    totalMark: 0,
    passMark: 0,
    creditMark: 0,
    distinctionMark: 0,
  });

  const addQuestion = (data) => {
    let newQuestions = [...questions];
    newQuestions.push(data);

    setQuestions(newQuestions);
    // setFormData((prev) => ({ ...prev, questions: newQuestions }));
  };

  const preparePayload = () => {
    let payload = {
      ...formData,
    };

    // if(type === 'learningMaterial') {
    //     payload['learningMaterial'] = learningMaterial._id
    // }
    payload.questions = questions;
    payload.type = type;
    payload[type] = props[type]._id;

    return payload;
  };

  const handleSubmit = async () => {
    let payload = preparePayload();
    // alert(JSON.stringify(payload));
    // console.log(payload);
    // return;
    try {
      setIsSubmitting(true);
      let res = await quizzesApi.create(payload);
      await successCallback();
      showSuccess({ text: res.message, type: "noti-box" });
    } catch (error) {
      console.log(error);
      showError({ axiosResponse: error });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      numOfQuestions: questions.length,
      totalMark: questions.length,
    }));
  }, [questions]);

  return (
    <div>
      <Card>
        <CardBody>
          <SubHeading title="Quiz Create Form" />
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
                label="Duration"
                placeholder="duration"
                variant={variant}
                value={formData.duration}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, duration: e.target.value }))
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
                isDisabled
                type="number"
                label="Number of questions"
                placeholder="Number of questions"
                variant={variant}
                value={formData.numOfQuestions}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    numOfQuestions: e.target.value,
                  }))
                }
                labelPlacement="outside"
              />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3">
              <Input
              isDisabled
                type="number"
                label="Total Mark"
                placeholder="Total Mark"
                variant={variant}
                value={formData.totalMark}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    totalMark: e.target.value,
                  }))
                }
                labelPlacement="outside"
              />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3">
              <Input
                type="number"
                label="Pass Mark"
                placeholder="Pass Mark"
                variant={variant}
                value={formData.passMark}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    passMark: e.target.value,
                  }))
                }
                labelPlacement="outside"
              />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3">
              <Input
                type="number"
                label="Credit Mark"
                placeholder="Credit Mark"
                variant={variant}
                value={formData.creditMark}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    creditMark: e.target.value,
                  }))
                }
                labelPlacement="outside"
              />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3">
              <Input
                type="number"
                label="Distinction Mark"
                placeholder="Distinction Mark"
                variant={variant}
                value={formData.distinctionMark}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    distinctionMark: e.target.value,
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
                <QuestionList
                  questions={questions}
                  setQuestions={setQuestions}
                />
              </div>
            </div>
            <div className="flex justify-center gap-5 mt-8">
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

export default QuizCreateForm;
