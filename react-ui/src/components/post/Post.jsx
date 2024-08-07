import {useState , useEffect} from "react"
import "./post.css"
import { MoreVert } from "@mui/icons-material"
import axios from "axios"
import { format} from 'timeago.js';
import  {Link} from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const apiUrl = process.env.REACT_APP_API_URL;

export default function Post({post}) {

const [user, setUser] = useState({})
const [like,setLike] = useState(post.likes.length)
const [isLiked, setIsLiked] = useState(false)
// const PF = process.env.REACT_APP_PUBLIC_FOLDER
const {user:currentUser} = useContext(AuthContext)

useEffect(()=>{
    setIsLiked(post.likes.includes(currentUser._id))
}, [currentUser._id,post.likes])

useEffect(()=>{
    const fetchUser = async () =>{
    const res = await axios.get(`${apiUrl}/api/user?userId=${post.userId}`)
    setUser(res.data) 
}
fetchUser()
},[post.userId,post.likes])

const likeHandler = async () =>{
    try{
        await axios.put(`${apiUrl}/api/post/${post._id}/like`,{userId: currentUser._id})
    }catch(err){

    }
    setLike(isLiked ? like-1: like+1)
    setIsLiked(!isLiked)
}

  return (
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to={`/profile/${user.username}`}>
                    <   img className="postProfileImg" src={user.profilePicture ? user.profilePicture :"/assets/user.png"} alt="" />
                    </Link>
                    <span className="postUsername">{user.username}</span>
                    <span className="postDate">{format(post.createdAt)}</span>
                </div>
                <div className="postTopRight">
                <MoreVert />
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">{post?.desc}</span>                            
                <img src={post.img ? post.img : "/assets/post/1.jpg" } alt="" className="postImg" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img src="/assets/like.png"
                     alt="" 
                     className="likeIcon"
                     onClick={likeHandler} />
                    <img
                     src="/assets/heart.png"
                     alt="" className="likeIcon"
                     onClick={likeHandler} />
                    <span className="postLikeCounter">{like} people like it</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">12 comments</span>
                </div>
            </div>
        </div>
    </div>
  )
}
