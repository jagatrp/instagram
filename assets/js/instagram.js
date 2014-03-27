/*
 * configuration setting for instagram api
 */
var apiUrl = 'https://api.instagram.com/v1/media/popular?client_id=4bbf750dd530480baf89bc7325a8c30e';


//ajax request need to be sent on instagram api to read url content.
//by using php or ROR, url content can be read directly by using respective language method
$.ajax({
    type:     "GET",
    url:      apiUrl,
    dataType: "jsonp", // this is for json parse data return from above url in this case this is required as content of above url is in json format
    success: function(data){
	// check meta code if it returns 200 then data return from above url successfully.
	if(data.meta.code == 200){
	    //console.log((data.data).length);
	    //now loop for each data
	    var i = 0;
	    var className,description,limitDescription;
	    $.each( data.data, function( key, value ) {
		//create html element for each data and insert it on body part
		className = (i % 3 == 0)?'span3 col-sm-6 col-md-3 reset-margin':'span3 col-sm-6 col-md-3';
		i++;
		description = (value.caption)?value.caption.text:'';
		limitDescription = description.substr(0,35)+'...';
		if(value.type == 'image'){

		    $('.load-content').append('<div class="'+className+'"><div class="thumbnail"><a id="'+value.id+'"href="'+value.images.standard_resolution.url+'" data-lightbox="example-set" title="'+description+'"><img class="example-image" src="'+value.images.low_resolution.url+'" alt="images"/></a></div><div class="caption"><h4>'+value.user.full_name+'</h4><p>'+limitDescription+'</p><p><a class="btn" href="#" onclick="showDetail(\''+value.id+'\')">View details &raquo;</a></p></div></div>');
		}
		else if(value.type == 'video'){
		    $('.load-content').append('<div class="'+className+'"><div class="thumbnail"><video src="'+value.videos.low_resolution.url+'" controls="controls" width="227" height="227"></video></div><div class="caption"><h4>'+value.user.full_name+'</h4><p>'+limitDescription+'</p></div></div>');
		}
	    });


	}
	else{
	    alert('invalid url')
	}
    }
});

function showDetail(id){
    $('#'+id).trigger('click');
}