/* eslint-disable react/prop-types */
import { FileUploader } from "react-drag-drop-files";

const CustomFileDrag = (props) => {

    const { handleChange, ...args } = props

    return (
        <FileUploader
            handleChange={handleChange}
            {...args}
        />
    )
}

export default CustomFileDrag