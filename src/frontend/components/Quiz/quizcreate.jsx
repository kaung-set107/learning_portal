import React, { useState, useEffect } from "react";
// import apiInstance from '../../../util/api';
import {
  Card,
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  CardBody,
  useDisclosure,
  CardHeader,
  Tooltip,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  Pagination,
  Kbd,
  ModalFooter,
  TableCell,
} from "@nextui-org/react";
import { EditIcon } from "../../../components/Table/editicon";
import { DeleteIcon } from "../../../components/Table/deleteicon";
import { Link } from "react-router-dom";
import { PlusIcon } from "../../../assets/Icons/PlusIcon";
import { faPlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { FileUploader } from "react-drag-drop-files";
import Swal from "sweetalert2";

import apiInstance from "../../../util/api";
// import { StepDescription } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
export default function Quizcreate() {
  const navigate = useNavigate();
  const ID = useLocation().pathname.split("/")[2];
  console.log(ID, "id l");
  const [modalPlacement, setModalPlacement] = React.useState("center");
  const [scrollBehavior, setScrollBehavior] = React.useState("outside");
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    isOpen: isDelOpen,
    onOpen: delOnOpen,
    onOpenChange: delOnOpenChange,
    onClose: delClose,
  } = useDisclosure();
  const [modalData, setModalData] = useState([]);
  const [questionData, setQuestionData] = useState([]);

  const [answerList, setAnswerList] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [question, setQuestion] = useState("");
  const [questionNo, setQuestionNo] = useState("");
  const [type, setType] = useState("");

  const [correctAns, setCorrectAns] = useState("");
  const [marks, setMarks] = useState("");
  const [showQuestion, setShowQuestion] = useState(true);
  const [answerType, setAnswerType] = useState("");
  // console.log(list, "res list");
  //Quiz Data
  const [title, setTitle] = useState("");
  const [examDate, setExamDate] = useState("");
  const [duration, setDuration] = useState("");
  const [noOfQuestion, setNoOfQuestion] = useState("");
  const [totalMark, setTotalMark] = useState("");
  const [passMark, setPassMark] = useState("");
  const [creditMark, setCreditMark] = useState("");
  const [diMark, setDiMark] = useState("");
  const [desc, setDesc] = useState("");
  const [LMtypeName, setLMTypeName] = useState("");
  const [exTypeName, setExTypeName] = useState("");

  const [delID, setDelID] = useState(null);
  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [subjectList, setSubjectList] = React.useState([]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return questionData.slice(start, end);
  }, [page, questionData]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && isOpen) {
      handleDelete();
    }
  };

  const onRowsChange = (event) => {
    const newRowsPerPage = parseInt(event.target.value);
    setRowsPerPage(newRowsPerPage);
    setPages(Math.ceil(questionData.length / newRowsPerPage));
    setPage(1); // Reset the current page to 1 when rows per page changes
  };

  // useEffect to retrieve data from localStorage on component mount
  useEffect(() => {
    const storedSubmissions = localStorage.getItem("formSubmission");
    // console.log(storedSubmissions,'sub')
    if (storedSubmissions) {
      setQuestionData(JSON.parse(storedSubmissions));
    }

    const getLM = async () => {
      await apiInstance.get("learning-materials").then((res) => {
        // console.log(res.data.data.filter(el=>el._id) ,'ss da')
        console.log(
          res.data.data.filter((el) => el._id === ID),
          "ss da"
        );
        setLMTypeName(
          res.data.data.filter((el) => el._id === ID) && "Learning Material"
        );
      });
    };
    const getExam = async () => {
      await apiInstance.get("exams").then((res) => {
        console.log(
          res.data.data.filter((el) => el._id === ID)[0].code?.split("-")[0] ===
            "EXM",
          "ss da"
        );
        setExTypeName(
          res.data.data.filter((el) => el._id === ID)[0].code?.split("-")[0] ===
            "EXM"
        );
      });
    };
    getExam();
    getLM();

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setLMTypeName, setExTypeName, isOpen, rowsPerPage]);

  console.log(questionData, "finalQuiz");
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

  const handleModalInput = (e) => {
    const { name, value } = e.target;

    setModalData({
      ...modalData,
      [name]: value,
    });
    console.log(
      {
        ...modalData,
        [name]: value,
      },
      "form"
    );
  };

  const handleRemoveSubmission = (index) => {
    const newFormSubmissions = [...questionData];

    // Remove the item at the specified index
    newFormSubmissions.splice(index, 1);

    localStorage.setItem("formSubmission", JSON.stringify(newFormSubmissions));

    setQuestionData(newFormSubmissions);
  };

  //save in local storage from Modal Box
  const handleQuestionSave = (e) => {
    e.preventDefault(); // Create a copy of the existing form submissions arra
    const questionArr = {
      question: question,
      questionNo: questionNo,
      type: type,
      mark: marks,
      correctAnswer: correctAns,
      options: answerList,
      answerType: answerType,
    };
    const newFormSubmissions = [...questionData];
    newFormSubmissions.push(questionArr);

    localStorage.setItem("formSubmission", JSON.stringify(newFormSubmissions));

    setQuestionData(newFormSubmissions);

    // setFormData({
    //   username: '',
    //   email: '',
    // });

    // console.log(newFormSubmissions,'fix')
    // Clear the input field
    setAnswerList([]);
    // setModalData([...modalData,...questionData])
    // console.log([...modalData,...questionData],'quesDat')
  };

  //Create quiz
  const createQuiz = () => {
    console.log(LMtypeName, "lm typ");
    const data = {
      title: title,
      // type:quizType,
      questions: questionData,
      examDate: examDate,
      duration: duration,
      numOfQuestions: noOfQuestion,
      totalMark: totalMark,
      passMark: passMark,
      creditMark: creditMark,
      distinctionMark: diMark,
      description: desc,
      status: "unfinished",
    };

    if (LMtypeName === "Learning Material") {
      data.type = "learningMaterial";
      data.learningMaterial = ID;
    } else if (exTypeName === "Exam") {
      data.type = "exam";
      data.exam = ID;
    }
    // if (exTypeName === 'Exam') {

    // }
    // console.log(data,'quiz data')
    apiInstance
      .post("quizzes", data)
      .then(function () {
        Swal.fire({
          icon: "success",
          title: "Created Quiz Successful",
          text: "Nice!",
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
        });
        navigate("/instructor");
        localStorage.removeItem("formSubmission");
        setShowQuestion(false);
      })
      .catch((error) => {
        alert(error);
      });
  };

  // const handleClearLocalStorage = () => {
  //   // Remove the item from localStorage
  //   localStorage.removeItem('formSubmission');

  //   // Update the state to clear the form submissions
  //   setQuestionData([]);
  // };
  const handleDelOpen = (event) => {
    delOnOpen();
    console.log(event.currentTarget.getAttribute("data-key"));
    setDelID(event.currentTarget.getAttribute("data-key"));
  };

  const handleDelClose = () => {
    delClose();
    setDelID(null);
  };

  const handleDelete = () => {
    handleRemoveSubmission();
    delClose();
  };
  return (
    <div className='mx-8 py-5'>
      <Card>
        <CardHeader className='font-semibold bg-cyan-300 py-5'>
          <span className='text-2xl'>Quizz Create</span>
        </CardHeader>
        <CardBody>
          {/* 1 */}
          <div className='grid grid-cols-2 gap-3 mt-10'>
            <div>
              <Input
                type='text'
                className=''
                placeholder='Enter your title'
                label='Title'
                labelPlacement='outside'
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className='mt-1'>
              <label>Date</label>
              <Input
                type='date'
                className=''
                // defaultValue={formData.questionNo}
                name='examDate'
                onChange={(e) => setExamDate(e.target.value)}
              />
            </div>
          </div>
          <div className='grid grid-cols-2 gap-3 mt-10'>
            <div>
              <Input
                type='number'
                className=''
                placeholder='Enter duration'
                label='Quiz Duration'
                labelPlacement='outside'
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>

            <div className='mt-1'>
              <Input
                type='number'
                className=''
                placeholder='Total questions'
                defaultValue=''
                label='Total Questions'
                labelPlacement='outside'
                onChange={(e) => setNoOfQuestion(e.target.value)}
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
          <div className='grid grid-cols-2 gap-3 mt-10'>
            <div>
              <Input
                type='number'
                className=''
                placeholder='Enter mark'
                label='Total Mark'
                labelPlacement='outside'
                onChange={(e) => setTotalMark(e.target.value)}
              />
            </div>

            <div className='mt-1'>
              <Input
                type='number'
                className=''
                placeholder='Pass Mark'
                defaultValue=''
                label='Pass Mark'
                labelPlacement='outside'
                onChange={(e) => setPassMark(e.target.value)}
              />
            </div>
          </div>
          {/* 4 */}
          <div className='grid grid-cols-2 gap-3 mt-10'>
            <div>
              <Input
                type='number'
                className=''
                placeholder='Enter credit mark'
                label='Credit Mark'
                labelPlacement='outside'
                onChange={(e) => setCreditMark(e.target.value)}
              />
            </div>

            <div className='mt-1'>
              <Input
                type='number'
                className=''
                placeholder='D mark'
                defaultValue=''
                label='Distinction Mark '
                labelPlacement='outside'
                onChange={(e) => setDiMark(e.target.value)}
              />
            </div>
          </div>
          {/* 5 */}
          <div className='grid grid-cols-2 gap-3 mt-10'>
            <div>
              <Input
                type='text'
                className=''
                placeholder='Enter description'
                label='Description'
                labelPlacement='outside'
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>

            <div className='flex flex-col'>
              <label>Type</label>
              <select className='form-control form-group h-11 rounded-lg mt-1'>
                {/* <option hidden>Choose</option> */}
                {console.log(LMtypeName, "type")}
                {exTypeName !== true ? (
                  <option value='learningMaterial'>Learning Material</option>
                ) : (
                  <option value='exam'>Exam</option>
                )}
                {/* {typeName === 'Exam' && } */}
                {/* <option value="entrance">Entrance</option>
           <option value="exam">Exam</option>
           <option value="test">Test</option> */}
              </select>
            </div>
          </div>
          <div className='mt-10'>
            <div className='grid grid-cols-2 gap-3 mt-10'>
              <div>
                <Button onPress={onOpen} className='bg-cyan-400'>
                  {" "}
                  Questions Add <FontAwesomeIcon
                    icon={faPlus}
                    color='black'
                  />{" "}
                </Button>{" "}
                &nbsp;
                {/* <Button onClick={handleShowQuestion} className='bg-cyan-400'> Show Questions </Button> */}
              </div>
            </div>
          </div>

          <div className='flex justify-center mt-10'>
            <Button className='bg-cyan-400' size='md' onClick={createQuiz}>
              Create
            </Button>{" "}
            &nbsp;
            <Button color='danger' variant='light'>
              Close
            </Button>
          </div>
          {/* {console.log(questionData.map((i)=>i.question),'con')} */}
        </CardBody>
      </Card>

      {questionData[0] ? (
        <Card className='mt-5'>
          {/* <CardHeader className='font-semibold bg-cyan-400 py-5'><span className='text-2xl'>Questions Detail</span></CardHeader> */}
          <CardBody>
            {/* <div>
{questionData.map((i)=>
<div key={i}>
{i.question}
<Button color="danger" variant="light" onClick={handleRemoveSubmission}>
Remove
</Button>
</div>
)}

</div> */}
            <>
              <div className='flex flex-row gap-5 justify-between'>
                <div className='flex gap-4 mb-3 flex-row'></div>
                <div className='flex gap-2 mb-3 flex-row'>
                  {/* <Link to='/subject-add'>
            <Button endContent={<PlusIcon />} color='primary'>
              Add
            </Button>
          </Link> */}
                </div>
              </div>
              <div className='flex justify-between items-center mb-3'>
                <span className='text-default-400 text-small'>
                  Total {questionData.length} Questions
                </span>
                <label className='flex items-center text-default-400 text-small'>
                  Rows per page:
                  <select
                    className='bg-transparent outline-none text-default-400 text-small'
                    onChange={(e) => onRowsChange(e)}
                  >
                    <option value='5'>5</option>
                    <option value='10'>10</option>
                    <option value='15'>15</option>
                  </select>
                </label>
              </div>
              <Table
                isHeaderSticky
                aria-label='Example table with client side sorting'
                classNames={{
                  base: "max-h-[719px] ",
                  table: "min-h-[100px]",
                }}
                bottomContent={
                  <div className='flex w-full justify-center'>
                    <Pagination
                      isCompact
                      showControls
                      showShadow
                      color='primary'
                      page={page}
                      total={pages}
                      onChange={(page) => setPage(page)}
                    />
                  </div>
                }
              >
                <TableHeader>
                  <TableColumn>No</TableColumn>
                  <TableColumn>Title</TableColumn>
                  <TableColumn>Question Type</TableColumn>

                  <TableColumn>Answer Type</TableColumn>
                  <TableColumn>Mark</TableColumn>

                  <TableColumn key='action'>Action</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"No Positions to display."}>
                  {items.map((item, index) => (
                    <TableRow key={item._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item?.question}</TableCell>
                      <TableCell>{item?.type}</TableCell>
                      <TableCell>{item?.answerType}</TableCell>

                      <TableCell>{item?.mark}</TableCell>

                      <TableCell>
                        <div className='relative flex items-center gap-2'>
                          {/* <Tooltip content='Create Learning Material'>
                    <Link to={ '/learn-mat/'+item._id } >
                      <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
                        <PlusIcon />
                      </span>
                    </Link>
                  </Tooltip> */}
                          <Tooltip content='Edit'>
                            <Link to=''>
                              <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
                                <EditIcon />
                              </span>
                            </Link>
                          </Tooltip>
                          <Tooltip color='danger' content='Delete'>
                            <span
                              data-key={item._id}
                              className='text-lg text-danger cursor-pointer active:opacity-50'
                              onClick={(e) => handleDelOpen(e)}
                            >
                              <DeleteIcon />
                            </span>
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Modal
                backdrop='blur'
                isOpen={isDelOpen}
                onClose={handleDelClose}
              >
                <ModalContent>
                  {(handleDelClose) => (
                    <>
                      <ModalHeader className='flex flex-col gap-1'>
                        Delete Course
                      </ModalHeader>
                      <ModalBody>
                        <p>Are you sure you want to delete this position?</p>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color='default'
                          variant='light'
                          onClick={handleDelClose}
                        >
                          No, Cancel
                        </Button>
                        <Button
                          color='danger'
                          onPress={() => handleDelete()}
                          onKeyDown={handleKeyDown}
                        >
                          Yes, I am sure
                          <Kbd className='bg-danger-500' keys={["enter"]}></Kbd>
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </>
          </CardBody>
        </Card>
      ) : (
        ""
      )}

      <Modal
        backdrop='blur'
        style={{ width: "100%" }}
        isOpen={isOpen}
        placement={modalPlacement}
        scrollBehavior={scrollBehavior}
        onOpenChange={onOpenChange}
        isDismissable={false}
        size='4xl'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1 font-semibold bg-cyan-300'>
                {" "}
                Quiz Question Create
              </ModalHeader>
              <ModalBody>
                <div className='grid grid-cols-2 gap-3 mt-10'>
                  <Input
                    type='text'
                    className=''
                    placeholder='Enter your question'
                    label='Question'
                    labelPlacement='outside'
                    // defaultValue={formData.question}
                    name='question'
                    onChange={(e) => setQuestion(e.target.value)}
                  />
                  <Input
                    type='text'
                    className=''
                    placeholder='eg:(1,2,a,b,i,ii)'
                    label='Question No'
                    labelPlacement='outside'
                    // defaultValue={formData.questionNo}
                    name='questionNo'
                    onChange={(e) => setQuestionNo(e.target.value)}
                  />
                </div>
                <div className='grid grid-cols-2 gap-3 mt-10'>
                  <div className='flex flex-col'>
                    <label>Question Type</label>
                    <select
                      className='form-control form-group h-11 rounded-lg mt-1 border-b-2'
                      name='type'
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option hidden>Choose</option>
                      <option value='trueFalse'>True / False</option>
                      <option value='multipleChoice'>Multiple Choice</option>
                      <option value='fillInTheBlank'>Fill in Blank</option>
                      <option value='openQuestion'>Open Question</option>
                    </select>
                  </div>
                  <Input
                    type='number'
                    className=''
                    placeholder='eg:(1,2,3, only number)'
                    label='Correct Answer'
                    name='correctAnswer'
                    labelPlacement='outside'
                    onChange={(e) => setCorrectAns(e.target.value)}
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
                <div className='grid grid-cols-2 gap-3 mt-10'>
                  <Input
                    type='number'
                    className=''
                    placeholder='eg:(2-mark)'
                    label='Marks'
                    labelPlacement='outside'
                    name='mark'
                    onChange={(e) => setMarks(e.target.value)}
                  />
                  <div className='flex flex-col'>
                    <label>Answer Type</label>
                    <select
                      className='form-control form-group h-11 rounded-lg  border-b-2'
                      name='type'
                      onChange={(e) => setAnswerType(e.target.value)}
                    >
                      <option hidden>Choose</option>
                      <option value='radio'>Radio</option>
                      <option value='checkbox'>Check Box</option>
                    </select>
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-3 mt-5'>
                  <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                    <label className='text-sm '>Answers</label>
                    <Input
                      type='text'
                      onChange={(e) => setAnswer(e.target.value)}
                      endContent={
                        <Button
                          color='light'
                          className='rounded-none text-sky-600'
                          onClick={() => Add(answer)}
                        >
                          Add
                          <FontAwesomeIcon icon={faPlus} />
                        </Button>
                      }
                    />
                    {answerList.map((i, ind) => (
                      <div key={i} className='mt-3'>
                        <Input
                          type='text'
                          value={i.answer}
                          name='answer'
                          onChange={handleModalInput}
                          endContent={
                            <Button
                              color='light'
                              className='rounded-none text-red-700'
                              onClick={() => Delete(ind)}
                            >
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

                <div className='flex justify-center mt-10'>
                  <Button
                    color='primary'
                    size='md'
                    onPress={onClose}
                    onClick={handleQuestionSave}
                  >
                    Save
                  </Button>{" "}
                  &nbsp;
                  <Button color='danger' variant='light' onPress={onClose}>
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
