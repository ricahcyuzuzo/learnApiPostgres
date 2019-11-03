const {pool} = require('./config');
const model = require('./model.query');


const deleteTables = () => {
    const deleteTable = model.deleteTable;
    const tables = `${deleteTable}`;
    pool.query(tables);
}

deleteTables();

module.exports=deleteTables;