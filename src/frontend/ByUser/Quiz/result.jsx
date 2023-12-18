import { useEffect, useState } from 'react'
import { Card, Button, Tooltip } from "@nextui-org/react";
import apiInstance from '../../../util/api';
import QuizPhoto from '../../../assets/quiz.webp'
import { useNavigate } from 'react-router-dom';
import Alert from "@mui/material/Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";

import Stack from "@mui/material/Stack";
export default function Result() {
    const dataFromLocalStorage = localStorage.getItem('id');
    const navigate = useNavigate()
    const [quizResult, setQuizResult] = useState([])
    const [quizList, setQuizList] = useState([])
    const [quizID, setQuizID] = useState('')
    // console.log(quizID, 'id')

    useEffect(() => {

        // console.log(dataFromLocalStorage, 'local')
        const getResult = async () => {
            await apiInstance
                .get('quiz-results')
                .then(res => {

                    //console.log(res.data.data.filter(el => el.student === dataFromLocalStorage)[res.data.data.filter(el => el?.student === dataFromLocalStorage).length - 1].quiz, 'ID')
                    setQuizID(res.data.data.filter(el => el.student === dataFromLocalStorage)[res.data.data.filter(el => el?.student === dataFromLocalStorage).length - 1].quiz)
                    console.log(res.data.data.filter(el => el?.student === dataFromLocalStorage)[res.data.data.filter(el => el?.student === dataFromLocalStorage).length - 1].updatedQuestions, 'result')
                    setQuizResult(res.data.data.filter(el => el?.student === dataFromLocalStorage)[res.data.data.filter(el => el?.student === dataFromLocalStorage).length - 1])
                    //   setPages(res.data._metadata.page_count)
                })
        };
        getResult();
        const getQuizz = async () => {
            // console.log(quizID, 'iddd')
            await apiInstance
                .get('quizzes')
                .then(res => {
                    //   window.location.reload()

                    // console.log(res.data.data.filter(el=>el?.student === dataFromLocalStorage)[res.data.data.filter(el=>el?.student === dataFromLocalStorage).length - 1],'result')
                    setQuizList(res.data.data)
                    //   setPages(res.data._metadata.page_count)
                })
        };
        getQuizz();


    }, [setQuizResult, setQuizID])
    const handleBack = () => {
        // console.log(quizList.filter(el => el._id === quizID).map((i) => {
        //     return {
        //         lmID: i.learningMaterial
        //     }
        // })[0].lmID, 'lmis')
        const BackID = quizList.filter(el => el._id === quizID).map((i) => {
            return {
                lmID: i.learningMaterial
            }
        })[0].lmID
        navigate(`/quiz-page/${BackID}`)
    }
    return (
        <div className='mx-8 mt-5 mb-5'>
            <Card>
                <div className='py-3 mt-3' >
                    <Tooltip content="Back to Quiz ">
                        <Button color='light' className='ml-10 rounded-md mt-3' onClick={() => handleBack()} ><FontAwesomeIcon icon={faCircleLeft} size='2xl' /></Button>
                    </Tooltip>
                </div >
                <div className='px-3 py-3'>
                    <h2 className='font-semibold text-3xl text-center mt-3'>Quiz Result</h2>
                    <div className='px-5 py-3 grid grid-cols-2 gap-3 mt-5' >
                        <div className='col-4'>
                            <img src={QuizPhoto} style={{ width: '350px' }} />
                        </div>
                        <div className='offset-2 col-4 font-semibold text-2xl'>
                            <div className='text-center mt-20'>

                                <div>Your mark is <b className={quizResult.status === 'fail' ? 'text-red-600' : 'text-green-600'}>{quizResult.totalMark} Mark</b>.<br></br>Your pass mark is &nbsp;
                                    <b className={quizResult.status === 'fail' ? 'text-red-600' : 'text-green-600'}>{(quizList.filter(el => el._id === quizID)).map((i) => (i.passMark))}</b>.
                                    {quizResult?.status === 'fail' ? 'Sorry' : 'Nice'} , you  <b className={quizResult.status === 'fail' ? 'text-red-600' : 'text-green-600'}>{quizResult.status}</b>.</div>
                            </div>

                        </div>

                    </div>

                </div>
                {/* <div className='py-5 px-5 text-center'>
                    <h2 className='font-semibold text-3xl text-center mt-3'>You Answered</h2>
                    <div>
                        {console.log((quizResult), 'quest')}

                        <>
                            {quizResult.updatedQuestions.map((i) => (parseInt(i.correctAnswer) === parseInt(i.studentAnswer)) ? (
                                <>
                                    <div className="mt-3">
                                        <Stack sx={{ width: "50%" }}>
                                            <Alert variant="outlined" severity="success">
                                                This is an Correct Answer !
                                            </Alert>
                                        </Stack>
                                        <div className='block'>
                                            <div className='text-xl font-semibold'>{i.question}</div>
                                            <div>Your Answer : {i.studentAnswer}</div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="mt-3">
                                        <Stack sx={{ width: "50%" }}>
                                            <Alert variant="outlined" severity="error">
                                                This is an InCorrect Answer !
                                            </Alert>
                                        </Stack>
                                        <div className='block'>
                                            <div className='text-xl font-semibold'>{i.question}</div>
                                            <div>Your Answer : {i.studentAnswer}</div>
                                        </div>

                                    </div>
                                </>
                            ))}

                        </>


                    </div>
                </div > */}

            </Card >
        </div >
    )
}
