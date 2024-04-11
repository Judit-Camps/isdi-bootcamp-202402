import { ContentError } from "./errors"

// constants
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/
const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[A-Za-z])[A-Za-z0-9]+$/
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const URL_REGEX = /^(http|https):\/\//


// helpers

const validate = {
    text(text: string, explanation: string, checkEmptyInside?: boolean) {
        if (typeof text !== 'string') throw new TypeError(explanation + ' ' + text + ' is not a string')
        if (!text.trim().length) throw new ContentError(explanation + ' >' + text + '< is empty or blank')

        if (checkEmptyInside) {
            if (text.includes(' ')) throw new ContentError(explanation + ' ' + text + 'has empty spaces')
        }
    },

    date(date, explanation: string) {
        if (typeof date !== 'string') throw new TypeError(explanation + ' ' + date + ' is not a valid date')
        if (!DATE_REGEX.test(date)) throw new ContentError(explanation + ' ' + date + ' does not have a valid format')
    },

    email(email: string, explanation = 'email') {
        if (!EMAIL_REGEX.test(email)) throw new ContentError(`${explanation} is not a correct email`)
    },

    url(url, explanation: string) {
        if (!URL_REGEX.test(url)) throw new ContentError(explanation + ' ' + url + ' is not a correct url path')
    },

    password(password, explanation = 'password') {
        if (!PASSWORD_REGEX.test(password)) throw new ContentError(`${explanation} is not acceptable`)
    },

    callback(callback, explain = 'callback') {
        if (typeof callback !== 'function') throw new TypeError(`${explain} is not a function`)
    }

}

export default validate