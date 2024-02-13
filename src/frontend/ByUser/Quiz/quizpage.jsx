import Countdown from "react-countdown";
// import { quiz } from "./quiz";

import { useState, useEffect } from "react";
import { Card, Button, Spinner } from "@nextui-org/react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useLocation, useNavigate } from "react-router-dom";
import apiInstance from "../../../util/api";
import ResultPage from "./result";
// import Swal from 'sweetalert2';
// import Result from './result'
const QuizPage = ({ LMID }) => {
  const [timeLeft, setTimeLeft] = useState("");
  const [clicked, setClicked] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  // const LMID = location.pathname.split("/")[2];
  const [index, setIndex] = useState("");

  const [selectedOption, setSelectedOption] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [oneHour, setOneHour] = useState("");
  const [showTimer, setShowTimer] = useState(false);
  const [isCorrect, setIsCorrect] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  let [points, setPoints] = useState(null);
  const [counter, setCounter] = useState(0);
  const [quizList, setQuizList] = useState([]);
  const [nextAnswer, setNextAnswer] = useState(false);
  const [showOrigin, setShowOrigin] = useState(true);
  const [trueAnswerList, setTrueAnswerList] = useState([]);
  // const [trueAnswer, setTrueAnswer] = useState('')
  const [studentID, setStudentID] = useState("");
  const [studentAnswer, setStudentAnswer] = useState("");
  const [studentAnswerList, setStudentAnswerList] = useState([]);
  const TotalMark = trueAnswerList
    .map((i) => i.markTotal)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  // console.log(TotalMark, "time");
  const displayCorrect = (correct) => {
    let correct_msg = correct ? "correct" : "incorrect";
    // console.log("Answer was " + correct_msg);
  };

  const handleOptionSelect = (option) => {
    console.log(option, "option");

    setSelectedOption(option);
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
    setClicked("");
    setNextAnswer(true);
    setIndex(""); //to check incorrect or correct answer
    if (cas === null) {
      alert("Must select an answer before proceeding to the next question");
      return;
    }

    let answerObj =
      quizList.questions.filter((ans, i) => i === ind)[0]?.correctAnswer ===
      cas;
    //console.log(answerObj, 'answerobj')
    let updated_points = answerObj ? points + 1 : points;
    //console.log(updated_points, 'point');
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
  };

  const handleResult = () => {
    //Quiz-Result Create
    const data = {
      quiz: quizList._id,
      student: studentID,
      answerDate: Date.now(),
      updatedQuestions: quizList.questions.map((i) => {
        return {
          question: i.question,
          type: i.type,
          mark: i.mark,

          options: i.options,
          answerType: i.answerType,
          correctAnswer: i.correctAnswer,
          studentAnswer: studentAnswerList.filter((el) => el.id === i._id)[0]
            ?.studentAnswer,
        };
      }),
      totalMark: TotalMark,
      status: TotalMark >= quizList.passMark ? "pass" : "fail",
    };
    // alert(JSON.stringify(data));
    apiInstance
      .post("quiz-results", data)
      .then(function () {
        // Swal.fire({
        //   icon: "success",
        //   title: "Created Quiz Successful",
        //   text: "Nice!",
        //   confirmButtonText: "OK",
        //   confirmButtonColor: "#3085d6",
        // });
        navigate("/quiz-result");
      })
      .catch((error) => {
        alert(error);
      });

    localStorage.removeItem("formSubmission");

    setShowOrigin(false);
    setShowResult(true);
  };
  const handleAns = (val, ca, index, mark, id) => {
    setNextAnswer(false);
    setClicked(true);
    setShowAlert(true);
    setIndex(val);

    if (val + 1 === parseInt(ca)) {
      // setStudentAnswer(val + 1)
      const newFormSubmissions = [...trueAnswerList];
      newFormSubmissions.push({
        correct: parseInt(ca),
        markTotal: mark,
        studentAnswer: val + 1,
      });

      localStorage.setItem(
        "formSubmission",
        JSON.stringify(newFormSubmissions)
      );

      setTrueAnswerList(newFormSubmissions);

      // console.log(newFormSubmissions,'new')
      // console.log(quiz.questions.filter(el=>el.correctAnswer === val+1))
      setIsCorrect("Correct");
    } else {
      // setStudentAnswer(val + 1)
      setIsCorrect("incorrect");
    }
    const newFormSubmissionsforStudentAnswer = [...studentAnswerList];
    newFormSubmissionsforStudentAnswer.push({ studentAnswer: val + 1, id: id });

    localStorage.setItem(
      "studentformSubmission",
      JSON.stringify(newFormSubmissionsforStudentAnswer)
    );

    setStudentAnswerList(newFormSubmissionsforStudentAnswer);
  };

  useEffect(() => {
    const getQuiz = async () => {
      await apiInstance.get("quizzes").then((res) => {
        if (
          res.data.data.filter((el) => el.learningMaterial === LMID)[0] !==
          undefined
        ) {
          setQuizList(
            res.data.data.filter((el) => el.learningMaterial === LMID)[0]
          );
          setTimeLeft(
            res.data.data.filter((el) => el.learningMaterial === LMID)[0]
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
  const displayMinutes = Math.floor(timeLeft / 60);
  const displaySeconds = timeLeft % 60;
  return (
    <div className='mx-auto'>
      {showOrigin && (
        <>
          {!showTimer && (
            <div className='bg-[#EBF0FF] rounded-lg w-full h-[auto] p-[20px] flex flex-col gap-20'>
              <span className='w-[902px] h-[24px] text-[20px] font-semibold'>
                This quiz will test your basic knowledge on IELTS
              </span>
              <div className='flex justify-end gap-2'>
                <Button color='primary' variant='bordered'>
                  Cancel
                </Button>
                {quizList.questions ? (
                  <Button color='primary' onClick={handleStart}>
                    Start Quiz
                  </Button>
                ) : (
                  <Button color='light'>
                    Start Quiz <Spinner size='sm' />
                  </Button>
                )}
              </div>
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
                    <span className='text-[16px] text-[#BDFFE2] font-medium bg-[#10C278] rounded-[24px] pt-[22px] w-[180px]  text-center'>
                      Mark {quizList.questions[counter].mark} out of{" "}
                      {quizList.questions[counter].mark}{" "}
                    </span>
                    <span className='p-[20px] text-[20px] font-light'>
                      Time : {displayMinutes < 10 ? "0" : ""}
                      {displayMinutes}:{displaySeconds < 10 ? "0" : ""}
                      {displaySeconds}
                    </span>
                  </div>

                  {showAlert &&
                    (isCorrect === "Correct" ? (
                      <div className='mt-3'>
                        <Stack sx={{ width: "50%" }}>
                          <Alert variant='outlined' severity='success'>
                            This answer is Correct !
                          </Alert>
                        </Stack>
                      </div>
                    ) : (
                      <div className='mt-3'>
                        <Stack sx={{ width: "50%" }}>
                          <Alert variant='outlined' severity='error'>
                            This answer is InCorrect !
                          </Alert>
                        </Stack>
                      </div>
                    ))}
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
                        <div
                          key={i}
                          className='text-lg font-semibold ml-10'
                          onClick={() =>
                            handleAns(
                              i,
                              quizList.questions[counter].correctAnswer,
                              counter,
                              quizList.questions[counter].mark,
                              quizList.questions[counter]._id
                            )
                          }
                        >
                          {showTimer && (
                            <div>
                              <input
                                type='radio'
                                name='answer_group'
                                value={e.answer}
                                disabled={
                                  clicked === ""
                                    ? ""
                                    : selectedOption === e.answer
                                    ? ""
                                    : true
                                }
                                onChange={(e) =>
                                  handleOptionSelect(e.target.value)
                                }
                              />
                              &nbsp;
                              <button
                                className={
                                  isCorrect === "Correct"
                                    ? index === i && "text-[green]"
                                    : index === i && "text-[red]"
                                }
                                value={e.answer}
                                disabled={
                                  clicked === ""
                                    ? ""
                                    : selectedOption === e.answer
                                    ? ""
                                    : true
                                }
                                onChange={(e) =>
                                  handleOptionSelect(e.target.value)
                                }
                              >
                                {e.answer}
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className='py-3'>
                    {showAlert ? (
                      <Button
                        color='secondary'
                        size='sm'
                        className='ml-10 rounded-md mt-3'
                        onClick={() =>
                          nextQuestion(
                            studentAnswer,
                            quizList.questions[counter].correctAnswer,
                            counter
                          )
                        }
                      >
                        Next
                      </Button>
                    ) : (
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
                    )}
                  </div>
                </Card>
              </div>
            </>
          )}
        </>
      )}
      {/* {showResult && <ResultPage />} */}
    </div>
  );
};
export default QuizPage;
