import { logger, showFeedback } from "../utils/index.mjs";

import logic from "../logic";

import { useState, useEffect } from "react";

import Post from "./Post";

function PostList(props) {

    const [posts, setPosts] = useState([])

    const loadPosts = () => {
        logger.debug('PostList -> loadPosts')

        try {
            logic.retrievePostsLatestFirst()
                .then(setPosts)
                .catch(showFeedback)
        } catch (error) {
            showFeedback(error)
        }
    }

    // componentWillReceiveProps(newProps) {
    //     logger.debug('PostList -> componentWillReceiveProps', JSON.stringify(props), JSON.stringify(newProps))
    //     newProps.stamp !== props.stamp && loadPosts()
    // }

    // componentDidMount() {
    //     logger.debug('PostList -> componentDidMount')
    //     loadPosts()
    // }

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