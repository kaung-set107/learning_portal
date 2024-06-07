/* eslint-disable react/prop-types */

import { v4 as uuidv4 } from "uuid";
import CustomButton from "../../../../components/general/CustomButton";
import { useDisclosure } from "@nextui-org/react";
// import { Accordion, AccordionItem } from "@nextui-org/react";
import SectionDataCreateModal from "./SectionDataCreateModal";
import { useState } from "react";
import SectionCard from "./SectionCard";
import Heading from "../../../../components/general/typography/Heading";
import SectionDataUpdateModal from "./SectionDataUpdateModal";
import QuestionCreateModal from "../../../questions/components/QuestionCreateModal";
import ParagraphUpdateModal from "./ParagraphUpdateModal";
import { closestCorners, DragOverlay } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Sortable from "../../../../../lib/dnd-kit/components/Sortable";
import Draggable from "../../../../../lib/dnd-kit/components/Draggable";
import SectionImageUploadModal from "./SectionImageUploadModal";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { FiMinimize2 } from "react-icons/fi";
import { FiMaximize2 } from "react-icons/fi";
import { FaFile } from "react-icons/fa";
import { FaImages } from "react-icons/fa";
import { FaList } from "react-icons/fa";

const SectionList = (props) => {
  const {
    fixedQuestionTypes,
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
    uploadSectionImage,
  } = props;
  const {
    isOpen: isSectionDataCreateOpen,
    onOpen: onSectionDataCreateOpen,
    onOpenChange: onSectionDataCreateOpenChange,
  } = useDisclosure();

  const {
    isOpen: isSectionImageCreateOpen,
    onOpen: onSectionImageCreateOpen,
    onOpenChange: onSectionImageCreateOpenChange,
  } = useDisclosure();

  const {
    isOpen: isQuestionCreateOpen,
    onOpen: onQuestionCreateOpen,
    onOpenChange: onQuestionCreateOpenChange,
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
  const [sortable, setSortable] = useState(false);

  const [draggingSectionId, setDraggingSectionId] = useState(null);

  const handleSectionDataCreateModalOpenClick = (sectionIndex) => {
    setCurrentSelectedSectionIndex(sectionIndex);
    onSectionDataCreateOpen();
  };

  const handleSectionDataUpdateModalOpenClick = (
    sectionIndex,
    sectionDataType
  ) => {
    setCurrentSelectedSectionIndex(sectionIndex);
    setCurrentSelectedSection({ ...data[sectionIndex], sectionDataType });
    onSectionDataUpdateOpen();
  };

  const handleQuestionCreateModalOpenClick = (sectionIndex) => {
    setCurrentSelectedSectionIndex(sectionIndex);
    onQuestionCreateOpen();
  };

  const handleParagraphUpdateModalOpenClick = (sectionIndex, paragraph) => {
    setCurrentSelectedSectionIndex(sectionIndex);
    setCurrentSelectedParagraph(paragraph);
    onParagraphUpdateOpen();
  };

  const handleSectionImageCreateModalOpenClick = (sectionIndex) => {
    setCurrentSelectedSectionIndex(sectionIndex);
    onSectionImageCreateOpen();
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

  const getActionHandlers = (index) => {
    return (
      <div className="mb-2 border bg-white p-2 rounded-md relative flex justify-between items-center">
        <Heading className="text-xl font-bold" title={`Actions`} />
        <div className="flex items-center gap-3">
          {/* <CustomButton
            onClick={() =>
              setQuestionData((prev) => {
                let newQuestionData = [...prev];

                if (newQuestionData[index]["expanded"]) {
                  newQuestionData[index]["expanded"] =
                    !newQuestionData[index]["expanded"];
                } else {
                  newQuestionData[index]["expanded"] = true;
                }

                return newQuestionData;
              })
            }
            color="primary"
            title="Expand / Minimize"
          /> */}
          <CustomButton
            type="icon"
            onClick={() =>
              setQuestionData((prev) => {
                let newQuestionData = [...prev];

                if (newQuestionData[index]["expanded"]) {
                  newQuestionData[index]["expanded"] =
                    !newQuestionData[index]["expanded"];
                } else {
                  newQuestionData[index]["expanded"] = true;
                }

                return newQuestionData;
              })
            }
            icon={data[index].expanded ? <FiMinimize2 /> : <FiMaximize2 />}
          />
          {/* <QuestionCreateModal
            addQuestion={(payload) => addQuestion(payload)(index)}
          /> */}
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered">Add +</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem
                key="question"
                onClick={() => handleQuestionCreateModalOpenClick(index)}
                startContent={<FaFile />}
              >
                Question
              </DropdownItem>
              {data[index].status !== "new" && (
                <DropdownItem
                  key="images"
                  onClick={() => handleSectionImageCreateModalOpenClick(index)}
                  startContent={<FaImages />}
                >
                  Image
                </DropdownItem>
              )}
              <DropdownItem
                key="sectionData"
                onClick={() => handleSectionDataCreateModalOpenClick(index)}
                startContent={<FaList />}
              >
                Section Data
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
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
      <div className="mb-3">
        <CustomButton
          className={sortable ? "" : "bg-opacity-50"}
          onClick={() => setSortable((prev) => !prev)}
          title={`Sortable : ${sortable ? "on" : "off"}`}
        />
      </div>
      <div className="space-y-4">
        <Draggable
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          collisionDetection={closestCorners}
        >
          <SortableContext items={data} strategy={verticalListSortingStrategy}>
            {data.map((section, index) => {
              return (
                <Sortable
                  disabled={!sortable}
                  className="rounded-xl border border-gray-500 shadow"
                  key={uuidv4()}
                  section={section}
                >
                  <div className="rounded-md relative">
                    {/* {getActionHandlers(index)} */}
                    {/* {_.isEmpty(section) ? (
                      <div className="flex justify-center items-center min-h-[300px]">
                        <NotiInfo />
                      </div>
                    ) : ( */}
                    <SectionCard
                      fixedQuestionTypes={fixedQuestionTypes}
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
                    {/* )} */}
                  </div>
                </Sortable>
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
      <QuestionCreateModal
        isOpen={isQuestionCreateOpen}
        onOpen={onQuestionCreateOpen}
        onOpenChange={onQuestionCreateOpenChange}
        fixedQuestionTypes={fixedQuestionTypes}
        addQuestion={(payload) =>
          addQuestion(payload)(currentSelectedSectionIndex)
        }
      />
      <SectionImageUploadModal
        srcId={srcId}
        sectionIndex={currentSelectedSectionIndex}
        isOpen={isSectionImageCreateOpen}
        onOpen={onSectionImageCreateOpen}
        onOpenChange={onSectionImageCreateOpenChange}
        uploadApi={uploadSectionImage}
        successCallback={successCallback}
      />
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
