/* eslint-disable react/prop-types */
import CustomButton from "../../../../components/general/CustomButton";
import NotiInfo from "../../../../components/general/typography/NotiInfo";
import { isInstruction, isParagraph, isQuestions } from "../helper";
import SectionList from "./SectionList";

const QuizQuestionHandler = (props) => {
  const {
    questionData,
    setQuestionData,
    deletedQuestions,
    setDeletedQuestions,
    successCallback,
    srcId,
    imageUploadApi,
    deletedQuestionData,
    setDeletedQuestionData,
    fixedQuestionTypes
  } = props;
  // const [deletedQuestions, setDeletedQuestions] = useState([]) // need to save according to image deletion

  const createSection = () => {
    setQuestionData((prev) => [...prev, {}]);
  };

  const removeSection = (sectionIndex) => {
    setQuestionData((prev) => {
      let sectionDataClone = [...prev];

      console.log(deletedQuestionData);

      if (setDeletedQuestionData) {
        setDeletedQuestionData([
          ...deletedQuestionData,
          { ...sectionDataClone[sectionIndex] },
        ]);
      }

      return prev.filter((each, index) => index !== sectionIndex);
    });
  };

  const removeParagraph = (sectionIndex, paragraphIndex) => {
    setQuestionData((prev) => {
      let questionDataClone = [...prev];

      questionDataClone[sectionIndex]["paragraph"] = questionDataClone[
        sectionIndex
      ]["paragraph"].filter((each, index) => index !== paragraphIndex);

      return questionDataClone;
    });
  };

  const updateParagraph = (sectionIndex, paragraphIndex, payload) => {
    setQuestionData((prev) => {
      let questionDataClone = [...prev];

      questionDataClone[sectionIndex]["paragraph"][paragraphIndex] = payload;

      return questionDataClone;
    });
  };

  const updateQuestions = (sectionIndex, questionIndex, payload) => {
    setQuestionData((prev) => {
      let questionDataClone = [...prev];

      questionDataClone[sectionIndex]["questions"][questionIndex] = {
        ...payload,
      };

      return questionDataClone;
    });
  };

  const removeQuestion = (sectionIndex, questionIndex) => {
    setQuestionData((prev) => {
      let questionDataClone = [...prev];

      if (setDeletedQuestions) {
        setDeletedQuestions([
          ...deletedQuestions,
          { ...questionDataClone[sectionIndex]["questions"][questionIndex] },
        ]);
      }

      questionDataClone[sectionIndex]["questions"] = questionDataClone[
        sectionIndex
      ]["questions"].filter((each, index) => index !== questionIndex);

      return questionDataClone;
    });
  };

  const addSectionData = (sectionIndex, payload) => {
    setQuestionData((prev) => {
      let newQuestionData = [...prev];
      if (isInstruction(payload.sectionDataType)) {
        newQuestionData[sectionIndex][payload.sectionDataType] = payload.value;
      }

      if (isParagraph(payload.sectionDataType)) {
        if (!newQuestionData[sectionIndex][payload.sectionDataType]) {
          newQuestionData[sectionIndex][payload.sectionDataType] = [];
        }

        newQuestionData[sectionIndex][payload.sectionDataType].push(
          payload.value
        );
      }

      if (isQuestions(payload.sectionDataType)) {
        if (!newQuestionData[sectionIndex][payload.sectionDataType]) {
          newQuestionData[sectionIndex][payload.sectionDataType] = [];
        }

        let question = { ...payload };
        delete question.sectionDataType;

        newQuestionData[sectionIndex][payload.sectionDataType].push(question);
      }

      return newQuestionData;
    });
  };

  const updateSectionData = (sectionIndex, payload) => {
    setQuestionData((prev) => {
      let newQuestionData = [...prev];
      if (isInstruction(payload.sectionDataType)) {
        newQuestionData[sectionIndex][payload.sectionDataType] = payload.value;
      }

      if (isParagraph(payload.sectionDataType)) {
        newQuestionData[sectionIndex][payload.sectionDataType] = payload.value;
      }

      return newQuestionData;
    });
  };

  const removeSectionData = (sectionIndex, type) => {
    setQuestionData((prev) => {
      let newQuestionData = [...prev];
      delete newQuestionData[sectionIndex][type];

      return newQuestionData;
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
          fixedQuestionTypes={fixedQuestionTypes}
            data={questionData}
            removeSection={removeSection}
            setQuestionData={setQuestionData}
            addSectionData={addSectionData}
            removeParagraph={removeParagraph}
            updateParagraph={updateParagraph}
            removeSectionData={removeSectionData}
            removeQuestion={removeQuestion}
            updateQuestions={updateQuestions}
            updateSectionData={updateSectionData}
            successCallback={successCallback}
            srcId={srcId}
            imageUploadApi={imageUploadApi}
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
