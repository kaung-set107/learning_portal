/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import CustomTable from "../../../components/general/CustomTable"
import TableHeading from "../../../components/general/typography/TableHeading"
import { getTableData } from "../data"
import Loading from "../../../components/general/Loading"
import { assignmentResultsApi } from "../api"
import AssignmentResultCheckModal from "../components/AssignmentResultCheckModal"
import AssignmentsDropdown from "../../assignments/components/AssignmentsDropDown"
import BatchesDropdown from "../../batches/components/BatchesDropdown"
import { Chip } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";
import { v4 as uuidv4 } from "uuid"

const StatusDropdown = (props) => {
  const { setStatus, className } = props

  const handleStatusSelect = (value) => {
    setStatus(value)
  }

  let statuses = ['submitted', 'checked']


  return (
    <div className={`${className}`}>
      <Select
        color="primary"
        label="Status"
        placeholder="Select an status"
        className="max-w-xs"
        onChange={e => handleStatusSelect(e.target.value)}
      >
        {statuses.map(each => {
          return (
            <SelectItem key={each} value={each}>
              {each}
            </SelectItem>
          )
        })
      }         
      </Select>
    </div>
  )
}

const AssignmentResults = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isFetching, setIsFetching] = useState(true)
  const [assignmentResults, setAssignmentResults] = useState([])
  const [currentAssignment, setCurrentAssignment] = useState({})
  const [currentBatch, setCurrentBatch] = useState({})
  const [status, setStatus] = useState('submitted')

  const getCheckButton = (id) => {
    return (
      <AssignmentResultCheckModal assignmentResultId={id} successCallback={getAssignmentResults} />
    )
  }

  const tableData = getTableData({ getCheckButton })

  const getAssignmentResults = async () => {
    setIsFetching(true)
    try {
      let res = await assignmentResultsApi.getAll({ assignment: currentAssignment._id, batch: currentBatch._id, status })
      setAssignmentResults(res)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
      setIsFetching(false)
    }
  }

  const handleClearAllFilter = () => {
    setCurrentAssignment({})
    setCurrentBatch({})
  }

  useEffect(() => {
    getAssignmentResults()
  }, [currentAssignment, currentBatch, status])

  useEffect(() => {
    getAssignmentResults()
  }, [])

  let content

  if (isLoading) {
    content = (<div className="h-[500px] flex justify-center items-center"><Loading /></div>)
  }

  if (!isLoading) {
    content = (<div className="relative">
      {
        isFetching && (<div className="absolute right-0">
          <Loading />
        </div>)
      }
      <TableHeading title="Assignment Results" className="mb-12" />
      <div className="my-3 flex items-center gap-3">
        <StatusDropdown className="shrink-0 w-[200px]" setStatus={setStatus} />
        <AssignmentsDropdown className="shrink-0 w-[200px]" setCurrentAssignment={setCurrentAssignment} />
        <BatchesDropdown className="shrink-0 w-[200px]" setCurrentBatch={setCurrentBatch} />
      </div>
      {
        (Object.keys(currentAssignment).length > 0 || Object.keys(currentBatch).length > 0) && (
          <div className="flex gap-3 items-center my-6">
            <span>
              Filter By:
            </span>
            {Object.keys(currentAssignment).length > 0 && (<Chip>Assignment: {currentAssignment.title}</Chip>)}
            {Object.keys(currentBatch).length > 0 && (<Chip>Batch: {currentBatch.name}</Chip>)}
            <button onClick={handleClearAllFilter} className="bg-red-700 text-white border rounded-full px-3 py-1">
              Clear All
            </button>
          </div>
        )
      }
      <div>
        <div>
          <CustomTable src={assignmentResults} tableData={tableData} />
        </div>
      </div>
    </div>)
  }

  return content
}

export default AssignmentResults