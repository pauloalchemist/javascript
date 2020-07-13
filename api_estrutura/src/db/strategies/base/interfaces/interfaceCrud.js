class NotImplementedException extends Error {
    constructor() {
        super("Not Implemented Exception");
    };
};

class ICrud {
    create(item) {
        throw new NotImplementedException();
    };
    read(query) {
        throw new NotImplementedException();
    };
    update(id, item) {
        throw new NotImplementedException();
    };
    delete(id) {
        throw new NotImplementedException();
    };
    isConnected() {
        return new NotImplementedException();
    };
    connect() {
        return new NotImplementedException();
    };
};

module.exports = ICrud;