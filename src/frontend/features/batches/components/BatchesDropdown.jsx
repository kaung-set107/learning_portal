/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { Select, SelectItem } from "@nextui-org/select";
import Loading from "../../../components/general/Loading"
import { batchesApi } from "../../batches/api"

const BatchesDropdown = (props) => {
    const [isLoading, setIsLoading] = useState(true)
    const [batches, setBatches] = useState([])

    const { setBatch, className } = props

    const getBatches = async () => {
        try {
            let res = await batchesApi.getAll()
            setBatches(res)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleBatcheSelect = (id) => {
        let batch = batches.data.find(e => e._id == id)
        setBatch(batch)
    }

    useEffect(() => {
        getBatches()
    }, [])

    let content

    if (isLoading) {
        content = (<Loading />)
    }

    if (!isLoading) {
        content = (<div>
            <Select
                items={batches.data}
                color="primary"
                label="Batch"
                placeholder="Select an batch"
                className="max-w-xs"
                onSelectionChange={e => handleBatcheSelect(e.currentKey)}
            >
                {(batch) => (
                    <SelectItem key={batch._id} textValue={batch.title}>
                        {`Batch: ${batch.name ?? 'Not Set!'}`}
                    </SelectItem>
                )}
            </Select>
        </div>)
    }

    return (
        <div className={`${className}`}>
            {content}
        </div>
    )
}

export default BatchesDropdown