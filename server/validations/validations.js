import { body } from 'express-validator';

export const registrValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Минимальная длина пароля 5 символов').isLength({ min: 5 }),
  body('fullName', 'Минимальная длина имени 3 символа').isLength({ min: 3 }),
  body('avatarUrl', 'Неверная ссылка на автарку').optional().isURL(),
];

export const loginValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Минимальная длина пароля 5 символов').isLength({ min: 5 }),
];

export const postCreateValidation = [
  body('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),
  body('text', 'Введите текст статьи').isLength({ min: 8 }).isString(),
  body('tags', 'Неверный формат тэгов(укажите массив)').optional().isString(),
  body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
];
