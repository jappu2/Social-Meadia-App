import React from "react";
import img from '../images/avatars/image-maxblagun.png'

export default function Comment({incScore, isReply, data, decScore}){
function addReply(e) {
    const currentComment = e.target.parentElement.parentElement.parentElement;
    
}
    return (
        <div className={isReply ? "reply" : "comment-container"}>
            <div className="comment-side">
                <button onClick={() => incScore(data.id)}>+</button>
                {data.score}
                <button onClick={() => decScore(data.id)}>-</button>
            </div>

            <div className="comment-main">
                <div className="comment-head">
                <img src={img} alt="profilePicture" />
                    <span>{data.user.username}</span>
                    <span>{data.createdAt}</span>
                    <button className="replybtn" onClick={(e) => addReply(e)}>Reply</button>
                </div>
                <div className="comment-content">
                    {data.content}
                </div>
            </div>
        </div>
    )
}