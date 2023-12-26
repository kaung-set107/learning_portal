import { Button, Input, Image } from "@nextui-org/react";
import apiInstance from "../../../util/api.js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { faPlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { getFile } from "../../../util/index.js";
import { AnchorIcon } from "../../../assets/Icons/AnchorIcon";
import { FileUploader } from "react-drag-drop-files";
import { Link } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function DepartmentInputForm() {
  const Id = useLocation().pathname.split("/")[2];
  const variant = "faded";
  const { handleSubmit } = useForm();
  // const [subjectList, setSubjectList] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState([]);
  const [subject, setSubject] = useState("");
  const [links, setLinks] = useState("");
  const [assetsList, setAssetsList] = useState([]);
  const [subjectId, setSubjectId] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [linkList, setLinkList] = useState([]);
  const [examDate, setExamDate] = useState("");
  const Add = (val) => {
    console.log(val, "val");
    const newData = {
      links: val,
    };

    // setLinkList([...linkList, newData]);
    // console.log([...linkList, newData], "res");
    setLinkList([...linkList, newData]);
    console.log([...linkList, newData], "addlz");
  };

  const Delete = async (val) => {
    console.log(val, "val");
    setLinkList(linkList.filter((el) => el.links !== val));
  };
  const handleChange = (e) => {
    console.log(e, "e");
    let array = [];
    for (const item of e) {
      array.push(item);
    }
    // console.log(array, "img array");
    setImage(array);
  };
  const create = () => {
    const formData = new FormData();

    formData.append("title", title);
    // formData.append("assets", image);
    formData.append("description", desc);
    formData.append("examDate", examDate);
    formData.append("links", JSON.stringify(linkList));
    if (!handleChange) {
      assetsList.map((value) => {
        formData.append("assets", value);
      });
    } else {
      image.map((value) => {
        formData.append("assets", value);
      });
    }

    if (!subject) {
      formData.append("subject", subjectId);
    } else {
      formData.append("subject", subject);
    }
    // if (!linkList) {
    //   formData.append("links", JSON.stringify(linkList));
    // } else {
    //   formData.append("links", JSON.stringify(addLinkList));
    // }

    apiInstance
      .put(`exams/${Id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function () {
        Swal.fire({
          icon: "success",
          title: "Updated Successful",
          text: "Nice!",
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
        });
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    const getAssignList = async () => {
      await apiInstance.get("exams/" + Id).then((res) => {
        const newAsset = res.data.data.assets;
        setAssetsList(newAsset);
        console.log(res.data.data, "res");
        setLinkList(JSON.parse(res.data.data?.links));

        setTitle(res.data.data?.title);
        setDesc(res.data.data?.description);
        setSubjectId(res.data.data.subject?._id);
        setSubjectName(res.data.data.subject?.title);
        setExamDate(res.data.data?.examDate?.split("T")[0]);
      });
    };

    getAssignList();
  }, []);

  return (
    <div className='gap-3 mx-8'>
      <form onSubmit={handleSubmit(create)}>
        <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3'>
          <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
            <label className='text-sm font-semibold'>Title</label>
            <Input
              type='text'
              variant={variant}
              placeholder='Enter your course'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1'>
            <label>Exam Date</label>
            <Input
              type='date'
              className=''
              value={examDate}
              name='examDate'
              onChange={(e) => setExamDate(e.target.value)}
            />
          </div>
        </div>
        <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3'>
          <Input
            type='text'
            label='Description'
            placeholder='description'
            variant={variant}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            labelPlacement='outside'
          />
          <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
            <label className='text-sm font-semibold'>Subjects</label>
            <select
              onChange={(e) => {
                setSubject(e.target.value);
                setSubjectId(e.target.value);
              }}
              className='bg-gray-100 border mt-2 border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500'
              disabled
            >
              <option hidden value={subjectId}>
                {subjectName}
              </option>
              {/* {subjectList.map((i) => (
                <option key={i._id} value={i._id}>
                  {i.title}
                </option>
              ))} */}
            </select>
          </div>
        </div>

        <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3'>
          <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
            <label className='text-sm font-semibold'>Links</label>
            <Input
              type='text'
              variant={variant}
              onChange={(e) => setLinks(e.target.value)}
              endContent={
                <Button
                  color='light'
                  className='rounded-none text-sky-600'
                  onClick={() => Add(links)}
                >
                  Add
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
              }
            />
            {linkList &&
              linkList.map((i) => (
                <div key={i} className='mt-3'>
                  <Input
                    type='text'
                    variant={variant}
                    value={i.links}
                    endContent={
                      <Button
                        color='light'
                        className='rounded-none text-red-600'
                        onClick={() => Delete(i.links)}
                      >
                        <FontAwesomeIcon icon={faCircleXmark} />
                      </Button>
                    }
                  />
                </div>
              ))}
            {/* <div className='hidden'>
  {addLinkList.map((i) => (
                  <div key={i} className="mt-3">
                    <Input
                      type="text"
                      variant={variant}
                      defaultValue={i.links}
                      onChange={(e) => setLinks(e.target.value)}
                       endContent={
                <Button
                  color="light"
                  className="rounded-non text-red-600"
                  onClick={() => Delete(i.links)}>
                  
                <FontAwesomeIcon icon={faCircleXmark} />
                </Button>
              }
                    />
                  </div>
                ))}
</div> */}
          </div>
          <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
            <div className='mt-1'>
              <label className='text-sm font-semibold'>Question</label>

              <FileUploader
                multiple={true}
                handleChange={handleChange}
                name='file'
              />
            </div>
            <div className='flex py-3'>
              {assetsList.map((i) => (
                <>
                  <div
                    className='sm:flex py-2 ml-2 px-3 shadow-3 border-3 radius-3'
                    key={i._id}
                  >
                    <a
                      href={getFile({ payload: i })}
                      onClick={
                        i.originalname?.split(".")[1] === "pdf"
                          ? () => downloadPDF(i)
                          : () => download()
                      }
                    >
                      <Image
                        radius='sm'
                        alt={i.title}
                        className='object-cover w-[40px] h-[40px]'
                        src={
                          i.originalname.split(".")[1] === "pdf"
                            ? PdfPhoto
                            : i.originalname.split(".")[1] === "xlsx"
                            ? ExcelPhoto
                            : getFile({ payload: i })
                        }
                      />
                    </a>
                    {/* <b className='mt-3'>{i.originalname}</b> */}
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
        <div className='flex justify-center gap-5 mt-8'>
          <Link href='/instructor'>
            <Button color='danger'>Cancel</Button>
          </Link>
          <Button color='primary' type='submit'>
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}
