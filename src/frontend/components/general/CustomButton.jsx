import { Button } from "@nextui-org/react";
import { FaEdit } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import Loading from "./Loading";


/* eslint-disable react/prop-types */
const CustomButton = (props) => {
    const { isLoading, iconOnly, textOnly, title, type, ...args } = props

    let getColor = () => {
        if (type === 'edit') {
            return 'success'
        } else if (type === 'create') {
            return "warning"
        } else if (type === 'delete') {
            return 'danger'
        }
    }


    let getContent = () => {
        if (type === 'edit') {
            if (iconOnly) {
                return (<><FaEdit /></>)
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
        }

        else {
            return title
        }
    }

    return (
        <Button color={getColor()} isDisabled={isLoading} {...args} className={`hover:border p-1 border-gray-400 hover:shadow-sm ${isLoading ? 'cursor-not-allowed' : ''}`}>
            {
                isLoading ? <Loading size={"sm"} /> : getContent()
            }
        </Button>
    )
}

export default CustomButton