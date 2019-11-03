const booksTable = `
    CREATE TABLE IF NOT EXISTS books (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            author VARCHAR(255) NOT NULL
    )`;

const deleteTable = `DROP TABLE IF EXISTS books;`;


module.exports = {booksTable, deleteTable};