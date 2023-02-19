import Container from "@mui/material/Container";
import React from "react"
import  {Routes, Route} from 'react-router-dom'
import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import {useDispatch} from "react-redux";
import {fetchAuthMe} from "./Redux/AuthSlice";

function App() {
    const dispatch = useDispatch()
    React.useEffect(()=>{
        dispatch(fetchAuthMe())
    }, [])

  return (
    <>
      <Header />
      <Container maxWidth="lg">
          <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/posts/:id" element = {<FullPost />}/>
              <Route path="/posts/:id/edit" element = {<AddPost />}/>
              <Route path="/add-post" element = {<AddPost />}/>
              <Route path="/auth/login" element = {<Login />}/>
              <Route path="/auth/register" element = {<Registration />}/>
          </Routes>
      </Container>
    </>
  );
}

export default App;
