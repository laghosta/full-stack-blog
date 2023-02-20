import React, {forwardRef, useRef} from "react";
import { Post } from "../components";
import { Index } from "../components";
import { CommentsBlock } from "../components";
import {useParams} from 'react-router-dom'
import axios from "../axios";
import ReactMarkdown from "react-markdown";
export const FullPost = () => {
    const [data, setData] = React.useState({})
    const [isLoading, setIsLoading] = React.useState(true)
    const {id} = useParams()
    function updatePost(id){
         axios.get(`/posts/${id}`).then(res=>{
            setData(res.data)
            setIsLoading(false)
        })
    }
    React.useEffect(()=>{updatePost(id)}, [] )
    if(isLoading) {
        return <Post isLoading={isLoading} isFullPost/>
    }
  return (
    <>
      <Post
        id={data.id}
        title={data.title}
        imageUrl={data.imageUrl}
        user={{
            avatarUrl: `${data.author.avatarUrl ? `http://localhost:9999/${data.author.avatarUrl}` : 'https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png'}`,
            fullName: `${data.author.userName}`,
        }}
        createdAt={data.createdAt.slice(0, "10")}
        viewsCount={data.viewsCount}
        commentsCount={data.comments.length}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text}/>
      </Post>
      <CommentsBlock
        items={data.comments ? data.comments : null}
        isLoading={false}
      >
        <Index author={data.author} onAddComment={(id)=>updatePost(id)} id={id}/>
      </CommentsBlock>
    </>
  );
};
