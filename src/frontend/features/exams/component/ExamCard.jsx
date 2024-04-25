/* eslint-disable react/prop-types */
import { Chip } from "@nextui-org/react";
import { dateForDisplay } from "../../../../util/Util";
// import CustomButton from "../../../components/general/CustomButton";
import ExamUpdateModal from "./ExamUpdateModal";
import { v4 as uuidv4 } from "uuid";
import FileLoader from "../../../components/general/FileLoader";
import ListInfo from "../../../components/general/typography/ListInfo";
import ListDetail from "../../../components/general/typography/ListDetail";
import { useNavigate } from "react-router";
import CustomButton from "../../../components/general/CustomButton";

const ExamCard = (props) => {
  const {
    examData,
    successCallback,
    subjectId,
    // handleExamDelete,
    // isSubmitting,
  } = props;

  const navigate = useNavigate();

  const quizCreate = (data) => {
    navigate(`/by-instructor/quizzes/create`, {
      state: { type: "exam", exam: data },
    });
  };

  const quizUpdate = (data) => {
    navigate(`/by-instructor/quizzes/${data.quiz._id}/edit`, {
      state: { type: "exam", exam: data, quizData: data.quiz },
    });
  };

  return (
    <div className="p-3 border rounded-xl mb-3 relative">
      <div className="flex gap-3 absolute right-2 top-2">
        {/* <CustomButton
          size="sm"
          onClick={() => goToResult(exam)}
          title="Results"
        /> */}
        {!examData.quiz && (
          <CustomButton
            size="sm"
            onClick={() => quizCreate(examData)}
            title="Quiz Create"
          />
        )}
        {examData.quiz && (
          <CustomButton
            size="sm"
            onClick={() => quizUpdate(examData)}
            title="Quiz Update"
          />
        )}
        <ExamUpdateModal
          subjectId={subjectId}
          examData={examData}
          successCallback={successCallback}
        />
        {/* <CustomButton
          iconOnly
          type="delete"
          size="sm"
          onClick={() => handleExamDelete(examData._id)}
          isLoading={isSubmitting}
          title="Delete"
        /> */}
      </div>
      <h3 className="font-bold text-lg capitalize mb-3">{examData.title}</h3>
      <div className="flex gap-3">
        <Chip className="mb-3 font-semibold">
          Due Date: {dateForDisplay(examData.dueDate)}
        </Chip>
        <Chip className="mb-3 font-semibold">{examData.examType}</Chip>
      </div>
      <p className="mb-3">{examData.description}</p>
      <div className="mb-3">
        <ListInfo title="Duration(minutes)" />
        <ListDetail title={examData.duration} />
      </div>
      <div className="flex gap-3 mb-3">
        <div>
          <ListInfo title="Start Time" />
          <ListDetail title={examData.startTime} />
        </div>
        <div>
          <ListInfo title="End Time" />
          <ListDetail title={examData.endTime} />
        </div>
      </div>
      <div className="mb-3">
        <h3 className="text-lg font-semibold mb-3">Assets</h3>
        <div className="bg-gray-100 flex flex-wrap gap-3 p-3 rounded-xl border">
          {examData.assets ? (
            examData.assets.map((asset) => {
              return (
                <div
                  key={uuidv4()}
                  className="inline-block bg-white p-3 rounded-xl border"
                >
                  <FileLoader file={asset} />
                </div>
              );
            })
          ) : (
            <span>No File!</span>
          )}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold">Links</h3>
        <ul>
          {examData.links &&
            JSON.parse(examData.links).map((link) => {
              return (
                <a
                  href={link.links}
                  target="_blank"
                  rel="noreferrer"
                  className="block underline text-blue-600"
                  key={uuidv4()}
                >
                  {link.links}
                </a>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default ExamCard;
