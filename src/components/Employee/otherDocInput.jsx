import {
  Input,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF"];
export default function App() {
  const [file, setFile] = useState(null);

  const handleChange = (file) => {
    setFile(file);
    console.log(file,'file')
  };
  return (
    <>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Other Document
            </ModalHeader>
            <ModalBody>
              <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                <FileUploader
                  multiple={true}
                  handleChange={handleChange}
                  name="file"
                  types={fileTypes}
           
                />
                <p>
                  {file
                    ? `File name: ${file[0].name}`
                    : ""}
                </p>

                <Input
                  type="text"
                  label="Description"
                  placeholder=""
                  variant="faded"
                  className="mt-5"
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onClick={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </>
  );
}
