require('dotenv').config();
const { Pool } = require('pg');
const connectionString = 'postgresql://ricah:kigali@localhost:5432/books';

const pool = new Pool ({
    connectionString: connectionString
})

pool.connect();

const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;
const should = chai.should();


chai.use(chaiHttp);

describe('Testing the whole application', () => {

    before(() => {
        pool.query('CREATE TABLE testcases (id SERIAL PRIMARY KEY, author VARCHAR(255) NOT NULL, title VARCHAR(255) NOT NULL)', (error) => {
            if (error) {
                throw error;
            }
        });

        pool.query('INSERT INTO testcases (author, title) VALUES ("Test","Test")', (error) => {
            if (error) {
                throw error;
            }
        });
    });

    after(() => {
        pool.query('DROP TABLE testcases', (error) => {
            if (error) {
                throw error;
            }
        });
    })

    describe('Testing all GET methods', () => {
        it('Should Welcome the User to the API', (done) => {
            chai.request(app)
                .get('/api/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                })
        });

        it('Should Get all the books', (done) => {
            chai.request(app)
                .get('/api/books')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                })
        });
        it('Should get one book', (done) => {

            chai.request(app)
                .get('/api/books/1')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                })
        });
        
        it('Should throw an error', (done) => {
            chai.request(app)
                .get('/api/books')
                .end((err, res) => {
                    res.body.should.be.a('array');
                    done();
                })
        });

        it('Should check if a book exists', (done) => {
            chai.request(app)
                .get('/api/books/2343')
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Book not found!!');
                    done();
                })
        });
        
    });

    describe('Testing a POST method', () => {
        const book = {
            author: "Richard Manist",
            title: "Bearing the king"
        }
        it('Should Add a new book', (done) => {
            chai.request(app)
                .post('/api/books')
                .send(book)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Book added!!');
                    done();
                })
        });
    });

    describe('Testing the PUT method', () => {
        const book = {
            author: "Richard Manist",
            title: "Bearing the king"
        }

        it('Should update a book', (done) => {
            chai.request(app)
                .put('/api/books/1')
                .send(book)
                .end((err, res) => {
                    res.should.have.status(202);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Book Updated!!');
                    done();
                })
        });


        it('Should check if a book exists', (done) => {
            chai.request(app)
                .put('/api/books/1232232')
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Book not found!!');
                    done();
                })
        });
    });

    describe('Testing the DELETE method', () => {
        it('Should check if a book exists', (done) => {
            chai.request(app)
                .delete('/api/books/1232232')
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Book not found!!');
                    done();
                })
        });

        it('Should delete a book', (done) => {
            chai.request(app)
                .delete('/api/books/1')
                .end((err, res) => {
                    res.should.have.status(203);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Book Deleted!!');
                    done();
                })
        });
    });


});
