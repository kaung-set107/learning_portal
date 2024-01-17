import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const TabValueComponent = ({ activeTabValue }) => {
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
          Home &nbsp;
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
          My Profile &nbsp;
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
          Learning Progress &nbsp;
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
          Courses &nbsp;
          {/* <Badge content='9+' shape='circle' color='danger'>
              <NotificationIcon size={24} />
            </Badge> */}
        </div>
      </div>
    </div>
  );
};
export default TabValueComponent;
