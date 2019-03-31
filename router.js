
const express = require('express');
const bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');
const router = express.Router();
const jsonParser = bodyParser.json();
const { listPosts } = require('./model') // calling an object in the import 

router.put('/blog-posts/:id', jsonParser, (req, res, next) => {

    let postId = req.params.id
    let title = req.body.title;
    let content = req.body.content;
    let author = req.body.author;
    let publishDate = req.body.publishDate

    let toUp={
        title,
        content,
        author,
        publishDate
    };


    let articles = listPosts.get();
    let done = false;


    if (!postId) {
        res.status(406).json({
            message: "No id was sent",
            status: 406
        });
        next()
    }

    let update = listPosts.put(postId, toUp)
    if(update){
        articles.forEach(item => {

            if (item.id == postId) {
                if (req.body.title)
                    item.title = title;
    
                if (req.body.content)
                    item.content = content
    
                if (req.body.author)
                    item.author = author;
                if (req.body.publishDate)
                    item.publishDate = publishDate;
    
                done = true;
                if (done) {
                    res.status(200).json({
                        message: "update successful",
                        status: 200
                    });
                }
    
    
            }
        })
    }
    

else{
    res.status(404).json({
        message: "No id found.",
        status: 404
    });
}
    


});



//Json parser = middleware
router.post('/blog-posts', jsonParser, (req, res) => {
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

            })

            next();
        }
    }

    let toAdd = {
        id: uuidv4(),
        title: title,
        content: content,
        author: author,
        publishDate: publishDate

    };
    listPosts.post(toAdd);

    res.status(201).json({
        message: `suceess`,
        status: 201,
        blog: toAdd
    });

});

router.get('/blog-posts', (req, res, next) => {
    let bloglist = listPosts.get();
    if (bloglist) {
        res.status(200).json({
            message: "Successfully sent the list of posts",
            status: 200,
            blogs: bloglist
        });
    }
    else {
        res.status(500).json({
            message: 'internal error',
            status: 500
        })
        return next();
    }

});

router.get('/blog-posts/:author', jsonParser, (req, res) => {
    let author = req.params.author;

    if (!req.body.author) {
        res.status(406).json({
            message: "No author in request",
            status: 406
        });
        return next();
    }

    let postsByAuthor = listPosts.getAuthor(author)

    if (postsByAuthor.length > 0) {
        res.status(200).json({
            message: "Success",
            status: 200,
            post: postsByAuthor
        });
    }

    else {
        res.status(404).json({
            message: "No author found",
            status: 404
        });
        return next();
    }





});


router.delete('/blog-posts/:id', jsonParser, (req, res) => {
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
        next();
    }


    let done = listPosts.delete(postId)
    if (done) {
        res.status(200).json({
            message: "delete successful",
            status: 200
        });

    }
    else {
        res.status(404).json({
            message: "No post found or already deleted.",
            status: 404
        });
    }
    next();
});

module.exports = router;