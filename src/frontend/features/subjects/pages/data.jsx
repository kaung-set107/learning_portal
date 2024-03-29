export const getTableData = ({
    getViewButton
}) => {
  return {
    headers: [
      {
        
        name: "Title",
        key: "title",
      },
      {
        
        name: "Description",
        key: "description",
      },
      {
        
        name: 'Action',
        key: 'action',
        getComponent: (data) => {
            return (
                <>
                    {getViewButton(data._id)}
                </>
            )
        }
      },
    ],
  };
};
