import { Button } from "@nextui-org/react";
import Loading from "./Loading";


/* eslint-disable react/prop-types */
const CustomButton = (props) => {
    const { isLoading, title, ...args } = props

    return (
        <Button isDisabled={isLoading} {...args} className={`hover:border p-1 border-gray-400 hover:shadow-sm ${isLoading ? 'cursor-not-allowed' : ''}`}>
            {
                isLoading ? <Loading size={"sm"} /> : title
            }
        </Button>
    )
}

export default CustomButton