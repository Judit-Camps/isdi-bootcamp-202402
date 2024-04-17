import { logger, showFeedback } from "../utils";

import { Link } from "react-router-dom";

import logic from "../logic";

function Post(props) {

    const handleDeleteClick = postId => {
        if (confirm('Do you want to delete this post?')) {
            try {
                logic.removePost(postId)

                props.onDeleted()
            } catch (error) {
                showFeedback(error)
            }
        }
    }

    const handleEditClick = post => props.onEditClick(post)

    const { item: post } = props

    logger.debug('Post -> Render')

    return <article className='post'>
        <h3 className='post-author'> <Link to={`/profiles/${post.author.username}`} >{post.author.username} </Link> </h3>
        <img className='post-image' src={post.image} alt="" />
        <div className='post-caption'>
            <p className='post-text' >{post.text}</p>

            {post.author.id === logic.getLoggedInUser() &&
                <div>
                    <button onClick={() => handleEditClick(post)}>edit</button>
                    <button onClick={() => handleDeleteClick(post.id)}>delete</button>
                </div>}
        </div>
        <time className='post-date' >{post.date}</time>
    </article>
}

export default Post