/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Button, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { examsApi } from "../api";
import CustomButton from "../../../components/general/CustomButton";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { v4 as uuidv4 } from "uuid";
import Loading from "../../../components/general/Loading";
import { dateForInput } from "../../../../util/Util";
import FileLoader from "../../../components/general/FileLoader";
import { showError, showSuccess } from "../../../../util/noti";
import { Checkbox } from "@nextui-org/react";
import CustomFileDrag from "../../../components/general/CustomFileDrag";

export default function ExamUpdateModal(props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  let { subjectId, examData, examId, successCallback } = props;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [link, setLink] = useState("");
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [exam, setExam] = useState({});
  const [showToStudent, setShowToStudent] = useState(false);

  const variant = "bordered";

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: subjectId,
    examDate: "",
  });

  const handleSubmit = async (onClose) => {
    try {
      setIsSubmitting(true);
      let payload = {
        ...formData,
        _id: exam.data._id,
        links: JSON.stringify(links),
        showToStudent,
      };
      if (formData.newQuestion) {
        payload.question = formData.newQuestion;
      }
      delete payload.newQuestion;
      console.log(payload);
      let res = await examsApi.update(payload);
      showSuccess({ text: res.message, type: "noti-box" });
      successCallback();
      onClose();
    } catch (error) {
      console.log(error);
      showError({ axiosResponse: error });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAssetChange = (value) => {
    setFormData((prev) => ({ ...prev, assets: Array.from(value) }));
  };

  const fillData = () => {
    setFormData({
      title: exam.data.title,
      description: exam.data.description,
      subject: subjectId,
      question: exam.data?.question ?? "",
      // links: '[{"links":"www.google.com"},{"links":"www.msi.com"},{"links":"www.msiedu.com"}]',
      examDate: exam.data.examDate,
    });

    setLinks(JSON.parse(exam.data.links));
    setShowToStudent(exam.data.showToStudent);
  };

  const getExam = async () => {
    if (examData) {
      setExam({ data: examData });
    } else if (!examData && examId) {
      try {
        let res = await examsApi.get({ _id: examId });
        setExam(res);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    getExam();
  }, [examData, examId, isOpen]);

  useEffect(() => {
    if (exam.data) fillData();
  }, [exam]);

  useEffect(() => {
    if (isLoading) {
      if (formData && links) setIsLoading(false);
    }
  }, [formData, links]);

  let content;

  if (isLoading) {
    content = <Loading />;
  } else {
    content = (
      <>
        <CustomButton
          onPress={onOpen}
          type="edit"
          iconOnly
          size="sm"
          title="Update"
        />
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          scrollBehavior="inside"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Exam Update
                </ModalHeader>
                <ModalBody>
                  <form>
                    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-3 gap-4 mt-3">
                      <Input
                        type="text"
                        label="Title"
                        placeholder="title"
                        variant={variant}
                        value={formData.title}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        labelPlacement="outside"
                      />
                    </div>

                    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-3 gap-4 mt-3">
                      <Input
                        type="text"
                        label="Description"
                        placeholder="description"
                        variant={variant}
                        value={formData.description}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        labelPlacement="outside"
                      />
                    </div>
                    <div className="mb-3">
                      <h3 className="mb-3">Previous Assets</h3>
                      <div className="bg-gray-100 p-3 rounded-xl border">
                        {formData.assets && (
                          <FileLoader file={formData.assets} />
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col w-full flex-wrap md:flex-nowrap mb-6 md:mb-3 gap-2">
                      <label htmlFor="assets">Assets</label>
                      <CustomFileDrag
                        id="assets"
                        handleChange={handleAssetChange}
                        multiple
                        name="assets"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="examDate" className="pb-1 inline-block">
                        ExamDate
                      </label>
                      <Input
                        id="examDate"
                        type="date"
                        value={dateForInput(formData.examDate)}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            examDate: e.target.value,
                          }))
                        }
                        labelPlacement="outside"
                        variant={variant}
                      />
                    </div>

                    <div className="flex w-full items-end flex-wrap md:flex-nowrap mb-6 md:mb-3 gap-4 mt-3">
                      <Input
                        type="text"
                        label="Add link"
                        placeholder="add link"
                        variant={variant}
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        labelPlacement="outside"
                      />
                      {/* <Bu type="button" onClick={() => setLinks(prev => ([...prev, { links: link }]))}>
                                        Add
                                    </Bu> */}
                      <CustomButton
                        onClick={() =>
                          setLinks((prev) => [...prev, { links: link }])
                        }
                        color="primary"
                        title="Add"
                      />
                    </div>
                    <div className="rounded-xl border space-y-2 p-3 mb-3">
                      <h3 className="font-bold mb-3">Links</h3>
                      {links.map((each, index) => {
                        return (
                          <div
                            className="gap-3 rounded-xl flex items-center justify-between"
                            key={uuidv4()}
                          >
                            <span className="bg-white px-3 py-1 rounded-xl border w-full">
                              {each.links}
                            </span>
                            <span
                              onClick={() =>
                                setLinks((prev) => [
                                  ...prev.filter(
                                    (each, linkIndex) => index !== linkIndex
                                  ),
                                ])
                              }
                              className="font-bold text-red-800"
                            >
                              X
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <Checkbox
                      isSelected={showToStudent}
                      onValueChange={setShowToStudent}
                    >
                      Show to student?
                    </Checkbox>
                  </form>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" onPress={onClose}>
                    Close
                  </Button>
                  <CustomButton
                    onClick={() => handleSubmit(onClose)}
                    color="primary"
                    isLoading={isSubmitting}
                    title="Update"
                  />
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }

  return content;
}
