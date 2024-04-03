import { readFile, writeFile } from 'fs';
class Collection {
    name;
    constructor(name) {
        this.name = name;
    }
    // helper
    _generateId() {
        // @ts-ignore
        return (+((parseInt(Math.random() * 10 ** 17)).toString())).toString(36);
    }
    _loadDocuments(callback) {
        if (typeof callback !== 'function')
            throw new TypeError('callback is not a function');
        readFile(`./data/${this.name}.json`, 'utf8', (error, documentsJSON) => {
            if (error) {
                callback(error);
                return;
            }
            const documents = JSON.parse(documentsJSON || '[]');
            // since there's no error == NULL, we pass the documents to the callback
            callback(null, documents);
        });
    }
    _saveDocuments(documents, callback) {
        if (!(documents instanceof Array))
            throw new TypeError('documents is not an array');
        if (typeof callback !== 'function')
            throw new TypeError('callback is not a function');
        documents.forEach(document => {
            if (!(document instanceof Object))
                throw new TypeError('a document in documents is not an array');
        });
        const documentsJSON = JSON.stringify(documents);
        writeFile(`./data/${this.name}.json`, documentsJSON, error => {
            if (error) {
                callback(error);
                return;
            }
            callback(null);
        });
    }
    _backup() {
        localStorage[this.name + '-backup'] = localStorage[this.name];
    }
    _restore() {
        localStorage[this.name] = localStorage[this.name + '-backup'];
    }
    // data
    // CRUD
    findOne(condition, callback) {
        if (typeof condition !== 'function')
            throw new TypeError('condition callback is not a function');
        if (typeof callback !== 'function')
            throw new TypeError('callback is not a function');
        this._loadDocuments((error, documents) => {
            if (error) {
                callback(error);
                return;
            }
            const document = documents.find(condition);
            callback(null, document || null);
        });
    }
    insertOne(document, callback) {
        if (typeof document !== 'object')
            throw new TypeError('document is not an object');
        if (typeof callback !== 'function')
            throw new TypeError('callback is not a function');
        this._loadDocuments((error, documents) => {
            if (error) {
                callback(error);
                return;
            }
            document.id = this._generateId();
            documents.push(document);
            this._saveDocuments(documents, (error) => {
                if (error) {
                    callback(error);
                    return;
                }
                callback(null, document.id);
            });
        });
    }
    updateOne(condition, document, callback) {
        if (typeof condition !== 'function')
            throw new TypeError('condition callback is not a function');
        if (typeof document !== 'object')
            throw new TypeError('document is not an object');
        if (typeof callback !== 'function')
            throw new TypeError('callback is not a function');
        this._loadDocuments((error, documents) => {
            if (error) {
                callback(error);
                return;
            }
            const indexToUpdate = documents.findIndex(condition);
            if (indexToUpdate > -1) {
                documents.splice(indexToUpdate, 1, document);
                this._saveDocuments(documents, error => {
                    if (error) {
                        callback(error);
                        return;
                    }
                    callback(null, true);
                });
                return;
            }
            callback(null, false);
        });
    }
    deleteOne(condition, callback) {
        if (typeof condition !== 'function')
            throw new TypeError('condition callback is not a function');
        if (typeof callback !== 'function')
            throw new TypeError('callback is not a function');
        this._loadDocuments((error, documents) => {
            if (error) {
                callback(error);
                return;
            }
            const indexToDelete = documents.findIndex(condition);
            if (indexToDelete > -1) {
                documents.splice(indexToDelete, 1);
                this._saveDocuments(documents, error => {
                    if (error) {
                        callback(error);
                    }
                    callback(null, true);
                });
                return;
            }
            callback(null, false);
        });
    }
    getAll(callback) {
        if (typeof callback !== 'function')
            throw new TypeError('callback is not a function');
        this._loadDocuments((error, documents) => {
            if (error) {
                console.error(error);
                return;
            }
            callback(null, documents);
        });
    }
}
export default Collection;
