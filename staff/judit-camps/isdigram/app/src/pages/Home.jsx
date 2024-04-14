import { logger, showFeedback } from '../utils/index.mjs'

import logic from '../logic'

import { useState, useEffect } from "react"
import PostList from '../components/PostList'
import CreatePost from '../components/CreatePost'
import EditPost from '../components/EditPost'

function Home(props) {

    const [view, setView] = useState(null)
    const [user, setUser] = useState(null)
    const [stamp, setStamp] = useState(null)
    const [post, setPost] = useState(null)


    useEffect(() => {
        try {
            logic.retrieveUser((error, user) => {
                if (error) {
                    showFeedback(error)

                    return
                }

                setUser(user)
            })
        } catch (error) {
            showFeedback(error)
        }
    }, [])

    const clearView = () => setView(null)

    // CHAT
    const handleChatClick = () => props.onChatClick()


    // USER
    const handleUserClick = () => props.onUserPageClick()


    // CREATE POST
    const handleCreatePostClick = () => setView('create-post')
    const handlePostCreated = () => {
        clearView()
        setStamp(Date.now())
    }
    const handleCreatePostCancelClick = () => clearView()


    // EDIT POST
    const handleEditPostClick = post => {
        setView('edit-post')
        setPost(post)
    }
    const handleEditPostCancelClick = () => clearView()
    const handlePostEdited = () => {
        clearView()
        setStamp(Date.now())
        setPost(null)
    }


    logger.debug('Home -> render')

    return <main className='main'>
        <header id='header'>
            <h3>Isdigram</h3>

            <button onClick={handleChatClick}>Chat</button>
        </header>

        {user && <h1>hello, {user.name}!</h1>}

        <PostList
            stamp={stamp}
            onEditButtonClicked={handleEditPostClick} />


        {view === 'create-post' && <CreatePost
            onCancelClick={handleCreatePostCancelClick}
            onPostCreated={handlePostCreated} />}

        {view === 'edit-post' && <EditPost
            post={post}
            onPostEdited={handlePostEdited}
            onCancelClick={handleEditPostCancelClick} />}


        <footer className="footer">
            <button>home</button>
            <button onClick={handleCreatePostClick}>+</button>
            <button onClick={handleUserClick} >user</button>

        </footer>


    </main>

}


export default Home