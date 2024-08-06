import "./topbar.css"
import { Search , Person, Chat, Notifications} from "@mui/icons-material"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import {logoutCall} from '../../apiCalls'

export default function Topbar({paramUser}) {
  
  const {user, dispatch} = useContext(AuthContext)
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER

  const handleClick = () => {
    logoutCall(
      dispatch
    );
  }

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{textDecoration: "none"}}>
           <span className="logo">ZephyreVerse</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchBar">
          <Search className="searchIcon"/>
          <input placeholder="Serach for friends, posts" className="searchInput" />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">2</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img src={
            user.profilePicture 
            ? user.profilePicture 
            : "/assets/user.png"
          } alt="" className="topbarImg" />
        </Link>
        {!paramUser&&<span className="topbarLink" onClick={handleClick}>Sign out</span>}
      </div>
    </div>
  )
}
