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
app.use(express.static('public'));
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
	author: String
})

var user = mongoose.model('blog_user', userSchema);

var articleSchema = new Schema({
	author: String,
	title: String,
	body: String,
	createdOn: String,
	editedOn: String
})

var article = mongoose.model('blog_article', articleSchema);

app.post('/api/create_profile', (req, res, next) => {
	console.log(req.body);
	user.findOne({username: req.body.username}, (err, data) => {
		if (!data) {
			next();
		}else{
			console.log(data);
			res.send('username already taken');
		}
	})
}, (req, res) => {
	if (req.body.password1 !== req.body.password2) {
		res.send('your passwords do not match')
	}else{
		var newUser = new user({
		username: req.body.username,
		password: req.body.password2,
		author: req.body.author
	})
		newUser.save();
		res.send('profile created successfully')
	}
});

app.post('/api/post_article', (req, res) => {
	console.log({"req.body": req.body})
	user.findOne({username: req.body.username, password: req.body.password}, (err, data) => {
		if (!data) {
			res.send('username and/or password does not match')
		}else{
			let timestamp = new Date(Date.now());
			timestamp = timestamp.toISOString();
			let newArticle = new article({
				author: data.author,
				title: req.body.title,
				body: req.body.article_data,
				createdOn: timestamp,
				editedOn: ''
			});
			newArticle.save();
			res.send('article posted successfully');
		}
	})
});

app.put('/api/update_article', (req, res, next) => {
	user.findOne({username: req.body.username, password: req.body.password}, (err, data) => {
		if (!data) {
			res.send('username and/or password does not match')
		}else{
			next();
		}
	})
}, (req, res, next) => {
	article.findOne({title: req.body.previousTitle}, (err, data) => {
		if (!data) {
			res.send("failed");
		}else{
			let timestamp = new Date(Date.now());
			timestamp = timestamp.toISOString();
			data.body = req.body.article_data;
			data.title = req.body.title;
			data.editedOn = timestamp;
			data.save();
			next();
		}
	})
}, (req, res) => res.send("updated article successfully"));

app.delete('/api/delete_article', (req, res, next) => {
	console.log({"req.body at beginning of delete": req.body});
	user.findOne({username: req.body.username, password: req.body.password}, (err, data) => {
		if (!data) {
			res.send('username and/or password does not match')
		}else{
			req.body.author = data.author;
			next();
		}
	})
}, (req, res, next) => {
	console.log({"req.body after setting author": req.body})
	article.findOne({title: req.body.title}, (err, data) => {
		if (!data) {
			res.send('article not found')
		}else if (data.author === req.body.author || req.body.author === 'Seth Ely') {
			next();
		}else{
			res.send('you do not have permission to delete this article')
		}
	})
}, (req, res) => {
	article.findOneAndDelete({title: req.body.title}, (err, data) => {
		if (err) {
			res.send(err)
		}else if (data) {
			console.log("made it to the end")
			res.send('article deleted permanently')
		}
	})
})

app.get('/api/articles', (req, res) => {
	article.find({body: {$ne: []}}, (err, data) => {
		if (!data) {
			res.json('not found')
		}else{
			const sortedData = data.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));
			console.log({
				data: data,
				sortedData: sortedData
			})
			res.json(sortedData);		
		}
	})
});

app.get('/api/article', (req, res) => {
	console.log(req.query);
	article.findOne({title: req.query.title }, (err, data) => {
		if (!data) {
			res.send("not found");
		}else{
			res.json(data);
			}
		})
	});

app.get('/api/load_article', (req, res) => {
	console.log(req.query.title);
	article.findOne({title: req.query.title }, (err, data) => {
		if (!data) {
			console.log('failed')
			res.json("not found");
		}else{
			console.log({body: data.body})
			res.json(data.body);
		}
	})
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});