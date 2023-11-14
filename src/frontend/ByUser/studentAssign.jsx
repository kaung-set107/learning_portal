import {
  Tooltip,
  Table,
  TableHeader,
  Pagination,
  useDisclosure,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Image,

} from "@nextui-org/react";
import { useEffect, useState } from "react";
import apiInstance from "../../util/api.js";
import React from "react";
import { Link,useLocation } from "react-router-dom";
import { getFile } from "../../util/index.js";
import ExcelPhoto from '../ByInstructor/images/excel.png'
import PdfPhoto from '../ByInstructor/images/pdf.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
// import { PlusIcon } from "../../assets/Icons/PlusIcon";

function PositionTable() {
const location=useLocation()
console.log(location.state,'llll')

     const Val=location.state ? location.state :'English'
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
        "https://timesofindia.indiatimes.com/thumb/msid-70238371,imgsize-89579,width-400,resizemode-4/70238371.jpg"
      ],
      { type: "image/*" }
    );
    element.href = URL.createObjectURL(file);
    element.download = "image.jpg";
    element.click();
  };
  const downloadPDF = (val) => {
  // Replace 'your-pdf-file.pdf' with the actual file path or URL
  const pdfUrl = getFile({payload:val});
  
  // Create a link element
  const link = document.createElement('a');
  link.href = pdfUrl;
  link.download = 'downloaded-file.pdf';
  
  // Append the link to the document
  document.body.appendChild(link);
  
  // Trigger a click on the link to start the download
  link.click();
  
  // Remove the link from the document
  document.body.removeChild(link);
}

  const onRowsChange = (event) => {
    const newRowsPerPage = parseInt(event.target.value);
    setRowsPerPage(newRowsPerPage);
    setPages(Math.ceil(assignList.length / newRowsPerPage));
    setPage(1); // Reset the current page to 1 when rows per page changes
  };

  useEffect(() => {

    const getAssign = async () => {
      await apiInstance
        .get(`assignments`, { params: { limit: 80, rowsPerPage: rowsPerPage } })
        .then((res) => {
          console.log(res.data.data, "res");
          console.log(res.data.data.filter(el=>el.subject?.title === Val),'hrr')
          const FilterList=res.data.data.filter(el=>el.subject?.title === Val)
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
  }, [isOpen, rowsPerPage,Val]);

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
    console.log(setDelID);
    await apiInstance.delete("assignments/" + delID).then(() => {
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
          Total {assignList.length} Assignments
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
            <TableColumn key="name" >Title</TableColumn>
            <TableColumn key="name">Question</TableColumn>
            {/* <TableColumn key="name">Subject</TableColumn> */}
            <TableColumn key="name">Link</TableColumn>
            {/* <TableColumn key="description">Description</TableColumn> */}
            <TableColumn key="actions">Actions</TableColumn>
          </TableHeader>
          <TableBody
            emptyContent={"No Positions to display."}
            className="overflow-y-scroll">
            {items.map((item, index) => (
              <TableRow key={item._id}>
                {/* {console.log(JSON.parse(items.links),'reeee')} */}
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item?.title}</TableCell>
                <TableCell>
                  <div className='sm:flex justify-start gap-5'>
 <a
                    href={
                      item.question ? getFile({ payload: item.question }) : ""
                    }
                    
                    onClick={item.question.originalname?.split('.')[1] === 'pdf' ? () => downloadPDF(item.question) : () => download()}>
                    {/* <User
                      avatarProps={{
                        radius: "lg",
                        src: item.question
                          ? getFile({ payload: item.question })
                     :''
                      }}
                       name={item.question?.originalname?.split('.')[0]}
                    /> */}
                       <Image
             
              radius="sm"
           
              alt={item.title}
              className="object-cover w-[40px] h-[40px]"
              src={ item.question.originalname?.split('.')[1] === 'pdf' ? PdfPhoto : item.question.originalname?.split('.')[1] === 'xls' ? ExcelPhoto : getFile({ payload: item.question }) }
          
            
            />
            
          
                  </a>
                  <b className='mt-3'>{item.question?.originalname}</b>
                  </div>
                 
                </TableCell>
                {/* <TableCell>{item?.subject?.title}</TableCell> */}
                <TableCell>
                  {JSON.parse(item.links).map((e) => (
                    <div key={e} className="text-blue-700 gap-5">
                      <a target="_blank" rel='noreferrer' href={e.links}>
                        {e.links}
                      </a>
                    </div>
                  ))}
                </TableCell>
                <TableCell><Link to={/lm-detail/+item._id}><FontAwesomeIcon icon={faCircleInfo} size='xl' /></Link></TableCell>

                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>


    </div>
  );
}
export default PositionTable    