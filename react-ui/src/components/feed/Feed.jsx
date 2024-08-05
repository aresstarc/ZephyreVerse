import {useState , useEffect, useContext} from "react"
import axios from "axios"
import Share from "../share/Share"
import Post from "../post/Post"
import "./feed.css"
import { AuthContext } from "../../context/AuthContext"
const apiUrl = process.env.REACT_APP_API_URL;




function Feed({username}) {
  
  const [posts, setPosts] = useState([])
  const {user} = useContext(AuthContext)

  useEffect(()=>{
    const fetchPosts = async () =>{
      const res = username
       ? await axios.get(`${apiUrl}/api/post/profile/${username}`)  
       : await axios.get(`${apiUrl}/api/post/timeline/${user._id}`)
      setPosts(res.data.sort((p1,p2)=>{
        return new Date(p2.createdAt) - new Date(p1.createdAt)
      })) 
  }
  fetchPosts()
},[username,user._id])

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username|| username === user.username )&& <Share />}
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default Feed