/*var photos = [];
photos.push({
	name:'Node.js Logo1',
	path:'http://nodejs.org/images/logos/nodejs-green.png'
});
photos.push({
	name:'Node.js Logo2',
	path:'http://nodejs.org/images/logos/nodejs-green.png'
})*/

var path = require('path');
var fs = require('fs');
var join = path.join;
var photos = [];

exports.list = function(req,res){
	fs.readdir("./public/photos/",function(err,files){
		files.forEach(function(filename){
			fs.readFile(filename,function(data){
				var imgName = filename;
				var imgPath = "/photos/"+filename;
				photos.push({
					name:imgName,
					path:imgPath
				})
			})
		});
	})	
	res.render('photos',{
		title:'photos',
		photos:photos
	});
	photos.splice(0,photos.length);
};
/*exports.form = function(req,res){
	res.render('photos/upload',{
		title:'Photo upload'
	});
};
exports.submit = function(dir){
	return function(req,res,next){
		var img = req.files.photo.image;
		var name = req.body.photo.name || img.name;
		var path = join(dir,img.name);
		fs.rename(img.path,path,function(err){
			if(err){
				return next(err);
			}
			Photo.create({
				name:name,
				path:img.name
			},function(err){
				if(err){
					return next(err);
				}
				res.redirect('/');
			});
		});
	}
};*/

var fileNames = [];
function getFilesName(dir){
	fs.readdir(dir,function(err,files){
		files.forEach(function(filename){
			fs.readFile(filename,function(data){
				fileNames.push(filename);
			})
		});
	})
	return fileNames;
}

exports.download = function(req,res,next){
	var str = req.url;
	var index = str.lastIndexOf("/");
	var name = str.slice(index+1,str.length);
	var fileNames = getFilesName('public/photos/');
	console.log(fileNames);
	for(var i=0;i<fileNames.length;i++){
		if(fileNames[i] == name){
			res.download('public/photos/'+name);
		}
	}
	fileNames.splice(0,fileNames.length);
}