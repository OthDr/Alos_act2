const express = require('express');
const { redirect } = require('express/lib/response');
const bParser = require('body-parser');
const Joi = require('joi'); // A package for post validation

const router = express.Router();

router.use(bParser.json());    // Parse the POST body json
router.use(bParser.urlencoded());  //Parse POST x-www-form-urlencoded 

var countries = ['dz','us','fr','ru','in','de','tr','eg','br','ca','cz','it','ua']; 
var categories =['business','entertaiment','general','health','science','sports','technologie'];



router.get('/news',(req,res)=>{
    console.log(`Latest news from ${req.hostname}`);
    res.json({
        /* Get ressources from the datbase
        .
        .
        */
    });
    
});

router.get('/news/:id',(req,res)=>{
    res.json({
        /* Get ressources from the datbase
        .
        .
        */
    });
    
});


router.get('/news/country=:c_code',(req,res)=>{
    if(countries.includes(`${req.params.c_code}`)){
        console.log(`News about a country: ${req.params.c_code}`);
        res.json({
            /* Get ressource from the datbase
            .
            .
            */
        });
    }else{
        res.status(404).json({
            'error':true,
            'message':"this ressource doesn't exists"
        });
    }
    
});


router.get('/news/category=:cat_code',(req,res)=>{
    if(categories.includes(`${req.params.cat_code}`)){
        console.log(`News about a category: ${req.params.cat_code}`);
        res.json({
            /* Get ressource from the datbase
            .
            .
            */
        });
    }else{
        res.status(404).json({
            'error':true,
            'message':"this ressource doesn't exists"
        });
    }
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
            res.status(201);
            /* add a new ressource to Datbase
            .
            .
            */
            res.json({
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
