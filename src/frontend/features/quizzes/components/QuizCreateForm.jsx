/* eslint-disable react/prop-types */
import { Input, Card, CardBody } from "@nextui-org/react";
import { useState } from "react";
import CustomButton from "../../../components/general/CustomButton";
import SubHeading from "../../../components/general/typography/SubHeading";
import { Select, SelectItem } from "@nextui-org/select";
import { quizzesApi } from "../api";
import { showError, showSuccess } from "../../../../util/noti";
import QuizQuestionHandler from "../../general/quiz-question/components/QuizQuestionHandler";
import { useNavigate } from "react-router";

const QuizCreateForm = (props) => {
  const { type, successCallback, fixedQuestionTypes } = props;

  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [questions, setQuestions] = useState([]);
  const [questionData, setQuestionData] = useState([]);

  const navigate = useNavigate();

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
    title: "",
    description: "",
    questions: [],
    numOfQuestions: 0,
    examDate: "",
    duration: 1,
    status: "unfinished",
    totalMark: 0,
    passMark: 0,
    creditMark: 0,
    // distinctionMark: 0,
  });

  const preparePayload = () => {
    let payload = {
      ...formData,
    };

    // if(type === 'learningMaterial') {
    //     payload['learningMaterial'] = learningMaterial._id
    // }
    payload.questionData = questionData;
    payload.type = type;
    payload[type] = props[type]._id;
    payload.totalMark = calculateTotalMark();
    payload.numOfQuestions = calculateTotalQuestion();

    console.log(payload);

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
      if (successCallback) await successCallback();

      showSuccess({ text: res.message, type: "noti-box" });
      let queryState = {
        type: type,
      };

      queryState[type] = props[type];

      navigate(-1);
      // navigate(`/by-instructor/quizzes/${res.data._id}/edit`);
    } catch (error) {
      console.log(error);
      showError({ axiosResponse: error });
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateTotalMark = () => {
    if (questionData && questionData.length > 0) {
      return questionData.reduce((totalMark, section) => {
        const sectionTotalMark = section.questions
          ? section.questions.reduce((questionAcc, question) => {
              return questionAcc + +question.mark;
            }, 0)
          : 0;

        const reMark = totalMark + sectionTotalMark;

        return reMark;
      }, 0);
    } else {
      return 0;
    }
  };

  const calculateTotalQuestion = () => {
    let totalLength = 0;
    if (questionData && questionData.length > 0) {
      questionData.map((section) => {
        if (section.questions && section.questions.length > 0) {
          totalLength += section.questions.length;
        }
      });

      return totalLength;
    } else {
      return 0;
    }
  };

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
            {/* <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3">
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
            </div> */}
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

            {/* <div className="mb-3">
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
            </div> */}

            <div className="mb-3">
              <QuizQuestionHandler
                fixedQuestionTypes={[...fixedQuestionTypes]}
                questionData={questionData}
                setQuestionData={setQuestionData}
              />
            </div>

            <div className="flex justify-center gap-5 mt-8">
              <CustomButton
                color="primary"
                onClick={handleSubmit}
                isLoading={isSubmitting}
                title="Create Quiz"
              />
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default QuizCreateForm;
