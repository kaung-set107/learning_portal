/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { Select, SelectItem } from "@nextui-org/select";
import Loading from "../../../components/general/Loading"
import { assignmentsApi } from "../api";

const AssignmentsDropdown = (props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [assignments, setAssignments] = useState([])

  const { setAssignment, className, subject, ...args } = props

  const getAssignments = async () => {
    setIsLoading(true)
    try {
      let res = await assignmentsApi.getAll({subject})
      setAssignments(res)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAssignmentSelect = (id) => {
    let assignment = assignments.data.find(e => e._id == id)
    setAssignment(assignment)
  }

  useEffect(() => {
    getAssignments()
  }, [subject])

  useEffect(() => {
    getAssignments()
  }, [])

  let content

  if (isLoading) {
    content = (<Loading />)
  }

  if (!isLoading) {
    content = (<div>
      <Select
        {...args}
        items={assignments.data}
        color="primary"
        label="Assignment"
        placeholder="Select an assignment"
        className="max-w-xs"
        onSelectionChange={e => handleAssignmentSelect(e.currentKey)}
      >
        {(assignment) => (
          <SelectItem key={assignment._id} textValue={assignment.title}>
            {/* {`Subject: ${assignment?.subject?.title ?? 'Not Set!'}, Assignment: ${assignment.code ?? 'Not Set!'}`} */}
            {`Assignment: ${assignment.code ?? 'Not Set!'}`}
          </SelectItem>
        )}
      </Select>
    </div>)
  }

  return (
    <div className={`${className}`}>
      {content}
    </div>
  )
}

export default AssignmentsDropdown