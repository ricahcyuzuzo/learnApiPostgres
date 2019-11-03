const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { pool } = require('./config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/api', (req, res) => {
    res.send('Welcome to the api');
});

// Get all the books
app.get('/api/books', (req, res) => {
    pool.query('SELECT * FROM books', (error, results) => {
        res.status(200).send(results.rows);
    })
});

// Get a single book
app.get('/api/books/:id', (req, res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM books WHERE ID = $1', [id], (error, results) => {
        if (!results.rows[0]) {
            return res.status(404).send({message: 'Book not found!!'})
        }
        
        res.status(200).send(results.rows);
    });
});

// Add a new book 
app.post('/api/books', (req, res) => {
    const { author, title } = req.body;
    pool.query('INSERT INTO books (author, title) VALUES ($1, $2)',[author, title], (error) => {
        res.status(201).send({
            status: 'success', 
            message: 'Book added!!'
        })
    })
});

// Update a book
app.put('/api/books/:id', async (req, res) => {
    const { author, title} = req.body;
    const id = req.params.id;
    const checkId = "SELECT * FROM books WHERE ID = $1";
    try {
        const { rows } = await pool.query(checkId, [id]);
        if (!rows[0]) {
            return res.status(404).send({message: "Book not found!!"})
        }
        pool.query('UPDATE books SET author = $2 ,title = $3 WHERE id = $1', [id, author, title], (error) => {
            res.status(202).send({
                status: 'success',
                message: 'Book Updated!!'
            })
        });

    }catch (error) {

    }
});


app.delete('/api/books/:id', async (req, res) => {
    const id = req.params.id;

    const checkId = "SELECT * FROM books WHERE ID = $1";
    try {
        const { rows } = await pool.query(checkId, [id]);
        if (!rows[0]) {
            return res.status(404).send({ message: "Book not found!!" })
        }

        pool.query('DELETE FROM books WHERE ID = $1', [id], (error) => {        
            res.status(203).send({
                status: 'success',
                message: 'Book Deleted!!'
            });
        });
    }catch(error) {
        
    }
});


const port = process.env.PORT || 4000;
app.listen(port, console.log(`Server listening on "http://localhost:${port}/api"`));

module.exports = app;