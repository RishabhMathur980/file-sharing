const send = async (data) => {
  const url = "/api/files";

  try {
    const res = await axios({
      method: "POST",
      url,
      data,
    });
    console.log(res);
    if (res.status == "200") {
      window.setTimeout(() => {
        location.assign("/files");
      }, 500);
    }
  } catch (err) {
    console.log(err);
  }
};
document.querySelector(".drop-zone").addEventListener("submit", (el) => {
  el.preventDefault();
  const form = new FormData();
  form.append("myfile", document.getElementById("myfile").files[0]);
  //   const form = document.getElementById("myfile").files[0];
  console.log(form);
  send(form);
});
// document.querySelector(".email-selector").addEventListener("submit", (el) => {
//   el.preventDefault();
//   const sender = document.getElementById("sender").value;
//   const receiver = document.getElementById("receiver").value;
//   console.log({ sender, receiver });
//   send({ sender, receiver }, "mail");
// });
