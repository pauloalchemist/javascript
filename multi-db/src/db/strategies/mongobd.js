class MongoDB extends ICrud {
    constructor() {
        super();
    };
    create(item) {
        console.log('Item salvo em MongoDB.');
    };
};

module.exports = MongoDB;