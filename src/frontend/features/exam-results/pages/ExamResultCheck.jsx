import { useParams } from "react-router";
import { examResultsApi } from "../api";
import { useEffect, useState } from "react";
import Loading from "../../../components/general/Loading";
import ExamDetailCard from "../../exams/component/ExamDetailCard";
import ExamResultDetailCard from "../components/ExamResultDetailCard";
import { Card, CardBody, Input } from "@nextui-org/react";
import { showError, showSuccess } from "../../../../util/noti";
import CustomButton from "../../../components/general/CustomButton";

const ExamResultCheck = (props) => {
  const { id } = useParams();
  const [examResult, setExamResult] = useState({});
  const [quizResult, setQuizResult] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    remark: "",
    grade: "",
  });

  const variant = "bordered";

  const getExamResult = async () => {
    try {
      const res = await examResultsApi.get({ _id: id });
      console.log(res);
      setExamResult(res.data);
      setFormData(prev => {
        return {
          remark: res.data.remark,
          grade: res.data.grade
        }
      })
      setQuizResult(res.data.quizResult);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getExamResult();
  }, []);

  // const handleSubmit = async (onClose) => {
  //   try {
  //     setIsSubmitting(true);
  //     let payload = { ...formData, _id: examResultId };

  //     console.log(payload);
  //     // return
  //     await examResultsApi.check(payload);
  //     successCallback();
  //     onClose();
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleSubmit = async () => {
    const payload = {
      ...formData,
      _id: id,
      updatedQuestionData: quizResult.updatedQuestionData,
    };

    try {
      setIsSubmitting(true);
      const res = await examResultsApi.checkInApp(payload)
      console.log(res)
      await getExamResult()
      showSuccess({text: res.message, type: 'noti-box'})
    } catch (error) {
      console.log(error);
      showError({ axiosResponse: error });
    } finally {
      setIsSubmitting(false);
    }
  };

  let content;

  if (isLoading) {
    content = (
      <div className="h-[500px] flex justify-center items-center">
        <Loading />
      </div>
    );
  } else {
    content = (
      <div className="space-y-3">
        <h3 className="font-bold text-2xl capitalize">
          Exam Result Of {examResult.exam.title}
        </h3>
        <ExamDetailCard examData={examResult.exam} />
        <ExamResultDetailCard
          quizResult={quizResult}
          setQuizResult={setQuizResult}
        />
        <Card>
          <CardBody>
            <h4 className="font-bold text-lg">Others</h4>
            <form className="max-w-lg">
              <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-3 gap-4 mt-3">
                <Input
                  type="text"
                  label="Remark"
                  placeholder="remark"
                  variant={variant}
                  value={formData.remark}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      remark: e.target.value,
                    }))
                  }
                  labelPlacement="outside"
                />
              </div>
              <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-3 gap-4 mt-3">
                <Input
                  type="text"
                  label="Grade"
                  placeholder="grade"
                  variant={variant}
                  value={formData.grade}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      grade: e.target.value,
                    }))
                  }
                  labelPlacement="outside"
                />
              </div>
            </form>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="flex justify-center">
              <CustomButton isLoading={isSubmitting} title="Submit" onClick={() => handleSubmit()} />
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  return content;
};

export default ExamResultCheck;
