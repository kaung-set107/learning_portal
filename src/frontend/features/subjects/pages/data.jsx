export const getTableData = ({ getViewButton }) => {
  return {
    headers: [
      {
        name: "Code",
        key: "code",
      },
      {
        name: "Title",
        key: "title",
      },
      {
        name: "Description",
        key: "description",
        getComponent: (data) => {
          return (
            <>
              <p className="truncate w-[400px]">{data?.description ?? "Not Set"}</p>
            </>
          );
        },
      },
      {
        name: "Action",
        key: "action",
        getComponent: (data) => {
          return <>{getViewButton(data._id)}</>;
        },
      },
    ],
  };
};
