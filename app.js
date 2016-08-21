var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var arr = [];
var link;
var link_arr = [];
var page_arr = [];
var count = 0;

var mainLink = 'http://www.mangapanda.com';//works only for this site

//intialize chapter variable to any chapter on this site http://www.mangapanda.com/one-piece

var chapter = "http://www.mangapanda.com/one-piece/1";

request(chapter , function (error, response, html) {
	if (!error && response.statusCode == 200) {
		var $ = cheerio.load(html);
		$('#pageMenu option').each(function(j, element){
			page_arr.push(mainLink+$(this).attr('value'));
			count++;
		});
		console.log(count);
		//console.log(page_arr);
		for(var page in page_arr){
			request(page_arr[page] , function (error, response, html) {
				if (!error && response.statusCode == 200) {
					var $ = cheerio.load(html);
					link = $('#imgholder a img').attr('src');
					console.log(link);
					link_arr.push(link);
					console.log(link_arr.length);
					if(count == link_arr.length){
						console.log(count+"=="+link_arr.length);
						for (var i = 0; i < link_arr.length; i++) {
							request(link_arr[i]).pipe(fs.createWriteStream('img/'+i+'.jpg'));
						}
					}
				}
			});	
		}
	}
});