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
import CustomButton from "../../../components/general/CustomButton"
import { showMessage } from "../../../../util/noti"
import { useLocation } from "react-router-dom"
import SubjectsDropdown from "../../subjects/components/SubjectDropdown"

const StatusDropdown = (props) => {
  const { setStatus, className } = props

  const handleStatusSelect = (value) => {
    setStatus(value)
  }

  let statuses = ['submitted', 'checked', 'published']


  return (
    <div className={`${className}`}>
      <Select
        color="primary"
        label="Status"
        placeholder="Select an status"
        defaultSelectedKeys={['submitted']}
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
  const [currentSubject, setCurrentSubject] = useState({})
  const [status, setStatus] = useState('submitted')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { state } = useLocation()

  console.log(state)

  const getCheckButton = (id) => {
    return (
      <AssignmentResultCheckModal assignmentResultId={id} successCallback={getAssignmentResults} />
    )
  }

  const tableData = getTableData({ getCheckButton })

  const getAssignmentResults = async () => {
    console.log('erherejklj')
    console.log(currentAssignment)
    setIsFetching(true)
    try {
      let res = await assignmentResultsApi.getAll({ assignment: currentAssignment._id, batch: currentBatch._id, status })
      console.log(res)
      setAssignmentResults(res)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
      setIsFetching(false)
    }
  }

  const handlePublishAll = async () => {
    if (!currentBatch._id) {
      showMessage({ message: "Please Select a batch to publish !" })
    }
    setIsSubmitting(true)
    try {
      await assignmentResultsApi.publishAll({ batch: currentBatch._id })
      await getAssignmentResults()
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClearAllFilter = () => {
    setCurrentAssignment({})
    setCurrentBatch({})
  }

  const fetchData = () => {
    getAssignmentResults()
  }

  useEffect(() => {
    getAssignmentResults()
  }, [])

  // useEffect(() => {
  //   if (state && state.assignment) {
  //     setCurrentAssignment(prev => ({ ...state.assignment }))
  //   }

  //   if (state && state.subject) {
  //     setCurrentSubject(prev => ({ ...state.subject }))
  //   }
  // }, [state])

  let content

  if (isLoading) {
    content = (<div className="h-[500px] flex justify-center items-center"><Loading /></div>)
  }

  if (!isLoading) {
    content = (<div className="relative">
      {
        isFetching && (<div className="absolute -top-10 right-0">
          <Loading />
        </div>)
      }
      <div className="flex items-center justify-between mb-12">
        <TableHeading title="Assignment Results" />
        <CustomButton onClick={() => handlePublishAll()} isLoading={isSubmitting} title="Publish All" />
      </div>
      <div className="my-3 flex items-center gap-3">
        <StatusDropdown className="shrink-0 w-[200px]" setStatus={setStatus} />
        <SubjectsDropdown className="shrink-0 w-[200px]" setCurrentSubject={setCurrentSubject} />
        {currentSubject._id && (
          <AssignmentsDropdown subject={currentSubject._id} className="shrink-0 w-[200px]" setCurrentAssignment={setCurrentAssignment} />
        )}
        <BatchesDropdown className="shrink-0 w-[200px]" setCurrentBatch={setCurrentBatch} />
        <CustomButton onClick={() => fetchData()} isLoading={isSubmitting} title="Fetch" />
      </div>
      <div className="flex gap-3 items-center my-6">
        <span>
          Filter By:
        </span>
        {<Chip>Status: {status}</Chip>}
        {
          (Object.keys(currentAssignment).length > 0 || Object.keys(currentBatch).length > 0) && (
            <>{Object.keys(currentAssignment).length > 0 && (<Chip>Assignment: {currentAssignment.title}</Chip>)}
              {Object.keys(currentBatch).length > 0 && (<Chip>Batch: {currentBatch.name}</Chip>)}
              {Object.keys(currentSubject).length > 0 && (<Chip>Subject: {currentSubject.title}</Chip>)}
              <button onClick={handleClearAllFilter} className="bg-red-700 text-white border rounded-full px-3 py-1">
                Reset
              </button>
            </>
          )
        }
      </div>
      <div>
        <div>
          <CustomTable src={assignmentResults} tableData={tableData} isStriped />
        </div>
      </div>
    </div>)
  }

  return content
}

export default AssignmentResults