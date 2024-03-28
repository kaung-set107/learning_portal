import { Card, CardBody, CardFooter, Image, Button, LinkIcon } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";
const TabValueComponent = ({ activeTabValue, detailData }) => {
  // console.log(detailData, "detail head");
  // console.log(activeTabValue, "activeTabValue head");
  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
    activeTabValue(tabNumber);
  };

  return (
    <div className=''>
      <div className='justify-center grid grid-cols-4'>
        <Link to='/student'>
          <div
            className={
              activeTab === 0
                ? "border-b-4 text-blue-800 bg-blue-100 py-3 border-indigo-500/75 w-48 text-center font-semibold duration-500"
                : " w-48 text-center font-semibold py-3 "
            }

          >
            &nbsp;Home
          </div>
        </Link>
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

          Assignments

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

        </div>

      </div>
    </div >
  );
};
export default TabValueComponent;
