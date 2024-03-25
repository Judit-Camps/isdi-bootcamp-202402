import utils from '../utils.mjs'
import logic from '../logic.mjs'
import { Component } from "react"

import PostList from './components/PostList'
import CreatePost from './components/CreatePost'


class Home extends Component {
    constructor() {
        super()

        try {
            const user = logic.getUser()

            this.user = user
        } catch (error) {
            utils.showFeedback(error)
        }

        this.state = { view: null, stamp: null }

    }

    render() {
        return <main className='main'>
            <header id='header'>
                <h3>Isdigram</h3>

                <button onClick={event => {
                    event.preventDefault()

                    this.props.onChatClick()
                }}>Chat</button>
            </header>

            <h1>hello, {this.user.name}!</h1>

            <PostList refreshStamp={this.state.stamp} />

            {this.state.view === 'create-post' && <CreatePost onCancelClick={() => this.setState({ view: null })} onPostCreated={() => this.setState({ view: null, stamp: Date.now() })} />}

            <footer className="footer">
                <button>home</button>
                <button onClick={() => {
                    this.setState({ view: 'create-post' })
                }}>+</button>
                <button onClick={() => {
                    this.props.onUserPageClick()
                }} >user</button>

            </footer>


        </main>
    }
}

export default Home