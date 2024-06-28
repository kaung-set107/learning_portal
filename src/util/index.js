import Swal from "sweetalert2";

// eslint-disable-next-line no-unused-vars
export const getFile = ({ resource, fileType, payload }) => {
  let prefix = payload.destination.replace("public/assets/", "");
  // return (
  //   `http://learningportalbackend.kwintechnologies.com:3600/${prefix}/` +
  //   payload.filename
  // );

  return (
    `http://localhost:3600/${prefix}/` +
    payload.filename
  )
};

export const download = (data) => {
  let element = document.createElement("a");
  if (data && data.mimetype.includes("image")) {
    let file = new Blob([getFile({ payload: data })], { type: "image/*" });
    element.href = URL.createObjectURL(file);
    element.download = data.originalname;
    element.click();
  } else {
    element.download = data.originalname;
    element.click();
  }
};

export const downloadPDF = (val) => {
  console.log("hereing dfsljfkls");

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
    if (Array.isArray(pair[1])) {
      pair[1].map((each) => {
        formData.append(pair[0], each);
      });
    } else {
      formData.append(pair[0], pair[1]);
    }
  }

  return formData;
};

export const showConfirmWithInput = async (payload) => {
  return Swal.fire({
    title: payload.title ?? "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    return result.isConfirmed;
  });
};
