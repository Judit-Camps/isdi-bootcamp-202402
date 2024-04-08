import { logger, showFeedback } from "../utils/index.mjs";

import logic from "../logic.mjs";

import { Component } from "react";

import Post from "./Post";

class PostList extends Component {
    constructor() {

        logger.debug('PostList')
        super()

        this.state = {
            posts: []
        }
    }

    loadPosts() {
        logger.debug('PostList -> loadPosts')

        try {
            logic.retrievePostsLatestFirst((error, posts) => {
                if (error) {
                    showFeedback(error)
                }
                this.setState({ posts })
            })
        } catch (error) {
            showFeedback(error)
        }
    }

    componentWillReceiveProps(newProps) {
        logger.debug('PostList -> componentWillReceiveProps', JSON.stringify(this.props), JSON.stringify(newProps))
        newProps.stamp !== this.props.stamp && this.loadPosts()
    }

    componentDidMount() {
        logger.debug('PostList -> componentDidMount')
        this.loadPosts()
    }

    handlePostDeleted = () => this.loadPosts()

    handleEditPost = post => this.props.onEditButtonClicked(post)



    render() {
        logger.debug('PostList -> render')

        return <section className="post-section">
            {this.state.posts.map(post => <Post
                key={post.id}
                item={post}
                onEditClick={this.handleEditPost}
                onDeleted={this.handlePostDeleted} />)}
        </section>
    }
}


export default PostList