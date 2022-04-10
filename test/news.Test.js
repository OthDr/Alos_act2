const chai = require('chai');
const expect = chai.expect;
const should = chai.should;
const chaiHttp = require('chai-http');
const router = require('../router');


chai.use(chaiHttp);


describe('/Collection1',()=>{

    it('should test something',()=>{
        let a = true;
        let b = false;
    
        
        expect(b).to.be.equal(!a);
    });

})
