export const getTableData = ({ getViewButton, getUpdateButton }) => {
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
            },
            {
                name: "Show To Student",
                key: "showToStudent",
            },
            {
                name: 'Action',
                key: 'action',
                getComponent: (data) => {
                    return (<div className="flex gap-3">{getViewButton(data._id)}{getUpdateButton(data)}</div>)
                }
            },
        ],
    };
};
