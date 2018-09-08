const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app');

chai.use(chaiHttp);
let token,directorId;
describe('Director tests',()=>{
before('Get Token',(done)=>{
    chai.request(server).post('/authenticate').send({userName:'aslanyi1',password:'taha1998'}).end((err,res)=>{
        if(err)
        {
            throw err;
        }
        token = res.body.token;
        done();
    });
});
describe('/GET Directors',()=>{
    it('Get all directors records',(done)=>{
        chai.request(server).get('/api/director').set('x-access-token',token).end((err,res)=>{
            if(err)
            {
                throw err;
            }
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
        });

    });
});
describe('/POST Director',()=>{
   it('Add Director record',(done)=>{
       const director = {
            name:'Jack',
            surname:'Deep',
            age:'40'
       };
        chai.request(server).post('/api/director').send(director).set('x-access-token',token).end((err,res)=>{
            if(err)
            {
                throw err;
            }
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name');
            res.body.should.have.property('surname');
            res.body.should.have.property('age');
            directorId = res.body._id;
            done();
        });
   });
});

describe('/GET :director_id',()=>{
    it('Get Director record by ID',(done)=>{
        chai.request(server).get('/api/director/'+directorId).set('x-access-token',token).end((err,res)=>{
            if(err)
            {
                throw err;
            }
            res.should.have.status(200);
            res.body.should.be.a('array'); // Yönetmen kaydı getirirken yönetmene ait filmler de geldiği için array oluyor.
            done();
        });
    });
});
describe('/PUT :director_id',()=>{
    it('Update Director record',(done)=>{
        const director = {
            name:'Mike'
        };
        chai.request(server).put('/api/director/'+directorId).send(director).set('x-access-token',token).end((err,res)=>{
            if(err){
                throw err;
            }
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name').eql(director.name);
            done();
        });
    });
});
describe('/DELETE :director_id',()=>{
    it('Delete Director record by id',(done)=>{
        chai.request(server).del('/api/director/'+directorId).set('x-access-token',token).end((err,res)=>{
            if(err)
            {
                throw err;
            }
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    });
});

});
