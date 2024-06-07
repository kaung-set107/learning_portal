import { getFile } from "../../../util";

/* eslint-disable react/prop-types */
const ImageLoader = (props) => {
  const { file, ...args } = props;
  return (
    <div {...args}>
      <img src={getFile({payload: file})}/>
      <p>{file?.originalname}</p>
    </div>
  );
};

export default ImageLoader;
