/* eslint-disable react/prop-types */
import {
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Tooltip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMisc,
  setIsFileMenu,
  setUploadingLoader,
} from "../../redux/slices/misc";
import ImageIcon from "@mui/icons-material/Image";
import { useRef } from "react";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import toast from "react-hot-toast";
import { useSendAttachmentsMutation } from "../../redux/api/chatAPI/chatApi";
const FileMenu = ({ anchorEl, chatId }) => {
  const { isFileMenu } = useSelector(selectMisc);
  const dispatch = useDispatch();
  const imageRef = useRef(null);
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const fileRef = useRef(null);

  const selectImage = () => imageRef.current.click();
  const selectAudio = () => audioRef.current.click();
  const selectVideo = () => videoRef.current.click();
  const selectFile = () => fileRef.current.click();

  const handleClose = () => {
    dispatch(setIsFileMenu(false));
  };

  const [sendAttachment, { isLoading }] = useSendAttachmentsMutation();

  const fileChangeHandler = async (e, type) => {
    const files = Array.from(e.target.files);
    console.log("files", files);
    if (!files || files.length <= 0) return;
    if (files.length > 5)
      return toast.error(`You can only upload 5 ${type} files at a time.`);

    dispatch(setUploadingLoader(true));
    const toastId = toast.loading(`Uploading ${files.length} ${type} files`);
    handleClose();
    //fetching here

    try {
      const myForm = new FormData();
      myForm.append("chatId", chatId);
      files.forEach((file) => {
        console.log("sdafdsfsdf", file);
        myForm.append("files", file);
      });
      const response = await sendAttachment(myForm).unwrap();

      console.log(response);
      dispatch(setUploadingLoader(false));
      toast.dismiss(toastId);
      toast.success(`${files.length} ${type} files uploaded successfully!`);
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <Menu onClose={handleClose} open={isFileMenu} anchorEl={anchorEl}>
      {/* Menu items */}
      <div style={{ width: "10rem" }}>
        <MenuList>
          <MenuItem onClick={() => selectImage()}>
            <Tooltip title="upload image">
              <IconButton>
                <ImageIcon />
              </IconButton>
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>Image</ListItemText>
            <input
              ref={imageRef}
              type="file"
              multiple
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "images")}
            />
          </MenuItem>

          <MenuItem onClick={() => selectAudio()}>
            <Tooltip title="upload audio">
              <IconButton>
                <AudioFileIcon />
              </IconButton>
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>Audio</ListItemText>
            <input
              ref={audioRef}
              type="file"
              multiple
              accept="audio/*"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "audios")}
            />
          </MenuItem>

          <MenuItem onClick={() => selectVideo()}>
            <Tooltip title="upload video">
              <IconButton>
                <VideoLibraryIcon />
              </IconButton>
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>Video</ListItemText>
            <input
              ref={videoRef}
              type="file"
              multiple
              accept="video/*"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "videos")}
            />
          </MenuItem>

          <MenuItem onClick={() => selectFile()}>
            <Tooltip title="upload file">
              <IconButton>
                <InsertDriveFileIcon />
              </IconButton>
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>File</ListItemText>
            <input
              ref={fileRef}
              type="file"
              multiple
              accept="*"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "files")}
            />
          </MenuItem>
        </MenuList>
      </div>
    </Menu>
  );
};

export default FileMenu;
