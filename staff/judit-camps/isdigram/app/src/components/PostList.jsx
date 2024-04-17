import { logger, showFeedback } from "../utils/index.mjs";

import logic from "../logic";

import { useState, useEffect } from "react";

import Post from "./Post";

function PostList(props) {

    const [posts, setPosts] = useState([])

    const loadPosts = () => {
        logger.debug('PostList -> loadPosts')

        try {
            logic.retrievePosts()
                .then(setPosts)
                .catch(showFeedback)
        } catch (error) {
            showFeedback(error)
        }
    }

    useEffect(() => {
        loadPosts()
    }, [props.stamp])

    const handlePostDeleted = () => loadPosts()

    const handleEditPost = post => props.onEditButtonClicked(post)

    logger.debug('PostList -> render')

    return <section className="post-section">
        {posts.map(post => <Post
            key={post.id}
            item={post}
            onEditClick={handleEditPost}
            onDeleted={handlePostDeleted} />)}
    </section>
}


export default PostList