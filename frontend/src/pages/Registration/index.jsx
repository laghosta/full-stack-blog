import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import styles from './Login.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {fetchRegister, isLogged} from "../../Redux/AuthSlice";
import {useForm} from "react-hook-form";
import {Navigate} from "react-router-dom";

export const Registration = () => {
    const isAuth = useSelector(isLogged)
    const dispatch = useDispatch()
    const {register, handleSubmit, formState: {errors, isValid}} = useForm({
        defaultValues: {
            userName: "",
            email: "",
            password: "",
        },
        mode: "onSubmit"
    })

    const onSubmit = async (values) => {
        const data = await dispatch(fetchRegister(values))
        console.log(data)
        if (!data.payload) {
            return alert("Не удалось mf,d m,fm")

        }
        if ("token" in data.payload) {
            window.localStorage.setItem("token", data.payload.token)
        } else {
            alert("Не удалось зарег")
        }

    }
    if (isAuth) {
        return <Navigate to="/"/>
    }
    return (
        <Paper classes={{root: styles.root}}>
            <Typography classes={{root: styles.title}} variant="h5">
                Создание аккаунта
            </Typography>
            <div className={styles.avatar}>
                <Avatar sx={{width: 100, height: 100}}/>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    type="text"
                    placeholder={"User Name"}
                    error={Boolean(errors.userName?.message)}
                    helperText={errors.userName?.message}
                    {...register("userName", {required: 'Укажите никнейм'})}
                    className={styles.field} label="Полное имя" fullWidth/>
                <TextField
                    type="email"
                    placeholder={"Email"}
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    {...register("email", {required: 'Укажите почту'})}
                    className={styles.field} label="E-Mail" fullWidth/>
                <TextField
                    type="password"
                    placeholder={"Password"}
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    {...register("password", {required: 'Укажите пароль'})}
                    className={styles.field} label="Пароль" fullWidth/>
                <Button type="submit" size="large" variant="contained" fullWidth>
                    Зарегистрироваться
                </Button>
            </form>

        </Paper>
    );
};
