export default function Comment({comment}) {
    

    return (
        <div  className="comment-item">
            <p className="comment-content">Username: {comment.username}</p>
            <p className="comment-content">{comment.comment}</p>
        </div>
    )
}
