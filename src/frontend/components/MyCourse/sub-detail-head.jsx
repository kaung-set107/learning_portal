import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
// import { Link } from "@nextui-org/react";
const TabValueComponent = ({ activeTabValue, detailData }) => {
  console.log(detailData, "detail head");
  console.log(activeTabValue, "activeTabValue head");
  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
    activeTabValue(tabNumber);
  };

  return (
    <div className=''>
      <div className='justify-center grid grid-cols-4'>
        <div
          className={
            activeTab === 1
              ? "border-b-4 text-blue-800 bg-blue-100 py-3 border-indigo-500/75 w-48 text-center font-semibold duration-500"
              : "w-48 text-center font-semibold py-3"
          }
          onClick={() => handleTabClick(1)}
        >

          Module

          &nbsp;
          {/* <Badge content='9+' shape='circle' color='danger'>
              <NotificationIcon size={24} />
            </Badge> */}
        </div>
        <div
          className={
            activeTab === 2
              ? "border-b-4 text-blue-800 bg-blue-100 py-3 border-indigo-500/75 w-48 text-center font-semibold duration-500"
              : "w-48 text-center font-semibold py-3"
          }
          onClick={() => handleTabClick(2)}
        >
          <Link to={{ pathname: "/mycourse-sub-detail/2", state: detailData }}>
            Assignments
          </Link>{" "}
          &nbsp;
          {/* <Badge content='9+' shape='circle' color='danger'>
              <NotificationIcon size={24} />
            </Badge> */}
        </div>
        <div
          className={
            activeTab === 3
              ? "border-b-4 text-blue-800 bg-blue-100 py-3 border-indigo-500/75 w-48 text-center font-semibold duration-500"
              : "w-48 text-center font-semibold py-3"
          }
          onClick={() => handleTabClick(3)}
        >
          <Link to={{ pathname: "/mycourse-sub-detail/3", state: detailData }}>
            Test
          </Link>{" "}
          &nbsp;
          {/* <Badge content='9+' shape='circle' color='danger'>
              <NotificationIcon size={24} />
            </Badge> */}
        </div>
        <div
          className={
            activeTab === 4
              ? "border-b-4 text-blue-800 bg-blue-100 py-3 border-indigo-500/75 w-48 text-center font-semibold duration-500"
              : "w-48 text-center font-semibold py-3"
          }
          onClick={() => handleTabClick(4)}
        >

          Exam

          &nbsp;
          {/* <Badge content='9+' shape='circle' color='danger'>
              <NotificationIcon size={24} />
            </Badge> */}
        </div>
      </div>
    </div>
  );
};
export default TabValueComponent;
