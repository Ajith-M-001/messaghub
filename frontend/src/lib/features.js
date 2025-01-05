import moment from "moment";

export const fileFormat = (url = "") => {
  const fileExtention = url.split(".").pop().toLowerCase();
  if (
    fileExtention === "mp4" ||
    fileExtention === "webm" ||
    fileExtention === "ogg"
  ) {
    return "video";
  }
  if (fileExtention === "mp3" || fileExtention === "wav") {
    return "audio";
  }
  if (
    fileExtention === "png" ||
    fileExtention === "jpeg" ||
    fileExtention === "gif" ||
    fileExtention === "jpg"
  ) {
    return "image";
  }

  return "file";
};

export const transformImage = (url = "", width = 100) => url;

export const getLast7Days = () => {
  const currentDate = moment();
  const last7Days = [];

  for (let i = 6; i >= 0; i--) {
    const daydate = currentDate.clone().subtract(i, "days");
    const dayName = daydate.format("ddd");
    last7Days.push(dayName);
  }

  return last7Days;
};
