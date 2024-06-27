import {

    Image,

} from "@nextui-org/react";
import { Link, useLocation } from "react-router-dom";
// import {useEffect,useState} from 'react'
import Loading from '../../../assets/img/finalloading.gif'
import { faEye, faClock, faCalendarDays, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
// import apiInstance from "../../util/api";
import apiInstance from "../../../util/api";
import { getFile } from "../../../util";
import ExcelPhoto from "../../ByInstructor/images/excel.png";
import PdfPhoto from "../../ByInstructor/images/pdf.png";
import CSV from '../../../assets/img/csv.png';
import PPTX from '../../../assets/img/pptx.png';
import DOCX from '../../../assets/img/docx.png';
const ExamResult = ({ ResData, showResult, subjectData, examFile }) => {
    const [studentData, setStudentData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


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
        link.href = URL.createObjectURL(pdfUrl);
        link.download = "downloaded-file.pdf";

        // Append the link to the document
        document.body.appendChild(link);

        // Trigger a click on the link to start the download
        link.click();

        // Remove the link from the document
        document.body.removeChild(link);
    };
    const location = useLocation();
    // console.log(ResData, "body");
    const marks = ResData.quizResult && ResData.quizResult.updatedQuestionData.map((e) => (e.questions.map((h) => h.mark).reduce((acc, val) => acc + val, 0)))
    // console.log(marks, 'arr')
    const originMark = ResData.quizResult && marks.reduce((acc, val) => acc + val, 0)
    // console.log(originMark, 'asf')
    useEffect(() => {
        const getExamRes = async () => {
            await apiInstance.get('exam-results').then((res) => {
                // console.log(res.data.data, 'res')
            })
        }
        const getStudent = async () => {
            await apiInstance.get('students').then((res) => {
                // console.log(res.data.data.filter(el => el._id === ResData?.student._id), 'res')
                setStudentData(res.data.data.filter(el => el._id === ResData.student._id)[0])
            })
        }
        getStudent()
        getExamRes()

        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 3000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div>
            {/* body */}
            {ResData ?
                (isLoading ?
                    <div className='flex flex-col gap-10 items-center pt-[40px]'>
                        <Image src={Loading} className='transform-x-[-1] w-[500px]' />
                        <span className='text-[20px] font-semibold'>
                            Please wait ! We are checking your Result
                        </span>
                    </div>
                    :
                    < div className='flex flex-col gap-20 w-full h-[1500px] mt-5'>
                        {/* First Section */}
                        <div className='flex justify-between'>
                            <div className='flex gap-5'>
                                <Link to='/student'>
                                    <FontAwesomeIcon icon={faArrowLeft} size='2xl' className='mt-[0.7rem] text-[blue]' />
                                </Link>

                                <span className='text-[32px] font-semibold'>In App Exam Result Details</span>
                            </div>

                            {/* <div className='flex justify-center items-center p-6 w-[500px] h-[43px] bg-[#ECF2FF]  rounded-lg'>
                                <span className='text-[16px] font-semibold  text-[#3D70F5] w-[391px] h-[19px]'>Result Declared on 12:30 AM | 22 September 2023</span>
                            </div> */}
                        </div>

                        {/* Second Section */}
                        <div className='flex gap-10'>
                            <div>
                                <Image src={studentData.image ? getFile({ payload: studentData?.image }) : ''} className='rounded-[50%] w-[105px] h-[100px]' alt="Student Photo" />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <span className='text-[24px] font-semibold'>{studentData.name}</span>
                                <span className='text-[16px] font-semibold'>Student ID : {studentData.code} </span>
                                <span className='text-[16px] font-medium text-[#2C62EE]'><FontAwesomeIcon icon={faEye} size='sm' /> &nbsp;View Profile</span>
                            </div>
                        </div>

                        {/* Third Section */}

                        <div className='flex flex-col gap-10'>
                            <span className='text-[24px] font-semibold'>{subjectData.title} Exam</span>
                            <div className='flex gap-2 '>
                                <div className='bg-[#BB1E3F] rounded-lg p-4 w-[226px] flex justify-center items-center'>
                                    <span className='text-[16px] font-medium text-[#fff]'>{ResData.batch.name}-{ResData.batch.code}</span>
                                </div>
                                <div className='bg-[#BB1E3F] rounded-lg p-4 w-[226px] flex justify-center items-center'>
                                    <span className='text-[16px] font-medium text-[#fff]'><FontAwesomeIcon icon={faClock} size='sm' /> &nbsp;{ResData?.exam?.startTime} - {ResData?.exam?.endTime}</span>
                                </div>
                                <div className='bg-[#BB1E3F] rounded-lg p-4 w-[236px] flex justify-center items-center'>
                                    <span className='text-[16px] lg:text-[15px] font-medium text-[#fff]'><FontAwesomeIcon icon={faCalendarDays} /> &nbsp;Start Date : {ResData.exam.examDate.split('T')[0]}</span>
                                </div>
                                <div className='bg-[#BB1E3F] rounded-lg p-4 w-[226px] flex justify-center items-center'>
                                    <span className='text-[16px] lg:text-[15px] font-medium text-[#fff]'><FontAwesomeIcon icon={faCalendarDays} /> &nbsp;End Date : {ResData.submissionDate.split('T')[0]}</span>
                                </div>
                                <div className='bg-[#C1FFD6] rounded-lg p-4 w-[226px]'>
                                    <span className='text-[16px] font-medium text-[#00825B]'>Status : {ResData.quizResult && ResData.quizResult.status}</span>
                                </div>
                            </div>

                        </div>

                        {/* Fourth Section */}
                        <div className='flex flex-col gap-3'>
                            <span className='text-[20px] font-normal'>Course : {subjectData.course.title}</span>
                            <span className='text-[20px] font-normal'>Subject : {subjectData.title}</span>
                            <span className='text-[20px] font-normal'>Total Questions : {ResData?.exam?.quiz?.numOfQuestions
                            }</span>
                            <span className='text-[20px] font-normal'>Distinction Marks : {ResData?.exam?.quiz?.creditMark}</span>
                            <span className='text-[20px] font-normal'>Total Marks :{ResData.quizResult?.totalMark}</span>
                            {ResData.quizResult && (
                                <span className='text-[20px] font-normal'>Passing Persentage :    {(
                                    (((ResData.quizResult.totalMark /
                                        originMark) *
                                        100) /
                                        100) *
                                    10
                                )?.toFixed(2)}{" "}
                                    out of 10.00 (
                                    {Math.round((ResData.quizResult.totalMark /
                                        originMark) *
                                        100)}
                                    %)</span>
                            )}
                            <span className='text-[20px] font-normal'>Your Grade :{ResData.grade && ResData.grade}</span>
                        </div>

                        {/* Fifth Section */}
                        <div className='flex flex-col gap-10'>
                            <div className='flex flex-col gap-5'>
                                <span className='text-[16px] font-semibold'>Question Paper</span>
                                {ResData.exam.assets && ResData.exam?.assets.map((i, index) => (
                                    <div className="sm:flex justify-start gap-5" key={i._id}>
                                        <a
                                            href={getFile({ payload: i })}
                                            onClick={
                                                i.originalname?.split(".")[1] === "pdf"
                                                    ? () => downloadPDF(i)
                                                    : download
                                            }>
                                            <Image
                                                radius="sm"
                                                alt={i.title}
                                                className="object-cover w-[40px] h-[40px]"
                                                src={
                                                    i.originalname?.split(".")[1] === "pdf"
                                                    && PdfPhoto ||
                                                    (i.originalname?.split(".")[1] === "xlsx")
                                                    && ExcelPhoto || (i.originalname?.split(".")[1] === "csv")
                                                    && CSV || (i.originalname?.split(".")[1] === "pptx")
                                                    && PPTX || (i.originalname?.split(".")[1] === "docx")
                                                    && DOCX ||
                                                    (i.originalname?.split(".")[1] === "png" || "jpg" || "jpeg") && getFile({ payload: i })
                                                }
                                            />
                                        </a>
                                        {/* <b className="mt-3">{i.originalname?.split(".")[1] === "pdf" && "Download.pdf" || i.originalname?.split(".")[1] === "xlsx" && "Download.xlsx" || i.originalname?.split(".")[1] === "jpg" && "Download.jpg"}</b> */}
                                        <b className="mt-3">{i?.originalname?.split('.')[0]}</b>
                                    </div>
                                ))}

                            </div>
                            <div className='flex flex-col gap-5'>
                                <span className='text-[16px] font-semibold'>Answer Paper</span>
                                {(ResData.checkedFiles && ResData.checkedFiles || ResData.files && ResData.files).map((i) =>
                                    <div className="sm:flex justify-start gap-5" key={i._id}>
                                        <a
                                            href={getFile({ payload: i })}
                                            onClick={
                                                i.originalname?.split(".")[1] === "pdf"
                                                    ? () => downloadPDF(i)
                                                    : download
                                            }>
                                            <Image
                                                radius="sm"
                                                alt={i.title}
                                                className="object-cover w-[40px] h-[40px]"
                                                src={i ?
                                                    (i.originalname?.split(".")[1] === "pdf"
                                                        && PdfPhoto ||
                                                        (i.originalname?.split(".")[1] === "xlsx")
                                                        && ExcelPhoto || (i.originalname?.split(".")[1] === "csv")
                                                        && CSV || (i.originalname?.split(".")[1] === "pptx")
                                                        && PPTX || (i.originalname?.split(".")[1] === "docx")
                                                        && DOCX ||
                                                        (i.originalname?.split(".")[1] === "png" || "jpg" || "jpeg") && getFile({ payload: i }))
                                                    : ExcelPhoto
                                                }
                                            />
                                        </a>
                                        {/* <b className="mt-3">{i.originalname?.split(".")[1] === "pdf" && "Download.pdf" || i.originalname?.split(".")[1] === "xlsx" && "Download.xlsx" || i.originalname?.split(".")[1] === "jpg" && "Download.jpg"}</b> */}
                                        <b className="mt-3">{i?.originalname?.split('.')[0]}</b>
                                    </div>
                                )}

                            </div>
                            {ResData.quizResult && (
                                <div className='flex flex-col gap-5'>
                                    <span className='text-[16px] font-semibold'>Your Score</span>
                                    <div className='flex flex-col gap-4 '>
                                        <span className='border-1 rounded-lg border-green-500 w-[80px] text-center p-2 text-[green]'>{ResData.quizResult.totalMark}/{originMark}</span>
                                        <span className='text-[16px] font-normal'>Your Percentage: <b className='text-[green]'>{Math.round(ResData.quizResult.totalMark / originMark * 100)}%</b></span>
                                    </div>
                                </div>
                            )}

                        </div>

                        {/* Description */}
                        <div className='flex flex-col gap-3'>
                            <span className='text-[16px] font-semibold'>Instructor's Remark</span>
                            <div className='text-[#0025A9] w-[1200px] h-[125px] rounded-lg p-10 bg-[#EBF0FF] text-[20px] font-semibold'>{ResData?.remark}</div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <span className='text-[20px] text-red-600'>No have exam result!</span>
                    </div>
                )

            }
            <div>


            </div>
        </div >

    );
};
export default ExamResult;
