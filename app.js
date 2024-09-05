const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/post');

const app = express();

mongoose.connect('mongodb://localhost:27017/blogDB');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', async (req, res) => {
    const posts = await Post.find({});
    res.render('home', { posts: posts });
});

app.get('/compose', (req, res) => {
    res.render('compose');
});

app.post('/compose', async (req, res) => {
    const post = new Post({
        title: req.body.postTitle,
        content: req.body.postContent
    });
    await post.save();
    res.redirect('/');
});

app.get('/posts/:postId', async (req, res) => {
    const post = await Post.findById(req.params.postId);
    res.render('post', { title: post.title, content: post.content });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
