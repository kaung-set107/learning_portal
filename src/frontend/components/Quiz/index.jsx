
import Countdown from "react-countdown-simple";
import { quiz } from "./quiz";
import { useState } from "react";
import { Card, Button } from "@nextui-org/react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
export default function QuizPage() {
  const data = JSON.stringify(localStorage.getItem('data'))
console.log(data,'resssss')
 const [activeQuestion, setActiveQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  })
  console.log(quiz, "quiz");
  
  // console.log(filtered,'fil')
  // const [limit,setLimit]=useState(filtered)
  const [oneHour, setOneHour] = useState("");
  const [showTimer, setShowTimer] = useState(false);
  const [isCorrect, setIsCorrect] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  let [points, setPoints] = useState(null);
  let [counter, setCounter] = useState(null);
  const { question, choices } = quiz.questions[activeQuestion]

 const displayCorrect=(correct)=> {
    let correct_msg = correct ? "correct" : "incorrect";
    console.log("Answer was " + correct_msg);
  }

  const handleStart = () => {
    setShowTimer(true);
    setOneHour(
      new Date(new Date().setHours(new Date().getHours() + 1)).toISOString()
    );
  };

   const nextQuestion=(cas,ind)=>{
    console.log(cas,'cas')
    if (cas === null) {
      alert("Must select an answer before proceeding to the next question");
      return;
    }
  
    let answerObj = quiz.questions.filter(
      (ans,i) => i === ind
    )[0].correctAnswer === cas;
    console.log(answerObj,'answerobj')
    let updated_points = answerObj ? points + 1 : points;
    console.log(updated_points);
    setPoints(updated_points);
    let nextQuestion = counter + 1;
    if (counter < ind) {
      setCounter(nextQuestion);
    } else {
    
      setCounter(0);
    }
    // handleAns()
    displayCorrect(answerObj);
  }

  const handleAns = (val, ca,index) => {
    setShowAlert(true);
    console.log(val + 1, "val");
    console.log(ca, "ca");
    console.log(quiz.questions.map((el) => el.correctAnswer));
    if (val + 1 === parseInt(ca)) {
      // console.log(quiz.questions.filter(el=>el.correctAnswer === val+1))
      setIsCorrect("Correct");
    } else {
      setIsCorrect("incorrect");
    }
  };
  console.log(
    new Date(new Date().setHours(new Date().getHours() + 1)).toISOString(),
    "ho"
  );

  return (
    <div className="flex justify-center">
      {!showTimer && (
        <>
          <Card className="mt-5 p-5 w-96">
            <h3 className="font-semibold text-xl">Quiz</h3>
            <p>{quiz.questions.length} Questions</p>
            <p className="py-3">{quiz.quizSynopsis}</p>
            <div className="rounded-md mt-5">
              <Button color="secondary" size="md" onClick={handleStart}>
                Start Quiz
              </Button>
            </div>
          </Card>
        </>
      )}

      {/* <Quiz quiz={quiz} shuffle={true}  showInstantFeedback={true}/> */}

      {showTimer && (
        <>
          <div>
            Timer : <Countdown targetDate={oneHour} />
          </div>
          <div>
            {quiz.questions.slice(0, 1).map((item, index) => (
              <>
                {showAlert &&
                  (isCorrect === "Correct" ? (
                    <div className="mt-3">
                      <Stack sx={{ width: "50%" }}>
                        <Alert variant="outlined" severity="success">
                          This is an Correct alert — check it out!
                        </Alert>
                      </Stack>
                    </div>
                  ) : (
                    <div className="mt-3">
                      <Stack sx={{ width: "50%" }}>
                        <Alert variant="outlined" severity="error">
                          This is an error alert — check it out!
                        </Alert>
                      </Stack>
                    </div>
                  ))}

                <Card className="mt-5 p-5 mb-10" key={index}>
                  <div>
                    <div className="text-lg py-3">
                      <b>({index + 1})</b> &nbsp;
                      {item.question}({item.point})
                    </div>
                    <div>
                      <img src={item.questionPic}/>
                    </div>
                    <div className='mt-5'>
                      {item.answers.map((e, i) => (
                        <div
                          key={i}
                          className="text-lg font-semibold ml-10"
                          onClick={() => handleAns(i, item.correctAnswer,index)}>
                   
        <label>
          <input
            type="radio"
            name="answer_group"
            className="answer"
            value={e.ans}
            // onChange={checkAnswer}
          />
          &nbsp;
          {e.ans}
        </label>

                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Button color='secondary' size='sm' className='ml-10 rounded-md mt-3' onClick={()=>nextQuestion(item.correctAnswer,index)}>Next</Button>
                  </div>
                </Card>
              </>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
