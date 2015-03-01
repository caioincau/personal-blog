module.exports = function(app) {
  var Post = app.models.post;
  var HomeController = {
  		index: function(req, res) {
  	// 		var fluffy = new Post({title: "Second Post",private: false, text: "second post tesxt",tags:["example","blog","post"]});
  	// 		fluffy.save(function (err, fluffy) {
			//  if (err) return console.error(err);
			// });
      		res.render('home/index');
		},
		blog: function(req, res) {
			var query = Post.find();
			query.sort( {createdAt:-1})

			query.exec(function (err,posts) {
				params = {posts:posts};
				res.render('home/posts',params);
		    });
		},
		byTag: function(req,res){
			var query = Post.find();
			var tag = req.query.tag;
			query.where('tags').in([tag]);
			query.exec(function(err,posts){
				params = {posts:posts};
				res.render('home/posts',params);
			});


		}
	};
	return HomeController;
};