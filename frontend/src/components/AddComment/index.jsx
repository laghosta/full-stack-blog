import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios";
import {useDispatch} from "react-redux";
import {fetchAddComment} from "../../Redux/PostSlice";

export const Index = ({onAddComment, id}) => {
  const [comment, setComment] = React.useState("")
  const onClickSend = async() => {
      await axios.post(`/posts/addComment/${id}`, {text:comment})
      onAddComment(id)
      setComment("")
  }
  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src="https://mui.com/static/images/avatar/5.jpg"
        />
        <div className={styles.form}>
          <TextField value={comment} onChange={(e) => setComment(e.target.value)}
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
          />
          <Button disabled={!comment.length} onClick={onClickSend} variant="contained">Отправить</Button>
        </div>
      </div>
    </>
  );
};
