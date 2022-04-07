const express = require('express');
const routes = require('./routes/routes.js');

const app = express();
const port = process.env.PORT || 3000 ; // dinamic port based on machine ports otherwise use 3000

app.listen(port, ()=>{
    console.log(`Server is listening on port: ${port}`);
});



app.get('/',(req,res)=>{
    console.log(`HOME endpoint`);
});

 //-----------  News routes  ----------

app.use(routes);

 // ----------  status 404  ------------ 

app.use((req,res)=>{
    res.status(404).json({
        'error':true,
        'message':"this ressource doesn't exists"
    });
});