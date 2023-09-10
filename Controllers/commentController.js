const User = require("../Models/User");
const Comment = require("../Models/Comments");
const Post = require("../Models/Post");


const createUser = async (req, res) => {
    try {
        const payload = req.body;

        const data = new User(payload);
        const saveData = await data.save();

        res.status(200).send(saveData);

    } catch (error) {
        res.status(400).send({
            message: error.message,
            stack: error.stack
        })
    }

}





const createPost= async (req, res) => {
    try {
        const payload = req.body;
        const data = new Post(payload);
        const saveData = await data.save();

        res.status(200).send(saveData);

    } catch (error) {
        res.status(400).send({
            message: error.message,
            stack: error.stack
        })
    }



}




const createComment = async (req, res) => {
    try {
        const payload = req.body;
        const data = new Comment(payload);
        const saveData = await data.save();

        res.status(200).send(saveData);

    } catch (error) {
        res.status(400).send({
            message: error.message,
            stack: error.stack
        })
    }



}





const getReplies = async(req,res)=>{
  try {
    const postId = req.query.postId;
    const commentsWithReplies = await  fetchCommentsReplies(postId);
    res.status(200).send(commentsWithReplies);
  } catch (error) {
    res.status(200).send({
        message : error.message,
        stack : error.stack
    })
  }

}



const fetchCommentsReplies = async (postId,parentId = null) =>{
    let criteria = {
        parentId : parentId,
        postId : postId
    } 

    const comments = await Comment.find(criteria);

    const commentsAtThisLevel  = comments.map(async (doc) =>{
        let replies = await fetchCommentsReplies(postId,doc._id);
        let userDetail = await User.findById(doc.userId);
        let objects = {
            name : userDetail.username,
            postId : postId,
            text : doc.comment,
            commentId : doc._id,
        }
        if(replies.length>0){
              objects.reply = replies;
        }
        return objects;
        
    })

    const  allComments  = Promise.all(commentsAtThisLevel)
    .then((d) => {
      return d;
    })
    .catch((err) => {
      return err;
    });
    return allComments;
}


module.exports = {
    createComment,
    getReplies,
    createUser,
    createPost
};
