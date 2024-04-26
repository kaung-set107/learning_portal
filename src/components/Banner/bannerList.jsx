import {
    Tooltip,
    Table,
    TableHeader,
    Modal,
    DropdownItem,
    ModalContent,
    User,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
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
    Chip
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheck
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { useEffect } from "react";
import apiInstance from "../../util/api";
import { EditIcon } from "../Table/editicon";
import { DeleteIcon } from "../Table/deleteicon";
import { Link } from "react-router-dom";
import { ChevronDownIcon } from "../../assets/Icons/ChevronDownIcon";
import { SearchIcon } from "../Navbar/search";
import { PlusIcon } from "../../assets/Icons/PlusIcon";
import { getFile } from "../../util/index";

const BannerList = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [delID, setDelID] = useState(null);
    const [page, setPage] = React.useState(1);
    const [pages, setPages] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);
    const [bannerList, setBannerList] = useState([]);



    const handleKeyDown = (event) => {
        if (event.key === "Enter" && isOpen) {
            handleDelete();
        }
    };


    useEffect(() => {
        const getCourses = async () => {
            await apiInstance
                .get(`banners`)
                .then((res) => {
                    setBannerList(res.data.data);
                    console.log(res.data.data, 'att')
                    setPages(res.data._metadata.page_count);
                });
        };

        getCourses();
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);




    return (
        <>
            <div className='flex flex-row gap-5 justify-between'>
                <div className='flex gap-4 mb-3 flex-row'>

                </div>
                <div className='flex gap-2 mb-3 flex-row'>
                    <Link to='/banner-create'>
                        <Button endContent={<PlusIcon />} color='primary'>
                            Add
                        </Button>
                    </Link>
                </div>
            </div>
            <div className='grid grid-cols-5 gap-10'>
                {bannerList.map((i) => (
                    <>
                        {i.images.map((e) => (
                            <div className='flex flex-col gap-2'>
                                <img src={getFile({ payload: e })} className='w-[190px] h-[190px] rounded-md' />
                                {/* <span className='text-[49px] font-extrabold text-[red] items-center justify-center'>-</span> */}
                            </div>
                        ))}

                        <div className='flex justify-center items-center'>

                            <Link to={`/banner-update/${i._id}`}>
                                <Button color='warning'>Update</Button>
                            </Link>
                        </div>
                    </>

                ))}

            </div>
        </>
    );
}
export default BannerList