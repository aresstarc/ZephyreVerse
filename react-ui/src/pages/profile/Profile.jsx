import {useState , useEffect} from "react"
import axios from "axios"
import Topbar from "../../components/topbar/Topbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Rightbar from "../../components/rightbar/Rightbar"
import Feed from "../../components/feed/Feed"
import "./profile.css"
import {useParams} from "react-router"
const apiUrl = process.env.REACT_APP_API_URL;

function Profile() {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER
  const [user, setUser] = useState({})
  const params = useParams()
  

  useEffect(()=>{
    const fetchUser = async () =>{
    const res = await axios.get(`${apiUrl}/api/user?username=${params.username}`)
    setUser(res.data) 
}
fetchUser()
},[params.username])

  return (
    <>
    <Topbar paramUser={user}/>
    <div className="profile">
      <Sidebar/>
      <div className="profileRight">
      <div className="profileRightTop">
        <div className="profileCover">
            <img className="profileCoverImg" src={user.coverPicture || `${PF}/background.png`} alt=""  />
            <img className="profileUserImg" src={user.profilePicture ||`${PF}/user.png`} alt=""  />
        </div>
        <div className="profileInfo">
            <h4 className="profileInfoName">{user.username}</h4>
            <span className="profileInfoDesc">{user.desc}</span>
        </div>
      </div>
        <div className="profileRightBottom">
            <Feed username={params.username}/>
            <Rightbar user={user}/>
        </div>
      </div>
    </div>
    </>
  )
}

export default Profile