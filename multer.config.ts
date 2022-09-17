import { diskStorage } from 'multer';
import { extname, join } from 'path';

const generateFileName = (req, file, callback) => {
  const fileExtension = extname(file.originalname);

  const randomName = Array(16)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${randomName}${fileExtension}`);
};

const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const multerConfig = {
  storage: diskStorage({
    destination: join(__dirname, 'public'),
    filename: generateFileName,
  }),
  fileFilter: imageFileFilter,
};
