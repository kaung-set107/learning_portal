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
import { useLocation } from "react-router-dom";
import SubjectsDropdown from "../../subjects/components/SubjectDropdown";
import ExamsDropdown from "../../exams/component/ExamsDropdown";
import ExamResultCheckModal from "../components/ExamResultCheckModal";

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

  const { state } = useLocation();

  console.log(state);

  const getCheckButton = (id) => {
    return (
      <ExamResultCheckModal
        examResultId={id}
        successCallback={getExamResults}
      />
    );
  };

  const tableData = getTableData({getCheckButton});

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

  const handleClearAllFilter = () => {
    setFilters((prev) => ({ ...prev, exam: {} }));
  };

  const fetchData = () => {
    getExamResults();
  };

  useEffect(() => {
    let data = {};
    let defaultPayload = {};
    if (state && state.exam) {
      data.exam = state.exam;
      defaultPayload.exam = state.exam._id;
    }

    if(state && state.subject) {
      data.batch = {_id: state.subject.course?._id ?? state.subject.course}
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
        {isFetching && (
          <div className="absolute -top-10 right-0">
            <Loading />
          </div>
        )}
        <div className="flex items-center justify-between mb-12">
          <TableHeading title="Exam Results" />
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
