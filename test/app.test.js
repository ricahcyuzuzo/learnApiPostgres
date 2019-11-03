const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;
const should = chai.should();


chai.use(chaiHttp);

describe('Testing the whole application', () => {
    describe('Testing all GET methods', () => {
        it('Should Welcome the User to the API', (done) => {
            chai.request(app)
                .get('/api/')
                .set('content-type', 'application/x-www-form-urlencoded')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                })
        });

        it('Should Get all the books', (done) => {
            chai.request(app)
                .get('/api/books')
                .set('content-type', 'application/x-www-form-urlencoded')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                })
        });

        it('Should check if a book exists', (done) => {
            chai.request(app)
                .get('/api/books/2343')
                .set('content-type', 'application/x-www-form-urlencoded')
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
                .set('content-type', 'application/x-www-form-urlencoded')
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
                .set('content-type', 'application/x-www-form-urlencoded')
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
                .set('content-type', 'application/x-www-form-urlencoded')
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Book not found!!');
                    done();
                })
        });
    });

    describe('Testing on part of GET method', () => {
        it('Should get one book', (done) => {
            chai.request(app)
                .get('/api/books/1')
                .set('content-type', 'application/x-www-form-urlencoded')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                })
        });
    });

    describe('Testing the DELETE method', () => {
        it('Should check if a book exists', (done) => {
            chai.request(app)
                .delete('/api/books/1232232')
                .set('content-type', 'application/x-www-form-urlencoded')
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
                .set('content-type', 'application/x-www-form-urlencoded')
                .end((err, res) => {
                    res.should.have.status(203);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Book Deleted!!');
                    done();
                })
        });
    });
});
