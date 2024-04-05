import { logger, showFeedback } from "../utils";
import logic from "../logic.mjs";

import './EditPost.sass'

function EditPost(props) {

    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target
        const newText = form.text.value

        logger.debug('EditPost -> handleSubmit', newText)

        try {
            logic.editPostText(props.post.id, newText)

            form.reset()

            props.onPostEdited()

        } catch (error) {
            showFeedback(error)
        }
    }

    const handleCancelClick = () => props.onCancelClick()

    logger.debug('EditPost -> render')

    return <section className="edit-post">
        <form onSubmit={handleSubmit}>
            <label>Text</label>
            <input id="text" type="text" placeholder={props.post.caption} />

            <button type="submit">save changes</button>
        </form>
        <button onClick={handleCancelClick}>Cancel</button>
    </section>
}


export default EditPost