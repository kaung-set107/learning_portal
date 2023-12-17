import {
  Tooltip,
  Table,
  TableHeader,
  Modal,
  ModalContent,
  Kbd,
  Button,
  ModalFooter,
  Pagination,
  ModalHeader,
  ModalBody,
  useDisclosure,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Image,
} from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCircleInfo,faListCheck } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import apiInstance from "../../../util/api.js";
import { EditIcon } from "../../../components/Table/editicon";
import { DeleteIcon } from "../../../components/Table/deleteicon";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { getFile } from "../../../util/index.js";
import ExcelPhoto from "../../ByInstructor/images/excel.png";
import PdfPhoto from "../../ByInstructor/images/pdf.png";
// import { PlusIcon } from "../../assets/Icons/PlusIcon";

function PositionTable() {
  const location = useLocation();
const {state}=useLocation()
  const Val = location.state ? location.state : "English";
 
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [delID, setDelID] = useState(null);

  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return assignList.slice(start, end);
  }, [page, assignList]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && isOpen) {
      handleDelete();
    }
  };

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

  const onRowsChange = (event) => {
    const newRowsPerPage = parseInt(event.target.value);
    setRowsPerPage(newRowsPerPage);
    setPages(Math.ceil(assignList.length / newRowsPerPage));
    setPage(1); // Reset the current page to 1 when rows per page changes
  };

  useEffect(() => {
    const getAssign = async () => {
      await apiInstance
        .get(`learning-materials`, {
          params: { limit: 80, rowsPerPage: rowsPerPage },
        })
        .then((res) => {
          console.log(res.data.data, "res");
          console.log(
            res.data.data.filter((el) => el.subjectSection?.subject=== state?.val),
            "hrr"
          );
          const FilterList = res.data.data.filter(
            (el) => el.subjectSection?.subject === (state.val ? state.val : '6541db4ceef974bf5476db1e')
          );
          const obj = FilterList.map((i) => JSON.parse(i?.links));
          console.log(obj, "res");
          setAssignList(FilterList);
          setPages(res.data._metadata.page_count);
        });
    };
    getAssign();
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, rowsPerPage, Val]);

  const handleOpen = (event) => {
    onOpen();
    console.log(event.currentTarget.getAttribute("data-key"));
    setDelID(event.currentTarget.getAttribute("data-key"));
  };

  const handleClose = () => {
    onClose();
    setDelID(null);
  };

  const handleDelete = async () => {
    console.log(setDelID,'deli');
    await apiInstance.delete("learning-materials/" + delID).then(() => {
      setAssignList(assignList.filter((item) => item._id !== delID));
      onClose();
    });
  };

  return (
    <div className="mx-8 mb-10">
      <div className="flex gap-3 mb-3 justify-end">
        {/* <Button color="primary" endContent={<PlusIcon />}>
                    <Link to='/position/register'>Add</Link>
                </Button> */}
      </div>
      <div className="flex justify-between items-center mb-3">
        <span className="text-default-400 text-small">
          Total {assignList.length} Learning Material
        </span>
        <label className="flex items-center text-default-400 text-small">
          Rows per page:
          <select
            className="bg-transparent outline-none text-default-400 text-small"
            onChange={(e) => onRowsChange(e)}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </label>
      </div>
      <div>
        <Table
          aria-label="Example table with client side sorting"
          classNames={{
            base: "max-h-[719px] ",
            table: "min-h-[100px]",
          }}
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          }>
          <TableHeader className="sticky ">
            <TableColumn key="no">No</TableColumn>
            <TableColumn key="title">Title</TableColumn>
            <TableColumn key="que">Assets Files</TableColumn>
            {/* <TableColumn key="name">Subject</TableColumn> */}
            <TableColumn key="weblink">Website Link</TableColumn>
            <TableColumn key="videolink">Video Link</TableColumn>
            <TableColumn key="actions">Actions</TableColumn>
          </TableHeader>
          <TableBody
            emptyContent={"No Positions to display."}
            className="overflow-y-scroll">
            {items.map((item, index) => (
              <TableRow key={item._id} style={{ height:'100px' }}>
                {/* {console.log(JSON.parse(items.links),'reeee')} */}
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item?.title}</TableCell>
                <TableCell>
                  {item.assets.map((i) => (
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
                            className="object-cover w-[40px] h-[40px]"
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
                </TableCell>

                <TableCell>
                   {JSON.parse(item.links).map((e) => (
                    <>
                    {console.log(e,'e')}
                    <div key={e} className="text-blue-700 gap-5">
                      <a target="_blank" rel='noreferrer' href={e.links}>
                        {e.links}
                      </a>
                    </div>
                    </>
                  ))}
                </TableCell>
  <TableCell>
                   {JSON.parse(item.video).map((e) => (
                    <>
                    {console.log(e,'e')}
                    <div key={e} className="text-blue-700 gap-5">
                      <a target="_blank" rel='noreferrer' href={e.links}>
                        {e.links}
                      </a>
                    </div>
                    </>
                  ))}
                </TableCell>

               

           <TableCell>
                  <div className="relative flex items-center gap-3">
                    <Tooltip content="Detail Learning Material">
                      <Link to={`/sub-detail/${item._id}`}>
                        <span className="text-lg  cursor-pointer active:opacity-50" style={{marginTop:'0.2em'}}>
                          <FontAwesomeIcon icon={faCircleInfo} size='xl' />
                        </span>
                      </Link>
                    </Tooltip>
                    <Tooltip content="Check Quizz">
                      <Link to={`/quiz-page/${item._id}`}>
                        <span className="text-lg cursor-pointer active:opacity-50">
                          {/* <FontAwesomeIcon icon={faCircleInfo} size='xl' /> */}
                          <FontAwesomeIcon icon={faListCheck} size='xl'/>
                       
                      
                        </span>
                      </Link>
                    </Tooltip>
                 
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

    
    </div>
  );
}
export default PositionTable;
