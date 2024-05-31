/* eslint-disable react/prop-types */
const CustomCard = (props) => {
  const { className, children } = props;

  return <div className={`p-2 rounded-lg border ${className}`}>{children}</div>;
};

export default CustomCard;
