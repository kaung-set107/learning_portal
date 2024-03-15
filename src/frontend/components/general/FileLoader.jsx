import { download, downloadPDF, getFile } from "../../../util"
import PdfPhoto from "../../ByInstructor/images/pdf.png"
import ExcelPhoto from "../../ByInstructor/images/excel.png"
import { Image } from "@nextui-org/react";

/* eslint-disable react/prop-types */
const FileLoader = (props) => {
    const { file, files } = props
    return (
        <div className="">
            <a
                href={getFile({ payload: file })}
                onClick={
                    file.originalname?.split(".")[1] === "pdf"
                        ? () => downloadPDF(file)
                        : () => download()
                }>
                <Image
                    radius="sm"
                    alt={file.title}
                    className="object-cover w-[40px] h-[40px]"
                    src={
                        file.originalname?.split(".")[1] === "pdf"
                            ? PdfPhoto
                            : file.originalname?.split(".")[1] === "xlsx"
                                ? ExcelPhoto
                                : getFile({ payload: file })
                    }
                />
            </a>
            <b className="mt-3">{file?.originalname}</b>
        </div>
    )
}

export default FileLoader