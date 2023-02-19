import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import {useNavigate, Navigate, useParams} from "react-router-dom"
import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {isLogged} from "../../Redux/AuthSlice";
import axios from "../../axios";

export const AddPost = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const isAuth = useSelector(isLogged)
    const [loading, setLoading] = React.useState(false);
    const [text, setText] = React.useState('');
    const [title, setTitle] = React.useState("")
    const [tags, setTags] = React.useState("")
    const inputFileRef  = React.useRef(null)
    const [imageUrl, setImageUrl] = React.useState("");
    const isEditing  = Boolean(id)
    const handleChangeFile = async (e) => {
        try{
            const formData = new FormData()
            formData.append("image", e.target.files[0])
            await axios.post("/upload", formData).then(({data}) => setImageUrl(data.url))
        }
        catch(err) {
            return err
        }
    };
    const onClickRemoveImage = () => {
        setImageUrl("")
    };
    const onSubmit  = async () => {
        try{
            setLoading(true)
            const fields = {
                title,
                imageUrl,
                text,
                tags : tags.split(","),
            }
            const {data} =  isEditing
                ? await axios.patch(`/posts/${id}`, fields)
                : await axios.post("/posts", fields)

                navigate(`/posts/${isEditing ? id : data._id}`)
        }
        catch(err){
            console.log(err)
        }
    }
    const onChange = React.useCallback((value) => {
    setText(value);
    }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );
    if( !window.localStorage.getItem("token") && !isAuth){
        <Navigate to="/"/>
    }

    React.useEffect( () => {
        if (id) {
                axios.get(`posts/${id}`).then (({data}) => {
                setTitle(data.title)
                setText(data.text)
                setImageUrl(data.imageUrl)
                setTags(data.tags.join(","))
            })
        }
    }, [])
  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={()=>inputFileRef.current.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input ref={inputFileRef} type="file"  accept="image/png, image/jpeg" onChange={handleChangeFile} hidden/>
      {imageUrl && (
          <>
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
        <img className={styles.image} src={`http://localhost:9999/${imageUrl}`} alt="Uploaded" />
          </>
        )}
        <br />
        <br />
        <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value = {title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
         classes={{ root: styles.tags }}
         variant="standard"
         placeholder="Тэги"
         value={tags}
         onChange={(e) => setTags(e.target.value)}
         fullWidth
      />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} type="submit" size="large" variant="contained">
            {isEditing ? "Cохранить изменения" :'Опубликовать'}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
