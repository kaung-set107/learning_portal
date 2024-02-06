import Countdown from "react-countdown";
// import { quiz } from "./quiz";

import { useState, useEffect } from "react";
import { Card, Button } from "@nextui-org/react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useLocation, useNavigate } from "react-router-dom";
import apiInstance from "../../../util/api";
// import Swal from 'sweetalert2';
// import Result from './result'
export default function QuizPage() {
  const [timeLeft, setTimeLeft] = useState("");
  const [clicked, setClicked] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const LMID = location.pathname.split("/")[2];
  const [index, setIndex] = useState("");

  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [oneHour, setOneHour] = useState("");
  const [showTimer, setShowTimer] = useState(false);
  const [isCorrect, setIsCorrect] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  let [points, setPoints] = useState(null);
  let [counter, setCounter] = useState(0);
  const [quizList, setQuizList] = useState([]);
  //const [showResult, setShowResult] = useState(false)
  const [showOrigin, setShowOrigin] = useState(true);
  const [trueAnswerList, setTrueAnswerList] = useState([]);
  // const [trueAnswer, setTrueAnswer] = useState('')
  const [studentID, setStudentID] = useState("");
  const [studentAnswer, setStudentAnswer] = useState("");
  const [studentAnswerList, setStudentAnswerList] = useState([]);

  console.log(studentAnswerList, "anass");
  // for (let i = 0; i < studentAnswerList.length; i++) {
  //   // const Stu = studentAnswerList[i]
  //   // setStudentAnswer(Stu)
  //   // student: studentAnswerList[i].studentAnswer
  //   // console.log(studentAnswerList[i].studentAnswer, 'ans');
  //   //setStudentAnswer(student)
  //   return {
  //     stu: studentAnswerList[i].studentAnswer
  //   }

  // }
  // console.log(stu, 'stu')
  // console.log(for (let i = 0; i < myArray.length; i++) {
  //   elements.push(<div key={i}>{myArray[i]}</div>);
  // })
  // const { question, choices } = quizList.questions[activeQuestion]
  console.log(trueAnswerList, "true");
  // console.log(quizList.questions.map((i) => {
  //   return {
  //     question:i.question,
  //     correctAnswer:i.correctAnswer,
  //     mark:i.mark,
  //     options:i.options,
  //     type:i.type
  //   }

  // }),'ques  ')
  const TotalMark = trueAnswerList
    .map((i) => i.markTotal)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  console.log(TotalMark, "time");
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
    // setOneHour(
    //   new Date(new Date().setHours(new Date().getHours() + 1)).toISOString()
    // );
    console.log(studentAnswerList, "answer lIst");
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
      console.log(TotalMark, "in next");
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
  };
  const handleAns = (val, ca, index, mark, id) => {
    setClicked(true);
    setShowAlert(true);
    setIndex(val);
    //console.log(val, 'val')
    //console.log(val + 1, 'val+1')

    // setTrueAnswer(parseInt(ca))
    // console.log(val + 1, "val");
    // console.log(ca, "ca");
    // console.log(mark, 'valll');

    // setFormData({
    //   username: '',
    //   email: '',
    // });

    // console.log(newFormSubmissions,'fix')
    // Clear the input field

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
        //   res.data.data.filter((el) => el.learningMaterial === LMID)[0] !==
        //     undefined
        //     ? res.data.data.filter((el) => el.learningMaterial === LMID)[0]
        //     : "helo",
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
    <div className='mx-8'>
      {showOrigin && (
        <>
          {!showTimer && (
            <>
              <Card className='mt-5 p-5'>
                <h3 className='font-semibold text-xl'>Quiz</h3>
                <p>
                  {quizList.questions ? quizList.questions.length : "0"} -
                  Questions
                </p>
                <p className='py-3'>{quizList.title}</p>
                <div className='rounded-md mt-5'>
                  {/* <Button color="secondary" size="md" disabled onClick={handleStart}>
            Start Quiz
          </Button>
          ) : ( */}
                  <Button color='secondary' size='md' onClick={handleStart}>
                    Start Quiz
                  </Button>
                </div>
              </Card>
            </>
          )}

          {/* <Quiz quiz={quiz} shuffle={true}  showInstantFeedback={true}/> */}

          {showTimer && (
            <>
              <div className='p-[20px] text-[20px] font-light'>
                Time : {displayMinutes < 10 ? "0" : ""}
                {displayMinutes}:{displaySeconds < 10 ? "0" : ""}
                {displaySeconds}
                {/* {console.log(quizList.duration * 60, "hi")} */}
              </div>
              <div className='h-[317px]'>
                {/* {quizList.questions[counter].map((item, index) => ( */}

                <div className='p-[24px] border-1 border-[#10C278] rounded-[12px] flex flex-col gap-10'>
                  <div className='flex flex-row gap-20'>
                    <span className='text-[20px] font-semibold p-[10px]'>
                      Question
                    </span>
                    <span className='text-[16px] text-[#BDFFE2] font-medium bg-[#10C278] rounded-[24px] p-[12px] w-[188px] text-center'>
                      Mark {quizList.questions[counter].mark} out of{" "}
                      {quizList.questions[counter].mark}{" "}
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
                          {/* {selectedOption ? (
          <label>
           <input
           type="radio"
           name="answer_group"
           className="answer"
           value={e.answer}
     disabled={true}
           onChange={() => handleOptionSelect(e)}  
         />
         &nbsp;
         {e.answer}
       </label>
      ) : (
        <label>
        <input
        type="radio"
        name="answer_group"
        className="answer"
        value={e.answer}

        onChange={() => handleOptionSelect(e)}
      />
      &nbsp;
      {e.answer}
    </label>
      )} */}
                          {showAlert ? (
                            <label>
                              <input
                                type='radio'
                                name='answer_group'
                                value={e.answer}
                              />
                              &nbsp;
                              <span
                                className={
                                  isCorrect === "Correct"
                                    ? index === i && "text-[green]"
                                    : index === i && "text-[red]"
                                }
                              >
                                {e.answer}
                              </span>
                            </label>
                          ) : (
                            <label>
                              <input
                                type='radio'
                                name='answer_group'
                                value={e.answer}
                              />
                              &nbsp;
                              <span>{e.answer}</span>
                            </label>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className='py-3'>
                    {clicked ? (
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
    </div>
  );
}
