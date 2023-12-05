import React,{ useState, useEffect } from "react";
// import apiInstance from '../../../util/api';
import { Card, Button, Input,Modal, ModalContent, ModalHeader, ModalBody, CardBody, useDisclosure,CardHeader } from "@nextui-org/react";
import { faPlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { FileUploader } from "react-drag-drop-files";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import apiInstance from "../../../util/api";
// import { StepDescription } from "@chakra-ui/react";
import { useLocation } from "react-router";
export default function Quizcreate() {

  const ID = useLocation().pathname.split('/')[2]
  const [modalPlacement, setModalPlacement] = React.useState("center");
  const [scrollBehavior, setScrollBehavior] = React.useState("outside");
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [list, setList] = useState([]);
  const [modalData, setModalData] = useState([]);
  const [questionData,setQuestionData]=useState([])
  const [quizData,setQuizData]=useState([])

  const [answerList, setAnswerList] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [optionList, setOptionList] = useState([]);
  const [option, setOption] = useState([]);
  const [question, setQuestion] = useState('');
  const [questionNo, setQuestionNo] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState([]);
  const [correctSMS, setCorrectSMS] = useState("");
  const [inCorrectSMS, setInCorrectSMS] = useState("");
  const [correctAns, setCorrectAns] = useState("");
  const [marks, setMarks] = useState("");
  const [show,setShow]=useState(false)
  const [answerType,setAnswerType]=useState('')
  // console.log(list, "res list");
  const [finalQuizList, setFinalQuizList] = useState("");

  //Quiz Data
  const [title,setTitle]=useState('')
  const [quizType,setQuizType]=useState('')
  const [examDate,setExamDate]=useState('')
  const [duration,setDuration]=useState('')
  const [noOfQuestion,setNoOfQuestion]=useState('')
  const [totalMark,setTotalMark]=useState('')
  const [passMark,setPassMark]=useState('')
  const [creditMark,setCreditMark]=useState('')
  const [diMark,setDiMark]=useState('')
  const [desc,setDesc]=useState('')
  const [typeName,setTypeName]=useState('')

  // console.log(finalQuizList,'finalQuiz')
  const Add = (val) => {
    console.log(val, "val");
    const newData = {
      answer: val,
    };
    setAnswerList([...answerList, newData]);
    console.log([...answerList, newData], "res");
  };
  const Delete = async (val) => {
    console.log(val, "val");
    setAnswerList(answerList.filter((el, i) => i !== val));
  };

  //option
  const AddOption = (val) => {
    console.log(val, "val");
    const newData = {
      option: val,
    };
    setOptionList([...optionList, newData]);
    console.log([...optionList, newData], "res");
  };
  const DeleteOption = async (val) => {
    console.log(val, "val");
    setOptionList(optionList.filter((el, i) => i !== val));
  };

  //   const handleType=(val)=>{
  //     setType(val)
  //   }
  const handleInput=(e)=>{
    const { name, value } = e.target;
    setQuizData({
      ...quizData,
      [name]: value
    });
    console.log(
      {
        ...quizData,
      [name]: value
      },
      "form"
    );
  }
  const handleModalInput = (e) => {
  
    const { name, value } = e.target;
    // const opt = {
    //   options:optionList.map((i)=>{
    //     i.option
    //   })
    // }
    // console.log(opt,'opt')
    setModalData({
      ...modalData,
      [name]: value
    });
    console.log(
      {
        ...modalData,
      [name]: value
      },
      "form"
    );
  };

  const handleChange = (e) => {
    let array = [];
    for (const item of e) {
      array.push(item);
    }
    setImage(array);
  };


  const handleRemoveSubmission = (index) => {
    const newFormSubmissions = [...questionData];

    // Remove the item at the specified index
    newFormSubmissions.splice(index, 1);

    localStorage.setItem('formSubmission', JSON.stringify(newFormSubmissions));

    setQuestionData(newFormSubmissions);
  };


  //save in local storage from Modal Box
  const handleQuestionSave = (e) => {

    e.preventDefault(); // Create a copy of the existing form submissions arra
    const questionArr={
      question:question,
      questionNo:questionNo,
      type:type,
      mark:marks,
      correctAnswer:correctAns,
      options:answerList,
      answerType:answerType


    }
    const newFormSubmissions = [...questionData];
    newFormSubmissions.push(questionArr);

    localStorage.setItem('formSubmission', JSON.stringify(newFormSubmissions));

    setQuestionData(newFormSubmissions);

    // setFormData({
    //   username: '',
    //   email: '',
    // });

console.log(newFormSubmissions,'fix')
// Clear the input field

// setModalData([...modalData,...questionData])
// console.log([...modalData,...questionData],'quesDat')

  };

//Create quiz
  const createQuiz = () => {
    const data={
      title:title,
      // type:quizType,
      questions:questionData,
      examDate:examDate,
      duration:duration,
      numOfQuestions:noOfQuestion,
      totalMark:totalMark,
      passMark:passMark,
      creditMark:creditMark,
      distinctionMark:diMark,
      description:desc,
      status:'unfinished'
    
    }

if(typeName === 'Learning Material'){
  data.type='learningMaterial'
  data.learningMaterial=ID
}
// console.log(data,'quiz data')
apiInstance
  .post("quizzes", data
  )
  .then(function () {
    Swal.fire({
      icon: "success",
      title: "Created Quiz Successful",
      text: "Nice!",
      confirmButtonText: "OK",
      confirmButtonColor: "#3085d6",
    });
  })
  .catch((error) => {
    alert(error);
  });
  };
  // useEffect to retrieve data from localStorage on component mount
  useEffect(() => {
    const storedSubmissions = localStorage.getItem('formSubmission');
    console.log(storedSubmissions,'sub')
    if (storedSubmissions) {
      setQuestionData(JSON.parse(storedSubmissions));
    }

    const getLM = async () => {
      await apiInstance
        .get("learning-materials")
        .then((res) => {
            console.log(res.data.data.filter(el=>el._id === ID) ? 'LM' : '','ss da')
setTypeName(res.data.data.filter(el=>el._id === ID) ? 'Learning Material' : '')
          
        });
    };
    const getExam = async () => {
      await apiInstance
        .get("exams")
        .then((res) => {
            console.log(res.data.data.filter(el=>el._id === ID),'ss da')
setTypeName(res.data.data.filter(el=>el._id === ID) ? 'Exam' : '')
          
        });
    };
    getExam()
    getLM()
  }, []);

  const handleClearLocalStorage = () => {
    // Remove the item from localStorage
    localStorage.removeItem('formSubmission');

    // Update the state to clear the form submissions
    setQuestionData([]);
  };
  return (
    <div className="mx-8 py-5">
      <Card>
        <CardHeader className='font-semibold bg-cyan-300 py-5'><span className='text-2xl'>Quizz Create</span></CardHeader>
        <CardBody>
          {/* 1 */}
        <div className="grid grid-cols-2 gap-3 mt-10">
          <div>
          <Input
              type="text"
              className=""
              placeholder="Enter your title"
              label="Title"
              labelPlacement="outside"
              onChange={(e)=>setTitle(e.target.value)}
            />
          </div>
           
            <div className='mt-1'>
            <label>Date</label>
            <Input
              type="date"
              className=""
            
        
              // defaultValue={formData.questionNo}
              name="examDate"
              onChange={(e)=>setExamDate(e.target.value)}
            />
            </div>
           
          </div>
          <div className="grid grid-cols-2 gap-3 mt-10">
          <div>
          <Input
              type="number"
              className=""
              placeholder="Enter duration"
              label="Quiz Duration"
              labelPlacement="outside"
        
              onChange={(e)=>setDuration(e.target.value)}
            />
          </div>
           
            <div className='mt-1'>
         
            <Input
              type="number"
              className=""
              placeholder="Total questions"
        defaultValue=''
              label="Total Questions"
              labelPlacement="outside"
       
              onChange={(e)=>setNoOfQuestion(e.target.value)}
            />
            </div>
           
          </div>
          {/* 2 */}
          {/* <div className="grid grid-cols-2 gap-3 mt-10">
          <div>
          <Input
              type="number"
              className=""
              placeholder="Enter duration"
              label="Quiz Duration"
              labelPlacement="outside"
        
              onChange={handleInput}
            />
          </div>
           
            <div className='mt-1'>
         
            <Input
              type="number"
              className=""
              placeholder="Total questions"
        defaultValue=''
              label="Total Questions"
              labelPlacement="outside"
        
              // defaultValue={formData.questionNo}
              name="questionNo"
              onChange={handleInput}
            />
            </div>
           
          </div> */}

          {/* 3 */}
          <div className="grid grid-cols-2 gap-3 mt-10">
          <div>
          <Input
              type="number"
              className=""
              placeholder="Enter mark"
              label="Total Mark"
              labelPlacement="outside"
           
              onChange={(e)=>setTotalMark(e.target.value)}
            />
          </div>
           
            <div className='mt-1'>
         
            <Input
              type="number"
              className=""
              placeholder="Pass Mark"
        defaultValue=''
              label="Pass Mark"
              labelPlacement="outside"
       
              onChange={(e)=>setPassMark(e.target.value)}
            />
            </div>
           
          </div>
          {/* 4 */}
          <div className="grid grid-cols-2 gap-3 mt-10">
          <div>
          <Input
              type="number"
              className=""
              placeholder="Enter credit mark"
              label="Credit Mark"
              labelPlacement="outside"
     
              onChange={(e)=>setCreditMark(e.target.value)}
            />
          </div>
           
            <div className='mt-1'>
         
            <Input
              type="number"
              className=""
              placeholder="D mark"  
        defaultValue=''
              label="Distinction Mark "
              labelPlacement="outside"
      
              onChange={(e)=>setDiMark(e.target.value)}
            />
            </div>
           
          </div>
          {/* 5 */}
          <div className="grid grid-cols-2 gap-3 mt-10">
          <div>
          <Input
              type="text"
              className=""
              placeholder="Enter description"
              label="Description"
              labelPlacement="outside"
       
              onChange={(e)=>setDesc(e.target.value)}
            />
          </div>
           
          <div className="flex flex-col">
              <label>Type</label>
              <select
                className="form-control form-group h-11 rounded-lg mt-1"
                onChange={(e) => setQuizType(e.target.value)}>
                {/* <option hidden>Choose</option> */}
                {typeName === 'Learning Material' ? (<option value="learningMaterial">Learning Material</option>) : ''}
                {typeName === 'Exam' ? (<option value="exam">Exam</option>) : ''}
                {/* <option value="entrance">Entrance</option>
                <option value="exam">Exam</option>
                <option value="test">Test</option> */}
              </select>
            </div>
           
          </div>
          <div className="mt-10">
          <div className="grid grid-cols-2 gap-3 mt-10">
            <div>
            <Button onPress={onOpen} className='bg-cyan-300'> Questions Add  <FontAwesomeIcon icon={faPlus} color='black' /> </Button> &nbsp;
            <Button onClick={()=>setShow(!show)} className='bg-cyan-300'> Show Questions </Button>
            </div>
      
            </div>
        
            </div>
         
            <div className="flex justify-center mt-10">
            <Button className='bg-cyan-300' size="md" onClick={createQuiz}> 
              Create
            </Button>{" "}
            &nbsp;
            <Button color="danger" variant="light">
                  Close
                </Button>
               
          </div>
          {/* {console.log(questionData.map((i)=>i.question),'con')} */}
         {show && (
 <div>
 {questionData.map((i)=>
   <div key={i}>
{i.question}
<Button color="danger" variant="light" onClick={handleRemoveSubmission}>
       Remove
     </Button>
  </div>
 )}
    <Button color="danger" variant="light" onClick={handleClearLocalStorage }>
       All Clear
     </Button>
</div>
         )}
         
          
        </CardBody>
      </Card>
    
    <Modal backdrop='blur' style={{width:'100%'}} isOpen={isOpen} placement={modalPlacement} scrollBehavior={scrollBehavior} onOpenChange={onOpenChange} isDismissable={false} size='4xl'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-semibold bg-cyan-300 border-r-3"> Quiz Question Create</ModalHeader>
              <ModalBody>
             
 
          <div className="grid grid-cols-2 gap-3 mt-10">
            <Input
              type="text"
              className=""
              placeholder="Enter your question"
              label="Question"
              labelPlacement="outside"
              // defaultValue={formData.question}
              name="question"
              onChange={(e)=>setQuestion(e.target.value)}
            />
            <Input
              type="text"
              className=""
              placeholder="eg:(1,2,a,b,i,ii)"
              label="Question No"
              labelPlacement="outside"
              // defaultValue={formData.questionNo}
              name="questionNo"
              onChange={(e)=>setQuestionNo(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3 mt-10">
            <div className="flex flex-col">
              <label>Question Type</label>
              <select
                className="form-control form-group h-11 rounded-lg mt-1 border-b-2"
              name="type"
                onChange={(e)=>setType(e.target.value)}>
                <option hidden>Choose</option>
                <option value="trueFalse">True / False</option>
                <option value="multipleChoice">Multiple Choice</option>
                <option value="fillInTheBlank">Fill in Blank</option>
                <option value="openQuestion">Open Question</option>
              </select>
            </div>
            <Input
              type="number"
              className=""
              placeholder="eg:(1,2,3, only number)"
              label="Correct Answer"
              name='correctAnswer'
              labelPlacement="outside"
              onChange={(e)=>setCorrectAns(e.target.value)}
            />
            {/* <div className="">
              <label>Picture</label>
              <FileUploader
                multiple={true}
                handleChange={handleChange}
                name="file"
              />
            </div> */}
          </div>
          {/* <div className="grid grid-cols-2 gap-3 mt-10">
            <Input
              type="text"
              className=""
              name="correct"
              placeholder="eg:(Great! Correct Answer)"
              label="Correct Message"
              labelPlacement="outside"
              onChange={handleInput}
            />
            <Input
              type="text"
              className=""
              name="incorrect"
              placeholder="eg:(Sorry! Incorrect Answer)"
              label="Incorrect Message"
              labelPlacement="outside"
              onChange={handleInput}
            />
          </div> */}
          <div className="grid grid-cols-2 gap-3 mt-10">
            <Input
              type="number"
              className=""
              placeholder="eg:(2-mark)"
              label="Marks"
              labelPlacement="outside"
              name="mark"
              onChange={(e)=>setMarks(e.target.value)}
            />
             <div className="flex flex-col">
              <label>Answer Type</label>
              <select
                className="form-control form-group h-11 rounded-lg  border-b-2"
              name="type"
                onChange={(e)=>setAnswerType(e.target.value)}>
                <option hidden>Choose</option>
                <option value="radio">Radio</option>
                <option value="checkbox">Check Box</option>
          
              </select>
            </div>
          
          </div>
          <div className="grid grid-cols-2 gap-3 mt-5">
          <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
              <label className="text-sm ">Answers</label>
              <Input
                type="text"
                onChange={(e) => setAnswer(e.target.value)}
                endContent={
                  <Button
                    color="light"
                    className="rounded-none text-sky-600"
                    onClick={() => Add(answer)}>
                    Add
                    <FontAwesomeIcon icon={faPlus} />
                  </Button>
                }
              />
              {answerList.map((i, ind) => (
                <div key={i} className="mt-3">
                  <Input
                    type="text"
                    value={i.answer}
                    name="answer"
                    onChange={handleModalInput}
                    endContent={
                      <Button
                        color="light"
                        className="rounded-none text-red-700"
                        onClick={() => Delete(ind)}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                      </Button>
                    }
                  />
                </div>
              ))}
            </div>
            </div>
          {/* <div className="grid grid-cols-2 gap-3 mt-10">
           
            <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
              <label className="text-sm ">Options</label>
              <Input
                type="text"
                onChange={(e) => setOption(e.target.value)}
                endContent={
                  <Button
                    color="light"
                    className="rounded-none text-sky-600"
                    onClick={() => AddOption(option)}>
                    Add
                    <FontAwesomeIcon icon={faPlus} />
                  </Button>
                }
              />
              {optionList.map((i, ind) => (
                <div key={i} className="mt-3">
                  <Input
                    type="text"
                    value={i.option}
                    name="option"
                    onChange={handleModalInput}
                    endContent={
                      <Button
                        color="light"
                        className="rounded-none text-red-700"
                        onClick={() => DeleteOption(ind)}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                      </Button>
                    }
                  />
                </div>
              ))}
            </div>
          </div> */}
        
          <div className="flex justify-center mt-10">
            <Button color="primary" size="md"  onPress={onClose} onClick={handleQuestionSave}>
              Save
            </Button>{" "}
            &nbsp;
            <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
          </div>
     
      
  
              </ModalBody>
             
             
            </>
          )}
        </ModalContent>
      </Modal>
 
    </div>
  );
}
