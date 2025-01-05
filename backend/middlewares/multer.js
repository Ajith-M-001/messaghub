import multer from "multer";

const storage = multer.memoryStorage(); // Store the file in memory

const multerUpload = multer({
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

export const singleAvatar = multerUpload.single("avatar");