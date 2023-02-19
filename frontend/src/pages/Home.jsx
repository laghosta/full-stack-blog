import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import {CommentsBlock, Post, TagsBlock} from '../components';
import {useDispatch, useSelector} from "react-redux";
import {fetchPosts,fetchTags} from "../Redux/PostSlice";

export const Home =  () => {
    const dispatch = useDispatch()
    const {posts, tags} = useSelector(state => state.PostReducer)
    const userData = useSelector(state => state.AuthReducer.data)
    const isPostsLoading  = posts.status === 'loading'
    const isTagsLoading  = tags.status === 'loading'
    console.log(posts)
    React.useEffect(()=>{
        dispatch(fetchPosts())
        dispatch(fetchTags())
    }, [])
    return (
        <>
            <Tabs style={{marginBottom: 15}} value={0} aria-label="basic tabs example">
                <Tab label="Новые"/>
                <Tab label="Популярные"/>
            </Tabs>
            <Grid container spacing={4}>
                <Grid xs={8} item>
                    {isPostsLoading ? [...Array(5)].map((obj, id) => (
                       <Post key={id} isLoading={true}/>))
                        :
                        posts.items.payload !== undefined ?
                        posts.items.payload?.map((obj, id) => (
                           <Post
                              key={id}
                              id={obj._id}
                              title={obj.title}
                              imageUrl={obj.imageUrl ? obj.imageUrl : ""}
                              user={{
                                  avatarUrl: `${obj.author.avatar ? obj.author.avatar : 'https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png'}`,
                                  fullName: `${obj.author.userName}`,
                              }}
                              createdAt={obj.createdAt.slice(0, "10")}
                              viewsCount={obj.viewsCount}
                              commentsCount={3}
                              tags={obj.tags}
                              isEditable = {userData?.payload._id === obj.author._id}
                          />
                        )
                    ): null}
                </Grid>
                <Grid xs={4} item>
                    <TagsBlock tags={tags.items} isLoading={isTagsLoading}/>
                    <CommentsBlock
                        items={[
                            {
                                user: {
                                    fullName: 'Вася Пупкин',
                                    avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                                },
                                text: 'Это тестовый комментарий',
                            },
                            {
                                user: {
                                    fullName: 'Иван Иванов',
                                    avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                                },
                                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
                            },
                        ]}
                        isLoading={false}
                    />
                </Grid>
            </Grid>
        </>
    );
};
