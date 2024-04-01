/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import CustomTable from "../../../components/general/CustomTable";
import TableHeading from "../../../components/general/typography/TableHeading";
import { getTableData } from "../data";
import Loading from "../../../components/general/Loading";
import { assignmentResultsApi } from "../api";
import AssignmentResultCheckModal from "../components/AssignmentResultCheckModal";
import AssignmentsDropdown from "../../assignments/components/AssignmentsDropDown";
import BatchesDropdown from "../../batches/components/BatchesDropdown";
import { Chip } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";
import CustomButton from "../../../components/general/CustomButton";
import { useLocation } from "react-router-dom";
import SubjectsDropdown from "../../subjects/components/SubjectDropdown";

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

const AssignmentResults = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(true);
  const [assignmentResults, setAssignmentResults] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filters, setFilters] = useState({
    batch: {},
    assignment: {},
    subject: {},
    status: "submitted",
  });

  const { state } = useLocation();

  console.log(state);

  const getCheckButton = (id) => {
    return (
      <AssignmentResultCheckModal
        assignmentResultId={id}
        successCallback={getAssignmentResults}
      />
    );
  };

  const tableData = getTableData({ getCheckButton });

  const getAssignmentResults = async (defaultPayload) => {
    let payload = {
      ...{
        assignment: filters.assignment._id,
        batch: filters.batch._id,
        status: filters.status,
      },
      ...defaultPayload,
    };
    setIsFetching(true);
    try {
      let res = await assignmentResultsApi.getAll(payload);
      console.log(res);
      setAssignmentResults(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsFetching(false);
    }
  };

  const handlePublishAll = async () => {
    // if (!filters.batch._id) {
    //   showMessage({ message: "Please Select a batch to publish !" })
    // }
    setIsSubmitting(true);
    try {
      await assignmentResultsApi.publishAll({ batch: filters.batch._id });
      await getAssignmentResults();
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearAllFilter = () => {
    setFilters((prev) => ({ ...prev, assignment: {}, batch: {} }));
  };

  const fetchData = () => {
    getAssignmentResults();
  };

  useEffect(() => {
    let data = {};
    let defaultPayload = {};
    if (state && state.assignment) {
      data.assignment = state.assignment;
      defaultPayload.assignment = state.assignment._id;
    }

    if (state && state.subject) {
      data.subject = state.subject;
      defaultPayload.subject = state.subject._id;
    }

    let newFilters = { ...filters, ...data };

    setFilters(newFilters);

    getAssignmentResults({ ...filters, ...defaultPayload });
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
          <TableHeading title="Assignment Results" />
          <CustomButton
            isDisabled={!(filters.batch?._id && filters.assignment?._id)}
            onClick={() => handlePublishAll()}
            isLoading={isSubmitting}
            title="Publish All"
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
            className="shrink-0 w-[200px]"
            filters={filters}
            setSubject={(value) =>
              setFilters((prev) => ({ ...prev, subject: value }))
            }
          />
          {filters.subject._id && (
            <BatchesDropdown
              className="shrink-0 w-[200px]"
              filters={filters}
              setBatch={(value) =>
                setFilters((prev) => ({ ...prev, batch: value }))
              }
            />
          )}
          {filters.subject._id && (
            <AssignmentsDropdown
              subject={filters.subject._id}
              className="shrink-0 w-[200px]"
              filters={filters}
              setAssignment={(value) =>
                setFilters((prev) => ({ ...prev, assignment: value }))
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
              {Object.keys(filters.assignment).length > 0 && (
                <Chip>Assignment: {filters.assignment.title}</Chip>
              )}
              {Object.keys(filters.batch).length > 0 && (
                <Chip>Batch: {filters.batch.name}</Chip>
              )}
              {Object.keys(filters.subject).length > 0 && (
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
              src={assignmentResults}
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

export default AssignmentResults;
