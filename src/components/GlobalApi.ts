import axios from "axios";

const sendEmail = async (fileInfo: any) =>
  await axios.post("/api/send", {
    fileInfo: fileInfo,
  });

export default { sendEmail };
