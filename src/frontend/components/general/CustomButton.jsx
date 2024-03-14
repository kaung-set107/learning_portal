import { Button } from "@nextui-org/react";


/* eslint-disable react/prop-types */
const CustomButton = (props) => {
    const { isLoading, title, ...args } = props

    return (
        <Button {...args}>
            {
                isLoading ? "Loading" : title
            }
        </Button>
    )
}

export default CustomButton