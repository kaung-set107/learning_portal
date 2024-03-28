/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Select, SelectItem } from "@nextui-org/select";
import Loading from "../../../components/general/Loading";
import { subjectsApi } from "../api";
import { getCurrentUserId } from "../../../../util/Util";

const SubjectsDropdown = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);

  const { filters, setSubject, className, ...args } = props;

  const getSubjects = async () => {
    try {
      let res = await subjectsApi.getAll({ instructors: getCurrentUserId() });
      setSubjects(res);

      if(res.data.length > 0) setSubject(res.data[0])
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubjectSelect = (id) => {
    let subject = subjects.data.find((e) => e._id == id);
    setSubject(subject);
  };

  useEffect(() => {
    getSubjects();
  }, []);

  let content;

  if (isLoading) {
    content = <Loading />;
  }

  if (!isLoading && subjects.data && subjects.data.length > 0) {
    content = (
      <div>
        <Select
          {...args}
          items={subjects.data}
          selectedKeys={[filters.subject._id]}
          color="primary"
          label="Subject"
          placeholder="Select an subject"
          className="max-w-xs"
          onSelectionChange={(e) => handleSubjectSelect(e.currentKey)}
        >
          {(subject) => (
            <SelectItem key={subject._id} textValue={subject.title}>
              {/* {`Subject: ${subject?.subject?.title ?? 'Not Set!'}, Subject: ${subject.code ?? 'Not Set!'}`} */}
              {`Subject: ${subject.title ?? "Not Set!"}`}
            </SelectItem>
          )}
        </Select>
      </div>
    );
  }

  return <div className={`${className}`}>{content}</div>;
};

export default SubjectsDropdown;
