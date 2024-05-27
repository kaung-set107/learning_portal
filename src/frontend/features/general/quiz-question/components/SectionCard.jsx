/* eslint-disable react/prop-types */
import CustomCard from "../../../../components/general/CustomCard";
import ListDetail from "../../../../components/general/typography/ListDetail";
import ListInfo from "../../../../components/general/typography/ListInfo";

const SectionCard = (props) => {
  const { sectionData } = props;

  return (
    <div>
      <CustomCard className="bg-white">
        <ListInfo title="Instruction" />
        <ListDetail title={sectionData.instruction} />
      </CustomCard>
    </div>
  );
};

export default SectionCard;
