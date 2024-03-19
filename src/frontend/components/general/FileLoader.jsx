import { download, downloadPDF, getFile } from "../../../util"
import PdfPhoto from "../../ByInstructor/images/pdf.png"
import ExcelPhoto from "../../ByInstructor/images/excel.png"
import { Image } from "@nextui-org/react";
import { FaFileAlt } from "react-icons/fa";

const getLogo = (file) => {
    // file.originalname?.split(".")[1] === "pdf"
    //                         ? PdfPhoto
    //                         : file.originalname?.split(".")[1] === "xlsx"
    //                             ? ExcelPhoto
    //                             : getFile({ payload: file })

    if (file.originalname?.split(".")[1] === "pdf") {
        return <Image
            radius="sm"
            alt={file.title}
            className="object-cover w-[40px] h-[40px]"
            src={
                PdfPhoto
            }
        />
    } else if (file.originalname?.split(".")[1] === "xlsx") {
        return <Image
            radius="sm"
            alt={file.title}
            className="object-cover w-[40px] h-[40px]"
            src={
                ExcelPhoto
            }
        />
    } else {
        return (<FaFileAlt className="w-[40px] h-[40px] border mb-3 rounded-xl p-2 shadow" />)
    }
}

/* eslint-disable react/prop-types */
const FileLoader = (props) => {
    const { file, files } = props
    return (
        <div className="">
            <a
                target="_blank"
                rel="noreferrer"
                href={getFile({ payload: file })}
                onClick={
                    file.originalname?.split(".")[1] === "pdf"
                        ? () => downloadPDF(file)
                        : () => download(file)
                }>
                {
                    getLogo(file)
                }
            </a>
            <b className="mt-3">{file?.originalname}</b>
        </div>
    )
}

export default FileLoader