import utils from "../utils.mjs"

import Component from "./core/Component.mjs"
import Label from "./core/Label.mjs"
import Input from "./core/Input.mjs"
import Button from "./core/Button.mjs"
import Form from "./core/Form.mjs"
import logic from "../logic.mjs"

class CreatePost extends Component {
    constructor() {
        super('section')

        this.addClass('create-post')

        const title = new Component('h2')
        title.setText('Create a Post')

        const form = new Form

        const imageLabel = new Label
        imageLabel.setFor('image')
        imageLabel.setText('Image')

        const imageInput = new Input
        imageInput.setId('image')
        imageInput.setType('text')

        const textLabel = new Label
        textLabel.setFor('text')
        textLabel.setText('Text')

        const textInput = new Input
        textInput.setId('text')
        textInput.setType('text')

        const createButton = new Button
        createButton.setType('submit')
        createButton.setText('Create')

        form.add(imageLabel, imageInput, textLabel, textInput, createButton)

        form.setId('create-post-form')

        const cancelButton = new Button
        cancelButton.setText('cancel')

        this._cancelButton = cancelButton

        this.add(form, cancelButton)

        form.onSubmit(event => {
            event.preventDefault()
            const image = imageInput.getValue()
            const text = textInput.getValue()

            try {
                logic.savePostInfo(image, text)
                this._onPostCreatedCallback()
            } catch (error) {
                utils.showFeedback(error)
            }
        })

        this._onPostCreatedCallback = null
    }

    onCancelClick(callback) {
        if (typeof callback !== 'function') throw new TypeError('callback is not a function')

        this._cancelButton.onClick(callback)
    }

    onPostCreated(callback) {
        if (typeof callback !== 'function') throw new TypeError('callback is not a function')

        this._onPostCreatedCallback = callback
    }
}

export default CreatePost