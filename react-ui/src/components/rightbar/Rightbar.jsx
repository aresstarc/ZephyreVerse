import { useContext, useEffect, useState } from "react"
import axios from "axios"
import "./rightbar.css"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import {Add, Remove} from "@mui/icons-material"
const apiUrl = process.env.REACT_APP_API_URL;


function Rightbar({user}) {
  // const PF=process.env.REACT_APP_PUBLIC_FOLDER
  const [followings, setFollowings] = useState([])
  const {user:currentUser,dispatch} = useContext(AuthContext)
  const [isFollowed, setIsFollowed] = useState(false)


  // useEffect(() => {
  //   if (user && currentUser) {
  //     setIsFollowed(currentUser.following.includes(user._id));
  //   }
  // }, [currentUser, user]);

  useEffect(() => {
    const checkFollowStatus = async () => {
      if (user?._id && currentUser?._id) {
        try {
          const response = await axios.get(`${apiUrl}/api/user/followings/${currentUser._id}`);
          const userFollowingIds = response.data.map(following => following._id);
          setIsFollowed(userFollowingIds.includes(user._id));
        } catch (err) {
          console.error(err);
        }
      }
    };
    checkFollowStatus();
  }, [currentUser, user?._id]);

  // Fetch followings
  useEffect(()=>{
    const getFollowings = async()=>{
      try{
        const followingList = await axios.get(`${apiUrl}/api/user/followings/`+user._id)
        setFollowings(followingList.data)
      }catch(err){
        console.log(err)
      }
    }
    getFollowings()
  },[user])

  const handleClick = async()=>{
    try{
      if(isFollowed){
        await axios.put(`${apiUrl}/api/user/${user._id}/unfollow`,{
          userId: currentUser._id})
          dispatch({type: "UNFOLLOW", payload:user._id})
      }else{
        await axios.put(`${apiUrl}/api/user/${user._id}/follow`,{
          userId: currentUser._id})
          dispatch({type: "FOLLOW", payload:user._id})
      }
    }catch(err){
      console.log(err)
    }
    setIsFollowed(!isFollowed)
  }
  
  const HomeRightbar = () =>{
    return(
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/happy-birthday.png" alt="" />
          <span className="birthdayText"><b>Emily Knight</b><b> and 2 other friends</b> have birthday today</span>
        </div>
        <img className="rightbarAd" src="/assets/advertisement.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
              <img className="rightbarProfileImg" src="assets/person/3.jpg" alt=""/>
              <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">Emily Knight</span>
          </li>
          <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
              <img className="rightbarProfileImg" src="assets/person/3.jpg" alt=""/>
              <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">Emily Knight</span>
          </li>
          <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
              <img className="rightbarProfileImg" src="assets/person/3.jpg" alt=""/>
              <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">Emily Knight</span>
          </li>
          <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
              <img className="rightbarProfileImg" src="assets/person/3.jpg" alt=""/>
              <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">Emily Knight</span>
          </li>
          <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
              <img className="rightbarProfileImg" src="assets/person/3.jpg" alt=""/>
              <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">Emily Knight</span>
          </li>
          <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
              <img className="rightbarProfileImg" src="assets/person/3.jpg" alt=""/>
              <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">Emily Knight</span>
          </li>
        </ul>
      </>
    )
  }

  const ProfileRightbar = ()=>{
    return(
      <>
      {user.username !== currentUser.username &&(
        <button className="rightbarFollowButton" onClick={handleClick}>
          {isFollowed? "Unfollow": "Follow"}
          {isFollowed? <Remove/>: <Add/>}
        </button>
      )}
      <h4 className="rightbarTitle">User Information</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City:</span>
          <span className="rightbarInfoValue">{user.city}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">From:</span>
          <span className="rightbarInfoValue">{user.from}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Relationship:</span>
          <span className="rightbarInfoValue">{user.relationship ===1 ? 'Single' : user.relationship ===2 ? 'Married' : user.relationship ===3 ? 'Complicated' :"NA"}</span>
        </div>
      </div>
      <h4 className="rightbarTitle">User Friends</h4>
      <div className="rightbarFollowings">
       {followings.map((following)=>(
        <Link to={"/profile/"+following.username} style={{textDecoration: "none"}}>
          <div className="rightbarFollowing">
            <img className="rightbarFollowingImg" 
              src={following.profilePicture
              ?following.profilePicture
              :`/assets/user.png`} alt="" />
            <span className="rightbarFollowingName">{following.username}</span>
          </div>
        </Link>
      ))}       
      </div>
      </>
    )
  }

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
      {user ? <ProfileRightbar /> : <HomeRightbar/>}
      </div>
    </div>
  )
}

export default Rightbar