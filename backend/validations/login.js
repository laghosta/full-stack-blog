import {body} from "express-validator"

export const loginValidation = [
    body("email", "Неверный формат почты").isEmail(),
    body("password", "Пароль должен содержать минимум 8 символов").isLength({min:8}),
    body("password", "Пароль не должен содержать кирилличные символы").matches(/^[A-Za-z0-9 .,'!&]+$/),
]