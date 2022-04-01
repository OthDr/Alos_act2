const express = require('express');
const { redirect } = require('express/lib/response');
const bParser = require('body-parser');
const Joi = require('joi'); // A package for post validation

const app = express();
const port = process.env.PORT || 3000 ; // dinamic port based on machine ports otherwise use 3000



app.use(bParser.json());    // Parse the POST body json
app.use(bParser.urlencoded());  //Parse POST x-www-form-urlencoded 

var countries = ['dz','us','fr','ru','in','de','tr','eg','br','ca','cz','it','ua']; 
var categories =['business','entertaiment','general','health','science','sports','technologie'];


app.listen(port, ()=>{
    console.log(`Server is listening on port: ${port}`);
});

app.get('/',(req,res)=>{
    console.log(`HOME endpoint`);
    
});

app.get('/news',(req,res)=>{
    console.log(`Latest news from ${req.hostname}`);
    res.json({
        /* Get ressources from the datbase
        .
        .
        */
        //example :
        "author": "Rafi Grandham",
            "title": "Etiam justo. Etiam pretium iaculis justo.",
            "description": "Nulla ac enim.",
            "url": "https://ox.ac.uk/luctus/rutrum/nulla/tellus/in/sagittis.jpg?mus=blandit&etiam=mi&vel=in&augue=porttitor&vestibulum=pede&rutrum=justo&rutrum=eu&neque=massa&aenean=donec&auctor=dapibus&gravida=duis&sem=at&praesent=velit&id=eu&massa=est&id=congue&nisl=elementum&venenatis=in&lacinia=hac&aenean=habitasse&sit=platea&amet=dictumst&justo=morbi&morbi=vestibulum&ut=velit&odio=id&cras=pretium&mi=iaculis&pede=diam&malesuada=erat&in=fermentum&imperdiet=justo&et=nec&commodo=condimentum&vulputate=neque&justo=sapien&in=placerat&blandit=ante",
            "urlToImage": "http://dummyimage.com/193x100.png/ff4444/ffffff",
            "publishedAt": "1/30/2022",
            "content": "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum.",
            "category" : "category",
            "country" : "xx"
    });
    
});

app.get('/news/country=:c_code',(req,res)=>{
    if(countries.includes(`${req.params.c_code}`)){
        console.log(`News about a country: ${req.params.c_code}`);
        res.json({
            /* Get ressource from the datbase
            .
            .
            */
            //example :
            "author": "Rafi Grandham",
            "title": "Etiam justo. Etiam pretium iaculis justo.",
            "description": "Nulla ac enim.",
            "url": "https://ox.ac.uk/luctus/rutrum/nulla/tellus/in/sagittis.jpg?mus=blandit&etiam=mi&vel=in&augue=porttitor&vestibulum=pede&rutrum=justo&rutrum=eu&neque=massa&aenean=donec&auctor=dapibus&gravida=duis&sem=at&praesent=velit&id=eu&massa=est&id=congue&nisl=elementum&venenatis=in&lacinia=hac&aenean=habitasse&sit=platea&amet=dictumst&justo=morbi&morbi=vestibulum&ut=velit&odio=id&cras=pretium&mi=iaculis&pede=diam&malesuada=erat&in=fermentum&imperdiet=justo&et=nec&commodo=condimentum&vulputate=neque&justo=sapien&in=placerat&blandit=ante",
            "urlToImage": "http://dummyimage.com/193x100.png/ff4444/ffffff",
            "publishedAt": "1/30/2022",
            "content": "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum.",
            "category" : "category",
            "country" : `${req.params.c_code}`
        });
    }else{
        res.status(404).json({
            'error':true,
            'message':"this ressource doesn't exists"
        });
    }
    
});


app.get('/news/category=:cat_code',(req,res)=>{
    if(categories.includes(`${req.params.cat_code}`)){
        console.log(`News about a category: ${req.params.cat_code}`);
        res.json({
            /* Get ressource from the datbase
            .
            .
            */
           //example :
            "author": "Rafi Grandham",
            "title": "Etiam justo. Etiam pretium iaculis justo.",
            "description": "Nulla ac enim.",
            "url": "https://ox.ac.uk/luctus/rutrum/nulla/tellus/in/sagittis.jpg?mus=blandit&etiam=mi&vel=in&augue=porttitor&vestibulum=pede&rutrum=justo&rutrum=eu&neque=massa&aenean=donec&auctor=dapibus&gravida=duis&sem=at&praesent=velit&id=eu&massa=est&id=congue&nisl=elementum&venenatis=in&lacinia=hac&aenean=habitasse&sit=platea&amet=dictumst&justo=morbi&morbi=vestibulum&ut=velit&odio=id&cras=pretium&mi=iaculis&pede=diam&malesuada=erat&in=fermentum&imperdiet=justo&et=nec&commodo=condimentum&vulputate=neque&justo=sapien&in=placerat&blandit=ante",
            "urlToImage": "http://dummyimage.com/193x100.png/ff4444/ffffff",
            "publishedAt": "1/30/2022",
            "content": "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum.",
            "category" :`${req.params.cat_code}`,
            "country" :  "xx"
        });
    }else{
        res.status(404).json({
            'error':true,
            'message':"this ressource doesn't exists"
        });
    }
});

//---------------  POST request  -------------

app.post('/add_news',(req,res)=>{

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


 // ----------  status 404  ------------ 

app.use((req,res)=>{
    res.status(404).json({
        'error':true,
        'message':"this ressource doesn't exists"
    });
});

