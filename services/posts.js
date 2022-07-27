const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page=1){
    const offset=helper.getOffset(page,config.listPerPage);
    const rows = await db.query(
        `SELECT idpost,tittle,description,day,month,author,category
        FROM posts LIMIT ${offset},${config.listPerPage}
        `
    );

    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }


}

async function create(post){
    const result = await db.query(
        `INSERT INTO posts(tittle,description,day,month,athor,category) VALUES
        ('${post.tittle}','${post.description}',${post.day},'${post.month}','${post.author}','${post.category}')
        `
    );

    let message = "Error in creating a new post";
    if(result.affectedRows){
        message="A new post has been added!";
    }

    return{message}
}









module.exports = {
    getMultiple,
    create
};