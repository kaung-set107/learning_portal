/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import CustomTable from "../../../components/general/CustomTable";
import TableHeading from "../../../components/general/typography/TableHeading";
import { getTableData } from "../data";
import Loading from "../../../components/general/Loading";
import { examResultsApi } from "../api";
// import BatchesDropdown from "../../batches/components/BatchesDropdown";
import { Chip } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";
import CustomButton from "../../../components/general/CustomButton";
import { useLocation, useNavigate } from "react-router-dom";
import SubjectsDropdown from "../../subjects/components/SubjectDropdown";
import ExamsDropdown from "../../exams/component/ExamsDropdown";
import ExamResultCheckModal from "../components/ExamResultCheckModal";
import { showError, showSuccess } from "../../../../util/noti";

const StatusDropdown = (props) => {
  const { setStatus, className } = props;

  const handleStatusSelect = (value) => {
    setStatus(value);
  };

  let statuses = ["submitted", "checked", "published"];

  return (
    <div className={`${className}`}>
      <Select
        color="primary"
        label="Status"
        placeholder="Select an status"
        defaultSelectedKeys={["submitted"]}
        className="max-w-xs"
        onChange={(e) => handleStatusSelect(e.target.value)}
      >
        {statuses.map((each) => {
          return (
            <SelectItem key={each} value={each}>
              {each}
            </SelectItem>
          );
        })}
      </Select>
    </div>
  );
};

const ExamResults = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(true);
  const [examResults, setExamResults] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filters, setFilters] = useState({
    batch: {},
    exam: {},
    subject: {},
    status: "submitted",
  });

  const navigate = useNavigate();

  const { state } = useLocation();

  console.log(state);

  const goToExamResultCheckPage = (examResultId) => {
    navigate(`/by-instructor/exam-results/${examResultId}/check`);
  };

  const getCheckButton = (id, examType) => {
    if (examType === "inapp") {
      return (
        <CustomButton
          color="success"
          title="Check"
          onClick={() => goToExamResultCheckPage(id)}
        />
      );
    } else {
      return (
        <ExamResultCheckModal
          examResultId={id}
          successCallback={getExamResults}
        />
      );
    }
  };

  const getViewButton = (id) => {
    return (
      <CustomButton
        title="View"
        onClick={() => navigate(`/by-instructor/exam-results/${id}`)}
      />
    );
  };

  const tableData = getTableData({ getCheckButton, getViewButton });

  const getExamResults = async (defaultPayload) => {
    let payload = {
      ...{
        exam: filters.exam?._id,
        batch: filters.batch?._id,
        status: filters.status,
      },
      ...defaultPayload,
    };
    setIsFetching(true);
    try {
      let res = await examResultsApi.getAll(payload);
      console.log(res);
      setExamResults(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsFetching(false);
    }
  };

  const publishCheckedResults = async () => {
    setIsSubmitting(true);
    console.log("published");

    try {
      let res = await examResultsApi.publishAll({ batch: filters.batch._id });
      console.log(res);
      showSuccess({ text: res.message, type: "noti-box" });
    } catch (error) {
      showError({ axiosResponse: error });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearAllFilter = () => {
    setFilters((prev) => ({ ...prev, exam: {} }));
  };

  const fetchData = () => {
    getExamResults();
  };

  useEffect(() => {
    let data = {};
    let defaultPayload = {};

    console.log(state);
    if (state && state.exam) {
      data.exam = state.exam;
      defaultPayload.exam = state.exam._id;
    }

    if (state && state.subject) {
      data.batch = {
        _id: state.subject.course?.batch?._id ?? state.subject.course.batch,
      };
      data.subject = state.subject;
    }

    let newFilters = { ...filters, ...data };

    setFilters(newFilters);

    getExamResults({ ...filters, ...defaultPayload });
  }, []);

  let content;

  if (isLoading) {
    content = (
      <div className="h-[500px] flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (!isLoading) {
    content = (
      <div className="relative">
        <div className="flex items-center justify-between mb-12">
          <CustomButton type="back" title={`Back`} />
        </div>
        {isFetching && (
          <div className="absolute -top-10 right-0">
            <Loading />
          </div>
        )}
        <div className="flex items-center justify-between mb-12">
          <TableHeading title="Exam Results" />
          <CustomButton
            onClick={() => publishCheckedResults()}
            isLoading={isSubmitting}
            title="Publish"
          />
        </div>
        <div className="my-3 flex items-center gap-3">
          <StatusDropdown
            className="shrink-0 w-[200px]"
            setStatus={(value) =>
              setFilters((prev) => ({ ...prev, status: value }))
            }
          />
          <SubjectsDropdown
            isDisabled
            className="shrink-0 w-[200px]"
            filters={filters}
            setSubject={(value) =>
              setFilters((prev) => ({ ...prev, subject: value }))
            }
          />
          {/* {filters.subject && filters.subject?._id && (
            <BatchesDropdown
              className="shrink-0 w-[200px]"
              filters={filters}
              setBatch={(value) =>
                setFilters((prev) => ({ ...prev, batch: value }))
              }
            />
          )} */}
          {filters.subject && filters.subject?._id && (
            <ExamsDropdown
              subject={filters.subject._id}
              className="shrink-0 w-[200px]"
              filters={filters}
              setExam={(value) =>
                setFilters((prev) => ({ ...prev, exam: value }))
              }
            />
          )}

          <CustomButton
            onClick={() => fetchData()}
            isLoading={isSubmitting}
            title="Fetch"
          />
        </div>
        <div className="flex gap-3 items-center my-6">
          <span>Filter By:</span>
          {<Chip>Status: {filters.status}</Chip>}
          {
            <>
              {filters.exam && Object.keys(filters.exam).length > 0 && (
                <Chip>Exam: {filters.exam.title}</Chip>
              )}
              {/* {filters.batch && Object.keys(filters.batch).length > 0 && (
                <Chip>Batch: {filters.batch._id}</Chip>
              )} */}
              {filters.subject && Object.keys(filters.subject).length > 0 && (
                <Chip>Subject: {filters.subject.title}</Chip>
              )}
              <button
                onClick={handleClearAllFilter}
                className="bg-red-700 text-white border rounded-full px-3 py-1"
              >
                Reset
              </button>
            </>
          }
        </div>
        <div>
          <div>
            <CustomTable
              isLoading={isFetching}
              src={examResults}
              tableData={tableData}
              isStriped
            />
          </div>
        </div>
      </div>
    );
  }

  return content;
};

export default ExamResults;
