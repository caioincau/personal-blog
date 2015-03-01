module.exports = function(app) {
  var Post = app.models.post;
  var HomeController = {
  		index: function(req, res) {
  	// 		var fluffy = new Post({title: "First Post",private: false, text: "firstPostText"});
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
		}
	};
	return HomeController;
};