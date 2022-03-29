const express = require('express');
const { redirect } = require('express/lib/response');

const app = express();
const bParser = require('body-parser');


app.use(bParser.json()); // MiddleWare to parse the POST body json   

var countries = ['dz','us','fr','ru','in','de','tr','eg','br','ca','cz','it','ua'];
var categories =['business','entertaiment','general','health','science','sports','technologie'];
app.listen(3000, ()=>{
    console.log('Server is listening on port 3000');
});

app.get('/',(req,res)=>{
    console.log(`All news from ${req.hostname}`);
    
});

countries.forEach(element =>{

    app.get(`/country=${element}`,(req,res)=>{

        console.log(`News about a country :${element}`);
        
        // example of a response
        res.json({
            "author": "Tiler Mcimmie",
            "title": "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
            "description": "Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.",
            "url": "https://businesswire.com/volutpat/dui/maecenas/tristique/est.html?erat=morbi&eros=ut&viverra=odio&eget=cras&congue=mi&eget=pede&semper=malesuada&rutrum=in&nulla=imperdiet&nunc=et&purus=commodo&phasellus=vulputate&in=justo&felis=in&donec=blandit&semper=ultrices&sapien=enim&a=lorem&libero=ipsum&nam=dolor&dui=sit&proin=amet&leo=consectetuer&odio=adipiscing&porttitor=elit&id=proin&consequat=interdum&in=mauris&consequat=non&ut=ligula&nulla=pellentesque&sed=ultrices&accumsan=phasellus&felis=id&ut=sapien&at=in&dolor=sapien&quis=iaculis&odio=congue&consequat=vivamus&varius=metus&integer=arcu&ac=adipiscing&leo=molestie&pellentesque=hendrerit&ultrices=at&mattis=vulputate&odio=vitae&donec=nisl&vitae=aenean&nisi=lectus&nam=pellentesque&ultrices=eget&libero=nunc&non=donec&mattis=quis&pulvinar=orci&nulla=eget&pede=orci&ullamcorper=vehicula&augue=condimentum&a=curabitur&suscipit=in&nulla=libero&elit=ut&ac=massa&nulla=volutpat&sed=convallis&vel=morbi&enim=odio&sit=odio&amet=elementum&nunc=eu&viverra=interdum&dapibus=eu&nulla=tincidunt&suscipit=in&ligula=leo&in=maecenas&lacus=pulvinar&curabitur=lobortis&at=est&ipsum=phasellus&ac=sit&tellus=amet&semper=erat&interdum=nulla&mauris=tempus&ullamcorper=vivamus&purus=in&sit=felis&amet=eu&nulla=sapien&quisque=cursus&arcu=vestibulum&libero=proin&rutrum=eu&ac=mi",
            "urlToImage": "http://dummyimage.com/113x100.png/cc0000/ffffff",
            "publishedAt": "2/11/2022",
            "content": "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue.",
            "category" : `${element}`,
            "country" : "xx"
        });
    });
});


categories.forEach(element =>{

    app.get(`/category=${element}`,(req,res)=>{

        console.log(`News about a category :${element}`);
    
        // example of a response
        res.json({ 
            "author": "Rafi Grandham",
            "title": "Etiam justo. Etiam pretium iaculis justo.",
            "description": "Nulla ac enim.",
            "url": "https://ox.ac.uk/luctus/rutrum/nulla/tellus/in/sagittis.jpg?mus=blandit&etiam=mi&vel=in&augue=porttitor&vestibulum=pede&rutrum=justo&rutrum=eu&neque=massa&aenean=donec&auctor=dapibus&gravida=duis&sem=at&praesent=velit&id=eu&massa=est&id=congue&nisl=elementum&venenatis=in&lacinia=hac&aenean=habitasse&sit=platea&amet=dictumst&justo=morbi&morbi=vestibulum&ut=velit&odio=id&cras=pretium&mi=iaculis&pede=diam&malesuada=erat&in=fermentum&imperdiet=justo&et=nec&commodo=condimentum&vulputate=neque&justo=sapien&in=placerat&blandit=ante",
            "urlToImage": "http://dummyimage.com/193x100.png/ff4444/ffffff",
            "publishedAt": "1/30/2022",
            "content": "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum.",
            "category" : `${element}`,
            "country" : "xx"
        });
    });
});


//---------------  POST request  -------

app.post('/add_news',(req,res)=>{
    if(req.body){
        if(req.body.author && req.body.title && req.body.description 
            && req.body.url && req.body.publishedAt  && req.body.content 
                && req.body.country && req.body.category)
        {
                // add a new ressource to Datbase
                res.json({
                    'status':'success',
                    'message':"ressource successfully added in the database"
                });
                console.log('ressource successfully added in the database');
        }else{
                res.json({
                    'status':'error',
                    'message':"some data is missing is missing"
                });
                console.log('some data is missing is missing');
        }
        
    }else{
        res.json({
            'status':'error',
            'message':"ressource body is missing"
        });
        console.log('ressource body is missing');
    }
    
});
 // ----------  status 404  ------------ 
app.use((req,res)=>{
    res.status(404).json({
        'status':'error',
        'message':"this ressource doesn't exists"
    });
});