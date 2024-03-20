/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { Select, SelectItem } from "@nextui-org/select";
import Loading from "../../../components/general/Loading"
import { subjectsApi } from "../api";

const SubjectsDropdown = (props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [subjects, setSubjects] = useState([])

  const { setSubject, className, ...args } = props

  const getSubjects = async () => {
    try {
      let res = await subjectsApi.getAll()
      setSubjects(res)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubjectSelect = (id) => {
    let subject = subjects.data.find(e => e._id == id)
    setSubject(subject)
  }

  useEffect(() => {
    getSubjects()
  }, [])

  let content

  if (isLoading) {
    content = (<Loading />)
  }

  if (!isLoading) {
    content = (<div>
      <Select
        {...args}
        items={subjects.data}
        color="primary"
        label="Subject"
        placeholder="Select an subject"
        className="max-w-xs"
        onSelectionChange={e => handleSubjectSelect(e.currentKey)}
      >
        {(subject) => (
          <SelectItem key={subject._id} textValue={subject.title}>
            {/* {`Subject: ${subject?.subject?.title ?? 'Not Set!'}, Subject: ${subject.code ?? 'Not Set!'}`} */}
            {`Subject: ${subject.title ?? 'Not Set!'}`}
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

export default SubjectsDropdown