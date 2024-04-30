import { useEffect, useState } from "react";
import { Card, Button, Tooltip, Image } from "@nextui-org/react";
import apiInstance from "../../../util/api";
import QuizPhoto from "../../../assets/quiz.webp";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getFile } from "../../../util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleLeft,
    faCircleCheck,
    faCircleArrowLeft,
    faCheck,
    faXmark,
    faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import Loading from "../../../assets/img/finalloading.gif";
import { Stack } from "@mui/material";
import moment from "moment-timezone";
import Nav from "../../home/header";
const Result = ({ data }) => {
    const dataFromLocalStorage = localStorage.getItem("id");
    const navigate = useNavigate();
    const [quizResult, setQuizResult] = useState([]);
    const [quizList, setQuizList] = useState([]);
    const [quizID, setQuizID] = useState("");
    const [studentList, setStudentList] = useState([]);
    const [updatedQuestionList, setUpdatedQuestionList] = useState([]);
    const [LMList, setLMList] = useState([]);
    const [subList, setSubList] = useState([]);
    const [quizNavigationID, setQuizNavigationID] = useState("");
    const [originMark, setOriginMark] = useState('')
    console.log(data, 'res data')

    useEffect(() => {
        // console.log(dataFromLocalStorage, 'local')

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
        const getLM = async () => {
            await apiInstance.get("learning-materials").then((res) => {
                // console.log(res.data.data, "lm");
                setLMList(res.data.data);
            });
        };
        const getSUB = async () => {
            await apiInstance.get("subjects").then((res) => {
                // console.log(res.data.data, "lm");
                setSubList(res.data.data);
            });
        };

        getSUB();
        getLM();
        getQuizz();
        getStudent();

        const getResult = async () => {
            await apiInstance.get(`quiz-results`).then((res) => {
                console.log(res.data.data, 'res quiz mul')
                setQuizID(
                    res.data.data.filter((el) => el.student?._id === dataFromLocalStorage)[
                        res.data.data.filter((el) => el?.student?.id === dataFromLocalStorage)
                            .length - 1
                    ]?.quiz
                );
                console.log(
                    res.data.data.filter((el) => el.student?._id === dataFromLocalStorage)[
                        res.data.data.filter((el) => el?.student?._id === dataFromLocalStorage)
                            .length - 1
                    ]?.quiz,
                    "result"
                );
                const timer = setTimeout(() => {
                    setQuizResult(
                        res.data.data.filter((el) => el?.student?._id === dataFromLocalStorage)[
                        res.data.data.filter((el) => el?.student?._id === dataFromLocalStorage)
                            .length - 1
                        ]
                    );
                }, 5000);

                setUpdatedQuestionList(
                    res.data.data.filter((el) => el?.student?._id === dataFromLocalStorage)[
                        res.data.data.filter((el) => el?.student?._id === dataFromLocalStorage)
                            .length - 1
                    ].updatedQuestions
                );
                const marks = res.data.data.filter((el) => el?.student?._id === dataFromLocalStorage)[
                    res.data.data.filter((el) => el?.student?._id === dataFromLocalStorage)
                        .length - 1
                ].updatedQuestions

                setOriginMark(marks.reduce((acc, val) => acc + val.mark, 0))
                return () => clearTimeout(timer);
                //   setPages(res.data._metadata.page_count)
            });
        };
        getResult();
        // return () => clearTimeout(timer);
    }, [setQuizResult, setQuizID, setUpdatedQuestionList]);

    const handleQuizNavigation = (data) => {
        // console.log(data, "navi");
        // console.log(
        //   updatedQuestionList
        //     .filter((el) => el._id === data._id)[0]
        //     ._id.slice(22, 2),
        //   "up qu"
        // );
        setQuizNavigationID(
            updatedQuestionList.filter((el) => el._id === data._id)[0]._id?.slice(-2)
        );
    };
    const handleBack = (quizId) => {

        navigate("/student");
    };
    console.log(quizResult, "q res");

    const dateTime = moment(quizResult?.answerDate).locale("en").tz("Asia/Yangon");
    const formattedDateTime = dateTime.format("LLLL");
    return (
        <>

            {quizResult?.status ? (
                <div className='mx-auto mt-5 mb-5'>
                    <div className='py-3 mt-3 flex flex-row gap-5'>
                        {/* <Tooltip content='Back to Quiz '>
                            <div
                                className='ml-10 rounded-md mt-3'
                                onClick={() => handleBack()}
                            >
                                <FontAwesomeIcon
                                    icon={faCircleArrowLeft}
                                    size='2xl'
                                    className='text-[#2C4AE7]'
                                />
                            </div>
                        </Tooltip> */}
                        <div className='pl-10'>
                            <span className='text-[20px] font-semibold text-[#131313] text-center'>
                                Batch - 6, Module 1: Introduction to IELTS
                            </span>
                        </div>
                    </div>
                    {/* Quiz With UI Design */}
                    <div className='flex flex-row gap-48 pt-5'>
                        {/* Left Side */}
                        <div className='flex flex-col gap-10 w-[907px] h-[570px] pl-24 pt-14'>
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
                                    {formattedDateTime?.split("GMT")[0]}
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
                                    {quizResult.totalMark} /{" "}
                                    {originMark}
                                </span>
                            </div>
                            {/* 6 */}
                            <div className='flex gap-20 w-[855px] h-[52px]'>
                                <span className='text-[20px] text-[#053CFF] font-semibold w-[136px]'>
                                    Grade
                                </span>
                                <span className='text-[20px] text-[#000] font-bold'>
                                    {/* 5.67 out of 10.00 (57%) */}
                                    {(
                                        (((quizResult.totalMark /
                                            originMark) *
                                            100) /
                                            100) *
                                        10
                                    )?.toFixed(2)}{" "}
                                    out of 10.00 (
                                    {Math.round((quizResult.totalMark /
                                        originMark) *
                                        100)}
                                    %)
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
                            {/* <div className='flex flex-col gap-10 w-[313px] h-[502px] p-[20px] border-1 border-green-400 rounded-lg '>
                                <span className='flex flex-row pl-16 text-[20px] font-bold items-center'>
                                    Quiz Navigation
                                </span>
                                <div>
                                    {studentList.map((i) => (
                                        <div className='flex gap-5 justify-start items-center'>
                                            {i.image && (
                                                <Image
                                                    radius='sm'
                                                    alt={i.image.originalname}
                                                    className='w-[40px] h-[40px] rounded-[100px]'
                                                    src={getFile({ payload: i.image })}
                                                />
                                            )}

                                            <span>{i.name}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className='grid grid-cols-5 gap-3'>
                                    {updatedQuestionList.map((e, index) => (
                                        <>

                                            {e.correctAnswer.map((i) => (parseInt(i))).every(item => e.studentAnswer.map((i) => (parseInt(i))).includes(item))
                                                ? (
                                                    <a
                                                        href={`#${quizNavigationID}`}
                                                        className='flex flex-col  h-[45px] w-[45px] bg-[#c6f4df] border-1 border-[#9FE7C9] rounded-lg '
                                                        style={{ padding: "2px 0px 26px 0px" }}

                                                        onClick={() => handleQuizNavigation(i)}
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
                                                    </a>
                                                ) : (
                                                    <a
                                                        href={`#${quizNavigationID}`}
                                                        className='flex flex-col  h-[45px] w-[45px] bg-[#FDE9EB] border-1 border-[#F66671] rounded-lg '
                                                        style={{ padding: "2px 0px 26px 0px" }}
                                                        onClick={() => handleQuizNavigation(e)}
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
                                                    </a>
                                                )}
                                        </>
                                    ))}
                                </div>
                            </div> */}

                        </div>
                    </div>
                    {updatedQuestionList.map((i, ind) =>
                        i.correctAnswer.map((i) => (parseInt(i))).every(item => i.studentAnswer.map((i) => (parseInt(i))).includes(item)) ? (
                            <div
                                className='py-5 px-5 '
                                style={{ padding: "24px 16px 24px 72px" }}
                                id={i._id.slice(-2)}
                            >
                                {console.log(i.studentAnswer.map((i) => (parseInt(i)))[0] - 1, 'stu')}
                                <div>
                                    <Card
                                        className='flex justify-start mt-5 p-[24px] w-[800px] border-1 border-[#10C278] rounded-[12px]'
                                        key={i}
                                    >
                                        <div>
                                            <div className='text-lg py-3 px-3'>
                                                <b>({ind + 1})</b> &nbsp;
                                                {i.question}
                                            </div>
                                            <div>
                                                {i?.images ? (<img src={getFile({ payload: i?.images[0] })} className='w-[650px] h-[450px]' />) : ('')}
                                            </div>
                                            <div className='mt-5'>
                                                {i.options.map((e, index) => (
                                                    <div
                                                        key={i}
                                                        className='text-lg font-semibold ml-10'
                                                        onClick={() =>
                                                            handleAns(
                                                                index,
                                                                e.correctAnswer,
                                                                counter,
                                                                e.mark,
                                                                e._id
                                                            )
                                                        }
                                                    >
                                                        <label>
                                                            <span
                                                                className={
                                                                    i.studentAnswer.map((i) => (parseInt(i)))[0] - 1 === index || i.studentAnswer.map((i) => (parseInt(i)))[1] - 1 === index || i.studentAnswer.map((i) => (parseInt(i)))[2] - 1 === index
                                                                        ? "text-[#00C853]"
                                                                        : "text-[#d6d3d3]"
                                                                }
                                                            >
                                                                {" "}
                                                                <FontAwesomeIcon icon={faCircleCheck} />
                                                            </span>
                                                            &nbsp;
                                                            <span
                                                                className={
                                                                    i.studentAnswer.map((i) => (parseInt(i)))[0] - 1 === index || i.studentAnswer.map((i) => (parseInt(i)))[1] - 1 === index || i.studentAnswer.map((i) => (parseInt(i)))[2] - 1 === index
                                                                        ? "text-[#00C853]"
                                                                        : "text-[#d6d3d3]"
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
                                </div>
                            </div>
                        ) : (
                            <div
                                className='py-5 px-5 '
                                style={{ padding: "24px 16px 24px 72px" }}
                            >
                                <div id={i._id.slice(-2)}>
                                    <Card
                                        className='flex justify-start mt-5 p-[24px] w-[800px] border-1 border-[#F01D1E] rounded-[12px]'
                                        key={i}
                                    >
                                        <div>
                                            <div className='text-lg py-3 px-3'>
                                                <b>({ind + 1})</b> &nbsp;
                                                {i.question}
                                            </div>
                                            <div>
                                                {i?.images ? (<img src={getFile({ payload: i?.images[0] })} className='w-[650px] h-[450px]' />) : ('')}

                                            </div>
                                            <div className='mt-5'>
                                                {i.options.map((e, index) => (
                                                    <div
                                                        key={i}
                                                        className='text-lg font-semibold ml-10'
                                                        onClick={() =>
                                                            handleAns(
                                                                index,
                                                                e.correctAnswer,
                                                                counter,
                                                                e.mark,
                                                                e._id
                                                            )
                                                        }
                                                    >
                                                        <label>
                                                            <FontAwesomeIcon
                                                                icon={faCircleXmark}
                                                                className={
                                                                    i.studentAnswer.map((i) => (parseInt(i)))[0] - 1 === index || i.studentAnswer.map((i) => (parseInt(i)))[1] - 1 === index
                                                                        ? "text-[red]"
                                                                        : "text-[#d6d3d3]"
                                                                }
                                                            />
                                                            &nbsp;
                                                            <span
                                                                className={
                                                                    i.studentAnswer.map((i) => (parseInt(i)))[0] - 1 === index || i.studentAnswer.map((i) => (parseInt(i)))[1] - 1 === index
                                                                        ? "text-[red]"
                                                                        : "text-[#d6d3d3]"
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
                                </div>
                            </div>
                        )
                    )}
                </div>
            ) : (
                <div className='flex flex-col gap-10 items-center pt-[40px]'>
                    <Image src={Loading} className='transform-x-[-1] w-[500px]' />
                    <span className='text-[20px] font-semibold'>
                        Please wait ! We are checking your Result
                    </span>
                </div>
            )}
        </>
    );
}
export default Result