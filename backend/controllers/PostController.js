import Post from "../models/Post.js";
import User from "../models/User.js";
export const createPost = async (req, res) => {
    try {
        const doc = new Post({
            title: req.body.title,
            imageUrl: req.body.imageUrl,
            text: req.body.text,
            tags: req.body.tags,
            author: req.userId,
            comments: req.comments
        })
        const post = await doc.save()
        console.log(req.body)
        res.json(post);
    } catch (err) {
        res.status(500).json({
            message: "Не удалось создать статью"
        })
    }

}
export const getAll = async (req, res) => {
    try {
        const posts = await Post.find().populate("author").exec()
        res.json(posts)
    } catch (err) {
        res.json({
            message: "Не удалось получить статьи"
        })
    }
}
export const getOne = async (req, res) => {
    try {
        const postId = req.params.id
        await Post.findOneAndUpdate(
        {
            _id: postId,
        },
        {
            $inc: { viewsCount: 1 },
        },
        {
            returnDocument: "after"
        },
        ).populate("author").populate('comments.author').then(doc=>res.json(doc))
    }
    catch (err) {
        console.log(err)
        res.json(err)
    }
}
export const deletePost = async (req, res)=>{
    try {
        const postId = req.params.id
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json({msg: 'Post not found'});
        }
        await post.remove();
        await res.json({
            msg: "Post removed"
        });
    }
    catch(err){
        res.json({
            message: "Что-то пошло не так"
        })
    }
}
export const updatePost = async (req, res)=>{
    try{
        const postId = req.params.id
        await Post.updateOne({
            _id: postId
            },
        {
            title : req.body.title,
            text : req.body.text,
            imageUrl : req.body.imageUrl,
            author : req.body.userId,
            comments : req.body.comments,
            tags : req.body.tags
            }
        )
        res.json({
            success : true
        })

    }
    catch(err){
        res.json({
            message: "Что-то пошло не так"
        })
    }
}
export const getLastTags = async (req, res) =>{
    try{
        const posts  = await Post.find().limit(5).exec()
        let tags=posts.map(obj => obj.tags).flat().slice(0,5)
        res.json(tags)
    }
    catch (err){
        res.json({
            message : "Не удалось загрузить тэги"
        })
    }
}
export const addComment = async (req, res) =>{
    try{
        const comment = {
            text: req.body.text,
            author: req.userId,
        }
        // const post = Post.findOne({
        //     _id : req.params.id
        // }).then(p => {
        //     p.comments.push(comment)
        //     res.json(p)
        // })
        await Post.findOneAndUpdate(
            {
                _id: req.params.id,
            },
            {
                "$push": { "comments": comment }
            },
            {
                returnDocument: "after"
            }
        ).populate({
            path:'author',
            model:'User'
        }).then((doc)=>res.json(doc))
    }
    catch(err) {
        console.log(err)
    }

}
