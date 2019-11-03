const {pool} = require('./config');
const model = require('./model.query');


const createTables = async () => {
    const createBooksTable = model.booksTable;
    const tables = `${createBooksTable}`;
    await pool.query(tables);
}


createTables();

module.exports=createTables;