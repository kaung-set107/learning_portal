import { useState, useEffect } from "react";
// import apiInstance from '../../../util/api';
import { Card, Button, Input } from "@nextui-org/react";
import { faPlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FileUploader } from "react-drag-drop-files";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
export default function Quizcreate() {
  const [list, setList] = useState([]);
  const [formSubmissions, setFormSubmissions] = useState([]);
  const [formData, setFormData] = useState({
    // Initialize your form fields here
    question: "",
    questionNo: "",
    // Add more fields as needed
  });
  const [answerList, setAnswerList] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [optionList, setOptionList] = useState([]);
  const [option, setOption] = useState([]);
  // const [questions, setQuestions] = useState([]);
  // const [questionNo, setQuestionNo] = useState("");
  // const [type, setType] = useState("");
  const [image, setImage] = useState([]);
  // const [correctSMS, setCorrectSMS] = useState("");
  // const [inCorrectSMS, setInCorrectSMS] = useState("");
  // const [correctAns, setCorrectAns] = useState("");
  // const [marks, setMarks] = useState("");
  console.log(list, "res list");
  const [finalQuizList, setFinalQuizList] = useState("");

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
  const handleInput = (e) => {
    console.log(e, "what?");
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(
      {
        ...formData,
        [name]: value,
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

  const handleSave = (e) => {
    e.preventDefault(); // Create a copy of the existing form submissions arra
    const newFormSubmissions = [...formSubmissions];

    // Add the current form data to the array
    newFormSubmissions.push(formData);

    // Save the updated array to localStorage
    localStorage.setItem("formSubmissions", JSON.stringify(newFormSubmissions));

    // Update the state with the new form submissions array
    setFormSubmissions(newFormSubmissions);

    // Optionally, you can clear the form fields after saving to localStorage
    // setFormData({
    //   question: '',
    //   questionNo: '',
    // });
  };
  const handleRemoveSubmission = (index) => {
    const newFormSubmissions = [...formSubmissions];

    // Remove the item at the specified index
    newFormSubmissions.splice(index, 1);

    localStorage.setItem("formSubmissions", JSON.stringify(newFormSubmissions));

    setFormSubmissions(newFormSubmissions);
  };
  // useEffect to retrieve data from localStorage on component mount
  useEffect(() => {
    const storedSubmissions = localStorage.getItem("formSubmissions");
    if (storedSubmissions) {
      setFormSubmissions(JSON.parse(storedSubmissions));
      setList(JSON.parse(storedSubmissions));
      console.log(JSON.parse(storedSubmissions), "final");
      setFinalQuizList({
        id: uuidv4(),
        questions: JSON.parse(storedSubmissions),
      });
      console.log(
        {
          id: uuidv4(),
          questions: JSON.parse(storedSubmissions),
        },
        "finalQuiz"
      );
    }
  }, []);
  return (
    <div className="mx-8">
      <Card className="p-5 mt-5">
        <h2 className="text-2xl font-semibold flex justify-center">
          Quiz Question Create
        </h2>
        <form onSubmit={handleSave}>
          <div className="grid grid-cols-2 gap-3 mt-10">
            <Input
              type="text"
              className=""
              placeholder="Enter your question"
              label="Question"
              labelPlacement="outside"
              defaultValue={formData.question}
              name="question"
              onChange={handleInput}
            />
            <Input
              type="text"
              className=""
              placeholder="eg:(1,2,a,b,i,ii)"
              label="Question No"
              labelPlacement="outside"
              defaultValue={formData.questionNo}
              name="questionNo"
              onChange={handleInput}
            />
          </div>
          <div className="grid grid-cols-2 gap-3 mt-10">
            <div className="flex flex-col">
              <label>Question Type</label>
              <select
                className="form-control form-group h-11 rounded-lg mt-1"
                onChange={(e) => handleInput(e.target.value)}>
                <option hidden>Choose</option>
                <option value="tf">True / False</option>
                <option value="mul">Multiple Choice</option>
                <option value="fb">Fill in Blank</option>
              </select>
            </div>
            <div className="">
              <label>Picture</label>
              <FileUploader
                multiple={true}
                handleChange={handleChange}
                name="file"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-10">
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
          </div>
          <div className="grid grid-cols-2 gap-3 mt-10">
            <Input
              type="number"
              className=""
              placeholder="eg:(2-mark)"
              label="Marks"
              labelPlacement="outside"
              onChange={(e) => handleInput(e.target.value)}
            />
            <Input
              type="number"
              className=""
              placeholder="eg:(1,2,3, only number)"
              label="Correct Answer"
              labelPlacement="outside"
              onChange={(e) => handleInput(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3 mt-10">
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
                    onChange={(e) => handleInput(e.target.value)}
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
                    onChange={(e) => handleInput(e.target.value)}
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
          </div>
        
          <div className="flex justify-center mt-10">
            <Button color="primary" size="md" type="submit">
              Save
            </Button>{" "}
            &nbsp;
            <Button size="md">Cancel</Button>
          </div>
        </form>
        <div>
          <div>
            {list.map((i, index) => (
              <div key={index} className="grid grid-cols-6 gap-2">
                <div>
                  {i.questionNo}
                  {i.question}
                </div>

                <div>
                  <Button
                    color="danger"
                    size="sm"
                    className="form-control"
                    onClick={() => handleRemoveSubmission(index)}>
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
