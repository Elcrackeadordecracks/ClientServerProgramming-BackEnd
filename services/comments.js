const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page=1){
    const offset=helper.getOffset(page,config.listPerPage);
    const rows = await db.query(
        `SELECT id_comment,idpost,name,comment,date
        FROM comments LIMIT ${offset},${config.listPerPage}
        `
    );

    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }


}

async function create(comment){
    const result = await db.query(
        `INSERT INTO comments(name,comment,date) VALUES
        ('${comment.name}','${comment.comment}',${comment.date}')
        `
    );

    let message = "Error in creating a new comment";
    if(result.affectedRows){
        message="A new comment has been added!";
    }

    return{message}
}








module.exports = {
    getMultiple,
    create
};