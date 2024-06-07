import Countdown from "react-countdown";
// import { quiz } from "./quiz";
import _isEqual from 'lodash/isEqual';
import { useState, useEffect } from "react";
import { Card, Button, Spinner, Image } from "@nextui-org/react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { Link, useLocation, useNavigate } from "react-router-dom";
import apiInstance from "../../../util/api";
import Placement from '../../../assets/img/placementGIF.gif'
import EHome from '../../../assets/img/EllipseHome.png'
import EHalf from '../../../assets/img/EllipseHalf.png'
import ResultPage from "./result";
// import Swal from 'sweetalert2';
// import Result from './result'
function EntranceTestPage() {
    const location = useLocation();
    // const { state } = props.location;
    // const { entranceTestID, enrollID, batchID } = state;
    // console.log(location.state.entranceID, 'e')
    const subjectID = location.state.entranceID._id
    const QuizID = location.state.entranceID.entranceTests[0].quiz
    const entranceID = location.state.entranceID.entranceTests[0]._id
    const batchID = location.state.batchID
    // const enrollID = location.state.enrollID

    const [timeLeft, setTimeLeft] = useState("");
    const [clicked, setClicked] = useState("");
    const [number, setNumber] = useState(0);
    const [count, setCount] = useState('')
    const [multiTrueAnswerList, setMultiTrueAnswerList] = useState([]);
    const [showToast, setShowToast] = useState(true)

    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState("");
    // const LMID = location.pathname.split("/")[2];
    const [index, setIndex] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    const [selectedCheckbox, setSelectedCheckbox] = useState("");
    const [arr, setArr] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [oneHour, setOneHour] = useState("");

    const [isCorrect, setIsCorrect] = useState("");

    let [points, setPoints] = useState(null);
    const [counter, setCounter] = useState(0);
    const [quizList, setQuizList] = useState([]);
    const [studentID, setStudentID] = useState("");
    const [nextAnswer, setNextAnswer] = useState(false);
    const [showOrigin, setShowOrigin] = useState(true);
    const [showTimer, setShowTimer] = useState(false);
    const [trueAnswerList, setTrueAnswerList] = useState([]);
    const [studentAnswerList, setStudentAnswerList] = useState([]);
    // const [trueAnswer, setTrueAnswer] = useState('')

    const [studentAnswer, setStudentAnswer] = useState("");
    const [caList, setCaList] = useState([])
    const [multiAns, setMultiAns] = useState([])

    // const multiAnswerList = multiAns.map((i, ind) => {
    //   return {
    //     ans: i.ans,
    //     id: i.id
    //   }
    // })

    // const sameList = [...arr, multiAnswerList]
    // console.log(sameList, 'sameList')

    // const [multiAnswerList, setMultiAnswerList] = useState([])
    const [final, setFinal] = useState('')


    // const arrList = [...arr, trueAnswerList.filter((el) => el.id === quizList.questions[counter]._id)[1]]
    console.log([...arr, trueAnswerList.filter((el) => el.id === quizList.questionData[0].questions[counter]._id)[1]], 'true ori');


    // console.log(trueAns, 'fix true');
    const TotalMark = trueAnswerList.map((i) => i.markTotal)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    console.log(TotalMark, "time");

    const MulTotalMark = multiTrueAnswerList.filter(el => el.id).map((i) => i.markTotal).reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    const displayCorrect = (correct) => {
        let correct_msg = correct ? "correct" : "incorrect";
        // console.log("Answer was " + correct_msg);
    };
    useEffect(() => {
        const item = localStorage.getItem('hello');
        // Update state with the retrieved item
        // setStoredItem(item);
        console.log(item, 'under its array')
        // const final = caList.every(item => multiAns.includes(item))
        // setFinal(final)
        // console.log(final, 'hee hee')

        // setMultiAnswerList(multiAnswerList)
        const getQuiz = async () => {
            await apiInstance.get("quizzes").then((res) => {
                if (
                    res.data.data.filter((el) => el._id === QuizID)[0] !==
                    undefined
                ) {
                    setQuizList(
                        res.data.data.filter((el) => el._id === QuizID)[0]
                    );
                    console.log(res.data.data.filter((el) => el._id === QuizID)[0], 'quizList')
                    setTimeLeft(
                        res.data.data.filter((el) => el._id === QuizID)[0]
                            .duration * 60
                    );
                }

                // console.log(
                //   res.data.data.filter((el) => el.learningMaterial === LMID)[0],
                //   "att"
                // );
                //   setPages(res.data._metadata.page_count)
            });
        };
        getQuiz();


        const dataFromLocalStorage = localStorage.getItem("id");
        // console.log(dataFromLocalStorage,'local')

        // setQuizList(res.data.data.filter(el=>el.instructor))
        // console.log((dataFromLocalStorage),'hello')
        setStudentID(dataFromLocalStorage);
        //   setPages(res.data._metadata.page_count)

    }, []);
    const handleOptionSelect = (option) => {
        console.log(option, "option");

        setSelectedOption(option);
    };

    const handleCheckboxSelectAnswer = (option) => {
        console.log(option, "option");

        setSelectedCheckbox(option);
    };



    const handleStart = () => {
        setShowTimer(true);

        const timerInterval = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime === 0) {
                    clearInterval(timerInterval);

                    nextQuestion();
                    return 10; // Reset timer for the next question
                }
                return prevTime - 1;
            });
        }, 1000);

        // Clear interval when the component unmounts or when moving to the next question
        return () => clearInterval(timerInterval);
    };

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
        if (quizList.questionData[0].questions[counter].type === 'multipleChoice') {


            const correctList = cas?.map((i) => (parseInt(i))) //To change Int in array's items

            let answerObj = correctList.every(item => studentAnswerList.filter((el) => el.id === quizList.questionData[0].questions[counter]._id)[quizList.questionData[0].questions[counter].correctAnswer.length]?.studentAnswer.slice(-(quizList.questionData[0].questions[counter].correctAnswer.length)).includes(item))  // To know two arrays's items same?
            // console.log(answerObj, 'slice in next')


            let updated_points = answerObj ? points + 1 : points;       // If we true,we increase mark
            // console.log(updated_points, 'point');

            setPoints(updated_points);
            let nextQuestion = counter + 1;

            if (nextQuestion < quizList.questionData[0].questions.length) {
                setCounter(nextQuestion);
            } else {
                setCounter(0);
                if (((TotalMark + MulTotalMark) === quizList.passMark && "pass") || ((TotalMark + MulTotalMark) > quizList.passMark && "credit")) {
                    handleResult();
                } else {
                    handleShowFail()
                }

                // console.log(TotalMark, "in next");
            }

            // handleAns()
            displayCorrect(answerObj);
        } else {
            let answerObj = quizList.questionData[0].questions[counter].correctAnswer === cas
            // console.log(answerObj, 'answerobj')
            let updated_points = answerObj ? points + 1 : points;
            // console.log(updated_points, 'point');
            setPoints(updated_points);
            let nextQuestion = counter + 1;

            if (nextQuestion < quizList.questionData[0].questions.length) {
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
            // enrollment: enrollID,
            quiz: QuizID,
            student: studentID,
            batch: batchID,
            subject: subjectID,
            // entranceTest: entranceID,
            answerDate: Date.now(),
            updatedQuestionData: quizList.questionData.map((first) => {
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
            totalMark: quizList.questionData[0].questions[counter].type === 'trueFalse' ? TotalMark : points,
            status: quizList.questionData[0].questions[counter].type === 'trueFalse' ? (TotalMark === quizList.passMark && "pass") || (TotalMark > quizList.passMark && "distinction") || ((TotalMark < quizList.passMark && TotalMark === quizList.creditMark) && "credit") || (TotalMark < quizList.creditMark && "fail") : (points >= quizList.passMark ? "pass" : "fail"),
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
        setShowResult(true);
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


    const displayMinutes = Math.floor(timeLeft / 60);
    const displaySeconds = timeLeft % 60;
    return (
        <div className='mx-20 py-10'>
            {showOrigin && (
                <>
                    {!showTimer && (
                        <div className='flex justify-center font-serif bg-[#fbfcfe] shadow-lg rounded-lg  p-[20px] gap-20 '>
                            <img
                                src={EHome}
                                className='absolute top-0 left-0 -z-40 w-[100px] md:w-[150px]'
                                alt=''
                            />
                            <div className='flex flex-col gap-10 pt-[20px] mt-[110px]'>
                                <span className='text-[35px] font-bold w-80'>
                                    This placement test will test your basic knowledge on IELTS
                                </span>
                                <div className='flex gap-2'>
                                    <Button color='primary' variant='bordered'>
                                        <Link to='/student'>   Cancel</Link>

                                    </Button>
                                    {quizList.questionData ? (
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
                            <img
                                src={EHalf}
                                className='absolute bottom-0 right-0 -z-10 w-[100px] md:w-[150px]'
                                alt=''
                            />
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
                                            Mark {quizList.questionData[0].questions[counter].mark} out of{" "}
                                            {quizList.questionData[0].questions[counter].mark}{" "}
                                        </span>
                                        <span className='p-[20px] text-[20px] font-light w-[200px]'>
                                            Time : {displayMinutes < 10 ? "0" : ""}
                                            {displayMinutes}:{displaySeconds < 10 ? "0" : ""}
                                            {displaySeconds}
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
                                            {quizList.questionData[0].questions[counter].question}
                                        </div>
                                        <div>
                                            <img src={quizList.questionData[0].questions[counter].questionPic} />
                                        </div>
                                        <div className='mt-5'>

                                            {quizList.questionData[0].questions[counter].options.map((e, i) => (
                                                <>
                                                    {quizList.questionData[0].questions[counter].type === 'trueFalse' ? (
                                                        < div
                                                            key={i}
                                                            className='text-lg font-semibold ml-10'
                                                            onClick={() =>
                                                                handleAns(
                                                                    i,
                                                                    e,
                                                                    quizList.questionData[0].questions[counter].correctAnswer,
                                                                    counter,
                                                                    quizList.questionData[0].questions[counter].mark,
                                                                    quizList.questionData[0].questions[counter]._id

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
                                                                                quizList.questionData[0].questions[counter].correctAnswer,
                                                                                counter,
                                                                                quizList.questionData[0].questions[counter].mark,
                                                                                quizList.questionData[0].questions[counter]._id
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
                                                    quizList.questionData[0].questions[counter].correctAnswer,
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
            {/* {showResult && <ResultPage />} */}
        </div >
    );
};
export default EntranceTestPage;
