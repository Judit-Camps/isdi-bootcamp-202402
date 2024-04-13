import { logger, showFeedback } from "../utils";

import logic from "../logic";

import './CreatePost.sass'

function CreatePost(props) {
    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const image = form.image.value
        const text = form.text.value

        try {
            logic.savePostInfo(image, text)

            form.reset()

            props.onPostCreated()
        } catch (error) {
            showFeedback(error)
        }
    }

    const handleCancelClick = () => props.onCancelClick()

    logger.debug('CreatePost -> render')
    return <section className="create-post">

        <form onSubmit={handleSubmit}>
            <label>Image</label>
            <input id="image" type="text" />

            <label htmlFor="">Text</label>
            <input id="text" type="text" />

            <button type="submit">Create post</button>
        </form>

        <button onClick={handleCancelClick}>Cancel</button>
    </section>
}

export default CreatePost