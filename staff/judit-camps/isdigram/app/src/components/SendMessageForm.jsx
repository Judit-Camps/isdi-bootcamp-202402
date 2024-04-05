import { logger, showFeedback } from "../utils/index.mjs"

import logic from "../logic.mjs"

import './SendMessageForm.sass'

function SendMessageForm(props) {

    const handleSubmitMessage = (event) => {
        event.preventDefault()
        const form = event.target
        const message = form.message.value

        try {
            logic.sendMessageTo(props.userToChat.id, message)
            form.reset()
            props.onMessageSubmit()
        } catch (error) {
            showFeedback(error)
        }
    }

    return <form className="message-form" onSubmit={handleSubmitMessage} >
        <input id="message" type="text" />
        <button>send</button>
    </form>
}

export default SendMessageForm