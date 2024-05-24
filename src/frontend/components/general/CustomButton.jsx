import { Button } from "@nextui-org/react";
import { FaRegEdit } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";
import Loading from "./Loading";
import { showConfirmWithInput } from "../../../util";

/* eslint-disable react/prop-types */
const CustomButton = (props) => {
    const { isLoading, iconOnly, textOnly, title, type, onClick, isDisabled, ...args } = props

    const navigate = useNavigate()

    let getColor = () => {
        if (type === 'edit') {
            return 'success'
        } else if (type === 'create') {
            return "warning"
        } else if (type === 'delete') {
            return 'danger'
        } else {
            return 'primary'
        }
    }


    let getContent = () => {
        if (type === 'edit') {
            if (iconOnly) {
                return (<><FaRegEdit /></>)
            } else if (textOnly) {
                return (<>{title}</>)
            }
        } else if (type === 'create') {
            if (iconOnly) {
                return (<><FiPlus /></>)
            } else if (textOnly) {
                return (<>{title}</>)
            }
        } else if (type === 'delete') {
            if (iconOnly) {
                return (<><FaRegTrashAlt /></>)
            } else if (textOnly) {
                return (<>{title}</>)
            }
        } else if (type === 'back') {
            if(iconOnly) {
                return (<><IoChevronBack/></>)
            } else {
                return (<><IoChevronBack className="mr-2 text-xl"/>{title}</>)
            }
        }

        return title
    }

    const handleOnClick = async (e) => {
        if(type === 'delete') {
            const res = await showConfirmWithInput({title: 'Are you sure to delete?'})
            console.log(res)
            if(!res) return
        }

        if(onClick) {
            onClick(e)
        } else if(type === 'back') {
            navigate(-1)
        }
    }

    return (
        <Button onClick={handleOnClick} color={getColor()} isDisabled={isLoading || isDisabled} {...args} className={`border px-2 border-transparent hover:border-gray-700 h-[40px] hover:shadow-sm ${isLoading ? 'cursor-not-allowed' : ''} ${isDisabled ? 'bg-gray-300' : ''}`}>
            {
                isLoading ? <Loading color="default" size={"sm"} /> : <span className="flex items-center justify-center">{getContent()}</span>
            }
        </Button>
    )
}

export default CustomButton