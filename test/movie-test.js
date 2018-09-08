const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app');

chai.use(chaiHttp);
let token,movieID;

describe('Token',()=>{
before((done)=>{
    chai.request(server).post('/authenticate').send({userName:'aslanyi1',password:'taha1998'}).end((err,res)=>{
        if(err)
        {
            throw err;
        }
        else{
            token = res.body.token;
            done();
        }
    }); 
});
describe('/get api/movie',()=>{
    it('Get ALL MOVIES',(done)=>{
        chai.request(server).get('/api/movie').set('x-access-token',token).end((err,res)=>{
            if(err)
                throw err;
            res.should.status(200);
            res.body.should.be.a('array');
            done();
        });
    });
});
describe('/post /api/movie',()=>{
it('Post movie',(done)=>{
    chai.request(server).post('/api/movie').send({title:'TEST',category:'Test Kategori',year:2018,imdb_score:5.5}).set('x-access-token',token).end((err,res)=>{
        if(err)
        {
            throw err;
        } 
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('title');
        res.body.should.have.property('category');
        res.body.should.have.property('year');
        res.body.should.have.property('imdb_score');
        movieID=res.body._id;
        done();
    });
});
});
describe('/get /api/movie/:movie_id',()=>{
it('Get Movie By ID',(done)=>{
    chai.request(server).get('/api/movie/'+movieID).set('x-access-token',token).end((err,res)=>{
        if(err)
        {
            throw err;
        }
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('title');
        res.body.should.have.property('category');
        res.body.should.have.property('year');
        res.body.should.have.property('imdb_score');
        res.body.should.have.property('_id').eql(movieID);
        done();
    });
});
});
describe('/put /api/movie/:movie_id',()=>{
    it('PUT MOVIE',(done)=>{
        chai.request(server).put('/api/movie/'+movieID).send({title:'Title kardeş.'}).set('x-access-token',token).end((err,res)=> {
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
describe('/delete /api/movie/:movie_id',()=>{
    it('Delete Movie',(done)=>{
        chai.request(server).del('/api/movie/'+movieID).set('x-access-token',token).end((err,res)=>{
            if(err)
            {
                throw err;
            }
            res.should.have.status(200);
            done();
        });
    });
});
});
