const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const blogsRouter = require('./router');
const app = express();
app.use('/blog/api', jsonParser, blogsRouter);

app.listen(8080, () => {
     console.log('Your app is running in port 8080');
});

