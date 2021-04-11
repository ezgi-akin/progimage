const supertest = require('supertest');
const chai = require('chai');
const app = require('../app.js');

const expect = chai.expect;
const request = supertest(app);

let createdId = 0;

describe('POST images', function() {

    it('upload images to the db', function(done) {
         request.post('/api')
                .set('content-type', 'multipart/form-data')
                .attach('image', 'test/assets/imagetest.jpg')
                .expect(200)
                .end(function(err, res) {
                    console.log(res);
                    createdId = res.body[0].id;
                    done(err);
                });

    });
});
  

describe('GET images', function() {

    it('get image with id', function(done) {

        request.get('/api/' + createdId)
                .expect(200)
                .end(function(err, res) {
                    done(err);
                });
    });

    it('get image with resize', function(done) {
        console.log(createdId);

        request.get('/api/' + createdId + "/resize/250")
            .expect(200)
            .end(function(err, res) {
                done(err);
            });
    });
});