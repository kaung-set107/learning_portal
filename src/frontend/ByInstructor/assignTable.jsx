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
  User,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import apiInstance from "../../util/api";
import { EditIcon } from "../../components/Table/editicon";
import { DeleteIcon } from "../../components/Table/deleteicon";
import React from "react";
import { Link } from "react-router-dom";
import { getFile } from "../../util/index.js";
// import { PlusIcon } from "../../assets/Icons/PlusIcon";

export default function PositionTable() {
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
          const obj = res.data.data.map((i) => JSON.parse(i.links));
          console.log(obj, "res");
          setAssignList(res.data.data);
          setPages(res.data._metadata.page_count);
        });
    };
    getAssign();
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, rowsPerPage]);

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
          <TableHeader className="sticky">
            <TableColumn key="no">No</TableColumn>
            <TableColumn key="name">Title</TableColumn>
            <TableColumn key="name">Question</TableColumn>
            <TableColumn key="name">Subject</TableColumn>
            <TableColumn key="name">Links</TableColumn>
            <TableColumn key="description">Description</TableColumn>
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
                  {" "}
                  <a
                    href={
                      item.question ? getFile({ payload: item.question }) : ""
                    }
                    download
                    onClick={() => download()}>
                    <User
                      avatarProps={{
                        radius: "lg",
                        src: item.question
                          ? getFile({ payload: item.question })
                          : "",
                      }}
                    />
                  </a>
                </TableCell>
                <TableCell>{item?.subject?.title}</TableCell>
                <TableCell>
                  {JSON.parse(item.links).map((e) => (
                    <div key={e} className="text-blue-700 gap-5">
                      <a target="_blank" rel='noreferrer' href={e.links}>
                        {e.links}
                      </a>
                    </div>
                  ))}
                </TableCell>
                <TableCell>{item?.description}</TableCell>

                <TableCell>
                  <div className="relative flex items-center gap-2">
                    <Tooltip content="Edit Assignment">
                      <Link to={`/assign/${item._id}`}>
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                          <EditIcon />
                        </span>
                      </Link>
                    </Tooltip>
                    <Tooltip color="danger" content="Delete user">
                      <span
                        data-key={item._id}
                        className="text-lg text-danger cursor-pointer active:opacity-50"
                        onClick={(e) => handleOpen(e)}>
                        <DeleteIcon />
                      </span>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Modal backdrop="blur" isOpen={isOpen} onClose={handleClose}>
        <ModalContent>
          {(handleClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete Position
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete this position?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onClick={handleClose}>
                  No, Cancel
                </Button>
                <Button
                  color="danger"
                  onPress={() => handleDelete()}
                  onKeyDown={handleKeyDown}>
                  Yes, I am sure
                  <Kbd className="bg-danger-500" keys={["enter"]}></Kbd>
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
