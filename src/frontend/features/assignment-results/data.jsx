import { convertAndDisplayTZ } from "../../../util/Util";
import FileLoader from "../../components/general/FileLoader";

export const getTableData = ({ getCheckButton }) => {
    return {
        headers: [
            {

                name: "Code",
                key: "code",
            },
            {

                name: "Submission Date",
                key: "submissionDate",
                getComponent: (data) => {
                    return (
                        <>
                            <p>{data.submissionDate ? convertAndDisplayTZ(data.submissionDate) : 'Not Set'}</p>
                        </>
                    )
                }
            },
            {
                name: "Student",
                key: "student",
                getComponent: (data) => {
                    return (
                        <>
                            <p>{data?.student?.name ?? 'Not Set'}</p>
                        </>
                    )
                }
            },
            {
                name: 'Answer file',
                key: 'file',
                getComponent: (data) => {
                    return (
                        <>
                            {data.file && (<FileLoader file={data.file} />)}
                        </>
                    )
                }
            },
            {

                name: "Grade",
                key: "grade",
            },
            {
                name: 'Action',
                key: 'action',
                getComponent: (data) => {
                    return (
                        <>
                            {getCheckButton(data._id)}
                        </>
                    )
                }
            },
        ],
    };
};
