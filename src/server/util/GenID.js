const Query = require('./Query');

const GenID = (table) => {
    return new Promise((resolve, reject) => {
        const NewID = new Query("SELECT nextval('" + table + "') AS id");
        const id = NewID.returnResult();
        id.then((val) => {
            resolve(val);
        }).catch((er) => {
            console.error(er);
            reject(er);
        });
    });
}

module.exports = GenID;