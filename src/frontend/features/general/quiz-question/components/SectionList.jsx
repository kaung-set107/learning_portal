/* eslint-disable react/prop-types */

import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import CustomButton from "../../../../components/general/CustomButton";
import { useDisclosure } from "@nextui-org/react";
// import { Accordion, AccordionItem } from "@nextui-org/react";
import SectionDataCreateModal from "./SectionDataCreateModal";
import { useState } from "react";
import SectionCard from "./SectionCard";
import Heading from "../../../../components/general/typography/Heading";
import NotiInfo from "../../../../components/general/typography/NotiInfo";
import SectionDataUpdateModal from "./SectionDataUpdateModal";
import QuestionCreateModal from "../../../questions/components/QuestionCreateModal";
import ParagraphUpdateModal from "./ParagraphUpdateModal";
import { closestCorners, DragOverlay } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Droppable from "../../../../../lib/dnd-kit/components/Droppable";
import Draggable from "../../../../../lib/dnd-kit/components/Draggable";

const SectionList = (props) => {
  const {
    data,
    removeSection,
    setQuestionData,
    addSectionData,
    removeSectionData,
    removeQuestion,
    removeParagraph,
    updateParagraph,
    updateQuestions,
    updateSectionData,
    successCallback,
    srcId,
    imageUploadApi,
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

  const {
    isOpen: isParagraphUpdateOpen,
    onOpen: onParagraphUpdateOpen,
    onOpenChange: onParagraphUpdateOpenChange,
  } = useDisclosure();

  const [currentSelectedSectionIndex, setCurrentSelectedSectionIndex] =
    useState(null);
  const [currentSelectedSection, setCurrentSelectedSection] = useState({});
  const [currentSelectedParagraph, setCurrentSelectedParagraph] = useState({});

  const [draggingSectionId, setDraggingSectionId] = useState(null);

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

  const handleParagraphUpdateModalOpenClick = (sectionIndex, paragraph) => {
    setCurrentSelectedSectionIndex(sectionIndex);
    setCurrentSelectedParagraph(paragraph);
    onParagraphUpdateOpen();
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

  const getParagraphUpdateButton = (sectionIndex, paragraph) => {
    return (
      <CustomButton
        iconOnly
        type="edit"
        className="bg-opacity-50"
        onClick={() =>
          handleParagraphUpdateModalOpenClick(sectionIndex, paragraph)
        }
        title="Edit"
      />
    );
  };

  const addQuestion = (payload) => (sectionIndex) => {
    addSectionData(sectionIndex, { ...payload, sectionDataType: "questions" });
  };

  const getCurrentSectionData = (id) => {
    return data.filter((each) => each._id === id)[0];
  };

  const getActionHandlers = (index, setExpand) => {
    return (
      <div className="mb-2 border bg-white p-2 rounded-md relative flex justify-between items-center">
        <Heading className="text-xl font-bold" title={`Actions`} />
        <div className="flex items-center gap-3">
          <CustomButton
            onClick={() => setExpand((prev) => !prev)}
            color="primary"
            title="Expand / Minimize"
          />
          <QuestionCreateModal
            addQuestion={(payload) => addQuestion(payload)(index)}
          />
          <CustomButton
            onClick={() => handleSectionDataCreateModalOpenClick(index)}
            color="primary"
            title="Add Section Data +"
          />
          <CustomButton
            confirmBox
            iconOnly
            type="delete"
            className="bg-opacity-50"
            onClick={() => removeSection(index)}
            title="Remove"
          />
        </div>
      </div>
    );
  };

  const getDataPos = (id) => data.findIndex((each) => each._id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    console.log(active, over, "active and over");

    setQuestionData((prev) => {
      const originalPos = getDataPos(active.id);
      const newPos = getDataPos(over.id);

      return arrayMove(prev, originalPos, newPos);
    });
    setDraggingSectionId(null);
  };

  const handleDragStart = (event) => {
    setDraggingSectionId(event.active.id);
  };

  return (
    <>
      <div className="space-y-3">
        <Draggable
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          collisionDetection={closestCorners}
        >
          <SortableContext items={data} strategy={verticalListSortingStrategy}>
            {data.map((section, index) => {
              return (
                <Droppable className="rounded-xl border border-gray-500" key={uuidv4()} section={section}>
                  <div className="rounded-md relative">
                    {/* {getActionHandlers(index)} */}
                    {_.isEmpty(section) ? (
                      <div className="flex justify-center items-center min-h-[300px]">
                        <NotiInfo />
                      </div>
                    ) : (
                      <SectionCard
                        getActionHandlers={getActionHandlers}
                        sectionData={section}
                        removeParagraph={removeParagraph}
                        updateSectionData={updateSectionData}
                        sectionIndex={index}
                        removeSectionData={removeSectionData}
                        getSectionDataUpdateButton={getSectionDataUpdateButton}
                        getParagraphUpdateButton={getParagraphUpdateButton}
                        removeQuestion={removeQuestion}
                        updateQuestions={updateQuestions}
                        successCallback={successCallback}
                        srcId={srcId}
                        imageUploadApi={(payload) =>
                          imageUploadApi({
                            ...payload,
                            sectionIndex: index,
                          })
                        }
                      />
                    )}
                  </div>
                </Droppable>
              );
            })}
          </SortableContext>

          <DragOverlay>
            <div className="rounded-xl border border-gray-500 bg-white p-3">
              {draggingSectionId && (
                <SectionCard
                  sectionData={getCurrentSectionData(draggingSectionId)}
                  getActionHandlers={getActionHandlers}
                  removeParagraph={removeParagraph}
                  updateSectionData={updateSectionData}
                  sectionIndex={0}
                  removeSectionData={removeSectionData}
                  getSectionDataUpdateButton={getSectionDataUpdateButton}
                  getParagraphUpdateButton={getParagraphUpdateButton}
                  removeQuestion={removeQuestion}
                  updateQuestions={updateQuestions}
                  successCallback={successCallback}
                  srcId={srcId}
                  imageUploadApi={(payload) =>
                    imageUploadApi({
                      ...payload,
                      sectionIndex: 0,
                    })
                  }
                />
              )}
            </div>
          </DragOverlay>
        </Draggable>
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
      <ParagraphUpdateModal
        paragraph={currentSelectedParagraph}
        sectionIndex={currentSelectedSectionIndex}
        isOpen={isParagraphUpdateOpen}
        onOpen={onParagraphUpdateOpen}
        onOpenChange={onParagraphUpdateOpenChange}
        updateParagraph={(payload) =>
          updateParagraph(
            currentSelectedSectionIndex,
            currentSelectedParagraph.key,
            payload
          )
        }
      />
    </>
  );
};

export default SectionList;
