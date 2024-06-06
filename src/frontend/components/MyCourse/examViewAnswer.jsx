import {
    Card,
    CardBody,
    Button,
    CardHeader,
    Image,
    Spinner,
    Divider,
    Textarea,
    ScrollShadow,
    Progress,
    RadioGroup, Radio,
    input,
    Input
} from "@nextui-org/react";
import apiInstance from "../../../util/api";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import {useEffect,useState} from 'react'
import ExamOriginalPage from './examTab'
import { faEye, faClock, faCalendarDays, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useState } from "react";
// import apiInstance from "../../util/api";
import ExamTestData from "./examTestData";
// import Assignment from "./assignTab";
// import Module from "./moduleTab";
// import TabValueComponent from "./sub-detail-head";
import MSINAV from "../../home/header";
// import PF from '../../../assets/img/pf.png'
// import QP from '../../../assets/img/qp.png'
import { convertSecondsToMinutes } from '../../../util/timer'
import Placement from '../../../assets/img/placementGIF.gif'
import EHome from '../../../assets/img/EllipseHome.png'
import EHalf from '../../../assets/img/EllipseHalf.png'
import Swal from "sweetalert2";
const ExamPage = ({ ViewData }) => {
    const location = useLocation();

    console.log(ViewData.updatedQuestionData.map((i) => (i.questions.map((e) => (e.type === 'fillInTheBlank' ? e.studentAnswer.map((f) => (f)) : parseInt(e.studentAnswer) - 1)))), 'Hello')
    const [isLoading, setIsLoading] = useState(true);
    const [optionIndex, setOptionIndex] = useState(5); // Timer set for 5 seconds
    const [counter, setCounter] = useState(0);
    let [points, setPoints] = useState(null);
    const [activeTab, setActiveTab] = useState(1);
    // const [back, setBack] = useState(showResult);
    const [back, setBack] = useState('');
    const [showOrigin, setShowOrigin] = useState(true);
    const [timeLeft, setTimeLeft] = useState("");
    const [showTimer, setShowTimer] = useState(false);
    // const [quizList, setQuizList] = useState(ResData.quiz);
    const quizList = ViewData.updatedQuestionData
    console.log(quizList)
    const [studentID, setStudentID] = useState("");
    const [clicked, setClicked] = useState(false);
    const [multiAns, setMultiAns] = useState([])
    const [nextAnswer, setNextAnswer] = useState(false);
    const [arr, setArr] = useState([]);
    const [timer, setTimer] = useState(0);
    const ti = timer / 30
    // const [showResult, setShowResult] = useState(false);
    const navigate = useNavigate();
    const [ansIndex, setAnsIndex] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [tempArr, setTempArr] = useState([]);
    const [trueAnswerList, setTrueAnswerList] = useState([]);
    const [studentAnswerList, setStudentAnswerList] = useState([]);
    const [showExamResult, setShowExamResult] = useState(false);
    const [multiTrueAnswerList, setMultiTrueAnswerList] = useState([]);
    const [alreadyExamRes, setAlreadyExamRes] = useState('')
    const [alreadyQuizRes, setAlreadyQuizRes] = useState('')

    const [count, setCount] = useState('')
    const [inputList, setInputList] = useState([])

    // const FillBlankInput = 3; // Default count is 3

    // Generate an array of length equal to the count
    // const inputArray = Array.from({ length: FillBlankInput }, (_, index) => index);
    console.log(inputList, 'opp')

    // console.log(trueAnswerList, 'dis')
    // const TotalMark = trueAnswerList.map((i) => i.markTotal)
    //     .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    // console.log(TotalMark, "time");
    // const handleBack = () => {
    //     navigate('/student')
    // };

    // const MulTotalMark = multiTrueAnswerList.filter(el => el.id).map((i) => i.markTotal).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    // console.log(quizList, "body");


    // console.log(alreadyExamRes, 'exam main')
    const SubData = location.state;
    // console.log(ResData, "dat");
    const displayMinutes = Math.floor(timeLeft / 60);
    const displaySeconds = timeLeft % 60;
    // console.log(disabledValues.every(item => oriIndexList.includes(item)), 'same?')

    return (
        <div>
            {/* body */}
            {/* <MSINAV /> */}
            <>
                <div className='h-[650px]'>
                    <div className='rounded-[12px] flex flex-col gap-10'>
                        <div className='flex flex-col justify-start items-start py-2'>
                            <span className='text-[20px] font-semibold '>
                                PART
                            </span>
                            <span className='text-[16px] text-[#000] font-semibold '>
                                {quizList[0].questions?.length} total questions
                            </span>
                            <span className='text-[16px] text-[#000] font-semibold '>
                                45 minutes to complete
                            </span>

                        </div>

                    </div>
                    <div className='flex flex-col lg:gap-3 xl:gap-5 2xl:gap-8  '>
                        {quizList.map((item, index) => (


                            <div className='border-1 border-slate-500 rounded-lg lg:p-4 xl:p-5 2xl:7'>
                                <span className='text-[16px] text-[#000] font-semibold '>{item?.instruction}</span>
                                <div className='flex justify-between'>
                                    <ScrollShadow orientation="horizontal" className="max-w-[600px] max-h-[500px] py-5">
                                        <div className='flex flex-col gap-5 '>
                                            {item?.paragraph.map((i) => (
                                                <div key={i} className='flex flex-col '>{i}</div>
                                            ))}
                                        </div>
                                    </ScrollShadow>
                                    <ScrollShadow orientation="horizontal" className="max-w-[700px] max-h-[500px] py-5">
                                        {item.questions.map((secItem, secIndex) => (
                                            <>

                                                {/* Qusetion And Answer Section */}
                                                <div
                                                    className='mt-5 p-[24px] rounded-[12px]'
                                                    key={counter}
                                                >
                                                    <div>

                                                        <div className='text-lg py-3 px-3'>
                                                            <b>({secIndex + 1})</b> &nbsp;
                                                            {secItem.question}
                                                        </div>
                                                        <div>
                                                            {/* <img src={secItem.questionPic} /> */}
                                                        </div>
                                                        <div className='mt-5'>


                                                            <>
                                                                {secItem.type === 'trueFalse' ? (
                                                                    < div
                                                                        className='text-lg font-semibold ml-10'
                                                                    >

                                                                        <div className='flex justify-between'>
                                                                            {/* True False Exam */}
                                                                            {/* {console.log(secItem.options[secItem.type !== 'fillInTheBlank' && parseInt(secItem.studentAnswer) - 1].answer, 'ans')} */}
                                                                            <RadioGroup

                                                                                className='flex flex-col gap-2'
                                                                                orientation="horizontal"
                                                                                isReadOnly
                                                                                // isDisabled={secIndex + 1 === parseInt(secItem?.studentAnswer)}
                                                                                defaultValue={secItem.options[secItem.type !== 'fillInTheBlank' && parseInt(secItem.studentAnswer) - 1].answer}
                                                                            >
                                                                                {secItem.options.map((e, i) => (
                                                                                    <Radio value={e.answer}

                                                                                    >{e.answer}</Radio>
                                                                                ))}

                                                                            </RadioGroup>



                                                                            &nbsp;



                                                                        </div>

                                                                    </div >
                                                                ) : (secItem.type === 'multipleChoice' ?

                                                                    < div className='text-lg font-semibold ml-10'
                                                                    >

                                                                        <div>

                                                                            {/* Multiple Choice Quiz */}
                                                                            {/* {console.log(secItem.type === 'multipleChoice' && secItem?.studentAnswer.map((mul) => (parseInt(mul) - 1)), 'mul')} */}
                                                                            {secItem.options.map((e, i) => (
                                                                                <div className='flex gap-1'>
                                                                                    <input
                                                                                        type='checkbox'
                                                                                        name='answer_group'
                                                                                        readOnly
                                                                                        value={e.answer}
                                                                                        checked={secItem.type === 'multipleChoice' && secItem?.studentAnswer.map((mul) => (parseInt(mul) - 1)).includes(i)}
                                                                                        onClick={(event) =>
                                                                                            handleCheckboxSelect(event,
                                                                                                i,
                                                                                                e,
                                                                                                secItem.correctAnswer,
                                                                                                secIndex,
                                                                                                secItem.mark,
                                                                                                secItem?._id,
                                                                                                secItem
                                                                                            )
                                                                                        }
                                                                                    />


                                                                                    <span>{e.answer}</span>

                                                                                </div>
                                                                            ))}


                                                                        </div>

                                                                    </div> : (
                                                                        < div className='text-lg font-semibold ml-10'
                                                                        >

                                                                            <div>

                                                                                {/*Fill in the blank */}

                                                                                <div className='flex flex-col gap-1'>




                                                                                    {/* Map over the inputArray and render input boxes */}

                                                                                    {Array.from({ length: secItem?.inputCount }, (_, index) => index).map((item, ind) => (
                                                                                        <div className='flex gap-1 '>
                                                                                            <span>({ind + 1})</span>
                                                                                            {/* {console.log(secItem.studentAnswer, 'blan')} */}
                                                                                            <Input key={item} readOnly type="text" placeholder='Answer' variant="underlined" value={secItem.type === 'fillInTheBlank' && secItem.studentAnswer[secItem.studentAnswer.map((b, ib) => (ib)).indexOf(ind)]} className="rounded-md p-2 mb-2" />
                                                                                        </div>

                                                                                    ))}


                                                                                </div>



                                                                            </div>

                                                                        </div>))}


                                                            </>


                                                        </div >
                                                    </div>
                                                    <div className='py-3'>


                                                    </div>
                                                </div >
                                                <Divider></Divider>
                                            </>
                                        ))}
                                    </ScrollShadow>
                                </div>
                                {quizList?.length - 1 === index && (
                                    <div className='flex flex-col justify-center items-center py-5'>

                                        <span className='text-[16px] text-[#000] font-semibold '>
                                            End of Questions
                                        </span>
                                        <span className='text-[16px] text-[#000] font-semibold '>
                                            “Nothing is Impossible”
                                        </span>
                                        <span className='text-[16px] text-[#000] font-semibold '>
                                            *************************
                                        </span>

                                    </div>
                                )}
                            </div>




                        ))}

                    </div>

                </div>
            </>


        </div >

    );
};
export default ExamPage;
