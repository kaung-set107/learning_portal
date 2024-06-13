import Countdown from "react-countdown";
// import { quiz } from "./quiz";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import _isEqual from 'lodash/isEqual';
import { useState, useEffect } from "react";
import { Card, Button, Spinner, Image, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Divider } from "@nextui-org/react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useLocation, useNavigate, Link } from "react-router-dom";
import apiInstance from "../../../../util/api";
import { Time } from "../../../../util/secondtomin";
// import Swal from 'sweetalert2';
import ResultUFO from '../../../../assets/img/ufo.gif'
import Loading from '../../../../assets/img/finalloading.gif'
import { getFile } from "../../../../util";
import Placement from '../../../../assets/img/placementGIF.gif'
// import Result from './result'
const FunQuizPage = () => {

    const location = useLocation()

    const QuizData = location.state.FunQuizData
    const Subid = location.state.SubID
    // console.log(studentID, 'FunQuizData')
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [arr, setArr] = useState([]);
    const [timeLeft, setTimeLeft] = useState('');
    const [timer, setTimer] = useState(0);
    const [clicked, setClicked] = useState("");

    const navigate = useNavigate();
    // const LMID = location.pathname.split("/")[2];
    const [index, setIndex] = useState("");

    const [selectedOption, setSelectedOption] = useState("");
    const [disabledQuiz, setDisabledQuiz] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [quizData, setQuizData] = useState([]);
    const [showTimer, setShowTimer] = useState(false);
    const [isCorrect, setIsCorrect] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    let [points, setPoints] = useState(null);
    const [counter, setCounter] = useState(0);
    const [quizList, setQuizList] = useState(QuizData?.questionData[0]);
    const [nextAnswer, setNextAnswer] = useState(false);
    const [showOrigin, setShowOrigin] = useState(true);
    const [trueAnswerList, setTrueAnswerList] = useState([]);
    // const [trueAnswer, setTrueAnswer] = useState('')
    // const [studentID, setStudentID] = useState("");
    const [multiTrueAnswerList, setMultiTrueAnswerList] = useState([]);
    const [showToast, setShowToast] = useState(true)
    const [multiAns, setMultiAns] = useState([])
    const [count, setCount] = useState('')
    const [number, setNumber] = useState(0);
    const [loading, setLoading] = useState(true)
    setTimeout(() => {
        setLoading(false);
    }, 3000);

    const [size, setSize] = useState('')

    const [studentAnswerList, setStudentAnswerList] = useState([]);
    // const arrList = [...arr, trueAnswerList.filter((el) => el.id === quizList.questions[counter]._id)[1]]
    // console.log(trueAnswerList.filter((el) => el.id === quizList.questions[counter]._id)[0], 'true ori');


    // console.log(trueAnswerList, 'true list');
    // console.log(trueAnswerList[counter]?.studentAnswer?.length, 'st list');
    const TotalMark = trueAnswerList.map((i) => i.markTotal)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    // console.log(TotalMark, "trueF mark");

    const notify = () => toast.error("You are Fail!");
    const handleShowFail = () => {
        setShowToast(true)
        setShowTimer(false)
        notify()
    }
    //Multiple
    // console.log(multiTrueAnswerList.filter(el => el.id), 'last mul')
    const MulTotalMark = multiTrueAnswerList.filter(el => el.id).map((i) => i.markTotal).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    // console.log(MulTotalMark, "mul mark");


    const displayCorrect = (correct) => {
        let correct_msg = correct ? "correct" : "incorrect";
        // console.log("Answer was " + correct_msg);
    };
    useEffect(() => {
        localStorage.getItem(
            "data",

        );
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

    }, [count, showTimer]);


    const handleStart = () => {
        // setShowTimer(true);
        setShowTimer(prev => !prev);
    }

    const nextQuestion = (studentAnswer, cas, ind) => {
        //cas

        setNumber(0)
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

            let answerObj = correctList.every(item => studentAnswerList.filter((el) => el.id === quizList.questions[counter]._id)[quizList.questions[counter].correctAnswer.length]?.studentAnswer.slice(-(quizList.questions[counter].correctAnswer.length)).includes(item))  // To know two arrays's items same?
            // console.log(answerObj, 'slice in next')


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

        // console.log(studentAnswerList, 'studentAnswerList');

        // console.log(studentAnswerList.filter(el => quizList.questions.find(i => i._id === el.id)), 'studentAnswerList')
        //Quiz-Result Create


        const data = {
            answerDate: Date.now(),
            timeTaken: parseInt(timer),
            updatedQuestionData: QuizData.questionData.map((first) => {
                return {
                    instruction: first.instruction,
                    paragraph: first.paragraph.map((i) => (i)),
                    questions: first.questions.map((i) => {
                        return {
                            question: i.question,
                            type: i.type,
                            mark: i.mark,
                            images: i.images,
                            options: i.options,
                            answerType: i.answerType,
                            correctAnswer: i.correctAnswer,
                            studentAnswer: i.type === 'trueFalse' ? studentAnswerList.filter((el) => el.id === i._id)[0]
                                ?.studentAnswer : studentAnswerList.filter((el) => el.id === i._id)[0]?.studentAnswer.slice(-(i.correctAnswer.length)),
                        };
                    }),
                };
            }),
            totalMark: TotalMark + MulTotalMark,
            status: ((TotalMark + MulTotalMark) === quizData.passMark && "pass") || ((TotalMark + MulTotalMark) > quizData.passMark && "credit") || ((TotalMark + MulTotalMark) < quizData.creditMark && "fail"),
        };
        localStorage.setItem(
            "formSubmission",
            data
        );
        // console.log(data, 'res')
        navigate("/fun-quiz-res", { state: { FunQuizRes: data } });
        localStorage.removeItem("formSubmission");

        setShowOrigin(false);
        setShowResult(true);
    };

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

            setIsCorrect("Correct");
        } else {
            // setStudentAnswer(val + 1)
            setIsCorrect("incorrect");
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

    const handleCheckboxSelect = (event, index, data, correct, counter, mark, counterId) => {
        setNextAnswer(false);
        setIndex(index + 1);
        // console.log(counter, 'll')

        if (event.target.checked) {

            setNumber(prevCount => prevCount + 1)
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

                // console.log(uniqueObjects, 'setMulTrueAnswerList')
                // console.log(quiz.questions.filter(el=>el.correctAnswer === val+1))
                setIsCorrect("Correct");
            } else {
                // setStudentAnswer(val + 1)
                setIsCorrect("incorrect");
            }

            // Create the main array and push the sub-arrays into it
            const mainArray = [...studentAnswerList, ...[{ studentAnswer: II, id: counterId }]];

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

    const handleQuizRes = (val) => {
        console.log(val)
        setSize(val)
        onOpen()
    }


    return (
        <div className='mx-auto'>

            <>
                <div>
                    {showToast && (
                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss={false}
                            draggable
                            pauseOnHover={false}
                            theme="dark"
                            transition:Flip
                        />
                    )}

                </div>
                {showOrigin && (
                    <>
                        {!showTimer && (
                            <>




                                {disabledQuiz[0]?.student?._id ? (
                                    <>
                                        {loading ? (
                                            <div className='flex flex-col gap-10 items-center pt-[40px]'>
                                                <Image src={Loading} className='transform-x-[-1] w-[350px] h-[250px]' />
                                                <span className='text-[20px] font-semibold'>
                                                    Please wait ... !
                                                </span>
                                            </div>

                                        ) : (
                                            <div className='flex gap-32 justify-start items-center' >
                                                <Image src={ResultUFO} className='w-[300px] h-[300px]' />
                                                <div className='flex flex-col gap-4 w-[400px]'>
                                                    <span className=' text-[20px] font-semibold'>You have already finished QUIZ.</span>
                                                    <div className=' hover:-translate-y-1 hover:scale-110 duration-500 flex justify-end'>
                                                        <Button color='primary' onPress={() => handleQuizRes('5xl')} className=''>See Result</Button>
                                                    </div>

                                                </div>
                                            </div>
                                        )}

                                    </>

                                ) : (
                                    <>
                                        {loading ? (
                                            <div className='flex flex-col gap-10 items-center pt-[40px]'>
                                                <Image src={Loading} className='transform-x-[-1] w-[350px] h-[250px]' />
                                                <span className='text-[20px] font-semibold'>
                                                    Please wait ... !
                                                </span>
                                            </div>

                                        ) : (
                                            <div className='flex justify-center font-serif bg-[#fbfcfe] shadow-lg rounded-lg  p-[20px] gap-20'>
                                                <div className='flex flex-col gap-10 pt-[20px] mt-[110px]'>
                                                    <span className='text-[35px] font-bold w-80'>
                                                        This is Fun Quiz will test your basic knowledge on IELTS
                                                    </span>
                                                    <div className='flex gap-2'>
                                                        <Button color='primary' variant='bordered'>
                                                            <Link to={'/home-sub-detail/' + Subid}>   Cancel</Link>

                                                        </Button>
                                                        {QuizData?.questionData[0] ? (
                                                            <Button color='primary' onClick={handleStart} size='md'>
                                                                Start Quiz
                                                            </Button>
                                                        ) : (
                                                            <Button color='light'>
                                                                Start Quiz <Spinner size='sm' />
                                                            </Button>
                                                        )}
                                                    </div>

                                                </div>
                                                <div className=''>
                                                    <Image src={Placement} className='w-[600px] h-[550px]' />
                                                </div>



                                            </div>
                                        )}
                                    </>

                                )

                                }



                            </>
                        )}

                        {showTimer && (
                            <>
                                <div className='h-[317px] container py-10'>
                                    <div className='p-[24px] border-1 border-[#10C278] rounded-[12px] flex flex-col gap-10'>
                                        <div className='flex justify-between'>
                                            <span className='text-[20px] font-semibold p-[10px]'>
                                                Question
                                            </span>
                                            <span className='flex justify-center text-[16px] text-[#BDFFE2] font-medium bg-[#10C278] rounded-[24px] p-[1px] w-[180px] items-center  text-center'>
                                                Mark {quizList.questions[counter].mark} out of{" "}
                                                {quizList.questions[counter].mark}{" "}
                                            </span>
                                            <span className='p-[20px] text-[20px] font-light'>
                                                Time : {Time(timer)}
                                            </span>
                                        </div>

                                    </div>
                                    {/* Qusetion And Answer Section */}
                                    <Card
                                        className='mt-5 p-[24px] border-1 border-[#10C278] rounded-[12px]'
                                        key={counter}
                                    >
                                        <div>
                                            <div className='flex gap-5  text-lg py-3 px-3'>
                                                <div>
                                                    <b>({counter + 1})</b> &nbsp;
                                                    {quizList.questions[counter].question}
                                                </div>


                                                <span className='underline'>(Choose <b className='text-[green]'>{quizList.questions[counter].correctAnswer.length}</b> answer!)</span>
                                            </div>
                                            <div>
                                                {/* {console.log(quizList.questions[counter]?.images[0], 'ima')} */}
                                                {quizList.questions[counter]?.images ? (<img src={getFile({ payload: quizList.questions[counter]?.images[0] })} className='w-[850px] h-[650px]' />) : ('')}

                                            </div>
                                            <div className='mt-5'>

                                                {quizList.questions[counter].options.map((e, i) => (
                                                    <>
                                                        {quizList.questions[counter].type === 'trueFalse' ? (
                                                            <div className='flex gap-2 text-[18px] font-normal'>
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
                                                                                className='w-[20px] h-[20px]'
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
                                                                        </div>



                                                                    )}
                                                                </div>
                                                                <span>  {e.answer}</span>
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
                                                                    <div className='flex gap-2 text-[18px] font-normal'>
                                                                        <div>

                                                                            {/* Multiple Choice Quiz */}
                                                                            <input
                                                                                type='checkbox'
                                                                                name='answer_group'
                                                                                value={e.answer}
                                                                                // checked={multiAns.map((i, ind) => (selectedItem.map((e, ine) => (ine === ind))))}
                                                                                disabled={
                                                                                    number >= quizList.questions[counter].correctAnswer?.length ? true : ''


                                                                                }
                                                                                className='w-[20px] h-[20px]'
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

                                                                        </div>
                                                                        <span> {e.answer}</span>
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
            </>




        </div >
    );
};
export default FunQuizPage;
