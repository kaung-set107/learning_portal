import {
    Card,
    CardBody,
    Button,
    CardHeader,
    Image,
    Spinner,
    Divider,
    Textarea,
} from "@nextui-org/react";
import apiInstance from "../../../util/api";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import {useEffect,useState} from 'react'
import ExamOriginalPage from './examTab'
import { faEye, faClock, faCalendarDays, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
// import apiInstance from "../../util/api";
import Exam from "./examResultPage";
// import Assignment from "./assignTab";
// import Module from "./moduleTab";
// import TabValueComponent from "./sub-detail-head";
// import Nav from "../../home/header";
// import PF from '../../../assets/img/pf.png'
// import QP from '../../../assets/img/qp.png'
import Placement from '../../../assets/img/placementGIF.gif'
import EHome from '../../../assets/img/EllipseHome.png'
import EHalf from '../../../assets/img/EllipseHalf.png'
const ExamPage = ({ ResData, showResult }) => {
    const location = useLocation();
    const subjectID = location.state.data._id
    const QuizID = ResData.quiz._id
    const exam = ResData._id
    const enrollID = location.state.enroll_id
    console.log(location.state, 'main')
    const [isLoading, setIsLoading] = useState(true);
    const [timerStartBtn, setTimerStartBtn] = useState(5); // Timer set for 5 seconds
    const [counter, setCounter] = useState(0);
    let [points, setPoints] = useState(null);
    const [activeTab, setActiveTab] = useState(1);
    const [back, setBack] = useState(showResult);
    const [showOrigin, setShowOrigin] = useState(true);
    const [timeLeft, setTimeLeft] = useState("");
    const [showTimer, setShowTimer] = useState(false);
    const [quizList, setQuizList] = useState(ResData.quiz);
    const [studentID, setStudentID] = useState("");
    const [clicked, setClicked] = useState("");
    const [multiAns, setMultiAns] = useState([])
    const [nextAnswer, setNextAnswer] = useState(false);
    const [arr, setArr] = useState([]);
    const [timer, setTimer] = useState(0);
    // const [showResult, setShowResult] = useState(false);
    const navigate = useNavigate();
    const [index, setIndex] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [trueAnswerList, setTrueAnswerList] = useState([]);
    const [studentAnswerList, setStudentAnswerList] = useState([]);
    const [showExamResult, setShowExamResult] = useState(false);
    const [multiTrueAnswerList, setMultiTrueAnswerList] = useState([]);

    const TotalMark = trueAnswerList.map((i) => i.markTotal)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    console.log(TotalMark, "time");
    const handleBack = () => {
        setBack(!showResult);
    };

    const MulTotalMark = multiTrueAnswerList.filter(el => el.id).map((i) => i.markTotal).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    console.log(quizList, "body");


    const handleStart = () => {
        setShowTimer(prev => !prev);


        // Clear interval when the component unmounts or when moving to the next question
        // return () => clearInterval(timerInterval);
    };
    const nextQuestion = (studentAnswer, cas, ind) => {
        // console.log(quizList.questions[counter].correctAnswer === cas, 'cas')


        // console.log(caList, 'caList')
        setClicked("");
        setNextAnswer(true);
        setIndex(""); //to check incorrect or correct answer
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
            displayCorrect(answerObj);
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
            displayCorrect(answerObj);

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
            batch: '661626364b091b37492de8e0',
            subject: subjectID,
            exam: exam,
            answerDate: Date.now(),
            updatedQuestions: quizList.questions.map((i) => {
                return {
                    question: i.question,
                    type: i.type,
                    mark: i.mark,

                    options: i.options,
                    answerType: i.answerType,
                    correctAnswer: i.correctAnswer,
                    studentAnswer: i.type === 'trueFalse' ? studentAnswerList.filter((el) => el.id === i._id)[0]
                        ?.studentAnswer : studentAnswerList.filter((el) => el.id === i._id)[0]?.studentAnswer.slice(-(i.correctAnswer.length)),
                };
            }),
            totalMark: quizList.questions[counter].type === 'trueFalse' ? TotalMark : points,
            status: quizList.questions[counter].type === 'trueFalse' ? (TotalMark === quizList.passMark && "pass") || (TotalMark > quizList.passMark && "distinction") || ((TotalMark < quizList.passMark && TotalMark === quizList.creditMark) && "credit") || (TotalMark < quizList.creditMark && "fail") : (points >= quizList.passMark ? "pass" : "fail"),
        };
        // alert(JSON.stringify(data));
        apiInstance
            .post("quiz-results", data)
            .then(function () {
                navigate("/quiz-result");
            })
            .catch((error) => {
                console.log(error);
            });

        localStorage.removeItem("formSubmission");

        setShowOrigin(false);
        setShowExamResult(true);
    };

    const handleCheckboxSelect = (event, index, data, correct, counter, mark, counterId) => {
        setIndex(index);
        // console.log(correct, 'll')

        if (event.target.checked) {
            const multi = [...multiAns, index + 1]
            setMultiAns(multi);
            // We get answer with index no
            // console.log(multi, 'multi ans list')

            const correctList = correct.map((i) => (parseInt(i)))
            // console.log(correctList, 'corr ans list')
            // console.log(correctList.every(item => multi.includes(item)), 'true?')

            if (correctList.every(item => multi.includes(item))) {
                // setStudentAnswer(val + 1)

                const newFormSubmissions = [...trueAnswerList];
                newFormSubmissions.push({
                    id: counterId,
                    correct: correctList,
                    markTotal: mark,
                    studentAnswer: multi
                });

                localStorage.setItem(
                    "formSubmission",
                    JSON.stringify(newFormSubmissions)
                );

                setTrueAnswerList(newFormSubmissions);

                // console.log(newFormSubmissions, 'setTrueAnswerList')
                // console.log(quiz.questions.filter(el=>el.correctAnswer === val+1))
                setIsCorrect("Correct");
            } else {
                // setStudentAnswer(val + 1)
                setIsCorrect("incorrect");
            }

            // Create the main array and push the sub-arrays into it
            const mainArray = [...studentAnswerList, ...[{ studentAnswer: multi, id: counterId }]];


            // console.log(mainArray, 'final final')
            setStudentAnswerList(mainArray);
        } else {
            // setMultiAns(multiAns.filter((el, index) => (el.res === index + 1)))
            const multi = multiAns.filter(data => data !== counterId)
            setMultiAns(multi)

            // console.log(multi, 'ma tu tar')
        }

    }

    const handleAns = (val, studentChoose, ca, index, mark, counterid) => {
        setNextAnswer(false);
        setClicked(true);
        setShowAlert(true);
        setIndex(val);


        // console.log('hello', [...multiAns, studentChoose]);


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

            // console.log(newFormSubmissions, 'new radio')

            // setIsCorrect("Correct");
        } else {
            // setStudentAnswer(val + 1)
            // setIsCorrect("incorrect");
        }
        const newFormSubmissionsforStudentAnswer = [...studentAnswerList];
        newFormSubmissionsforStudentAnswer.push({ studentAnswer: TrueFalseAns, id: counterid });

        localStorage.setItem(
            "studentformSubmission",
            JSON.stringify(newFormSubmissionsforStudentAnswer)
        );
        // console.log(newFormSubmissionsforStudentAnswer, 'final else radio')
        setStudentAnswerList(newFormSubmissionsforStudentAnswer);



    };
    useEffect(() => {
        if (!isLoading) return;
        window.scroll(0, 0)
        const item = localStorage.getItem('hello');
        // Update state with the retrieved item

        console.log(item, 'under its array')


        const dataFromLocalStorage = localStorage.getItem("id");
        // console.log(dataFromLocalStorage,'local')

        setStudentID(dataFromLocalStorage);
        //   setPages(res.data._metadata.page_count)
        let interval = null;
        if (showTimer) {
            interval = setInterval(() => {
                setTimer(prevTimer => {

                    return prevTimer + 1; // Increment timer value by 1 second

                });
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);


    }, [isLoading, showTimer]);
    const SubData = location.state;
    // console.log(ResData, "dat");
    const displayMinutes = Math.floor(timeLeft / 60);
    const displaySeconds = timeLeft % 60;
    return (
        <div>
            {/* body */}

            {back ? (
                <div>
                    <div className='flex flex-col gap-20  h-[500px] mt-5'>
                        {/* First Section */}
                        <div className='flex justify-between'>
                            <div className='flex gap-5'>
                                <div onClick={handleBack}>
                                    <FontAwesomeIcon icon={faArrowLeft} size='2xl' className='mt-[0.7rem] text-[blue]' />
                                </div>
                                <span className='text-[32px] font-semibold'>In App Exam Page</span>
                            </div>

                            <div className='flex justify-center items-center p-6 w-[500px] h-[43px] bg-[#ECF2FF]  rounded-lg'>
                                <span className='text-[16px] font-semibold  text-[#3D70F5] w-[391px] h-[19px]'>Result Declared on 12:30 AM | 22 September 2023</span>
                            </div>
                        </div>

                        <div className=''>
                            {showOrigin && (
                                <>
                                    {!showTimer && (
                                        <div className='flex justify-center font-serif bg-[#fbfcfe] shadow-lg rounded-lg  p-[20px] gap-20 '>
                                            {/* <img
                                                src={EHome}
                                                className='absolute top-0 left-0 -z-40 w-[100px] md:w-[150px]'
                                                alt=''
                                            /> */}
                                            <div className='flex flex-col gap-10 pt-[20px] mt-[110px]'>
                                                <span className='text-[35px] font-bold w-80'>
                                                    This placement test will test your basic knowledge on IELTS
                                                </span>
                                                <div className='flex gap-2'>
                                                    <Button color='primary' variant='bordered'>
                                                        <Link to='/student'>   Cancel</Link>

                                                    </Button>
                                                    {!isLoading ? (
                                                        <Button color='primary' onClick={handleStart} size='md'>
                                                            Start Quiz
                                                        </Button>
                                                    ) : (
                                                        // <Button color='light'>
                                                        //     Start Quiz <Spinner size='sm' />
                                                        // </Button>
                                                        <Button color='primary' onClick={handleStart} size='md'>
                                                            Start Quiz
                                                        </Button>
                                                    )}
                                                </div>

                                            </div>

                                            <div className=''>
                                                <Image src={Placement} className='w-[600px] h-[550px]' />
                                            </div>
                                            {/* <img
                                                src={EHalf}
                                                className='absolute bottom-0 right-0 -z-10 w-[100px] md:w-[150px]'
                                                alt=''
                                            /> */}
                                        </div>
                                    )}

                                    {showTimer && (
                                        <>
                                            <div className='h-[317px]'>
                                                <div className='p-[24px] border-1 border-[#10C278] rounded-[12px] flex flex-col gap-10'>
                                                    <div className='flex justify-between'>
                                                        <span className='text-[20px] font-semibold p-[10px]'>
                                                            Question
                                                        </span>
                                                        <span className='flex justify-center text-[16px] text-[#BDFFE2] font-medium bg-[#10C278] rounded-[24px] p-[1px] w-[180px] items-center  text-center'>
                                                            Mark {quizList.questions[counter].mark} out of{" "}
                                                            {quizList.questions[counter].mark}{" "}
                                                        </span>
                                                        <span className='p-[20px] text-[20px] font-light w-[200px]'>
                                                            Time :{timer}s


                                                        </span>
                                                    </div>

                                                </div>
                                                {/* Qusetion And Answer Section */}
                                                <Card
                                                    className='mt-5 p-[24px] border-1 border-[#10C278] rounded-[12px]'
                                                    key={counter}
                                                >
                                                    <div>
                                                        <div className='text-lg py-3 px-3'>
                                                            <b>({counter + 1})</b> &nbsp;
                                                            {quizList.questions[counter].question}
                                                        </div>
                                                        <div>
                                                            <img src={quizList.questions[counter].questionPic} />
                                                        </div>
                                                        <div className='mt-5'>

                                                            {quizList.questions[counter].options.map((e, i) => (
                                                                <>
                                                                    {quizList.questions[counter].type === 'trueFalse' ? (
                                                                        < div
                                                                            key={i}
                                                                            className='text-lg font-semibold ml-10'
                                                                            onClick={() =>
                                                                                handleAns(
                                                                                    i,
                                                                                    e,
                                                                                    quizList.questions[counter].correctAnswer,
                                                                                    counter,
                                                                                    quizList.questions[counter].mark,
                                                                                    quizList.questions[counter]._id

                                                                                )
                                                                            }
                                                                        >
                                                                            {showTimer && (
                                                                                <div>
                                                                                    {/* True False Quiz */}

                                                                                    <input
                                                                                        type='radio'
                                                                                        className='w-[20px] h-[20px] mt-1'
                                                                                        name='answer_group'
                                                                                        value={e.answer}
                                                                                        disabled={
                                                                                            clicked === ""
                                                                                                ? ""
                                                                                                : selectedOption === e.answer
                                                                                                    ? ""
                                                                                                    : true
                                                                                        }
                                                                                    // onChange={(event) =>
                                                                                    //   handleOptionSelect(event, e, i)
                                                                                    // }
                                                                                    />


                                                                                    &nbsp;

                                                                                    <span className='ml-2 text-[20px]'>{e.answer}</span>

                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    ) : (
                                                                        < div
                                                                            key={i}
                                                                            className='text-lg font-semibold ml-10'
                                                                        // onChange={() =>
                                                                        //   handleAns(
                                                                        //     i,
                                                                        //     e,
                                                                        //     quizList.questions[counter].correctAnswer,
                                                                        //     counter,
                                                                        //     quizList.questions[counter].mark,
                                                                        //     quizList.questions[counter]._id

                                                                        //   )
                                                                        // }
                                                                        >
                                                                            {showTimer && (
                                                                                <div>

                                                                                    {/* Multiple Choice Quiz */}
                                                                                    <input
                                                                                        type='checkbox'
                                                                                        name='answer_group'
                                                                                        value={e.answer}
                                                                                        // checked={multiAns.map((i, ind) => (selectedItem.map((e, ine) => (ine === ind))))}
                                                                                        // disabled={
                                                                                        //   clicked === ""
                                                                                        //     ? ""
                                                                                        //     : selectedOption === e.answer
                                                                                        //     ? ""
                                                                                        //     : true
                                                                                        // }
                                                                                        onClick={(event) =>
                                                                                            handleCheckboxSelect(event,
                                                                                                i,
                                                                                                e,
                                                                                                quizList.questions[counter].correctAnswer,
                                                                                                counter,
                                                                                                quizList.questions[counter].mark,
                                                                                                quizList.questions[counter]._id
                                                                                            )
                                                                                        }
                                                                                    />

                                                                                    &nbsp;

                                                                                    {e.answer}

                                                                                </div>
                                                                            )}
                                                                        </div>)}


                                                                </>

                                                            ))}
                                                        </div >
                                                    </div>
                                                    <div className='py-3'>

                                                        <Button
                                                            color='secondary'
                                                            size='sm'
                                                            className='ml-10 rounded-md mt-3'
                                                            onClick={() =>
                                                                nextQuestion(
                                                                    multiAns,
                                                                    quizList.questions[counter].correctAnswer,
                                                                    counter
                                                                )
                                                            }
                                                        >
                                                            Next
                                                        </Button>
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
                                                </Card>
                                            </div>
                                        </>
                                    )
                                    }
                                </>
                            )}
                            {/* {showExamResult && <Exam />} */}
                        </div >
                    </div>
                </div>) : (
                <ExamOriginalPage />
            )}


        </div>

    );
};
export default ExamPage;
