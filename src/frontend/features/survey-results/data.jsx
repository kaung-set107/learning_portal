export const getTableData = ({getViewButton}) => {
  return {
    headers: [
      {
        name: "Code",
        key: "code",
      },
      {
        name: "Survey",
        key: "survey",
        getComponent: (data) => {
          return (
            <>
              <p>{data?.survey?.code ?? "Not Set"}</p>
            </>
          );
        },
      },
      {
        name: "Student",
        key: "student",
        getComponent: (data) => {
          return (
            <>
              <p>{data?.student?.name ?? "Not Set"}</p>
            </>
          );
        },
      },
      {
        name: 'Action',
        key: 'action',
        getComponent: (data) => {
            return (<div className="flex gap-3">{getViewButton(data._id)}</div>)
        }
    },
    ],
  };
};
