import {
  Tooltip,
  useDisclosure,
  Image,
  Card,
  CardHeader,
  CardBody,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import apiInstance from "../../../util/api.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { getFile } from "../../../util/index.js";
import ExcelPhoto from "../../ByInstructor/images/excel.png";
import PdfPhoto from "../../ByInstructor/images/pdf.png";
// import { PlusIcon } from "../../assets/Icons/PlusIcon";

function PositionTable() {
  const location = useLocation();

  const Id = location.pathname.split("/")[2];
  console.log(Id, "val");
  //  const [dataValue,setDataValue]=useState('English')
  //      if(location.pathname === '/instructor'){
  //   setDataValue(Val)
  // }
  //   const [Val,setVal]=useState('English')

  //   if(DataState){

  // setVal(DataState)
  //   }else{
  //     setVal('English')
  //   }

  const [assignList, setAssignList] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const [imageList,setImageList]=useState([])

  const download = () => {
    var element = document.createElement("a");
    var file = new Blob(
      [
        "https://timesofindia.indiatimes.com/thumb/msid-70238371,imgsize-89579,width-400,resizemode-4/70238371.jpg",
      ],
      { type: "image/*" }
    );
    element.href = URL.createObjectURL(file);
    element.download = "image.jpg";
    element.click();
  };
  const downloadPDF = (val) => {
    // Replace 'your-pdf-file.pdf' with the actual file path or URL
    const pdfUrl = getFile({ payload: val });

    // Create a link element
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "downloaded-file.pdf";

    // Append the link to the document
    document.body.appendChild(link);

    // Trigger a click on the link to start the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
  };

  useEffect(() => {
    const getAssign = async () => {
      await apiInstance.get(`learning-materials/${Id}`).then((res) => {
        console.log(res.data.data, "assign res");
        setVideoList(JSON.parse(res.data.data.video));
        setImageList(res.data.data.assets)
        setAssignList(res.data.data);
      });
    };
    getAssign();
  }, []);

  return (
    <div className="mx-8 mb-10">
      <CardBody>

       <div className="block gap-2 mb-3">
          <div className='py-3'>
            <h2 className="text-xl font-semibold underline">Question Files or Photos</h2>
          </div>
          <div className="block gap-2">
            {imageList.map((i) => (
                    <>
                      {console.log(i, "asse")}
                      <div className="sm:flex justify-start gap-5" key={i._id}>
                        <a
                          href={getFile({ payload: i })}
                          onClick={
                            i.originalname?.split(".")[1] === "pdf"
                              ? () => downloadPDF(i)
                              : () => download()
                          }>
                          <Image
                            radius="sm"
                            alt={i.title}
                            className="object-cover w-[60px] h-[60px]"
                            src={
                              i.originalname?.split(".")[1] === "pdf"
                                ? PdfPhoto
                                : i.originalname?.split(".")[1] === "xlsx"
                                ? ExcelPhoto
                                : getFile({ payload: i })
                            }
                          />
                        </a>
                        <b className="mt-3">{i?.originalname}</b>
                      </div>
                    </>
                  ))}
          </div>
        </div>
        <div className="block gap-2 mb-3">
          <div className='py-3'>
            <h2 className="text-xl font-semibold underline">Videos</h2>
          </div>
          <div className="flex gap-2">
            {videoList.map((e) => (
              <div key={e} className="text-blue-700 gap-5">
                {console.log(e.links?.split("/")[3], "e")}
                <iframe
                  src={
                    "https://www.youtube.com/embed/" + e.links?.split("/")[3]
                  }
                  //   title={assignList.name}
                  allowFullScreen
                  className="aspect-square"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  // style={{ width:'1400px',height:'500px' }}
                ></iframe>
              </div>
            ))}
          </div>
        </div>
        
      </CardBody>

      {/* <Button color="primary" endContent={<PlusIcon />}>
                    <Link to='/position/register'>Add</Link>
                </Button> */}
    </div>
  );
}
export default PositionTable;
