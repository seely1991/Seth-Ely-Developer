var express = require('express');
var app = express();
var mongoose = require('mongoose');
var mongoDb = require('mongodb');
var bodyParser = require('body-parser');
var path = require('path');
var dotenv = require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('client/public'));
app.set('view engine', 'pug');

var listener = app.listen(process.env.PORT || 8080, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
};

var Schema = mongoose.Schema;
var userSchema = new Schema({
	username: String,
	password: String,
	posts: []
})

var user = mongoose.model('blog_user', userSchema);

app.post('/api/create_profile', (req, res, next) => {
	user.findOne({username: req.body.username}, (err, data) => {
		if (!data) {
			next();
		}else{
			console.log(data)
			res.send('username already taken');
		}
	})
}, (req, res, next) => {
	if (req.body.password1 !== req.body.password2) {
		res.send('your passwords do not match')
	}else{
		var newUser = new user({
		username: req.body.username,
		password: req.body.password2,
		posts: []
	})
		newUser.save();
		res.send('profile created successfully')
	}
});

app.post('/api/post_article', (req, res, next) => {
	user.findOne({username: req.body.username, password: req.body.password}, (err, data) => {
		if (!data) {
			res.send('username and/or password does not match')
		}else{
			let posts = data.posts;
			posts.push({title: req.body.title, article: req.body.article_data});
			user.update({username: req.body.username, password: req.body.password}, {posts: posts}, (err, data) => {
				res.send('posted successfully');
			})
		}
	})
});

app.get('/api/users', (req, res, next) => {
	user.find({posts: {$ne: []}}, (err, data) => {
		if (!data) {
			res.json({posts: []})
		}else{
			let posts = [];
			data.map(x => x.posts.map(y => posts.push(y)))
			res.json({posts: posts});			
		}
	})
});

app.get('/test', (req, res) => res.send('test worked'));

app.get('/api/article', (req, res, next) => {
	console.log(req.body)
	user.findOne({post: req.body.title}, (err, data) => {
		if (!data || err) {
			return null
		}else{
			console.log(data);
			let article = data.posts.filter(x => x.title === req.body.title)
			res.render('index', {
				title: data.name,
				article: article
			})
		}
	})
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});