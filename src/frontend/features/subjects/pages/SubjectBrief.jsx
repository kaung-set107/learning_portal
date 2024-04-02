import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { subjectsApi } from "../api";
import Loading from "../../../components/general/Loading";
import Heading from "../../../components/general/typography/Heading";
import SubHeading from "../../../components/general/typography/SubHeading";
import CustomButton from "../../../components/general/CustomButton";
import AssignmentCreateModal from "../../assignments/components/AssignmentCreateModal";
import AssignmentUpdateModal from "../../assignments/components/AssignmentUpdateModal";
import { assignmentsApi } from "../../assignments/api";
import { v4 as uuidv4 } from "uuid";
import FileLoader from "../../../components/general/FileLoader";
import SubjectSectionCreateModal from "../../subject-sections/components/SubjectSectionCreateModal";
import CardTitle from "../../../components/general/typography/CardTitle";
import { Tabs, Tab, Chip } from "@nextui-org/react";
import SubjectSectionUpdateModal from "../../subject-sections/components/SubjectSectionUpdateModal";
import { subjectSectionsApi } from "../../subject-sections/api";
import { showError, showSuccess } from "../../../../util/noti";
import { dateForDisplay } from "../../../../util/Util";
import ExamCreateModal from "../../exams/component/ExamCreateModal";

const SubjectBrief = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [subject, setSubject] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const TabOptions = [
    { key: "assignment", title: "Assignment" },
    { key: "subject-sections", title: "Subject Sections" },
    // { key: "exam", title: "Exam" },
  ];

  const getSubject = async () => {
    try {
      const res = await subjectsApi.get({ _id: id });
      console.log(res);
      setSubject(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const goToResult = (data) => {
    navigate("/by-instructor/assignment-results", {
      state: { assignment: data, subject: subject.data },
    });
  };

  const goToLearningMaterials = (data) => {
    navigate("/by-instructor/learning-materials", {
      state: { subjectSection: data.subjectSection, subject: subject.data },
    });
  };

  const handleAssignmentDelete = async (id) => {
    try {
      setIsSubmitting(true);
      let res = await assignmentsApi.remove({ _id: id });
      await getSubject();
      showSuccess({ text: res.message, type: "noti-box" });
      setIsSubmitting(false);
      console.log(res);
    } catch (error) {
      console.log(error);
      showError({ axiosResponse: error });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubjectSectionDelete = async (id) => {
    try {
      setIsSubmitting(true);
      let res = await subjectSectionsApi.remove({ _id: id });
      await getSubject();
      setIsSubmitting(false);
      console.log(res);
      alert("subject section is deleted!");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    getSubject();
  }, []);

  let content;

  if (isLoading) {
    content = (
      <div className="h-[500px] flex justify-center items-center">
        <Loading />
      </div>
    );
  } else {
    content = (
      <>
        <div>
          <Heading title={subject.data.title} className="mb-3" />
          <p className="mb-3">{subject.data.description}</p>
          <div className="space-y-6">
            <Tabs aria-label="Options">
              <Tab key={TabOptions[0].key} title={TabOptions[0].title}>
                <div>
                  <div className="flex items-center justify-between pb-3">
                    <SubHeading title="Assignments" className="mb-3" />
                    <AssignmentCreateModal
                      subjectId={id}
                      successCallback={getSubject}
                    />
                  </div>
                  <div>
                    <div>
                      {subject.data.assignments.map((assignment) => {
                        return (
                          <div
                            key={assignment._id}
                            className="p-3 border rounded-xl mb-3 relative"
                          >
                            <div className="flex gap-3 absolute right-2 top-2">
                              <CustomButton
                                size="sm"
                                onClick={() => goToResult(assignment)}
                                isLoading={isSubmitting}
                                title="Results"
                              />
                              <AssignmentUpdateModal
                                subjectId={id}
                                assignmentData={assignment}
                                successCallback={getSubject}
                              />
                              <CustomButton
                                iconOnly
                                type="delete"
                                size="sm"
                                onClick={() =>
                                  handleAssignmentDelete(assignment._id)
                                }
                                isLoading={isSubmitting}
                                title="Delete"
                              />
                            </div>
                            <h3 className="font-bold text-lg capitalize mb-3">
                              {assignment.title}
                            </h3>
                            <Chip className="mb-3 font-semibold">
                              Due Date: {dateForDisplay(assignment.dueDate)}
                            </Chip>
                            <p className="mb-3">{assignment.description}</p>
                            <div className="mb-3">
                              <h3 className="text-lg font-semibold mb-3">
                                Question
                              </h3>
                              <div className="bg-gray-100 p-3 rounded-xl border">
                                {assignment.question ? (
                                  <FileLoader file={assignment.question} />
                                ) : (
                                  <span>No File!</span>
                                )}
                              </div>
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold">Links</h3>
                              <ul>
                                {assignment.links &&
                                  JSON.parse(assignment.links).map((link) => {
                                    return (
                                      <a
                                        href={link.links}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="block underline text-blue-600"
                                        key={uuidv4()}
                                      >
                                        {link.links}
                                      </a>
                                    );
                                  })}
                              </ul>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab key={TabOptions[1].key} title={TabOptions[1].title}>
                <div>
                  <div className="flex items-center justify-between pb-3">
                    <SubHeading title="Subject Sections" className="mb-3" />
                    <SubjectSectionCreateModal
                      subjectId={id}
                      successCallback={getSubject}
                    />
                  </div>
                  <div>
                    {subject.data.subjectSections.map((section) => {
                      return (
                        <div
                          key={section._id}
                          className="p-3 border rounded-xl mb-3 relative"
                        >
                          <div className="flex gap-3 absolute right-2 top-2">
                            <CustomButton
                              onClick={() =>
                                goToLearningMaterials({
                                  subjectSection: section,
                                })
                              }
                              color="primary"
                              title="Learning Materials"
                            />
                            <SubjectSectionUpdateModal
                              subjectId={id}
                              subjectSectionData={section}
                              successCallback={getSubject}
                            />
                            <CustomButton
                              onClick={() =>
                                handleSubjectSectionDelete(section._id)
                              }
                              color="danger"
                              isLoading={isSubmitting}
                              title="Delete"
                            />
                          </div>
                          <CardTitle title={section.title} />
                          <p>{section.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Tab>
              {/* <Tab key={TabOptions[2].key} title={TabOptions[2].title}>
                <div>
                  <div className="flex items-center justify-between pb-3">
                    <SubHeading title="Exams" className="mb-3" />
                    <ExamCreateModal
                      subjectId={id}
                      successCallback={getSubject}
                    />
                  </div>
                  <div>
                    {subject.data.exams.map((section) => {
                      return (
                        <div
                          key={section._id}
                          className="p-3 border rounded-xl mb-3 relative"
                        >
                          <div className="flex gap-3 absolute right-2 top-2">
                          </div>
                          <CardTitle title={section.title} />
                          <p>{section.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Tab> */}
            </Tabs>
          </div>
        </div>
      </>
    );
  }

  return content;
};

export default SubjectBrief;
