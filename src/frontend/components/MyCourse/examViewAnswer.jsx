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
import { useEffect, useMemo, useState } from "react";

const ExamPage = ({ ViewData }) => {
    const location = useLocation();

    // console.log(ViewData.updatedQuestionData.map((i) => (i.questions.map((e) => (e.type === 'fillInTheBlank' ? e.studentAnswer.map((f) => (f)) : parseInt(e.studentAnswer) - 1)))), 'Hello')

    const [counter, setCounter] = useState(0);

    // const [quizList, setQuizList] = useState(ResData.quiz);
    const quizList = ViewData.updatedQuestionData
    // console.log(quizList)

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

                                                        <span className=''><b className='uppercase'>{secItem?.type === 'openQuestion' ? 'Open-Ended' : secItem?.type}</b> Question.</span>
                                                        <div className='text-lg py-3 px-3'>
                                                            <b>({secIndex + 1})</b> &nbsp;
                                                            {secItem.type === 'multipleChoice' ? `${secItem.question} ${`(Choose ${secItem.correctAnswer.length} answer)`}` : secItem.question}
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

                                                                    </div> : (secItem.type === 'fillInTheBlank' ?
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

                                                                        </div> : (
                                                                            <div className='text-lg font-semibold ml-10'>

                                                                                {/*Open Question */}

                                                                                <div className='flex flex-col gap-1'>




                                                                                    {/* Map over the inputArray and render input boxes */}
                                                                                    {Array.from({ length: secItem?.inputCount }, (_, index) => index).map((item, ind) => (
                                                                                        <div className='flex gap-1 '>
                                                                                            <span>({ind + 1})</span>
                                                                                            <Input key={item} type="text" placeholder='Answer' variant="underlined" value={secItem.type === 'openQuestion' && secItem.studentAnswer[secItem.studentAnswer.map((b, ib) => (ib)).indexOf(ind)]} className="rounded-md p-2 mb-2" onChange={(event) =>
                                                                                                handleOpenQuestion(event,
                                                                                                    ind,

                                                                                                    secItem?._id,
                                                                                                    secItem

                                                                                                )
                                                                                            } />
                                                                                        </div>

                                                                                    ))}


                                                                                </div>



                                                                            </div>
                                                                        )))}


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
