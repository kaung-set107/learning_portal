import { useParams } from "react-router-dom";
import _ from "lodash";
import { faClock, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { examResultsApi } from "../api";
import { v4 as uuidv4 } from "uuid";
import { convertTo12Hour, dateForDisplay } from "../../../../util/Util";
import Loading from "../../../components/general/Loading";
import FileLoader from "../../../components/general/FileLoader";
// import apiInstance from "../../util/api";
const ExamResult = () => {
  const { id } = useParams();
  const [examResult, setExamResult] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getExamResult = async () => {
    try {
      const res = await examResultsApi.get({ _id: id });
      console.log(res);
      setExamResult(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(id);

  const getScore = () => {
    if (examResult.exam.examType === "inapp") {
      return `${examResult.quizResult?.totalMark}/${examResult.exam.quiz.totalMark}`;
    } else {
      return `${examResult?.totalMark ?? 0}/${examResult.exam?.totalMark}`;
    }
  };

  const getPercentage = () => {
    if (examResult.exam.examType === "inapp") {
      return `${Math.round(
        (examResult.quizResult.totalMark/ examResult.exam.quiz.totalMark) * 100
      )} %`;
    } else if (examResult.totalMark) {
      return `${Math.round(
        (examResult?.totalMark / examResult.exam?.totalMark) * 100
      )} %`;
    } else {
      return "0 %";
    }
  };

  useEffect(() => {
    getExamResult();
  }, []);

  let content;

  if (_.isEmpty(examResult) || isLoading) {
    content = <Loading />;
  } else {
    content = (
      <div>
        <div>
          <div className="flex flex-col gap-20 w-full mt-5">
            {/* First Section */}
            <div className="flex justify-between">
              <div className="flex gap-5">
                <span className="text-[32px] font-semibold">
                  Exam Result Details
                </span>
              </div>

              <div className="flex justify-center items-center p-6 w-[500px] h-[43px] bg-[#ECF2FF]  rounded-lg">
                <span className="text-[16px] font-semibold  text-[#3D70F5] w-[391px] h-[19px]">
                  Result Declared on 12:30 AM | 22 September 2023
                </span>
              </div>
            </div>

            {/* Second Section */}
            <div className="flex gap-10">
              {/* <div>
                          <Image src={ResData.image} className='rounded-[50%] w-[105px] h-[100px]' />
                      </div>
                      <div className='flex flex-col gap-2'>
                          <span className='text-[24px] font-semibold'>{ResData.name}</span>
                          <span className='text-[16px] font-semibold'>Student ID : {ResData.studentID}</span>
                          <span className='text-[16px] font-medium text-[#2C62EE]'><FontAwesomeIcon icon={faEye} size='sm' /> &nbsp;View Profile</span> */}
              {/* </div> */}
            </div>

            {/* Third Section */}

            <div className="flex flex-col gap-10">
              <h1 className="text-[24px] font-semibold">
                {examResult.exam.title}
              </h1>
              <p className="text-lg">{examResult.exam.description}</p>
              <div className="flex gap-2 ">
                <div className="bg-[#BB1E3F] rounded-lg p-4 w-[226px]">
                  <span className="text-[16px] font-medium text-[#fff]">
                    {examResult.batch.name}
                  </span>
                </div>
                <div className="bg-[#BB1E3F] rounded-lg p-4 w-[226px]">
                  <span className="text-[16px] font-medium text-[#fff]">
                    {" "}
                    <FontAwesomeIcon icon={faCalendarDays} />
                    &nbsp;{" "}
                    {dateForDisplay(examResult.exam.examDate, {
                      format: "D-M-Y",
                    })}
                  </span>
                </div>
                <div className="bg-[#BB1E3F] rounded-lg p-4 w-[236px]">
                  <span className="text-[16px] font-medium text-[#fff]">
                    <FontAwesomeIcon icon={faClock} size="sm" /> &nbsp;{" "}
                    {convertTo12Hour(examResult.exam.startTime)}
                  </span>
                </div>
                <div className="bg-[#BB1E3F] rounded-lg p-4 w-[226px]">
                  <span className="text-[16px] font-medium text-[#fff]">
                    <FontAwesomeIcon icon={faClock} /> &nbsp;{" "}
                    {convertTo12Hour(examResult.exam.endTime)}
                  </span>
                </div>
                <div className="border rounded-lg p-4 w-[226px]">
                  <span className="text-[16px] font-medium">
                    Status : {examResult.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Fourth Section */}
            <div className="flex flex-col gap-3">
              <span className="text-[20px] font-normal">
                Course : {examResult.exam.subject.course?.title}
              </span>
              <span className="text-[20px] font-normal">
                Subject : {examResult.exam.subject?.title}
              </span>
              {examResult.exam?.examType === "inapp" && (
                <div>
                  <span className="text-[20px] font-normal">
                    Total Questions : {examResult.exam.ExamResult}
                  </span>
                </div>
              )}
              <span className="text-[20px] font-normal">
                Credit Marks : {examResult.exam.creditMark}
              </span>
              {examResult.exam.quiz && (
                <>
                  <span className="text-[20px] font-normal">
                    Student Result Marks :{" "}
                    {examResult.quizResult?.totalMark ?? 0}
                  </span>
                  <span className="text-[20px] font-normal">
                    Passing Percentage : {getPercentage()}
                  </span>
                </>
              )}
              {!examResult.exam.quiz && (
                <>
                  <span className="text-[20px] font-normal">
                    Student Result Marks : {examResult?.totalMark ?? 0}
                  </span>
                  <span className="text-[20px] font-normal">
                    Passing Percentage : {getPercentage()}
                  </span>
                </>
              )}
            </div>

            {/* Fifth Section */}
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-5">
                <div className="flex gap-4 items-center">
                  <div className="mb-3">
                    <h3 className="text-lg font-semibold mb-3">
                      Question Paper
                    </h3>
                    <div className="bg-gray-100 flex flex-wrap gap-3 p-3 rounded-xl border">
                      {examResult.exam.assets &&
                      examResult.exam.assets.length > 0 ? (
                        examResult.exam.assets.map((asset) => {
                          return (
                            <div
                              key={uuidv4()}
                              className="inline-block bg-white p-3 rounded-xl border"
                            >
                              <FileLoader file={asset} />
                            </div>
                          );
                        })
                      ) : (
                        <span>No File!</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <span className="text-[16px] font-semibold">Answer Paper</span>
                <div className="flex gap-4 items-center">
                  <div className="bg-gray-100 flex flex-wrap gap-3 p-3 rounded-xl border">
                    {examResult.files && examResult.files?.length > 0 ? (
                      examResult.files.map((asset) => {
                        return (
                          <div
                            key={uuidv4()}
                            className="inline-block bg-white p-3 rounded-xl border"
                          >
                            <FileLoader file={asset} />
                          </div>
                        );
                      })
                    ) : (
                      <span>No File!</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <span className="text-[16px] font-semibold">Checked Files</span>
                <div className="flex gap-4 items-center">
                  <div className="bg-gray-100 flex flex-wrap gap-3 p-3 rounded-xl border">
                    {examResult.checkedFiles && examResult.checkedFiles?.length > 0 ? (
                      examResult.checkedFiles.map((asset) => {
                        return (
                          <div
                            key={uuidv4()}
                            className="inline-block bg-white p-3 rounded-xl border"
                          >
                            <FileLoader file={asset} />
                          </div>
                        );
                      })
                    ) : (
                      <span>No File!</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <span className="text-[16px] font-semibold">Your Score</span>
                <div className="flex flex-col gap-4 ">
                  <span className="border-1 rounded-lg border-green-500 w-[80px] text-center p-2 text-[green]">
                    {getScore()}
                  </span>
                  <span className="text-[16px] font-normal">
                    Your Percentage:{" "}
                    <b className="text-[green]">{getPercentage()}</b>
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-3">
              <span className="text-[16px] font-semibold">Description</span>
              <div className="text-[#0025A9] w-[1200px] h-[125px] rounded-lg p-10 bg-[#EBF0FF] text-[20px] font-semibold">
                {examResult.remark ?? "No Remark"}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return content;
};
export default ExamResult;
