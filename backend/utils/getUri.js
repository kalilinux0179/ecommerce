import DatauriParser from "datauri/parser.js";
import path from "path";

const parser = new DatauriParser();

const getURI = (file) => {
  if (!file || !file.originalname || !file.buffer) {
    throw new Error("Invalid file object passed to getURI");
  }
  const extName = path.extname(file.originalname);
  return parser.format(extName, file.buffer);
};

export default getURI;
