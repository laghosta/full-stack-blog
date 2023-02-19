import React from 'react';
import Button from '@mui/material/Button';
import {Link} from "react-router-dom"
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import {useDispatch, useSelector} from "react-redux";
import {isLogged, logout} from "../../Redux/AuthSlice";
import {Navigate} from "react-router-dom"
export const Header = () => {
  const isAuth = useSelector(isLogged)
  const dispatch = useDispatch()
  const onClickLogout = () => {
    window.localStorage.removeItem("token")
    dispatch(logout())
    return <Navigate to='/'/>
  };
  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link to="/" className={styles.logo}>
            <div>LAGHOSTA BLOG</div>
        </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post" >
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Link to="/" >
                  <Button onClick={onClickLogout} variant="contained" color="error">
                    Выйти
                  </Button>
                </Link>

              </>
            ) : (
              <>
                <Link to="/auth/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/auth/register">
                  <Button variant="contained">Создать аккаунт</Button>
              </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
