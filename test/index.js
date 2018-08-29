const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../app.js');
const faker = require('faker')

chai.use(chaiHttp);
var token
describe('User Signin ', () => {
  describe('Signin', function() {
    it('Should sign in User', function(done) {
      chai.request(app)
        .post('/users/signin')
        .send({ username: 'admin', password: 'rahasia' })
        .end(function(err, res) {
           expect(res).to.have.status(200);
           expect(res).to.be.json;
           expect(res.body).to.have.property('message');
           expect(res.body.message).to.equal('Success Signin');
           expect(res.body.data).to.have.property('token');
           token = res.body.data.token
           done();
        })
    })
    it('Should Give error when wrong credentials', function(done) {
      chai.request(app)
        .post('/users/signin')
        .send({ username: 'admin', password: 'rahasiasalah' })
        .end(function(err, res) {
           expect(res).to.have.status(403);
           expect(res).to.be.json;
           expect(res.body).to.have.property('message');
           expect(res.body.message).to.equal('Invalid Signin');
           done();
        })
    })
  })
})

var userId
describe('User Crud', function() {
  it('Should return all user', function(done) {
    chai.request(app)
      .get('/users')
      .set('token', token)
      .end(function(err, res) {
         expect(res).to.have.status(200);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success Retrieve All Users');
         expect(res.body).to.have.property('data');
         done();
      })
  })
  it('Should create new user', function(done) {
    chai.request(app)
      .post('/users')
      .set('token', token)
      .set('otoritas', 'create_user')
      .send({
        username: faker.internet.userName(),
        password: faker.internet.password(),
        name: faker.name.firstName() })
      .end(function(err, res) {
         expect(res).to.have.status(201);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success Create User');
         expect(res.body).to.have.property('data');
         userId = res.body.data.id
         done();
      })
   })
   it('Should Give error when create user without auth', function(done) {
     chai.request(app)
       .post('/users')
       .send({
         username: faker.internet.userName(),
         password: faker.internet.password(),
         name: faker.name.firstName() })
       .end(function(err, res) {
          expect(res).to.have.status(403);
          expect(res).to.be.json;
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Invalid Token');
          done();
       })
   })
   it('Should Update User', function(done) {
    chai.request(app)
      .put(`/users/${userId}`)
      .set('token', token)
      .set('otoritas', 'edit_user')
      .send({
        username: faker.internet.userName(),
        password: faker.internet.password(),
        name: faker.name.firstName() })
      .end(function(err,res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Success Update User');
        expect(res.body).to.have.property('data')
        done();
      })
   })
   it('Should Delete User', function(done) {
    chai.request(app)
      .del(`/users/${userId}`)
      .set('token', token)
      .set('otoritas', 'delete_user')
      .end(function(err, res) {
         expect(res).to.have.status(200);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success Delete User');
         expect(res.body).to.have.property('data');
         done();
      })
  })
  it('Should Give error when delete a Password without auth', function(done) {
    chai.request(app)
      .del(`/users/${userId}`)
      .end(function(err, res) {
         expect(res).to.have.status(403);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Invalid Token');
         done();
      })
  })
})

var siswaId
describe('Siswa Crud', function() {
  it('Should return all siswa', function(done) {
    chai.request(app)
      .get('/siswa')
      .set('token', token)
      .end(function(err,res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.equal('Success Read Siswa');
        expect(res.body).to.have.property('data');
        done();
      })
  })
  it('Should create new siswa', function(done) {
    chai.request(app)
      .post('/siswa/create')
      .set('token', token)
      .send({
        npm: 'S00-2001',
        nama: faker.name.firstName(),
        jk: 'laki-laki',
        alamat: 'bandar Lampung',
        no_telp: '08526999229'})
      .end(function(err, res) {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Success Create Siswa');
        expect(res.body).to.have.property('data');    
        siswaId = res.body.data.id
        done();
      })
  })
  it('Should Give error when create siswa without auth', function(done) {
    chai.request(app)
      .post('/siswa/create')
      .send({
        npm: 'S00-2001',
        nama: faker.name.firstName(),
        jk: 'laki-laki',
        alamat: 'bandar Lampung',
        no_telp: '08526999229' })
      .end(function(err, res) {
         expect(res).to.have.status(403);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Invalid Token');
         done();
      })
  })
  it('Should Update Siswa', function(done) {
    chai.request(app)
      .put(`/siswa/${siswaId}`)
      .set('token', token)
      .send({
        npm: 'S00-2001',
        nama: faker.name.firstName(),
        jk: 'laki-laki',
        alamat: 'bandar Lampung',
        no_telp: 'ubah' })
      .end(function(err,res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Success Update Siswa');
        expect(res.body).to.have.property('data');
        done();
      })
  })
  it('Should Delete Siswa', function(done) {
    chai.request(app)
      .del(`/siswa/${siswaId}`)
      .set('token', token)
      .end(function(err, res) {
         expect(res).to.have.status(200);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success Delete Siswa');
         expect(res.body).to.have.property('data');
         done();
      })
  })
  it('Should Give error when delete a Password without auth', function(done) {
    chai.request(app)
      .del(`/siswa/${siswaId}`)
      .end(function(err, res) {
         expect(res).to.have.status(403);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Invalid Token');
         done();
      })
  })
})
