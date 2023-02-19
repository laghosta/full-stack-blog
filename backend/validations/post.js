import {body} from "express-validator"
export const postValidation = [
    body("title", "Обязательно укажите название статьи").isLength({min:5, max:100}).isString(),
    body("text", "Обязательно ввеедите текст статьи").isLength({min:10}).isString(),
    body("tags", "Неверный формат тэгов").optional(),
    body("imageUrl", "Неверная ссылка на изображение").optional().isURL(),
    body("userId", "Что-то пошло не так").isString()
]