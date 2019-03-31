
const uuidv4 = require('uuid/v4');
var date = new Date()
date.setDate(6);
date.setMonth(12);
date.setFullYear(2019);
let postDB = [
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

const listPosts = {

    get: function(){
        return postDB;
    },

    getAuthor: function (author){
        let authorPosts = [];
        postDB.forEach(item => {
            if(item.author == author){
                authorPosts.push(item)
            } 
        });
        return authorPosts;
    },

    post: function(post){
        postDB.push(post);
        return post;
    },



    delete: function(id){

        postDB.forEach(item=>{
            if(item.id == id){
                postDB.splice(item, 1);
                return true;
            }

        });
        return false;
    },
    put: function(id, update){
        var updated = false
        postDB.forEach(item=>{

            if(update.id == id) {
                if(update.title) {
                  item.title = update.title;
                  updated = true;
                }
                if(update.content) {
                  item.content = update.content;
                  updated = true;
                }
                if(postBody.author) {
                  item.author = update.author;
                  updated = true;
                }
                if(postBody.publishDate) {
                  item.publishDate = updated.publishDate;
                  updated = true;
                }
            }

        });

return updated;
    }

}

module.exports = {listPosts};