import React, { useEffect, useState } from "react";
import { Tabs, Tab, Input, Button, Image, Spinner } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFireFlameCurved, faStar, faCheck, faImage, faTriangleExclamation
} from "@fortawesome/free-solid-svg-icons";
import Pic from '../../../assets/img/pic.jpg'
import Swal from "sweetalert2";
import { useLocation } from "react-router";
import { getFile } from "../../../util";
import ExcelPhoto from "../../ByInstructor/images/excel.png";
import PdfPhoto from "../../ByInstructor/images/pdf.png";
import CSV from '../../../assets/img/csv.png';
import PPTX from '../../../assets/img/pptx.png';
import DOCX from '../../../assets/img/docx.png';
import apiInstance from "../../../util/api";
import Loading from '../../../assets/img/finalloading.gif'
export default function App() {
  const variant = 'bordered'
  const location = useLocation()
  const LoginStudentID = localStorage.getItem('id')

  const assignmentList = location.state.data.assignments
  const courseId = location.state.data
  console.log(courseId, 'c')
  const enrollID = location.state.enroll_id;
  const [completeList, setCompleteList] = useState([])
  const [checkedList, setCheckedList] = useState([])
  const [image, setImage] = useState("");
  const [studentID, setStudentID] = useState('')
  const [batchID, setBatchID] = useState('')
  const timestamp = Date.now();

  // Convert the timestamp to a Date object
  const currentDate = new Date(timestamp);

  // Extract year, month, and day from the Date object
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 to month since it's zero-based
  const day = String(currentDate.getDate()).padStart(2, '0');

  // Format the date as "YYYY-MM-DD"
  const formattedDate = `${year}-${month}-${day}`;

  // console.log(assignmentList.map((i) => (i._id)), ' assign')
  // console.log(LoginStudentID, 'student id')
  const download = () => {
    const file = getFile({ payload: i });

    if (file) {
      const url = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.originalname;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

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
      apiInstance.get('enrollments').then(res => {
        console.log((res.data.data.filter(el => el.course._id === courseId)), 'hee')
        // setStudentID(res.data.data.filter(el => el.course._id === courseId)[0].student)
        setBatchID(res.data.data.filter(el => el.student === LoginStudentID) ? res.data.data.filter(el => el.student === LoginStudentID)[0]?.batch : (''))

      }




      )
    }

    const getAssignRes = async () => {
      apiInstance.get('assignment-results').then(res => {
        // console.log(studentID, 'lll ')
        // const CompleteStatusAssign = res.data.data.filter(el => el.status === "submitted")
        // const CheckedStatusAssign = res.data.data.filter(el => el.status === "checked")
        console.log(res.data.data.filter(el => el.status === "published"), 'stttututtu')

        setCompleteList(res.data.data.filter(el => el.status === "submitted").filter(el => el.student._id === studentID).filter(el => el.assignment !== null))
        setCheckedList(res.data.data.filter(el => el.status === "published").filter(el => el.student._id === LoginStudentID).filter(el => el.assignment !== null))
        console.log(res.data.data.filter(el => el.status === "published").filter(el => el.student._id === studentID).filter(el => el.assignment !== null), 'check')
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
    formData.append("student", LoginStudentID);
    formData.append("enrollment", enrollID);
    formData.append("batch", batchID);

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
          <div className='flex flex-col justify-start pt-10 w-[1560px] h-[204px] pl-10 pb-8 pr-10'>
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

                    {item.question ? (<div className="sm:flex justify-start">
                      <a
                        href={getFile({ payload: item.question })}
                        onClick={
                          item?.question.originalname?.split(".")[1] === "pdf"
                            ? () => downloadPDF(item.question)
                            : download
                        }>
                        <Image
                          radius="sm"
                          alt={item?.question.title}
                          className="object-cover w-[40px] h-[40px]"
                          src={
                            item?.question.originalname?.split(".")[1] === "pdf"
                            && PdfPhoto
                            || item?.question.originalname?.split(".")[1] === "xlsx"
                            && ExcelPhoto ||
                            item?.question.originalname?.split(".")[1] === "csv"
                            && CSV ||
                            item?.question.originalname?.split(".")[1] === "docx"
                            && DOCX ||
                            item?.question.originalname?.split(".")[1] === "pptx"
                            && PPTX ||
                            getFile({ payload: item?.question })
                          }
                        />
                        <b className="text-[16px] text-[#4b4eff] font-semibold mt-3">{item?.question.originalname}</b>
                      </a>

                    </div>) : ''}

                    {/* </>
                    ))} */}
                  </div>

                </div>
                {item?.dueDate?.split('T')[0] < formattedDate ? (
                  <div className=' shadow-warning-100 text-[20px] items-center font-medium flex gap-2 justify-center'>
                    <FontAwesomeIcon icon={faTriangleExclamation} size='2xl' className='text-[red]' />
                    <span className='mt-5 text-[white]'>The project was completed a week past its deadline. </span>
                  </div>
                ) : (
                  <>
                    <div className='flex flex-col gap-4  justify-center'>
                      <Input
                        type='file'

                        placeholder='$..'
                        variant={variant}
                        className='text-[#fff] w-96 border-indigo-500' endContent={
                          <FontAwesomeIcon icon={faImage} size='xl' />
                        }
                        labelPlacement='outside'
                        onChange={handleImage}
                      />

                      <div className='flex justify-start gap-2'>
                        <Button>Cancel</Button>

                        <Button color='primary' onClick={() => handleCreateAssignment(item._id)}>Upload</Button>


                      </div>
                    </div></>
                )}

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
          <div className='flex flex-col justify-start pt-10 w-[1560px] h-[204px] pl-10 pb-8 pr-10' >
            {completeList.map((item, index) => (

              <div className='grid grid-cols-3 bg-[#215887]   p-12  border-4 border-l-red-500 ' key={item._id}>
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

                      {/* <div className="sm:flex justify-start gap-5">
                        <a
                          href={getFile({ payload: item?.assignment.question })}
                          onClick={
                            item?.assignment.question.originalname?.split(".")[1] === "pdf"
                              ? () => downloadPDF(item?.assignment.question)
                              : download
                          }>
                          <Image
                            radius="sm"
                            alt={item?.assignment.question.title}
                            className="object-cover w-[40px] h-[40px]"
                            src={
                              item?.assignment.question.originalname?.split(".")[1] === "pdf"
                              && PdfPhoto
                              || item?.assignment.question.originalname?.split(".")[1] === "xlsx"
                              && ExcelPhoto || item?.assignment.question.originalname?.split(".")[1] === "csv"
                              && CSV || item?.assignment.question.originalname?.split(".")[1] === "pptx"
                              && PPTX || item?.assignment.question.originalname?.split(".")[1] === "docx"
                              && DOCX
                              || getFile({ payload: item?.assignment.question })
                            }
                          />
                        </a>
                        <b className="text-[16px] text-[#4b4eff] font-semibold mt-3">{item?.assignment.question?.originalname}</b>
                      </div> */}
                      {/* </>
                    ))} */}
                    </div>

                  </div>)

                }


                <div className='flex flex-col gap-4  justify-center'>

                </div>
              </div>

            ))}
          </div>
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
          {!checkedList[0] ? (
            <div className='flex flex-col gap-10 items-center pt-[40px]'>
              <Image src={Loading} className='transform-x-[-1] w-[500px]' />

            </div>

          ) : (
            <div className='flex flex-col justify-start pt-10 w-[1560px] h-[204px] pl-10 pb-8 pr-10' >
              {checkedList.map((item, index) => (

                <div className='grid grid-cols-3 bg-[#215887]   p-12  border-4 border-l-red-500 ' key={item._id}>
                  <div className='flex justify-center text-[24px] text-[#fff] font-semibold items-center'>Assignment</div>
                  {item.assignment !== null && (
                    <div className='flex flex-col gap-2 justify-start'>
                      <span className='text-[32px] text-[#fff] font-semibold'>{item?.assignment.title}</span>
                      <div className='text-[16px] text-[#fff] font-medium'>{item?.assignment.description}</div>
                      <div className='flex flex-col  gap-1'>
                        <span className='text-[16px] text-[#fff] font-semibold'>Reference link </span>
                        <div className='grid grid-cols-3'>
                          {JSON.parse(item?.assignment.links).map((e) => (


                            <div key={e} className="text-[16px] text-[#edeef4] font-semibold px-3 ">
                              <a target="_blank" rel='noreferrer' href={e.links} className='underline'>
                                {e.links}
                              </a>
                            </div>

                          ))}
                        </div>
                      </div>
                      <div className='flex flex-col'>
                        <span className='text-[16px] text-[#fff] font-semibold'>Document File link </span>
                        {/* {item.assets.map((i) => (
                          <>

                            <div className="sm:flex justify-start gap-5">
                              <a
                                href={getFile({ payload: item?.assignment?.question })}
                                onClick={
                                  item?.assignment?.question.originalname?.split(".")[1] === "pdf"
                                    ? () => downloadPDF(item?.assignment?.question)
                                    : download
                                }>
                                <Image
                                  radius="sm"
                                  alt={item?.assignment?.question.title}
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
                          </>
                        ))} */}
                      </div>

                    </div>
                  )}



                  <div className='flex flex-col gap-4 p-2 justify-start  bg-[#fff] w-[480px] h-[260px]  rounded-[4px]'>



                    <span className='text-[25px] font-semibold'>Mark - <b className='text-[30px] font-semibold text-green-400'>{item.grade}</b></span>

                    <div className='flex flex-col bg-[#ca3b3b] w-[340px] h-auto rounded-t-[32px] rounded-r-[32px] rounded-b-[32px] rounded-l-[0px] text-[12px] font-normal p-4 text-[#fff] ml-3'>
                      <b className='text-[16px]'>Teacher's Note</b>
                      <span className='text-[16px]'>
                        Oh, hello! All perfectly.
                        My remark is <b>{item.remark}</b>.
                      </span> </div>
                    <div className="sm:flex justify-end gap-2">
                      <a
                        href={getFile({ payload: item?.checkedFile })}
                        onClick={
                          item?.checkedFile.originalname?.split(".")[1] === "pdf"
                            ? () => downloadPDF(item?.checkedFile)
                            : download
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
                            && CSV || item?.checkedFile.originalname?.split(".")[1] === "docx"
                            && DOCX || item?.checkedFile.originalname?.split(".")[1] === "pptx"
                            && PPTX
                            || getFile({ payload: item?.checkedFile })
                          }
                        />
                      </a>
                      <b className="text-[16px] text-[#4b4eff] font-semibold mt-3">Feedback File</b>
                    </div>
                  </div>


                </div>

              ))}
            </div>
          )}

        </Tab >
      </Tabs >
    </div >
  );
}
