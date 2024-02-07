import { useEffect, useState } from "react";
import { Card, Button, Tooltip, Image } from "@nextui-org/react";
import apiInstance from "../../../util/api";
import QuizPhoto from "../../../assets/quiz.webp";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Student from "../../../assets/img/student.jpg";
import { getFile } from "../../../util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleLeft,
  faCircleArrowLeft,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Stack } from "@mui/material";
import moment from "moment-timezone";
import Nav from "../../home/header";
export default function Result() {
  const dataFromLocalStorage = localStorage.getItem("id");
  const navigate = useNavigate();
  const [quizResult, setQuizResult] = useState([]);
  const [quizList, setQuizList] = useState([]);
  const [quizID, setQuizID] = useState("");
  const [studentList, setStudentList] = useState([]);
  const [updatedQuestionList, setUpdatedQuestionList] = useState([]);
  // console.log(quizID, 'id')

  useEffect(() => {
    // console.log(dataFromLocalStorage, 'local')
    const getResult = async () => {
      await apiInstance.get("quiz-results").then((res) => {
        //console.log(res.data.data.filter(el => el.student === dataFromLocalStorage)[res.data.data.filter(el => el?.student === dataFromLocalStorage).length - 1].quiz, 'ID')
        setQuizID(
          res.data.data.filter((el) => el.student === dataFromLocalStorage)[
            res.data.data.filter((el) => el?.student === dataFromLocalStorage)
              .length - 1
          ].quiz
        );
        // console.log(
        //   res.data.data.filter((el) => el?.student === dataFromLocalStorage)[
        //     res.data.data.filter((el) => el?.student === dataFromLocalStorage)
        //       .length - 1
        //   ],
        //   "result"
        // );
        setQuizResult(
          res.data.data.filter((el) => el?.student === dataFromLocalStorage)[
            res.data.data.filter((el) => el?.student === dataFromLocalStorage)
              .length - 1
          ]
        );
        setUpdatedQuestionList(
          res.data.data.filter((el) => el?.student === dataFromLocalStorage)[
            res.data.data.filter((el) => el?.student === dataFromLocalStorage)
              .length - 1
          ].updatedQuestions
        );

        //   setPages(res.data._metadata.page_count)
      });
    };
    const getStudent = async () => {
      await apiInstance.get("students").then((res) => {
        setStudentList(
          res.data.data.filter((el) => el._id === dataFromLocalStorage),
          "ID"
        );
      });
    };

    const getQuizz = async () => {
      // console.log(quizID, 'iddd')
      await apiInstance.get("quizzes").then((res) => {
        //   window.location.reload()

        // console.log(res.data.data.filter(el=>el?.student === dataFromLocalStorage)[res.data.data.filter(el=>el?.student === dataFromLocalStorage).length - 1],'result')
        setQuizList(res.data.data);
        //   setPages(res.data._metadata.page_count)
      });
    };
    getQuizz();
    getStudent();
    getResult();
  }, [setQuizResult, setQuizID, setUpdatedQuestionList]);
  const handleBack = () => {
    // console.log(quizList.filter(el => el._id === quizID).map((i) => {
    //     return {
    //         lmID: i.learningMaterial
    //     }
    // })[0].lmID, 'lmis')
    const BackID = quizList
      .filter((el) => el._id === quizID)
      .map((i) => {
        return {
          lmID: i.learningMaterial,
        };
      })[0].lmID;
    navigate(`/quiz-page/${BackID}`);
  };
  console.log(quizResult, "q res");

  const dateTime = moment(quizResult.answerDate).locale("en").tz("Asia/Yangon");
  const formattedDateTime = dateTime.format("LLLL");
  return (
    <>
      <Nav />
      <div className='mx-auto mt-5 mb-5'>
        <div className='py-3 mt-3 flex flex-row gap-5'>
          <Tooltip content='Back to Quiz '>
            <div className='ml-10 rounded-md mt-3' onClick={() => handleBack()}>
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                size='2xl'
                className='text-[#2C4AE7]'
              />
            </div>
          </Tooltip>
          <div className='p-1'>
            <span className='text-[32px] font-bold text-[#131313]'>
              Batch - 6, Module 1: Introduction to IELTS
            </span>
          </div>
        </div>
        {/* Quiz With UI Design */}
        <div className='flex flex-row gap-48 pt-14'>
          {/* Left Side */}
          <div className='flex flex-col gap-10 w-[887px] h-[570px] pl-24 pt-14'>
            {/* 1 */}
            <div className='flex gap-20 w-[855px] h-[52px]'>
              <span className='text-[20px] text-[#053CFF] font-semibold w-[136px]'>
                Started On
              </span>
              <span className='text-[20px] text-[#000] font-bold'>
                {formattedDateTime?.split("GMT")[0]}
              </span>
            </div>
            {/* 2 */}
            <div className='flex gap-20 w-[855px] h-[52px]'>
              <span className='text-[20px] text-[#053CFF] font-semibold w-[136px]'>
                State
              </span>
              <span className='text-[20px] text-[#000] font-bold'>
                Finished
              </span>
            </div>
            {/* 3 */}
            <div className='flex gap-20 w-[855px] h-[52px]'>
              <span className='text-[20px] text-[#053CFF] font-semibold w-[136px]'>
                Completed on
              </span>
              <span className='text-[20px] text-[#000] font-bold'>
                Monday, 6 November 2023, 6:34 PM
              </span>
            </div>
            {/* 4 */}
            <div className='flex gap-20 w-[855px] h-[52px]'>
              <span className='text-[20px] text-[#053CFF] font-semibold w-[136px]'>
                Time taken
              </span>
              <span className='text-[20px] text-[#000] font-bold'>
                25 mins 24 secs
              </span>
            </div>
            {/* 5 */}
            <div className='flex gap-20 w-[855px] h-[52px]'>
              <span className='text-[20px] text-[#053CFF] font-semibold w-[136px]'>
                Marks
              </span>
              <span className='text-[20px] text-[#000] font-bold'>
                17.00/{" "}
                {quizList
                  .filter((el) => el._id === quizID)
                  .map((i) => i.passMark)}
              </span>
            </div>
            {/* 6 */}
            <div className='flex gap-20 w-[855px] h-[52px]'>
              <span className='text-[20px] text-[#053CFF] font-semibold w-[136px]'>
                Grade
              </span>
              <span className='text-[20px] text-[#000] font-bold'>
                5.67 out of 10.00 (57%)
              </span>
            </div>
            {/* 7 */}
            <div className='flex gap-20 w-[855px] h-[52px]'>
              <span className='text-[20px] text-[#053CFF] font-semibold w-[136px]'>
                Feedback
              </span>
              <span className='text-[20px] text-[#000] font-bold'>
                {quizResult.status}ed
              </span>
            </div>
          </div>
          {/* Right Side */}
          <div className='w-[313px] min-h-[570px] flex flex-col gap-6'>
            <div className='flex flex-col gap-10 w-[313px] h-[502px] p-[20px] border-1 border-green-400 rounded-lg '>
              <span className='flex flex-row pl-16 text-[20px] font-bold items-center'>
                Quiz Navigation
              </span>
              <div>
                {studentList.map((i) => (
                  <div className='flex gap-5 justify-start items-center'>
                    <Image
                      radius='sm'
                      alt={i.image.originalname}
                      className='w-[40px] h-[40px] rounded-[100px]'
                      src={getFile({ payload: i.image })}
                    />
                    <span>{i.name}</span>
                  </div>
                ))}
              </div>
              {/* {console.log(updatedQuestionList, "up in bod")} */}
              <div className='grid grid-cols-5 gap-3'>
                {updatedQuestionList.map((i, index) => (
                  <>
                    {JSON.parse(i.correctAnswer) ===
                    JSON.parse(i.studentAnswer) ? (
                      <div
                        className='flex flex-col  h-[45px] w-[45px] bg-[#E7F9F1] border-1 border-[#9FE7C9] rounded-lg '
                        style={{ padding: "2px 0px 26px 0px" }}
                      >
                        <span className='text-[14px] font-black text-[#000] flex justify-center items-center'>
                          {index + 1}
                        </span>

                        <span
                          className='flex justify-center items-center bg-[#10C278] text-[#fff] border-1 border-[#9FE7C9] rounded-lg text-center w-[45px] h-[25px]'
                          style={{ padding: "5px 15px 5px 10px" }}
                        >
                          <FontAwesomeIcon icon={faCheck} size='xl' />
                        </span>
                      </div>
                    ) : (
                      <div
                        className='flex flex-col  h-[45px] w-[45px] bg-[#FDE9EB] border-1 border-[#F66671] rounded-lg '
                        style={{ padding: "2px 0px 26px 0px" }}
                      >
                        <span className='text-[14px] font-black text-[#000] flex justify-center items-center'>
                          {index + 1}
                        </span>
                        <span
                          className='flex justify-center items-center bg-[#BA0220] text-[#fff] border-1 border-[#F66671] rounded-lg text-center w-[45px] h-[25px]'
                          style={{ padding: "5px 15px 5px 10px" }}
                        >
                          <FontAwesomeIcon icon={faXmark} size='xl' />
                        </span>
                      </div>
                    )}
                  </>
                ))}
              </div>
            </div>
            <div className='bg-[#BA0220] rounded-lg text-[16px] font-normal text-[#fff] pt-[10px] pr-[16px] pb-[10px] pl-[16px] flex justify-center'>
              Finish review
            </div>
          </div>
        </div>
        {/* Quiz With UI Design End */}

        {/* <div className='px-3 py-3'>
          <h2 className='font-semibold text-3xl text-center mt-3'>
            Your Quiz Result
          </h2>
          <div className='px-5 py-3 grid grid-cols-2 gap-3 mt-5'>
            <div className='col-4'>
              <img src={QuizPhoto} style={{ width: "350px" }} />
            </div>
            <div className='offset-2 col-4 font-semibold text-2xl'>
              <div className='text-center mt-20'>
                <div>
                  Your mark is{" "}
                  <b
                    className={
                      quizResult.status === "fail"
                        ? "text-red-600"
                        : "text-green-600"
                    }
                  >
                    {quizResult.totalMark}
                  </b>{" "}
                  &nbsp; Mark .<br></br>Your pass mark is &nbsp;
                  <b
                    className={
                      quizResult.status === "fail"
                        ? "text-red-600"
                        : "text-green-600"
                    }
                  >
                    {quizList
                      .filter((el) => el._id === quizID)
                      .map((i) => i.passMark)}
                  </b>{" "}
                  &nbsp; Mark .
                  {quizResult?.status === "fail" ? "Sorry" : "Nice"} , you{" "}
                  <b
                    className={
                      quizResult.status === "fail"
                        ? "text-red-600"
                        : "text-green-600"
                    }
                  >
                    {quizResult.status}ed
                  </b>
                  .
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className='py-5 px-5 ' style={{ padding: "24px 16px 24px 72px" }}>
          {/* <h2 className='font-semibold text-3xl text-center mt-3'>
            You Answered
          </h2> */}
          <div>
            {console.log(quizResult, "quest")}

            <>
              {updatedQuestionList.map((i, ind) =>
                parseInt(i.correctAnswer) === parseInt(i.studentAnswer) ? (
                  <>
                    <Card
                      className='flex justify-start mt-5 p-[24px] border-1 border-[#10C278] rounded-[12px]'
                      key={i}
                    >
                      <div>
                        <div className='text-lg py-3 px-3'>
                          <b>({ind + 1})</b> &nbsp;
                          {i.question}
                        </div>
                        <div>
                          <img src={i.questionPic} />
                        </div>
                        <div className='mt-5'>
                          {i.options.map((e, ind) => (
                            <div
                              key={i}
                              className='text-lg font-semibold ml-10'
                              onClick={() =>
                                handleAns(
                                  ind,
                                  e.correctAnswer,
                                  counter,
                                  e.mark,
                                  e._id
                                )
                              }
                            >
                              {console.log(
                                parseInt(i.studentAnswer) - 1 === ind,
                                "indd"
                              )}
                              <label>
                                <input type='radio' name='answer_group' />
                                &nbsp;
                                <span
                                  className={
                                    parseInt(i.studentAnswer) - 1 === ind
                                      ? "text-[#00C853]"
                                      : ""
                                  }
                                >
                                  {e.answer}
                                </span>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </>
                ) : (
                  <>
                    <Card
                      className='flex justify-start mt-5 p-[24px] border-1 border-[#F01D1E] rounded-[12px]'
                      key={i}
                    >
                      <div>
                        <div className='text-lg py-3 px-3'>
                          <b>({ind + 1})</b> &nbsp;
                          {i.question}
                        </div>
                        <div>
                          <img src={i.questionPic} />
                        </div>
                        <div className='mt-5'>
                          {i.options.map((e, ind) => (
                            <div
                              key={i}
                              className='text-lg font-semibold ml-10'
                              onClick={() =>
                                handleAns(
                                  ind,
                                  e.correctAnswer,
                                  counter,
                                  e.mark,
                                  e._id
                                )
                              }
                            >
                              <label>
                                <input
                                  type='radio'
                                  name='answer_group'
                                  value={e.answer}
                                />
                                &nbsp;
                                <span
                                  className={
                                    parseInt(i.studentAnswer) - 1 === ind
                                      ? "text-[red]"
                                      : ""
                                  }
                                >
                                  {e.answer}
                                </span>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </>
                )
              )}
            </>
          </div>
        </div>
      </div>
    </>
  );
}
