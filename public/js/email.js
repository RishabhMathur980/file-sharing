const mail = async (data) => {
  const url = "/email";
  try {
    const res = await axios({
      method: "POST",
      url,
      data,
    });
    console.log(res);
    if (res.status == "200") {
      alert("Email sent!!!..Click on the link to download");
      window.setTimeout(() => {
        location.assign("/");
      }, 500);
    }
  } catch (err) {
    console.log(err);
  }
};
document.querySelector(".email-selector").addEventListener("submit", (el) => {
  el.preventDefault();
  const sender = document.getElementById("sender").value;
  const receiver = document.getElementById("receiver").value;
  console.log({ sender, receiver });
  mail({ sender, receiver });
});
