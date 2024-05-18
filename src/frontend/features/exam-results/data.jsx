import { dateForDisplay } from "../../../util/Util";
import FileLoader from "../../components/general/FileLoader";

export const getTableData = ({ getCheckButton, getViewButton }) => {
  return {
    headers: [
      {
        name: "Code",
        key: "code",
      },
      {
        name: "Submission Date",
        key: "submissionDate",
        getComponent: (data) => {
          return (
            <>
              <p>
                {data.submissionDate
                  ? dateForDisplay(data.submissionDate)
                  : "Not Set"}
              </p>
            </>
          );
        },
      },
      {
        name: "Student",
        key: "student",
        getComponent: (data) => {
          return (
            <>
              <p>{data?.student?.name ?? "Not Set"}</p>
            </>
          );
        },
      },
      {
        name: "Answer file",
        key: "files",
        getComponent: (data) => {
          return (
            <>
              {data.files?.length > 0 ? (
                <FileLoader file={data.files[0]} />
              ) : (
                <p>Not Set!</p>
              )}
            </>
          );
        },
      },
      {
        name: "Checked File",
        key: "checkedFiles",
        getComponent: (data) => {
          return (
            <>
              {data.checkedFiles && data.checkedFiles?.length > 0 ? (
                <FileLoader
                  key={data.checkedFiles[0].filename}
                  file={data.checkedFiles[0]}
                />
              ) : (
                <p>Not Set!</p>
              )}
            </>
          );
        },
      },
      {
        name: "Grade",
        key: "grade",
      },
      {
        name: "Remark",
        key: "remark",
      },
      {
        name: "Action",
        key: "action",
        getComponent: (data) => {
          if (data.status === "submitted") {
            return <div className="flex gap-3">{getViewButton(data._id)}{getCheckButton(data._id)}</div>;
          } else {
            return "No Action!";
          }
        },
      },
    ],
  };
};
