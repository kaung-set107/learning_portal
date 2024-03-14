import { download, downloadPDF, getFile } from "../../../util"
import PdfPhoto from "../../ByInstructor/images/pdf.png"
import ExcelPhoto from "../../ByInstructor/images/excel.png"
import { Image } from "@nextui-org/react";

/* eslint-disable react/prop-types */
const ImageLoader = (props) => {
    const { image, images } = props
    return (
        <div className="">
            <a
                href={getFile({ payload: image })}
                onClick={
                    image.originalname?.split(".")[1] === "pdf"
                        ? () => downloadPDF(image)
                        : () => download()
                }>
                <Image
                    radius="sm"
                    alt={image.title}
                    className="object-cover w-[40px] h-[40px]"
                    src={
                        image.originalname?.split(".")[1] === "pdf"
                            ? PdfPhoto
                            : image.originalname?.split(".")[1] === "xlsx"
                                ? ExcelPhoto
                                : getFile({ payload: image })
                    }
                />
            </a>
            <b className="mt-3">{image?.originalname}</b>
        </div>
    )
}

export default ImageLoader