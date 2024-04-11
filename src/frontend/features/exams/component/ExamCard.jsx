/* eslint-disable react/prop-types */
import { Chip } from "@nextui-org/react";
import { dateForDisplay } from "../../../../util/Util";
import CustomButton from "../../../components/general/CustomButton";
import ExamUpdateModal from "./ExamUpdateModal";
import { v4 as uuidv4 } from "uuid";
import FileLoader from "../../../components/general/FileLoader";

const ExamCard = (props) => {
  const {
    examData,
    successCallback,
    subjectId,
    handleExamDelete,
    isSubmitting,
  } = props;

  return (
    <div className="p-3 border rounded-xl mb-3 relative">
      <div className="flex gap-3 absolute right-2 top-2">
        {/* <CustomButton
          size="sm"
          onClick={() => goToResult(exam)}
          title="Results"
        /> */}
        <ExamUpdateModal
          subjectId={subjectId}
          examData={examData}
          successCallback={successCallback}
        />
        <CustomButton
          iconOnly
          type="delete"
          size="sm"
          onClick={() => handleExamDelete(examData._id)}
          isLoading={isSubmitting}
          title="Delete"
        />
      </div>
      <h3 className="font-bold text-lg capitalize mb-3">{examData.title}</h3>
      <Chip className="mb-3 font-semibold">
        Due Date: {dateForDisplay(examData.dueDate)}
      </Chip>
      <p className="mb-3">{examData.description}</p>
      <div className="mb-3">
        <h3 className="text-lg font-semibold mb-3">Assets</h3>
        <div className="bg-gray-100 p-3 rounded-xl border">
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
