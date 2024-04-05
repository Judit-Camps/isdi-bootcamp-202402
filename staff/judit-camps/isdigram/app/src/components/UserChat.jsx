import { logger, showFeedback } from "../utils/index.mjs";
import logic from "../logic.mjs";

import { Component } from "react";

import SendMessageForm from "./SendMessageForm";

class UserChat extends Component {
    constructor(props) {
        logger.debug('UserChat')
        super(props)

        try {
            const messages = logic.retrieveMessagesWith(this.props.userToChat.id)
            this.state = {
                messages,
                userToChat: this.props.userToChat
            }
        } catch (error) {
            showFeedback(error)
        }
    }

    componentWillReceiveProps(newProps) {
        console.log(this.props, newProps)

        if (newProps.refreshStamp !== this.props.stamp) {
            try {
                const messages = logic.retrieveMessagesWith(this.props.userToChat.id)

                this.setState({ messages })
            } catch (error) {
                utils.showFeedback()
            }
        }
    }

    render() {
        const { userToChat, messages } = this.state

        return <section>
            <button onClick={() => this.props.onBackToChatsClick()}>back to chats</button>
            <h2>{userToChat.username}</h2>

            <div className="message-div">
                {messages.map((message) => {
                    let classType
                    if (message.from === logic.getLoggedInUser()) classType = 'message__right'
                    else classType = 'message__left'

                    return <p className={"message " + classType}>{message.text}</p>
                })}

            </div>

            <SendMessageForm
                userToChat={userToChat}
                onMessageSubmit={this.props.onMessageSent}
            />

        </section>

    }
}

export default UserChat