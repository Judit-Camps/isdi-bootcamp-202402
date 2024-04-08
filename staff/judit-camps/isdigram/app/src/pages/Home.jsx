import { logger, showFeedback } from '../utils/index.mjs'

import logic from '../logic'

import { Component } from "react"
import PostList from '../components/PostList'
import CreatePost from '../components/CreatePost'
import EditPost from '../components/EditPost'

class Home extends Component {
    constructor() {
        logger.debug('Home')

        super()

        this.state = {
            user: null,
            view: null,
            stamp: null,
            post: null
        }
    }

    componentDidMount() {
        try {
            logic.getUser((error, user) => {
                if (error) {
                    showFeedback(error)

                    return
                }

                this.setState({ user })
            })
        } catch (error) {
            showFeedback(error)
        }
    }

    setState(state) {
        logger.debug('Home -> setState', JSON.stringify(state))

        super.setState(state)
    }

    clearView = () => this.setState({ view: null })

    // CHAT
    handleChatClick = () => this.props.onChatClick()


    // USER
    handleUserClick = () => this.props.onUserPageClick()


    // CREATE POST
    handleCreatePostClick = () => this.setState({ view: 'create-post' })
    handlePostCreated = () => this.setState({ view: null, stamp: Date.now() })
    handleCreatePostCancelClick = () => this.clearView()


    // EDIT POST
    handleEditPostClick = post => this.setState({ view: 'edit-post', post })
    handleEditPostCancelClick = () => this.clearView()
    handlePostEdited = () => { this.setState({ view: null, stamp: Date.now(), post: null }) }

    render() {
        logger.debug('Home -> render')

        logger.debug('Home -> sessionId: ' + sessionStorage.userId)
        return <main className='main'>
            <header id='header'>
                <h3>Isdigram</h3>

                <button onClick={this.handleChatClick}>Chat</button>
            </header>

            {this.state.user && <h1>hello, {this.state.user.name}!</h1>}

            <PostList
                stamp={this.state.stamp}
                onEditButtonClicked={this.handleEditPostClick} />


            {this.state.view === 'create-post' && <CreatePost
                onCancelClick={this.handleCreatePostCancelClick}
                onPostCreated={this.handlePostCreated} />}

            {this.state.view === 'edit-post' && <EditPost
                post={this.state.post}
                onPostEdited={this.handlePostEdited}
                onCancelClick={this.handleEditPostCancelClick} />}


            <footer className="footer">
                <button>home</button>
                <button onClick={this.handleCreatePostClick}>+</button>
                <button onClick={this.handleUserClick} >user</button>

            </footer>


        </main>
    }
}

export default Home