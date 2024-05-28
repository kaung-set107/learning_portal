/* eslint-disable react/prop-types */

import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import CustomButton from "../../../../components/general/CustomButton";
import { useDisclosure } from "@nextui-org/react";
import SectionDataCreateModal from "./SectionDataCreateModal";
import { useState } from "react";
import SectionCard from "./SectionCard";
import Heading from "../../../../components/general/typography/Heading";
import NotiInfo from "../../../../components/general/typography/NotiInfo";
import SectionDataUpdateModal from "./SectionDataUpdateModal";
import QuestionCreateModal from "../../../questions/components/QuestionCreateModal";

const SectionList = (props) => {
  const {
    data,
    removeSection,
    addSectionData,
    removeSectionData,
    removeQuestion,
    removeParagraph,
    updateQuestions,
    updateSectionData,
  } = props;
  const {
    isOpen: isSectionDataCreateOpen,
    onOpen: onSectionDataCreateOpen,
    onOpenChange: onSectionDataCreateOpenChange,
  } = useDisclosure();

  const {
    isOpen: isSectionDataUpdateOpen,
    onOpen: onSectionDataUpdateOpen,
    onOpenChange: onSectionDataUpdateOpenChange,
  } = useDisclosure();

  const [currentSelectedSectionIndex, setCurrentSelectedSectionIndex] =
    useState(null);
  const [currentSelectedSection, setCurrentSelectedSection] = useState({});

  const handleSectionDataCreateModalOpenClick = (sectionIndex) => {
    setCurrentSelectedSectionIndex(sectionIndex);
    onSectionDataCreateOpen();
  };

  const handleSectionDataUpdateModalOpenClick = (
    sectionIndex,
    sectionDataType
  ) => {
    setCurrentSelectedSection({ ...data[sectionIndex], sectionDataType });
    onSectionDataUpdateOpen();
  };

  const getSectionDataUpdateButton = (sectionIndex, sectionDataType) => {
    return (
      <CustomButton
        iconOnly
        type="edit"
        className="bg-opacity-50"
        onClick={() =>
          handleSectionDataUpdateModalOpenClick(sectionIndex, sectionDataType)
        }
        title="Edit"
      />
    );
  };

  const addQuestion = (payload) => (sectionIndex) => {
    addSectionData(sectionIndex, { ...payload, sectionDataType: "questions" });
  };

  return (
    <>
      <div className="space-y-3">
        {data.map((section, index) => {
          return (
            <div key={uuidv4()}>
              <div className="mb-2 border bg-gray-100 p-2 rounded-md relative flex justify-between items-center">
                <Heading
                  className="text-xl font-bold"
                  title={`Section ${index + 1}`}
                />
                <div className="flex items-center gap-3">
                  <QuestionCreateModal
                    addQuestion={(payload) => addQuestion(payload)(index)}
                  />
                  <CustomButton
                    onClick={() => handleSectionDataCreateModalOpenClick(index)}
                    color="primary"
                    title="Add Section Data +"
                  />
                  <CustomButton
                    iconOnly
                    type="delete"
                    className="bg-opacity-50"
                    onClick={() => removeSection(index)}
                    title="Remove"
                  />
                </div>
              </div>
              <div className="border bg-gray-100 p-3 rounded-md relative">
                {_.isEmpty(section) ? (
                  <div className="flex justify-center items-center min-h-[300px]">
                    <NotiInfo />
                  </div>
                ) : (
                  <SectionCard
                    sectionData={section}
                    removeParagraph={removeParagraph}
                    updateSectionData={updateSectionData}
                    sectionIndex={index}
                    removeSectionData={removeSectionData}
                    getSectionDataUpdateButton={getSectionDataUpdateButton}
                    removeQuestion={removeQuestion}
                    updateQuestions={updateQuestions}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
      <SectionDataCreateModal
        sectionIndex={currentSelectedSectionIndex}
        isOpen={isSectionDataCreateOpen}
        onOpen={onSectionDataCreateOpen}
        onOpenChange={onSectionDataCreateOpenChange}
        addSectionData={addSectionData}
      />
      <SectionDataUpdateModal
        sectionData={currentSelectedSection}
        sectionIndex={currentSelectedSectionIndex}
        isOpen={isSectionDataUpdateOpen}
        onOpen={onSectionDataUpdateOpen}
        onOpenChange={onSectionDataUpdateOpenChange}
        updateSectionData={updateSectionData}
      />
    </>
  );
};

export default SectionList;
