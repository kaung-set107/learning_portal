// eslint-disable-next-line no-unused-vars
export const getFile = ({ resource, fileType, payload }) => {
  let prefix = payload.destination.replace("public/assets/", "");
  return (
    `http://learningportalbackend.kwintechnologies.com:3600/${prefix}/` +
    payload.filename
  );
};

export const download = (data) => {
  let element = document.createElement("a");
  if(data && data.mimetype.includes('image')) {
    let file = new Blob(
      [
        getFile({payload: data}),
      ],
      { type: "image/*" }
    );
    element.href = URL.createObjectURL(file);
    element.download = data.originalname;
    element.click();
  } else {
    element.download = data.originalname;
    element.click();
  }
};

export const downloadPDF = (val) => {
  console.log('hereing dfsljfkls')

  // Replace 'your-pdf-file.pdf' with the actual file path or URL
  const pdfUrl = getFile({ payload: val });

  // Create a link element
  const link = document.createElement("a");
  link.href = pdfUrl;
  link.download = val.originalname;

  // Append the link to the document
  document.body.appendChild(link);

  // Trigger a click on the link to start the download
  link.click();

  // Remove the link from the document
  document.body.removeChild(link);
};

export const getFormData = (src) => {
  let formData = new FormData();

  for (const pair of Object.entries(src)) {
    formData.append(pair[0], pair[1]);
  }

  return formData
};
