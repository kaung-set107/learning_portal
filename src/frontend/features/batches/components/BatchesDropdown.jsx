/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Select, SelectItem } from "@nextui-org/select";
import Loading from "../../../components/general/Loading";
import { batchesApi } from "../../batches/api";

const BatchesDropdown = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [batches, setBatches] = useState([]);

  const { filters, setBatch, className } = props;

  const getBatches = async () => {
    setIsLoading(true);
    try {
      let res = await batchesApi.getAll({ subject: filters.subject._id });
      setBatches(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBatchSelect = (id) => {
    let batch = batches.data.find((e) => e._id == id);
    setBatch(batch);
  };

  useEffect(() => {
    getBatches();
  }, []);

  useEffect(() => {
    getBatches();
  }, [filters.subject]);

  let content;

  if (isLoading) {
    content = <Loading />;
  }

  if (!isLoading) {
    content = (
      <div>
        <Select
          items={batches.data}
          color="primary"
          label="Batch"
          placeholder={
            batches?.data?.length > 0 ? `Select a batch` : "No batch!"
          }
          className="max-w-xs"
          onSelectionChange={(e) => handleBatchSelect(e.currentKey)}
        >
          {(batch) => (
            <SelectItem key={batch._id}>
              {`Batch: ${batch.name ?? "Not Set!"}`}
            </SelectItem>
          )}
        </Select>
      </div>
    );
  }

  return <div className={`${className}`}>{content}</div>;
};

export default BatchesDropdown;
