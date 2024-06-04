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
const ExamPage = () => {
    const location = useLocation();
    const subjectID = location.state.subID //.data._id
    const ExamData = location.state.examData
    const QuizID = ExamData._id //._id
    const exam = ExamData.exam //._id
    const batchID = location.state.batchID //.data.course.batch.id
    const enrollID = location.state.enroll //.enroll_id
    const student = location.state.student //student
    console.log(ExamData.questionData, 'Hello')
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
    const [quizList, setQuizList] = useState(ExamData.questionData);
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

    console.log(trueAnswerList, 'dis')
    const TotalMark = trueAnswerList.map((i) => i.markTotal)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    console.log(TotalMark, "time");
    const handleBack = () => {
        navigate('/student')
    };

    const MulTotalMark = multiTrueAnswerList.filter(el => el.id).map((i) => i.markTotal).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    // console.log(quizList, "body");
    const handleShowFail = () => {
        // alert('Fail')
        setShowOrigin(true)
        setShowTimer(false)
        setTimer(0)

    }

    const handleStart = () => {
        window.scroll(0, 0)

        setShowTimer(prev => !prev);
        let interval = null;
        interval = setInterval(() => {
            setTimer(prevTimer => {

                // if (prevTimer >= (ExamData.duration * 60)) {
                //     // if (((TotalMark + MulTotalMark) === quizList.passMark && "pass") || ((TotalMark + MulTotalMark) > quizList.passMark && "credit"))
                //     if (quizList) {
                //         handleResult();
                //     } else {
                //         handleShowFail()

                //     }
                //     // Stop the timer when it reaches 30 seconds
                //     // handleShowFail()
                //     return prevTimer; // Return current timer value
                // } else {
                return prevTimer + 1; // Increment timer value by 1 second

            });



        }, 1000);



        // return () => clearTimeout(UseTimer);
        // Clear interval when the component unmounts or when moving to the next question
        // return () => clearInterval(interval);
    };
    const nextQuestion = (studentAnswer, cas, ind) => {
        // console.log(quizList.questions[counter].correctAnswer === cas, 'cas')


        // console.log(caList, 'caList')
        setClicked("");
        setNextAnswer(true);
        setAnsIndex(""); //to check incorrect or correct answer
        if (cas === null) {
            alert("Must select an answer before proceeding to the next question");
            return;
        }
        if (quizList.questions[counter].type === 'multipleChoice') {


            const correctList = cas?.map((i) => (parseInt(i))) //To change Int in array's items

            let answerObj = correctList.every(item => studentAnswerList.filter((el) => el.id === quizList.questions[counter]._id)[1].studentAnswer.slice(-2).includes(item))  // To know two arrays's items same?
            // console.log(correctList.every(item => studentAnswerList.filter((el) => el.id === quizList.questions[counter]._id)[1].studentAnswer.slice(-2).includes(item)), 'slice in next')


            let updated_points = answerObj ? points + 1 : points;       // If we true,we increase mark
            // console.log(updated_points, 'point');

            setPoints(updated_points);
            let nextQuestion = counter + 1;

            if (nextQuestion < quizList.questions.length) {
                setCounter(nextQuestion);
            } else {
                setCounter(0);
                handleResult();
                // console.log(TotalMark, "in next");
            }

            // handleAns()
            // displayCorrect(answerObj);
        } else {
            let answerObj = quizList.questions[counter].correctAnswer === cas
            // console.log(answerObj, 'answerobj')
            let updated_points = answerObj ? points + 1 : points;
            // console.log(updated_points, 'point');
            setPoints(updated_points);
            let nextQuestion = counter + 1;

            if (nextQuestion < quizList.questions.length) {
                setCounter(nextQuestion);
            } else {
                setCounter(0);
                handleResult();
                // console.log(TotalMark, "in next");
            }

            // handleAns()
            // displayCorrect(answerObj);

        }

    };

    const handleResult = () => {

        console.log(studentAnswerList, 'studentAnswerList');

        // console.log(studentAnswerList.filter(el => quizList.questions.find(i => i._id === el.id)), 'studentAnswerList')
        //Quiz-Result Create
        const data = {
            enrollment: enrollID,
            quiz: QuizID,
            // type: ResData.examType,
            student: studentID,
            batch: batchID,
            subject: subjectID,
            // exam: exam,
            answerDate: Date.now(),
            updatedQuestionData: quizList.map((first) => {
                return {
                    instruction: first.instruction,
                    paragraph: first.paragraph.map((i) => (i)),
                    questions: first.questions.map((i) => {
                        return {
                            question: i.question,
                            type: i.type,
                            mark: i.mark,
                            correctAnswerDescription: i.correctAnswerDescription,
                            options: i.options,
                            answerType: i.answerType,
                            correctAnswer: i.correctAnswer,
                            studentAnswer: i.type === 'trueFalse' && studentAnswerList.filter((el) => el.id === i._id)[0]
                                ?.studentAnswer || i.type === 'multipleChoice' && studentAnswerList.filter((el) => el.id === i._id)[0]?.studentAnswer.slice(-(i.correctAnswer.length)) || i.type === "fillInTheBlank" && studentAnswerList.filter((el) => el.id === i._id)[0].studentAnswer,
                        };
                    }),

                    // status: first.questions[counter].type === 'trueFalse' ? (TotalMark === first.passMark && "pass") || (TotalMark > first.passMark && "distinction") || ((TotalMark < first.passMark && TotalMark === first.creditMark) && "credit") || (TotalMark < first.creditMark && "fail") : (points >= first.passMark ? "pass" : "fail"),

                }

            }),
            totalMark: TotalMark + MulTotalMark,
            status: 'pass'


        }
        // console.log(data, 'res');
        // Swal.fire({
        //     icon: "success",
        //     title: "Exam File is Uploaded!",
        //     text: "Successful",
        //     showConfirmButton: false,
        //     timer: 2000,
        // });
        // navigate('/student')

        apiInstance
            .post("quiz-results", data)
            .then(function () {
                Swal.fire({
                    icon: "success",
                    title: "Exam File is Uploaded!",
                    text: "Successful",
                    showConfirmButton: false,
                    timer: 2000,
                });
                navigate('/student')
                // setShowTimer(false)
                // setShowOrigin(true)
                // setIsLoading(true)
            })
            .catch((error) => {
                console.log(error);
            });

        localStorage.removeItem("formSubmission");

        // setShowOrigin(false);
        // setShowExamResult(true);
    };

    const handleCheckboxSelect = (event, index, data, correct, counter, mark, counterId, SecItemData) => {
        // setNextAnswer(false);
        // setIndex(index + 1);
        // console.log(counter, 'll')

        if (event.target.checked) {

            // setNumber(prevCount => prevCount + 1)
            const multi = [...multiAns, index + 1]
            setMultiAns(multi);

            const II = multi.slice(-(correct.length)) //to get last studentAnswer's length

            setCount(II) //to show that we choose answer count

            const correctList = correct.map((i) => (parseInt(i))) //to get not include single code in correctAnswer
            // console.log(correctList, 'corr ans list')

            if (correctList.every(item => II.includes(item)) && correctList.length === II.length) {
                // setStudentAnswer(val + 1)

                const newFormSubmissions = [...trueAnswerList];
                newFormSubmissions.push({
                    id: counterId,
                    correct: correctList,
                    markTotal: mark,
                    studentAnswer: II
                }); // to get trueAnswer list

                localStorage.setItem(
                    "formSubmission",
                    JSON.stringify(newFormSubmissions)
                ); //stored data in localStorage because we need remember student's every questions answer

                const getUniqueById = (arr) => {
                    return Object.values(arr.reduce((acc, obj) => {
                        acc[obj.id] = obj;
                        return acc;
                    }, {}));
                }; //to get same ID object data as one obj data

                // Usage
                const uniqueObjects = getUniqueById(newFormSubmissions);
                // console.log(uniqueObjects, 'mul real');
                setMultiTrueAnswerList(uniqueObjects);

                console.log(uniqueObjects, 'setMulTrueAnswerList')
                // console.log(quiz.questions.filter(el=>el.correctAnswer === val+1))

            }

            // Create the main array and push the sub-arrays into it
            const mainArray = [...studentAnswerList, ...[{ studentAnswer: II, id: counterId, type: SecItemData.type }]];

            const getUniqueById = (arr) => {
                return Object.values(arr.reduce((acc, obj) => {
                    acc[obj.id] = obj;
                    return acc;
                }, {}));
            }; //to get same ID object data as one obj data

            // Usage
            const stuList = getUniqueById(mainArray);
            // console.log(stuList, 'final final')
            setStudentAnswerList(stuList);
        } else {
            setNumber('')
            // setMultiAns(multiAns.filter((el, index) => (el.res === index + 1)))
            const multi = multiAns.filter(data => data !== counterId)
            setMultiAns(multi)

            // console.log(multi, 'ma tu tar')
        }

    }

    const handleAns = (secInd, val, studentChoose, ca, index, mark, secItems, counterid, SecItemData) => {
        setNextAnswer(false);
        setClicked(true);
        setShowAlert(true);
        // setOptionIndex(val)
        setAnsIndex(counterid);
        // setSelectedValue(val)
        // setOriIndexList([...oriIndexList, val])

        // setDisabledValues([...disabledValues, val]);
        console.log(val, 'ansIndex')

        const newAns = [...tempArr];
        newAns.push({
            ans: studentChoose.answer,

        });

        localStorage.setItem(
            "newAnswer",
            JSON.stringify(newAns)

        );
        // const annn = localStorage.getItem(
        //     "newAns"

        // );
        console.log('hello', newAns);

        setTempArr(newAns)
        const TrueFalseAns = [...arr, val + 1] // to get student's index choose value with array list style
        // console.log(TrueFalseAns, 'studentChoose list')


        // console.log(multiAnswerList, 'mul list')
        // console.log(quizList.questions[counter].type, 'index of multi + 1')


        if (parseInt(ca) === parseInt(TrueFalseAns)) {
            // setStudentAnswer(val + 1)
            // console.log('fdjfsakjkfsn')
            const newFormSubmissions = [...trueAnswerList];
            newFormSubmissions.push({
                correct: parseInt(ca),
                markTotal: mark,
                studentAnswer: TrueFalseAns
            });

            localStorage.setItem(
                "formSubmission",
                JSON.stringify(newFormSubmissions)
            );

            setTrueAnswerList(newFormSubmissions);

            console.log(newFormSubmissions, 'new radio')

            // setIsCorrect("Correct");
        } else {
            // setStudentAnswer(val + 1)
            // setIsCorrect("incorrect");
        }
        const newFormSubmissionsforStudentAnswer = [...studentAnswerList];
        newFormSubmissionsforStudentAnswer.push({ studentAnswer: TrueFalseAns, id: counterid, type: SecItemData.type });

        localStorage.setItem(
            "studentformSubmission",
            JSON.stringify(newFormSubmissionsforStudentAnswer)
        );
        console.log(newFormSubmissionsforStudentAnswer, 'final else radio')
        setStudentAnswerList(newFormSubmissionsforStudentAnswer);



    };

    const handleFillBlank = (event, val, studentChoose, ca, index, mark, counterid, SecItemData) => {

        const { value } = event.target;
        const newItems = [...inputList];
        newItems[val] = value;
        setInputList(newItems);



        const newFormSubmissionsforStudentAnswer = [...studentAnswerList, { studentAnswer: newItems, id: counterid, type: SecItemData.type }];
        // newFormSubmissionsforStudentAnswer.push({ studentAnswer: inputList, id: counterid });
        localStorage.setItem(
            "studentformSubmission",
            JSON.stringify(newFormSubmissionsforStudentAnswer)
        );
        console.log(newFormSubmissionsforStudentAnswer, 'final else radio')
        const lastInputValue = newFormSubmissionsforStudentAnswer[newFormSubmissionsforStudentAnswer.length - 1]
        const otherValue = newFormSubmissionsforStudentAnswer.filter(el => el.type !== 'fillInTheBlank')
        console.log([...otherValue, lastInputValue], 'lastInputValue')
        setStudentAnswerList([...otherValue, lastInputValue]);
        // setStudentAnswerList(newItems);
        // Get the index of the last element
        const lastIndex = newItems.length - 1;
        console.log('Last Index:', newItems);

        // const hee = [...inputList, secInd]
        // console.log(hee, 'val')
        // setInputList([...inputList, hee[hee.length - 1]])


        // const getUniqueById = (arr) => {
        //     return Object.values(arr.reduce((acc, obj) => {
        //         acc[obj.id] = obj;
        //         return acc;
        //     }, {}));
        // }; //to get same ID object data as one obj data

        // // Usage
        // const uniqueObjects = getUniqueById(hee);
        // // console.log(uniqueObjects, 'mul real');
        // // setMultiTrueAnswerList(uniqueObjects);

        // console.log(uniqueObjects, 'setMulTrueAnswerList')
        // // console.log(quiz.questions.filter(el=>el.correctAnswer === val+1))

        // // const newFormSubmissionsforStudentAnswer = [...studentAnswerList];
        // // newFormSubmissionsforStudentAnswer.push({ studentAnswer: uniqueObjects[0], id: counterid });
        // const mainArray = [...studentAnswerList, ...[{ studentAnswer: uniqueObjects, id: counterid }]];
        // const getFinalUniqueById = (arr) => {
        //     return Object.values(arr.reduce((acc, obj) => {
        //         acc[obj.id] = obj;
        //         return acc;
        //     }, {}));
        // }; //to get same ID object data as one obj data

        // // Usage
        // const stuList = getFinalUniqueById(mainArray);
        // console.log(stuList, 'final final')
        // setStudentAnswerList(stuList);
        // localStorage.setItem(
        //     "studentformSubmission",
        //     JSON.stringify(newFormSubmissionsforStudentAnswer)
        // );
        // console.log(newFormSubmissionsforStudentAnswer, 'fill')
        // setStudentAnswerList(newFormSubmissionsforStudentAnswer);
    }
    useEffect(() => {
        if (!isLoading) return;
        window.scroll(0, 0)

        const getExamRes = async () => {
            await apiInstance.get('exam-results').then((res) => {
                console.log(res.data.data.filter(el => el.exam?._id === exam), 'exam res')
                setAlreadyExamRes(res.data.data.filter(el => el.exam?._id === exam))
            })
        }
        const getQuizRes = async () => {
            await apiInstance.get('quiz-results').then((res) => {
                console.log(res.data.data.filter(el => el.quiz === QuizID), 'res')
                setAlreadyQuizRes(res.data.data.filter(el => el.quiz === QuizID))
            })
        }
        getQuizRes()
        getExamRes()
        const item = localStorage.getItem('hello');
        // Update state with the retrieved item

        console.log(item, 'under its array')


        const dataFromLocalStorage = localStorage.getItem("id");
        // console.log(dataFromLocalStorage,'local')

        setStudentID(dataFromLocalStorage);
        //   setPages(res.data._metadata.page_count)
        let interval = null;
        // let timeLeft = (ExamData.duration * 1000)
        // interval = setInterval(() => {
        //     setValue((v) => (v >= 100 ? 0 : v + 10));
        // }, 500);

        interval = setInterval(() => {

            setIsLoading(false);

        }, 3000);

        // const timer = setTimeout(() => {
        //     setIsLoading(false);
        // }, 3000);
        // Cleanup the timer

        return () => clearInterval(interval);
        // return () => clearTimeout(timer);

    }, [count, isLoading, showTimer]);
    // console.log(alreadyExamRes, 'exam main')
    const SubData = location.state;
    // console.log(ResData, "dat");
    const displayMinutes = Math.floor(timeLeft / 60);
    const displaySeconds = timeLeft % 60;
    // console.log(disabledValues.every(item => oriIndexList.includes(item)), 'same?')

    return (
        <div>
            {/* body */}
            <MSINAV />
            (
            <div className='mx-8'>
                <div className='flex flex-col gap-20  h-[500px] pb-[20px] mt-5'>
                    {/* First Section */}
                    <div className='flex justify-between'>
                        <div className='flex gap-5'>
                            <div onClick={handleBack}>
                                <FontAwesomeIcon icon={faArrowLeft} size='2xl' className='mt-[0.7rem] text-[blue]' />
                            </div>
                            <span className='text-[32px] font-semibold'>In App Exam Page</span>
                        </div>
                        {showTimer && (
                            <div className='flex flex-col gap-1'>


                                <div className='flex justify-start items-start p-6 w-[500px] h-[43px]  rounded-lg'>
                                    <div className=' text-[20px] font-bold w-[200px] '>
                                        Time {convertSecondsToMinutes(timer)} s
                                        {/* {timer > 30 ? (
                                        <span className='bg-red-300 p-2 rounded-lg'>{ti.toFixed(2)} s</span>
                                    ) : timer} */}
                                    </div>
                                    {/* <span className='p-[10px] text-[20px] font-bold '>s</span> */}
                                </div>
                                <div className='py-2'>
                                    {/* <Progress

                                        size="md"
                                        value={timer}
                                        color="danger"
                                        showValueLabel={false}
                                        className="max-w-md"
                                    /> */}
                                </div>
                            </div>
                        )}

                    </div>
                    <div className=''>
                        {
                            showOrigin && (
                                <>
                                    {!showTimer && (
                                        <div className='flex justify-center  font-serif bg-[#fbfcfe] shadow-lg rounded-lg    gap-20 '>

                                            <div className='flex flex-col gap-10 pt-[20px]  mt-[110px] '>
                                                <span className='text-[35px] font-bold w-80'>
                                                    This placement test will test your basic knowledge on IELTS
                                                </span>
                                                <div className='flex gap-2'>
                                                    <Button color='primary' variant='bordered'>
                                                        <Link to='/student'>   Cancel</Link>

                                                    </Button>
                                                    {
                                                        alreadyExamRes[0] && alreadyQuizRes[0] ? (
                                                            isLoading ?
                                                                <Button color='light'>
                                                                    Start Quiz <Spinner size='sm' />
                                                                </Button> :
                                                                <div>
                                                                    <Button color='default' className='cursor-not-allowed'>
                                                                        Start Quiz
                                                                    </Button>
                                                                </div>
                                                        ) : (
                                                            isLoading ?
                                                                <Button color='light'>
                                                                    Start Exam <Spinner size='sm' />
                                                                </Button> :
                                                                <Button color='primary' checked={showTimer} onClick={handleStart}>
                                                                    Start Exam
                                                                </Button>

                                                        )
                                                    }
                                                </div>

                                            </div>

                                            <div className=''>
                                                <Image src={Placement} className='w-[600px] h-[550px]' />
                                            </div>

                                        </div>
                                    )}

                                    {showTimer && (
                                        <>
                                            <div className='h-[650px]'>
                                                <div className='rounded-[12px] flex flex-col gap-10'>
                                                    <div className='flex flex-col justify-start items-start py-2'>
                                                        <span className='text-[20px] font-semibold '>
                                                            PART {ExamData.questionData?.length}
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
                                                                <ScrollShadow orientation="horizontal" className="max-w-[800px] max-h-[500px] py-5">
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
                                                                                                    {showTimer && (
                                                                                                        <div className='flex justify-between'>
                                                                                                            {/* True False Exam */}

                                                                                                            <RadioGroup

                                                                                                                className='flex flex-col gap-2'
                                                                                                                orientation="horizontal"

                                                                                                            >
                                                                                                                {secItem.options.map((e, i) => (
                                                                                                                    <Radio value={e.answer}
                                                                                                                        onChange={() =>
                                                                                                                            handleAns(
                                                                                                                                secIndex,
                                                                                                                                i,
                                                                                                                                e,
                                                                                                                                secItem.correctAnswer,
                                                                                                                                secIndex,
                                                                                                                                secItem.mark,
                                                                                                                                item.questions,
                                                                                                                                secItem?._id,
                                                                                                                                secItem

                                                                                                                            )}>{e.answer}</Radio>
                                                                                                                ))}

                                                                                                            </RadioGroup>
                                                                                                            {/* <input
                                                                                                                    type='radio'
                                                                                                                    className='w-[20px] h-[20px] mt-1'
                                                                                                                    name={secIndex !== i}
                                                                                                                    value={e.answer}
                                                                                                                    disabled={

                                                                                                                        clicked
                                                                                                                            ? secIndex !== i ? true : ''
                                                                                                                            : ""
                                                                                                                    }
                                                                                                                // onChange={(event) =>
                                                                                                                //   handleOptionSelect(event, e, i)
                                                                                                                // }
                                                                                                                /> */}


                                                                                                            &nbsp;

                                                                                                            {/* <span className='ml-2 text-[20px] lg:text-[16px]'>{e.answer}</span> */}

                                                                                                        </div>
                                                                                                    )}
                                                                                                </div >
                                                                                            ) : (secItem.type === 'multipleChoice' ?

                                                                                                < div className='text-lg font-semibold ml-10'
                                                                                                >
                                                                                                    {showTimer && (
                                                                                                        <div>

                                                                                                            {/* Multiple Choice Quiz */}
                                                                                                            {secItem.options.map((e, i) => (
                                                                                                                <div className='flex gap-1'>
                                                                                                                    <input
                                                                                                                        type='checkbox'
                                                                                                                        name='answer_group'
                                                                                                                        value={e.answer}

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
                                                                                                    )}
                                                                                                </div> : (
                                                                                                    < div className='text-lg font-semibold ml-10'
                                                                                                    >
                                                                                                        {showTimer && (
                                                                                                            <div>

                                                                                                                {/*Fill in the blank */}

                                                                                                                <div className='flex flex-col gap-1'>




                                                                                                                    {/* Map over the inputArray and render input boxes */}
                                                                                                                    {Array.from({ length: secItem?.inputCount }, (_, index) => index).map((item, ind) => (
                                                                                                                        <div className='flex gap-1 '>
                                                                                                                            <span>({ind + 1})</span>
                                                                                                                            <Input key={item} type="text" placeholder='Answer' variant="underlined" className="rounded-md p-2 mb-2" onChange={(event) =>
                                                                                                                                handleFillBlank(event,
                                                                                                                                    ind,
                                                                                                                                    item,
                                                                                                                                    secItem.correctAnswer,
                                                                                                                                    secIndex,
                                                                                                                                    secItem.mark,
                                                                                                                                    secItem?._id,
                                                                                                                                    secItem

                                                                                                                                )
                                                                                                                            } />
                                                                                                                        </div>

                                                                                                                    ))}


                                                                                                                </div>



                                                                                                            </div>
                                                                                                        )}
                                                                                                    </div>))}


                                                                                        </>


                                                                                    </div >
                                                                                </div>
                                                                                <div className='py-3'>

                                                                                    {/* <Button
                                                                                        color='secondary'
                                                                                        size='sm'
                                                                                        className='ml-10 rounded-md mt-3'
                                                                                        onClick={() =>
                                                                                            nextQuestion(
                                                                                                multiAns,
                                                                                                secItem.correctAnswer,
                                                                                                secIndex
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        Next
                                                                                    </Button> */}
                                                                                    {/* ) : (
                      <Button
                        size='sm'
                        className='ml-10 rounded-md mt-3'
                        disabled={true}
                      // onClick={() =>
                      //   nextQuestion(
                      //     studentAnswer,
                      //     quizList.questions[counter].correctAnswer,
                      //     counter
                      //   )
                      // }
                      >
                        Next
                      </Button>
                    )} */}
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
                                                    <div className='py-2 flex justify-end lg:gap-2 xl:gap-3 2xl:gap-4'>
                                                        <Button color='light' className='text-rose-600 font-medium' size='xl' onClick={() => navigate('/student')}>Cancel</Button>
                                                        <Button color='primary' size='xl' onClick={handleResult}>Submit</Button>
                                                    </div>
                                                </div>

                                            </div>
                                        </>
                                    )
                                    }
                                </>
                            )


                        }
                    </div >
                </div>
            </div >)


        </div >

    );
};
export default ExamPage;
