import { Card, CardBody, Button, CardHeader, Image } from "@nextui-org/react";
import { Link, useLocation } from "react-router-dom";
// import {useEffect,useState} from 'react'
import Table from "./Table/learningTable";
import AssignTable from "./Table/assignTable";
import ExamTable from "./Table/examTable";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import apiInstance from "../../util/api";
import Home from "./Tabs/homeTab";
import MyprofileTab from "./Tabs/myprofileTab";
import LearningProgress from "./Tabs/learningProgress";
import TabValueComponent from "./head";
export default function AddBody() {
  const [activeTab, setActiveTab] = useState(1);
  const [effectValue, setEffectValue] = useState("");
  const handleTabClick = (tabNumber, effect) => {
    setActiveTab(tabNumber);
  };
  const location = useLocation();
  const { state } = useLocation();

  const [list, setList] = useState([]);
  // console.log(location.pathname, "lllll");
  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  const Val = location.state ? location.state.title : "English";

  return (
    <div>
      {/* body */}
      <div
        className='flex flex-col justify-start'
        style={{ padding: "24px 40px" }}
      >
        <TabValueComponent activeTabValue={handleTabClick} />

        <div id='home'>{activeTab === 1 && <Home />}</div>
        <div id='profile'>
          {activeTab === 2 && <MyprofileTab />}
        </div>
        <div>{activeTab === 3 && <LearningProgress />}</div>
      </div>
    </div>
  );
}
