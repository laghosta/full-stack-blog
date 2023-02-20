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
import axios from "../../axios";

export const Registration = () => {
    const avatarRef = React.useRef(null)
    const isAuth = useSelector(isLogged)
    const [selectedFile, setSelectedFile] = React.useState();
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm({
        defaultValues: {
            userName: "",
            email: "",
            password: "",
            avatarUrl: ""
        },
        mode: "onSubmit"
    })
    const handleChangeFile = async (e) => {
        try {
            const formData = new FormData()
            formData.append("avatarUrl", e.target.files[0])
            await axios.post("/upload/avatars", formData).then(({data}) => setSelectedFile(data.url))

        } catch (err) {
            console.log(err)
        }
    };
    const onSubmit = async (values) => {
        console.log(selectedFile);
        console.log(values)
        values.avatarUrl = selectedFile
        const data = await dispatch(fetchRegister(values))
        if (!data.payload) {
            return alert("Не удалось mf,d m,fm")

        }
        if ("token" in data.payload) {
            window.localStorage.setItem("token", data.payload.token)
        } else {
            alert("Не удалось зарег")
        }
        console.log(values)
    }

    if (isAuth) {
        return <Navigate to="/"/>
    }


    return (
        <Paper classes={{root: styles.root}}>
            <Typography classes={{root: styles.title}} variant="h5">
                Создание аккаунта
            </Typography>
            <Avatar className={styles.avatar} onClick={() => avatarRef.current.click()}
                    src={selectedFile ? `http://localhost:9999/${selectedFile}` : 'https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png'} sx={{width: 100, height: 100}}/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    ref={avatarRef} type="file"
                    onChange={handleChangeFile} hidden
                />
                <TextField
                    {...register('userName')}
                    type="text"
                    placeholder={"User Name"}
                    className={styles.field} label="Полное имя" fullWidth/>
                <TextField
                    {...register('email')}
                    type="email"
                    placeholder={"Email"}
                    className={styles.field} label="E-Mail" fullWidth/>
                <TextField
                    {...register('password')}
                    type="password"
                    placeholder={"Password"}
                    className={styles.field} label="Пароль" fullWidth/>
                <Button type="submit" size="large" variant="contained" fullWidth>
                    Зарегистрироваться
                </Button>
            </form>

        </Paper>
    );
};
