import React, { useEffect, useState } from "react";
import { Tabs, Tab, Input, Button, Image } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFireFlameCurved, faStar, faCheck, faImage
} from "@fortawesome/free-solid-svg-icons";
import Pic from '../../../assets/img/pic.jpg'
import Swal from "sweetalert2";
import { useLocation } from "react-router";
import { getFile } from "../../../util";
import ExcelPhoto from "../../ByInstructor/images/excel.png";
import PdfPhoto from "../../ByInstructor/images/pdf.png";
import CSV from '../../../assets/img/csv.png';
import apiInstance from "../../../util/api";
export default function App() {
  const variant = 'bordered'
  const location = useLocation()
  const assignmentList = location.state.data.assignments
  const courseId = location.state.data.course
  const enrollID = location.state.enroll_id;
  const [completeList, setCompleteList] = useState([])
  const [checkedList, setCheckedList] = useState([])
  const [image, setImage] = useState("");
  const [studentID, setStudentID] = useState('')
  // console.log(assignmentList.map((i) => (i._id)), ' assign')
  // console.log(assignmentList, 'student assign')
  const download = () => {
    var element = document.createElement("a");
    var file = new Blob(
      [
        "",
      ],
      { type: "image/*" }
    );
    element.href = URL.createObjectURL(file);
    element.download = "image.jpg";
    element.click();
  };
  const downloadPDF = (val) => {
    // Replace 'your-pdf-file.pdf' with the actual file path or URL
    const pdfUrl = getFile({ payload: val });

    // Create a link element
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "downloaded-file.pdf";

    // Append the link to the document
    document.body.appendChild(link);

    // Trigger a click on the link to start the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
  };

  useEffect(() => {
    const getStudentId = async () => {
      apiInstance.get('enrollments').then(res =>
        setStudentID(res.data.data.filter(el => el.course._id === courseId)[0].student)

      )
    }

    const getAssignRes = async () => {
      apiInstance.get('assignment-results').then(res => {
        console.log(studentID, 'lll ')
        const CompleteStatusAssign = res.data.data.filter(el => el.status === "submitted")
        const CheckedStatusAssign = res.data.data.filter(el => el.status === "checked")
        console.log(CheckedStatusAssign, 'stttututtu')

        setCompleteList(CompleteStatusAssign.filter(el => el.student._id === studentID).filter(el => el.assignment !== null))
        setCheckedList(CheckedStatusAssign.filter(el => el.student._id === studentID).filter(el => el.assignment !== null))
        // console.log(CheckedStatusAssign.filter(el => el.student._id === studentID).filter(el => el.assignment !== null), 'check')
      }

      )
    }
    getStudentId()
    getAssignRes()
  }, [])

  const handleImage = (e) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleCreateAssignment = (assId) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("assignment", assId);
    formData.append("submissionDate", Date.now());
    formData.append("student", studentID);
    formData.append("enrollment", enrollID);
    formData.append("batch", '65f411f1fc0365898130c59f');

    apiInstance
      .post("assignment-results", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function () {
        Swal.fire({
          icon: "success",
          title: "Uploaded Your Assignemnt Successful",
          text: "Nice!",
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
        });
        setImage(null)
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className="flex justify-center items-center w-full flex-col mb-20">
      <Tabs aria-label="Options" color="primary" variant="bordered">
        <Tab
          key="photos"
          title={
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faFireFlameCurved} size='xl' />
              <span>Pending</span>
            </div>
          }
        >
          <div className='flex flex-col pt-10 w-[1560px] h-[204px] pl-10 pb-8 pr-10'>
            {assignmentList.map((item, index) => (

              <div className='grid grid-cols-3 bg-[#215887]   p-12  border-4 border-l-red-500 ' key={item._id}>
                <div className='flex justify-center text-[24px] text-[#fff] font-semibold items-center'>Assignment</div>
                <div className='flex flex-col gap-2 justify-start'>
                  <span className='text-[32px] text-[#fff] font-semibold'>{item?.title}</span>
                  <div className='text-[16px] text-[#fff] font-medium'>{item?.description}</div>
                  <div className='flex flex-col  gap-1'>
                    <span className='text-[16px] text-[#fff] font-semibold'>Reference link </span>
                    <div className='grid grid-cols-3'>
                      {JSON.parse(item.links).map((e) => (


                        <div key={e} className="text-[16px] text-[#4b4eff] font-semibold px-3 ">
                          <a target="_blank" rel='noreferrer' href={e.links}>
                            {e.links}
                          </a>
                        </div>

                      ))}
                    </div>
                  </div>
                  <div className='flex flex-col'>
                    <span className='text-[16px] text-[#fff] font-semibold'>Document File link </span>
                    {/* {item.assets.map((i) => (
                      <> */}

                    {item.question ? (<div className="sm:flex justify-start gap-5">
                      <a
                        href={getFile({ payload: item.question })}
                        onClick={
                          item?.question.originalname?.split(".")[1] === "pdf"
                            ? () => downloadPDF(item.question)
                            : () => download()
                        }>
                        <Image
                          radius="sm"
                          alt={item?.question.title}
                          className="object-cover w-[40px] h-[40px]"
                          src={
                            item?.question.originalname?.split(".")[1] === "pdf"
                              ? PdfPhoto
                              : item?.question.originalname?.split(".")[1] === "xlsx"
                                ? ExcelPhoto
                                : getFile({ payload: item?.question })
                          }
                        />
                      </a>
                      <b className="text-[16px] text-[#4b4eff] font-semibold mt-3">{item?.question.originalname}</b>
                    </div>) : ''}

                    {/* </>
                    ))} */}
                  </div>

                </div>

                <div className='flex flex-col gap-4  justify-center'>
                  <Input
                    type='file'

                    placeholder='$..'
                    variant={variant}
                    className='text-[#fff] w-96 border-indigo-500' endContent={
                      < FontAwesomeIcon icon={faImage} size='xl' />
                    }
                    labelPlacement='outside'
                    onChange={handleImage}
                  />

                  <div className='flex justify-start gap-2'>
                    <Button>Cancel</Button>

                    <Button color='primary' onClick={() => handleCreateAssignment(item._id)}>Upload</Button>


                  </div>
                </div>
              </div>

            ))}
          </div>

        </Tab>

        <Tab
          key="com"
          title={
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faFireFlameCurved} size='xl' />
              <span>Completed</span>
            </div>
          }
        >
          {completeList.map((item, index) => (
            <div className='flex flex-col gap-5 w-[1560px] h-[204px] pt-8 pl-10 pb-8 pr-10' key={item._id}>
              <div className='grid grid-cols-3 bg-[#215887]   p-12  border-4 border-l-red-500 '>
                <div className='flex justify-center text-[24px] text-[#fff] font-semibold items-center'>Assignment</div>
                {
                  item.assignment !== null && (<div className='flex flex-col gap-2 justify-start'>
                    <span className='text-[32px] text-[#fff] font-semibold'>{item?.assignment.title}</span>
                    <div className='text-[16px] text-[#fff] font-medium'>{item?.assignment.description}</div>
                    <div className='flex flex-col  gap-1'>
                      <span className='text-[16px] text-[#fff] font-semibold'>Reference link </span>
                      <div className='grid grid-cols-3'>
                        {JSON.parse(item?.assignment.links).map((e) => (


                          <div key={e} className="text-[16px] text-[#4b4eff] font-semibold px-3 ">
                            <a target="_blank" rel='noreferrer' href={e.links}>
                              {e.links}
                            </a>
                          </div>

                        ))}
                      </div>
                    </div>
                    <div className='flex flex-col'>
                      <span className='text-[16px] text-[#fff] font-semibold'>Document File link </span>
                      {/* {item.assets.map((i) => (
                      <> */}

                      <div className="sm:flex justify-start gap-5">
                        <a
                          href={getFile({ payload: item?.assignment.question })}
                          onClick={
                            item?.assignment.question.originalname?.split(".")[1] === "pdf"
                              ? () => downloadPDF(item?.assignment.question)
                              : () => download()
                          }>
                          <Image
                            radius="sm"
                            alt={item?.assignment.question.title}
                            className="object-cover w-[40px] h-[40px]"
                            src={
                              item?.assignment.question.originalname?.split(".")[1] === "pdf"
                                ? PdfPhoto
                                : item?.assignment.question.originalname?.split(".")[1] === "xlsx"
                                  ? ExcelPhoto
                                  : getFile({ payload: item?.assignment.question })
                            }
                          />
                        </a>
                        <b className="text-[16px] text-[#4b4eff] font-semibold mt-3">{item?.assignment.question?.originalname}</b>
                      </div>
                      {/* </>
                    ))} */}
                    </div>

                  </div>)

                }


                <div className='flex flex-col gap-4  justify-center'>

                </div>
              </div>
            </div>
          ))}

        </Tab>
        <Tab
          key="videos"
          title={
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faCheck} size='xl' />
              <span>Checked</span>
            </div>
          }
        >

          {checkedList.map((item, index) => (
            <div className='flex flex-col gap-5 w-[1560px] h-[204px] pt-8 pl-10 pb-8 pr-10' key={item._id}>
              <div className='grid grid-cols-3 bg-[#215887]   p-12  border-4 border-l-red-500 '>
                <div className='flex justify-center text-[24px] text-[#fff] font-semibold items-center'>Assignment</div>
                {item.assignment !== null && (
                  <div className='flex flex-col gap-2 justify-start'>
                    <span className='text-[32px] text-[#fff] font-semibold'>{item?.assignment.title}</span>
                    <div className='text-[16px] text-[#fff] font-medium'>{item?.assignment.description}</div>
                    <div className='flex flex-col  gap-1'>
                      <span className='text-[16px] text-[#fff] font-semibold'>Reference link </span>
                      <div className='grid grid-cols-3'>
                        {JSON.parse(item?.assignment.links).map((e) => (


                          <div key={e} className="text-[16px] text-[#4b4eff] font-semibold px-3 ">
                            <a target="_blank" rel='noreferrer' href={e.links}>
                              {e.links}
                            </a>
                          </div>

                        ))}
                      </div>
                    </div>
                    <div className='flex flex-col'>
                      <span className='text-[16px] text-[#fff] font-semibold'>Document File link </span>
                      {/* {item.assets.map((i) => (
                      <> */}

                      <div className="sm:flex justify-start gap-5">
                        <a
                          href={getFile({ payload: item?.assignment.question })}
                          onClick={
                            item?.assignment.question.originalname?.split(".")[1] === "pdf"
                              ? () => downloadPDF(item?.assignment.question)
                              : () => download()
                          }>
                          <Image
                            radius="sm"
                            alt={item?.assignment.question.title}
                            className="object-cover w-[40px] h-[40px]"
                            src={
                              item?.assignment.question.originalname?.split(".")[1] === "pdf"
                              && PdfPhoto ||
                              item?.assignment.question.originalname?.split(".")[1] === "xlsx"
                              && ExcelPhoto ||
                              item?.assignment.question.originalname?.split(".")[1] === "csv"
                              && CSV
                              || getFile({ payload: item?.assignment.question })
                            }
                          />
                        </a>
                        <b className="text-[16px] text-[#4b4eff] font-semibold mt-3">{item?.assignment.question?.originalname}</b>
                      </div>
                      {/* </>
                    ))} */}
                    </div>

                  </div>
                )}



                <div className='flex flex-col gap-10 p-2 justify-start  bg-[#fff] w-[480px] h-[174px]  rounded-[4px]'>
                  <div className="sm:flex justify-start gap-5">
                    <a
                      href={getFile({ payload: item?.checkedFile })}
                      onClick={
                        item?.checkedFile.originalname?.split(".")[1] === "pdf"
                          ? () => downloadPDF(item?.checkedFile)
                          : () => download()
                      }>
                      <Image
                        radius="sm"
                        alt={item?.checkedFile.title}
                        className="object-cover w-[40px] h-[40px] border-1 border-indigo-400"
                        src={
                          item?.checkedFile.originalname?.split(".")[1] === "pdf"
                          && PdfPhoto
                          || item?.checkedFile.originalname?.split(".")[1] === "xlsx"
                          && ExcelPhoto || item?.checkedFile.originalname?.split(".")[1] === "csv"
                          && CSV
                          || getFile({ payload: item?.checkedFile })
                        }
                      />
                    </a>
                    <b className="text-[16px] text-[#4b4eff] font-semibold mt-3">Your Assignment Result</b>
                  </div>
                  <div className='bg-[red] w-[240px] h-[74px] rounded-t-[32px] rounded-r-[32px] rounded-b-[32px] rounded-l-[0px] text-[12px] font-normal p-4 text-[#fff] ml-12'>Oh, hello! All perfectly.
                    I checked it and your Grade is <b>{item.grade}</b>.My remark is <b>{item.remark}</b>. </div>
                </div>
              </div>
            </div>
          ))}

        </Tab>
      </Tabs>
    </div>
  );
}
