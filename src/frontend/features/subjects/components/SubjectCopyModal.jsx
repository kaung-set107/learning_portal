import {
  Modal,
  ModalContent,
  Button,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Input,
} from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";
import { useEffect, useState } from "react";
import CustomButton from "../../../components/general/CustomButton";
import Loading from "../../../components/general/Loading";
import { instructorsApi } from "../../instructors/api";

// eslint-disable-next-line react/prop-types
const SubjectCopyModal = ({ isOpen, onClose, handleSubmit, isSubmitting }) => {
  const [instructors, setInstructors] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructors: [],
  });

  const variant = "bordered";

  const handleMultipleSelect = (e) => {
    setFormData((prev) => ({
      ...prev,
      instructors: [...e],
    }));
  };

  const getInstructors = async () => {
    try {
      let res = await instructorsApi.getAll();
      setInstructors(res.data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInstructors();
  }, []);

  let content;

  if (instructors.length > 0) {
    content = (
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Subject Copy
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

                  <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-3 gap-4 mt-3">
                  <Select
                    label="Instructors"
                    placeholder="Select Instructor"
                    labelPlacement="outside"
                    selectionMode="multiple"
                    selectedKeys={formData.instructors}
                    onSelectionChange={handleMultipleSelect}
                    className="max-w-xs"
                  >
                    {instructors.map((each) => (
                      <SelectItem key={each._id} value={each._id}>
                        {each.name}
                      </SelectItem>
                    ))}
                  </Select>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={onClose}>
                  Close
                </Button>
                <CustomButton
                  onClick={() => handleSubmit(formData)}
                  color="primary"
                  isLoading={isSubmitting}
                  title="Create"
                />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    );
  } else {
    <Loading />;
  }

  return content;
};

export default SubjectCopyModal;
