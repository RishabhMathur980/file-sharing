const dropZone = document.querySelector(".drop-zone");
const fileInput = document.querySelector("#myfile");
const browseBtn = document.querySelector(".browseBtn");
const copyBtn = document.querySelector("#copybtn");
const Input = document.querySelector("#fileInput");
const host = "https://innshare.herokuapp.com/";
const uploadURL = `${host}api/files`;
dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  if (!dropZone.classList.contains("dragged")) {
    dropZone.classList.add("dragged");
  }
});
dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("dragged");
});
dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropZone.classList.remove("dragged");
  const files = e.dataTransfer.files;
  console.log(files);
  if (files.length) {
    fileInput.files = files;
    // uploadFiles();
  }
});
browseBtn.addEventListener("click", () => {
  fileInput.click();
  console.log(fileInput.files);
});
// const uploadFiles = () => {
//   const files = fileInput.files[0];
//   const formData = new FormData();
//   formData.append("my files", files);
//   const xhr = new XMLHttpRequest();
//   xhr.onreadystatechange = () => {
//     if (xhr.readyState === XMLHttpRequest.DONE) {
//       console.log(xhr.response);
//     }
//   };
//   xhr.open("POST", uploadURL);
//   xhr.send(formData);
// };
copyBtn.addEventListener("click", () => {
  Input.select();
  document.execCommand("copy");
});
