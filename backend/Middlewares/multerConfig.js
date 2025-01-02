import mutler from "multer";

const storage = mutler.memoryStorage();
const upload = mutler({ storage }).single("file");

export default upload;
