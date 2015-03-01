module.exports = function(app) {
  var Post = app.models.post;
  var HomeController = {
  		index: function(req, res) {
  			var fluffy = new Post({title: "First Post",private: false, text: "firstPostText"});
  			fluffy.save(function (err, fluffy) {
			 if (err) return console.error(err);
			});
      		res.render('home/index');
		},
		blog: function(req, res) {
			var posts= Post.find(function ( err, posts, count ){
				params = {posts:posts};
				res.render('home/posts',params);
		    });
		}
	};
	return HomeController;
};