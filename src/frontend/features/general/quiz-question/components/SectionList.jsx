/* eslint-disable react/prop-types */

import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import CustomButton from "../../../../components/general/CustomButton";
import { useDisclosure } from "@nextui-org/react";
import SectionDataCreateModal from "./SectionDataCreateModal";
import { useState } from "react";
import SectionCard from "./SectionCard";
import Heading from "../../../../components/general/typography/Heading";

const SectionList = (props) => {
  const { data, removeSection, addSectionData } = props;
  const {
    isOpen: isSectionDataCreateOpen,
    onOpen: onSectionDataCreateOpen,
    onOpenChange: onSectionDataCreateOpenChange,
  } = useDisclosure();

  const [currentSelectedSection, setCurrentSelectedSection] = useState(null);

  const handleSectionDataCreateModalOpenClick = (sectionIndex) => {
    setCurrentSelectedSection(sectionIndex);
    onSectionDataCreateOpen();
  };

  return (
    <>
      <div className="space-y-3">
        {data.map((section, index) => {
          return (
            <div key={uuidv4()}>
              <div className="mb-2 border bg-gray-100 p-2 rounded-md relative flex justify-between items-center">
                <Heading className="text-xl font-bold" title={`Section ${index + 1}`} />
                <CustomButton
                  iconOnly
                  type="delete"
                  className="bg-opacity-50"
                  onClick={() => removeSection(index)}
                  title="Remove"
                />
              </div>
              <div className="h-[300px] border bg-gray-100 p-3 rounded-md relative">
                {_.isEmpty(section) ? (
                  <div>
                    <CustomButton
                      onClick={() =>
                        handleSectionDataCreateModalOpenClick(index)
                      }
                      color="primary"
                      title="Add Section Data +"
                    />
                  </div>
                ) : (
                  <SectionCard sectionData={section} />
                )}
              </div>
            </div>
          );
        })}
      </div>
      <SectionDataCreateModal
        sectionIndex={currentSelectedSection}
        isOpen={isSectionDataCreateOpen}
        onOpen={onSectionDataCreateOpen}
        onOpenChange={onSectionDataCreateOpenChange}
        addSectionData={addSectionData}
      />
    </>
  );
};

export default SectionList;
