/* eslint-disable react/prop-types */
import { Card, CardBody } from "@nextui-org/react";
import SubHeading from "../../../components/general/typography/SubHeading";
import ListInfo from "../../../components/general/typography/ListInfo";
import ListDetail from "../../../components/general/typography/ListDetail";
import ListBox from "../../../components/general/typography/ListBox";
import { v4 as uuidv4 } from "uuid";
import FileLoader from "../../../components/general/FileLoader";

const LearningMaterialDetailCard = (props) => {
  const { data } = props;

  return (
    <div>
      <Card>
        <CardBody>
          <SubHeading title={"Detail"} className="mb-3" />
          <div className="w-1/2 space-y-3">
            <ListBox className="flex-col gap-2">
              <ListInfo className="min-w-[200px]" title="Duration" />
              <ListDetail title={data.duration} />
            </ListBox>
            <ListBox className="flex-col gap-2">
              <ListInfo className="min-w-[200px]" title="Links" />
              <div className="flex flex-col gap-3">
                {JSON.parse(data.links).map((link, lindex) => {
                  return (
                    <div className="flex items-center" key={uuidv4()}>
                      <span className="mr-3 font-bold">{lindex + 1}</span>
                      <div
                        key={uuidv4()}
                        className="p-2 inline-block bg-white rounded-xl border"
                      >
                        <ListDetail title={`${link.links}`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </ListBox>
            <ListBox className="flex-col gap-2">
              <ListInfo className="min-w-[200px]" title="Video" />
              <div>
                <div
                  className="p-2 inline-block bg-white rounded-xl border"
                >
                  <ListDetail title={JSON.parse(data.video)[0].links} />
                </div>
              </div>
            </ListBox>
            <ListBox className="flex-col gap-2">
              <ListInfo className="min-w-[200px]" title="Assets" />
              <div>
                {data.assets.map((asset) => (
                  <div
                    key={uuidv4()}
                    className="p-2 bg-white inline-block rounded-xl border"
                  >
                    <FileLoader file={asset} />
                  </div>
                ))}
              </div>
            </ListBox>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default LearningMaterialDetailCard;
