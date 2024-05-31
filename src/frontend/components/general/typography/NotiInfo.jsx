/* eslint-disable react/prop-types */
const NotiInfo = (props) => {
  const { children } = props;
  return <p className="text-lg font-semibold">{children ?? 'No Data!'}</p>;
};

export default NotiInfo;
