/* eslint-disable react/prop-types */
const ListBox = (props) => {
  const { children, className } = props;

  return <div className={`flex bg-gray-100 p-3 rounded-xl ${className}`}>{children}</div>;
};

export default ListBox;
