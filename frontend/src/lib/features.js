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
