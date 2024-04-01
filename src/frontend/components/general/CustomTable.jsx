/* eslint-disable react/prop-types */
import {
  Table,
  TableHeader,
  TableColumn,
  Pagination,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Loading from "./Loading";

export default function CustomTable(props) {
  const { tableData, src, isLoading, ...args } = props;
  const [page, setPage] = useState(1);
  let perPage = 10;

  const getTotal = () => {
    let total = Math.ceil(src.count / perPage);
    if (total > 0) return total;
    return 1;
  };

  const items = useMemo(() => {
    if (src.count > 0) {
      const start = (page - 1) * perPage;
      const end = start + perPage;
      return src.data.slice(start, end);
    } else {
      return [];
    }
  }, [page, src, perPage]);

  return (
    <>
      <div className="relative">
        {
          isLoading && (
            <>
              <div className="w-full h-full backdrop-blur z-10 absolute top-0"></div>
              <div className="bg-white p-3 flex items-center justify-center shadow border absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20">
                <div className="text-center">
                  <div className="mb-3">
                    <Loading />
                  </div>
                  <span>Loading New Data</span>
                </div>
              </div>
            </>
          )
        }
      <Table
        {...args}
        aria-label="Example table with client side pagination"
        classNames={{
          wrapper: "min-h-[222px] relative",
        }}
      >
        <TableHeader>
          {tableData.headers.map((header, index) => {
            return (
              <TableColumn className="min-w-[150px]" key={header.key + index}>
                {header.name}
              </TableColumn>
            );
          })}
        </TableHeader>
        <TableBody
          // className="overflow-scroll"
          emptyContent={"No rows to display."}
        >
          {items.map((each) => {
            return (
              <TableRow key={uuidv4()}>
                {tableData.headers.map((header) => {
                  if (!header.getComponent) {
                    return (
                      <TableCell key={uuidv4()}>{each[header.key]}</TableCell>
                    );
                  } else if (header.getComponent) {
                    return (
                      <TableCell key={uuidv4()}>
                        {header.getComponent(each)}
                      </TableCell>
                    );
                  }
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      </div>
      <div className="flex justify-between">
        <div className="inline-block mx-auto my-3 p-3 rounded-xl border shadow">
          <Pagination
            showControls
            showShadow
            color="secondary"
            page={page}
            total={getTotal()}
            onChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </>
  );
}
