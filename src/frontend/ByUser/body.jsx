import { Card, CardBody, Button, CardHeader } from "@nextui-org/react";
import { Link, useLocation } from "react-router-dom";
// import {useEffect,useState} from 'react'
import Table from "./Table/learningTable";
import AssignTable from "./Table/assignTable";
import ExamTable from "./Table/examTable";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import apiInstance from "../../util/api";
export default function AddBody() {
  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  const location = useLocation();
  const { state } = useLocation();
  const [coursesList, setCoursesList] = useState([]);
  const [list, setList] = useState([]);
  // console.log(useLocation().state.rol,'lllll')

  const Val = location.state ? location.state.title : "English";
  //    const [dataValue,setDataValue]=useState('English')
  useEffect(() => {
    const getAssign = async () => {
      await apiInstance.get(`courses`).then((res) => {
        console.log(res.data.data, "exam res");
        setCoursesList(res.data.data);
        // setPages(res.data._metadata.page_count);
      });
    };
    const subject = async () => {
      await apiInstance.get(`subjects`).then((res) => {
        console.log(
          res.data.data.filter((el) => el._id === state.val),
          "sub"
        );
        setList(
          res.data.data.filter(
            (el) =>
              el._id === (state.val ? state.val : "6541db4ceef974bf5476db1e")
          )
        );
      });
    };

    subject();
    getAssign();
  }, []);

  return (
    <div>
      {/* body */}
      <div
        className='flex flex-col justify-start'
        style={{ padding: "24px 40px" }}
      >
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
        <div></div>
      </div>

      <div className='block'>
        {coursesList.map((item, index) => (
          <div className=''>
            <div style={{ padding: "32px 40px" }}>
              <div
                style={{
                  color: "#000",
                  fontSize: "40px",
                  fontWeight: "600px",
                  wordSpacing: "-1.6px",
                }}
              >
                {item?.title} Courses
              </div>
              <div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
