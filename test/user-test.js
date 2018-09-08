const chai = require('chai'),
chai_http  = require('chai-http'),
chai_should= chai.should();
server     = require('../app');

chai.use(chai_http);
describe('Node js USER TEST',()=>{
it('(GET /api/user) User Anasayfa',(done)=>{
chai.request(server).get('/api/user/').end((err,res)=>{
res.should.have.status(200);
done();
});

});
});
