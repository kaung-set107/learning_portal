/* eslint-disable react/prop-types */
import {Select, SelectItem} from "@nextui-org/select";

export default function CustomMultiSelect(props) {
    const {data, selectedKeys, setValues, ...args} = props

  return (
    <Select
      {...args}
      selectionMode="multiple"
      selectedKeys={selectedKeys}
      onSelectionChange={setValues}
      className="max-w-xs"
    >
      {data.map((each) => (
        <SelectItem key={each.key} value={each.value}>
          {each.value}
        </SelectItem>
      ))}
    </Select>
  );
}
