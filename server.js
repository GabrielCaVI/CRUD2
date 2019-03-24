const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const uuidv4 = require('uuid/v4');
const app = express();
var date = new Date()
date.setDate(6);
date.setMonth(12);
date.setFullYear(2019);
let postArray = [
     {
          id: uuidv4(),
          title: "First Post",
          content: "This is my first blog post for the class",
          author: "GabrielCarrion",
          // publishDate: "2018-02-23"
          publishDate: date
     },

     {
          id: uuidv4(),
          title: "Second Post",
          content: "This is my second blog post for the class",
          author: "GabrielCarrion",
          // publishDate: "2019-03-23"
          publishDate: date
     }
];


app.put('/blog-posts/:id', jsonParser, (req, res) => {
	
let postId = req.params.id
     let title = req.body.title;
     let content = req.body.content;
     let author = req.body.author;
     let publishDate = req.body.publishDate


     if (!postId) {
          res.status(406).json({
               message: "No id was sent",
               status: 406
          });
     }
     postArray.forEach(item=>{

          if( item.id == postId){
               if(req.body.title)
               item.title = title;
               
               if(req.body.content)
                    item.content = content

               if(req.body.author)
                    item.author = author;
               if(req.body.publishDate)
                   item.publishDate = publishDate;


                   res.status(200).json({
                    message: "update successful",
                    status: 200
               });

          }
     })


     res.status(404).json({
          message: "No id found.",
          status: 404
     });
		

});



//Json parser = middleware
app.post('/blog-posts', jsonParser, (req, res) => {
     let title = req.body.title;
     let content = req.body.content;
     let author = req.body.author;
     let publishDate = req.body.publishDate


     //  Validate thate we reveive both paams
     //  send error with status 406 missing fields 
     let requiredFields = ['title', 'content', 'author', 'publishDate'];

     for (let i = 0; i < requiredFields.length; i++) {
          let currentField = requiredFields[i];
          if (!(currentField in req.body)) {
               res.status(406).json({
                    message: `Missing field ${currentField} `,
                    status: 406

               }).send("Finish");
          }
     }
     // let date = new Date();
     //  var pname = [date.getFullYear(),  date.getMonth(), date.getDate()] ;
     //  var myJson = JSON.stringify(pname)

     let toAdd = {
          id: uuidv4(),
          title: title,
          content: content,
          author: author,
          publishDate: publishDate

     };
     postArray.push(toAdd);
    
     res.status(201).json(toAdd)({
          message: `suceess`,
          status: 201
     });

});

app.get('/blog-posts', (req, res) => {
     res.status(200).json({
          message: "Successfully sent the list of posts",
          status: 200,
          blogs: postArray
     });
});

app.get('/blog-posts/:author', jsonParser, (req, res) => {
     let author = req.params.author;

     if (!req.body.author) {
          res.status(406).json({
               message: "No author in request",
               status: 406


          });
     }

     postArray.forEach(item => {
          if (item.author == author) {
               res.status(200).json({
                    message: "Successfully sent the id.",
                    status: 200,
                    post: item
               });
          }
     });



     res.status(404).json({
          message: "No author found",
          status: 404
     });

});







app.delete('/blog-posts/:id', jsonParser, (req, res) => {
     let postId = req.params.id

     if (postId != req.body.id) {
          res.status(406).json({
               message: "No id body and param match",
               status: 406
          });
     }

     if (!postId) {
          res.status(406).json({
               message: "No id was sent",
               status: 406
          });
     }

     postArray.forEach(item => {
          if (item.id == postId ) {
               postArray.splice(item, 1);
               res.status(200).json({
                    message: "delete successful",
                    status: 200
               });
          }

     });
     res.status(406).json({
          message: "No post found or already deleted.",
          status: 406
     });

});

app.listen(8080, () => {
     console.log('Your app is running in port 8080');
});

