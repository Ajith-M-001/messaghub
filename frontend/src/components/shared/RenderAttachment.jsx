import { transformImage } from "../../lib/features";
import InsertDriveFileSharpIcon from "@mui/icons-material/InsertDriveFileSharp";

/* eslint-disable react/prop-types */
const RenderAttachment = (file, url) => {
  switch (file) {
    case "image":
      return (
        <img
          width={"200px"}
          height={"150px"}
          src={transformImage(url, 200)}
          alt="attachment"
          style={{
            objectFit: "contain",
          }}
        />
      );
    case "video":
      return <video preload="none" width={"200px"} controls src={url} />;
    case "audio":
      return <audio preload="none" controls src={url} />;
    default:
      return <InsertDriveFileSharpIcon />; // It is a good practice to return null instead of an empty return.
  }
};

export default RenderAttachment;
