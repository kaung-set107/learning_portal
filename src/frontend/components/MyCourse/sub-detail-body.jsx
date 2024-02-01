import { Card, CardBody, Button, CardHeader, Image } from "@nextui-org/react";
import { Link, useLocation } from "react-router-dom";
// import {useEffect,useState} from 'react'

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
// import apiInstance from "../../util/api";
import Exam from "./examTab";
import Assignment from "./assignTab";
import Module from "./moduleTab";
import TabValueComponent from "./sub-detail-head";
import Nav from "../../home/header";
const AddBody = ({ subData }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [effectValue, setEffectValue] = useState("");
  const handleTabClick = (tabNumber, effect) => {
    setActiveTab(tabNumber);
  };
  const location = useLocation();
  console.log(location.state.data, "body");

  const SubData = location.state.data;
  //   console.log(SubData, "dat");

  return (
    <div>
      {/* body */}
      <div
        className='flex flex-col justify-start'
        style={{ padding: "24px 40px" }}
      >
        <Nav />
        <TabValueComponent
          activeTabValue={handleTabClick}
          detailData={SubData}
        />

        <div id='exam'>
          {location.pathname === "/mycourse-sub-detail/1" && <Module />}
        </div>
        <div id='assignment'>
          {location.pathname === "/mycourse-sub-detail/2" && <Assignment />}
        </div>
        <div id='module'>
          {location.pathname === "/mycourse-sub-detail/3" && <Exam />}
        </div>
      </div>
    </div>
  );
};
export default AddBody;
