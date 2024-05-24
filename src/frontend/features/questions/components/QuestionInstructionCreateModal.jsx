/* eslint-disable react/prop-types */
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import CustomButton from "../../../components/general/CustomButton";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";

export default function QuestionInstructionCreateModal(props) {
  const { isOpen, onOpen, onOpenChange, questionData } = props;

  const variant = "bordered";

  const [formData, setFormData] = useState({
    title: "",
  });

  const handleSubmit = () => {
    console.log("handling");
    let payload = {
      ...formData
    }

    questionData.appendQuestionsWithIndex(payload)
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Quiz Instruction Create
              </ModalHeader>
              <ModalBody>
                <form>
                  {/* {`${isQuestionTypeInput()()}`} */}
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
                </form>
              </ModalBody>
              <ModalFooter>
                {/* <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Sign in
                                </Button> */}
                <Button color="danger" onPress={onClose}>
                  Close
                </Button>
                <CustomButton
                  onClick={() => handleSubmit(onClose)}
                  color="primary"
                  title="Create"
                />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
