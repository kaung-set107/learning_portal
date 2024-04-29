/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Select, SelectItem } from "@nextui-org/select";
import Loading from "../../../components/general/Loading";
import { examsApi } from "../api";

const ExamsDropdown = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [exams, setExams] = useState([]);

  const { filters, setExam, className, subject, ...args } = props;

  const getExams = async () => {
    setIsLoading(true);
    try {
      let res = await examsApi.getAll({ subject, batch: filters.batch?._id });
      setExams(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExamSelect = (id) => {
    let exam = exams.data.find((e) => e._id == id);
    setExam(exam);
  };

  useEffect(() => {
    getExams();
  }, [subject]);

  useEffect(() => {
    getExams();
  }, []);

  let content;

  if (isLoading) {
    content = <Loading />;
  }

  if (!isLoading) {
    content = (
      <div>
        <Select
          {...args}
          items={exams.data}
          color="primary"
          label="Exam"
          selectedKeys={
            filters.exam?._id && exams.data.length > 0
              ? [filters.exam?._id]
              : []
          }
          placeholder={exams?.data?.length > 0 ? `Select an exam` : "No Exam!"}
          className="max-w-xs"
          onSelectionChange={(e) => handleExamSelect(e.currentKey)}
        >
          {(exam) => (
            <SelectItem key={exam._id} textValue={exam.title}>
              {/* {`Subject: ${exam?.subject?.title ?? 'Not Set!'}, Exam: ${exam.code ?? 'Not Set!'}`} */}
              {`Exam: ${exam.code ?? "Not Set!"}`}
            </SelectItem>
          )}
        </Select>
      </div>
    );
  }
  return <div className={`${className}`}>{content}</div>;
};

export default ExamsDropdown;
