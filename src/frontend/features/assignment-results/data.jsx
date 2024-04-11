import { dateForDisplay } from "../../../util/Util";
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
                            <p>{data.submissionDate ? dateForDisplay(data.submissionDate) : 'Not Set'}</p>
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
                name: 'Checked File',
                key: 'checkedFile',
                getComponent: (data) => {
                    return (
                        <>
                            {data.checkedFile ? (<FileLoader file={data.checkedFile} />) : 'Not Set!'}
                        </>
                    )
                }
            },
            {
                name: "Grade",
                key: "grade",
            },
            {
                name: "Remark",
                key: "remark",
            },
            {
                name: 'Action',
                key: 'action',
                getComponent: (data) => {
                    if (data.status === 'submitted') {
                        return (<>
                            {getCheckButton(data._id)}
                        </>)
                    } else {
                        return 'No Action!'
                    }
                }
            },
        ],
    };
};
