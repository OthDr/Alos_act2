# Alos_act2
## Express.JS REST API for news 
### **How to use:**
- `npm install` to install all node-modules.<br />
- `nodemon routes` start server.<br />

### HTTP : GET POST
- [x] **JSON request & response.**
- [x] **URlemncoded(*x-www-form-urlencoded*) requests.**

### POST request body validation & Errors
using Joi object schema **`const Joi = require('joi')`**
- [x] **Used Joi package :** Created an object schema to validate the *req.body*.<br />
- [x] **Send back the error** on the response. <br />
### **Middleware**
#### **body-parser `const bParser = require('body-parser')`:** To parse request body  *JSON or urlencoded* .

## **routes**
### GET : 
#### 1. GET('/news') *home endpoint* <br/>
#### 2. GET('/news/country=:c_code') *news based on country code* <br/>
#### 3. GET('/news/category=:cat_code') *news based on category* <br/>
#### 3. GET('/news/:id') *get a post by it's ID* <br/>
### POST :
#### - post('/add_news') *create a new post* <br/>
