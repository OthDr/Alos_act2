const express = require('express');
const bParser = require('body-parser');
const Joi = require('joi'); // A package for post validation
const db = require('../db.json');
const uuid = require("uuid");


const router = express.Router();

router.use(bParser.json());    // Parse the POST body json
router.use(bParser.urlencoded({extended : true}));  //Parse POST urlencoded 



router.get('/news',(req,res)=>{

    res.json(db.news);
    
});

router.get('/news/country=:c_code',(req,res)=>{

    console.log(`News about a country: ${req.params.c_code}`);
    let code = req.params.c_code;
    let resultArray =new Array() ;

    db.news.forEach(article => { // query data from db.json
        if(article.country == code){
            resultArray.push(article);
        }
    });

    res.status(resultArray ? 200 : 404)
    .json(resultArray ? resultArray : {'error':true,'message':"ressource not found"});
    console.log(resultArray);
});


router.get('/news/category=:cat_code',(req,res)=>{
    let code = req.params.cat_code;
    let resultArray =new Array() ;

    db.news.forEach(article => { // query data from db.json
        if(article.category == code){
            resultArray.push(article);
        }
    });

    res.status(resultArray ? 200 : 404)
    .json(resultArray ? resultArray : {'error':true,'message':"ressource not found"});
    console.log(resultArray);
    
});

router.get('/news/:id',(req,res)=>{

    let id = req.params.id;
    let result = db.news.find(article => article.id === parseInt(id));
    
    res.status(result ? 200 : 404)
    .json(result ? result :{'message':"this ressource doesn't exists"} );
    console.log(result);

});

//---------------  POST request  -------------

router.post('/add_news',(req,res)=>{

    // -----  Request body valid schema ---
    const schema =Joi.object({              
        author: Joi.string().min(4).required(),
        title: Joi.string().min(4).required(),
        description: Joi.string().min(4).required(),
        url: Joi.string().uri(),
        urlToImage: Joi.string().uri(),
        publishedAt: Joi.date(),
        content: Joi.string().min(4).required(),
        category: Joi.string().min(4).required(),
        country: Joi.string().min(2).max(2).required()
    });

    if(req.body){ //request body isn't empty

        validation_data = schema.validate(req.body); // reslut of request body validation
        
        if(!validation_data.error)
        {   
            let id = `id : ${uuid.v4()}`;
            req.body = id + req.body;       //adding an id field with unique value
            db.push(req.body);

            res.status(201)
            .json({
                'error':false,
                'message':"ressource successfully added in the database"
            });
            console.log('ressource successfully added in the database');
        }else{
                res.status(401);
                res.json({
                    'error':true,
                    'message':`${validation_data.error.message}`
                });
                console.log(validation_data.error.message);
        }
    }else{
        res.json({
            'error':true,
            'message':"ressource body is missing"
        });
        console.log('ressource body is missing');
    }
    
});

module.exports = router;
