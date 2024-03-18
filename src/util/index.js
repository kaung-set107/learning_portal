// eslint-disable-next-line no-unused-vars
export const getFile = ({ resource, fileType, payload }) => {
  let prefix = payload.destination.replace("public/assets/", "");
  return (
    `http://learningportalbackend.kwintechnologies.com:3600/${prefix}/` +
    payload.filename
  );
};

export const download = (data) => {
  var element = document.createElement("a");
  if(data && data.mimetype.includes('image')) {
    var file = new Blob(
      [
        "https://timesofindia.indiatimes.com/thumb/msid-70238371,imgsize-89579,width-400,resizemode-4/70238371.jpg",
      ],
      { type: "image/*" }
    );
    element.href = URL.createObjectURL(file);
    // element.download = "image.jpg";
    element.click();
  } else {
    element.click();
  }
};

export const downloadPDF = (val) => {
  // Replace 'your-pdf-file.pdf' with the actual file path or URL
  const pdfUrl = getFile({ payload: val });

  // Create a link element
  const link = document.createElement("a");
  link.href = pdfUrl;
  link.download = "downloaded-file.pdf";

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
