/* eslint-disable react/prop-types */
import { Table, TableHeader, TableColumn, Pagination, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { useMemo, useState } from "react";
import { v4 as uuidv4 } from 'uuid';


export default function CustomTable(props) {
    const { tableData, src } = props
    const [page, setPage] = useState(1);
    let perPage = 10

    const getTotal = () => {
        return src.count / perPage
    }

    const items = useMemo(() => {
        const start = (page - 1) * perPage;
        const end = start + perPage;
    
        return src.data.slice(start, end);
      }, [page, src, perPage]);

    return (
        <Table aria-label="Example table with client side pagination"
            bottomContent={
                <div className="flex w-full justify-center">
                    <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="secondary"
                        page={page}
                        total={getTotal()}
                        onChange={(page) => setPage(page)}
                    />
                </div>
            }
            classNames={{
                wrapper: "min-h-[222px]",
            }}>
            <TableHeader>
                {
                    tableData.headers.map((header, index) => {
                        return (<TableColumn key={header.key + index}>{header.name}</TableColumn>)
                    })
                }
            </TableHeader>
            <TableBody>
                {
                    items.map((each) => {
                        return (
                            <TableRow key={uuidv4()}>
                                {
                                    tableData.headers.map(header => {
                                        if(header.key !== 'action') {
                                            return (<TableCell key={uuidv4()}>{each[header.key]}</TableCell>)
                                        } else {
                                            return (<TableCell key={uuidv4()}>{header.getComponent(each._id)}</TableCell>)
                                        }
                                    })
                                }
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        </Table>
    );
}
