const multer = require('multer');
const uuid = require('uuid');
const mime = require('mime');


const getConfiguredMulter = (changeFolder, extList = undefined ) => {
        let multerConfig = getMulterConfig(changeFolder, extList);
        return multer(multerConfig);
};

const getMulterConfig = (changeFolder, extList = undefined) => {
  const storage = getMulterStorageConfig(changeFolder);
  const multerConfig = {
    storage: storage,
    dest: changeFolder,
  };
  if (extList) {
    multerConfig.fileFilter = function (req, file, cb) {
      if (!extList.includes(mime.getExtension(file.mimetype))) {
        return cb(
          new Error(
            `File extension not allowed. Allowed formats: ${extList.toString()}`
          )
        );
      }
      return cb(null, true);
    };
  }
  return multerConfig;
};

const getMulterStorageConfig = (changeFolder) => {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, changeFolder);
        },
        filename: (req, file, cb) => {
            cb(null, `${uuid.v4()}.${mime.getExtension(file.mimetype)}`);
        },
    });
};


module.exports = {
    getConfiguredMulter
};
