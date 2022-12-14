import express from 'express';
import multer from 'multer';
import cors from 'cors';
import mongoose from 'mongoose';

import {
  registrValidation,
  loginValidation,
  postCreateValidation,
} from './validations/validations.js';

import { UserControler, PostControler } from './controlers/allImports.js';

import { checkAuth, handleValidationErrors } from './utils/allUtils.js';

mongoose
  .connect(
    'mongodb+srv://blogUser:ererer@cluster0.wrwomv7.mongodb.net/blog?retryWrites=true&w=majority'
  )
  .then(() => console.log('Connection to DB - OK!'))
  .catch((err) => console.log('DB error', err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());

app.use(cors());

app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('app started');
});

app.post(
  '/auth/login',
  loginValidation,
  handleValidationErrors,
  UserControler.login
);
app.post(
  '/auth/register',
  registrValidation,
  handleValidationErrors,
  UserControler.register
);
app.get('/auth/me', checkAuth, UserControler.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get('/tags', PostControler.getLastTags);

app.get('/posts', PostControler.getAllPosts);
app.get('/posts/tags', PostControler.getLastTags);
app.get('/posts/:id', PostControler.getOnePost);

app.post(
  '/posts',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostControler.create
);

app.patch(
  '/posts/:id',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostControler.updatePost
);
app.delete('/posts/:id', checkAuth, PostControler.removePost);

const PORT = 4444;
app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`server start on PORT ${PORT}`);
});
