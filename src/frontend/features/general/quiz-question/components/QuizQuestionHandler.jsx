/* eslint-disable react/prop-types */
import CustomButton from "../../../../components/general/CustomButton";
import NotiInfo from "../../../../components/general/typography/NotiInfo";
import { isInstruction } from "../helper";
import SectionList from "./SectionList";

const QuizQuestionHandler = (props) => {
  const { questionData, setQuestionData } = props;

  const createSection = () => {
    setQuestionData((prev) => [...prev, {}]);
  };

  const removeSection = (sectionIndex) => {
    setQuestionData((prev) =>
      prev.filter((each, index) => index !== sectionIndex)
    );
  };

  const addSectionData = (sectionIndex, payload) => {
    setQuestionData((prev) => {
      let newQuestionData = [...prev]
      if (isInstruction(payload.type)) {
        newQuestionData[sectionIndex].instruction = payload.value;
      }

      return newQuestionData
    });
  };

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <h3 className="text-lg font-bold">Questions</h3>
        <CustomButton
          onClick={createSection}
          color="primary"
          title="Add Section +"
        />
        {/* <QuestionCreateModal addQuestion={addQuestion} /> */}
      </div>
      <div className="mt-3">
        {questionData.length > 0 ? (
          <SectionList
            data={questionData}
            removeSection={removeSection}
            addSectionData={addSectionData}
          />
        ) : (
          <div className="h-[300px] border bg-gray-100 p-3 flex items-center justify-center rounded-md">
            <NotiInfo>No Data</NotiInfo>
          </div>
        )}
        {/* <QuestionList
          successCallback={successCallback}
          srcId={quizData._id}
          imageUploadApi={quizzesApi.updateQuestionImage}
          questionRemoveApi={quizzesApi.removeQuestion}
          deletedQuestions={formData.deletedQuestions}
          setDeletedQuestions={(data) =>
            setFormData((prev) => ({ ...prev, deletedQuestions: data }))
          }
          questions={questions}
          setQuestions={setQuestions}
        /> */}
      </div>
    </>
  );
};

export default QuizQuestionHandler;
