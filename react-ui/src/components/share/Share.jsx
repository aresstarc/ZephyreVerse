import { useContext, useRef, useState  } from "react"
import "./share.css"
import { Cancel,PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material"
import {AuthContext} from "../../context/AuthContext"
import axios from "axios"
import { Link } from "react-router-dom"
const apiUrl = process.env.REACT_APP_API_URL;

function Share() {
    
    const {user} = useContext(AuthContext)
    // const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const desc = useRef()
    const [file,setFile] = useState(null)

    const submitHandler = async (e)=>{
        e.preventDefault()
        const data = new FormData()
        
        if (file) {
            data.append('file', file);
        }
        data.append('userId', user._id);
        data.append('desc', desc.current.value); 

        try {
            // Upload the file
            let fileUrl = "";
            if (file) {
                const uploadResponse = await axios.post(`${apiUrl}/api/upload`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                fileUrl = uploadResponse.data.fileUrl; // Assuming response contains the file URL
            }

            // Create a new post
            await axios.post(`${apiUrl}/api/post`, {
                userId: user._id,
                desc: desc.current.value,
                img: fileUrl
            });
            
            // Reset state after successful post
            setFile(null);
            desc.current.value = '';
            window.location.reload()
        } catch (err) {
            console.error(err);
        }
    }

  return (
    <div className="share">
        <div className="shareWrapper">
            <div className="shareTop">
            <Link to={`/profile/${user.username}`}>
                <img 
                    className="shareProfileImg" 
                    src={user.profilePicture 
                    ? user.profilePicture 
                    : "/assets/user.png"} alt="" />
            </Link>       
                <input 
                className="shareInput" 
                placeholder={"What's on your mind, "+ user.username+" ?"}
                ref={desc} 
                />
            </div>
            <hr className="shareHr" />
            {file&&(
                <div className="shareImgContainer">
                    <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
                    <Cancel className="shareImgCancel" onClick={()=>setFile(null)}/>
                </div>
            )}
            <form className="shareBottom" onSubmit={submitHandler} encType="multipart/form-data">
                <div className="shareOptions">
                    <label htmlFor="file" className="shareOption">
                        <PermMedia htmlColor="tomato" className="shareIcon"/>
                        <span className="shareOptionText">Photo/Video</span>
                        <input
                         style={{display: "none"}}
                         type="file" id="file"
                        accept=".jpg,.jpeg,.png" 
                        onChange={(e)=>setFile(e.target.files[0])}/>
                    </label>
                    <div className="shareOption">
                        <Label htmlColor="blue" className="shareIcon"/>
                        <span className="shareOptionText">Tag Friends</span>
                    </div>
                    <div className="shareOption">
                        <Room htmlColor="green" className="shareIcon"/>
                        <span className="shareOptionText">Loaction</span>
                    </div>
                    <div className="shareOption">
                        <EmojiEmotions htmlColor="goldenRod" className="shareIcon"/>
                        <span className="shareOptionText">Feeling</span>
                    </div>
                </div>
                <button className="shareButton" type="submit">Share</button>
            </form>
        </div>
    </div>
  )
}

export default Share