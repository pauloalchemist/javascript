const ICrud = require('./interfaces/interfaceCrud');

class ContextStrategy extends ICrud {
    constructor(strategy) {
        super();
        this._database = strategy;
    };

    create(item) {
        return this._database.create(item);
    };
    reade(query) {
        return this._database.create(query);
    };
    update(id, item) {
        return this._database.create(id, item);
    };
    delete(id) {
        return this._database.create(id);
    };
    isConnected() {
        return this._database.isConnected();
    };
};

module.exports = ContextStrategy;