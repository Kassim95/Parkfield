$(document).ready(function(){
    //variables
    array = [];
    loadStart = 3;
    loadEnd = 6;

    $.getJSON("posts.json", function(result){
        $.each(result.items, function (key, val) {
       		array.push({itemId: key, itemName: val.item_name, itemPublished: val.item_published, itemText: val.item_data.text, itemImage: val.item_data.image_url, itemLink: val.item_data.link, itemTag: val.service_name.toLowerCase()})
       			// clean array
       			if(array[key].itemId === undefined){
       				array[key].itemId = '';
       			}
       			if(array[key].itemName === undefined){
       				array[key].itemName = '';
       			}
       			if(array[key].itemPublished === undefined){
       				array[key].itemPublished = '';
       			}
       			if(array[key].itemText === undefined){
       				array[key].itemText = '';
       			}
       			if(array[key].itemImage === undefined){
       				array[key].itemImage = '';
       			}
       			if(array[key].itemLink === undefined){
       				array[key].itemLink = '';
       			}
       			$('.items').append("<div class='item col-lg-4 "+array[key].itemTag+"' id="+array[key].itemId+" ><h6 class='text-center'>"+array[key].itemName+"</h6><img style='width: 100%;' src="+array[key].itemImage+"><br><p>"+array[key].itemText+"</p><a  class='text-center' href="+array[key].itemLink+" target='_blank'>"+array[key].itemLink+"</a><br><span>"+array[key].itemPublished+"</span></div>")
       		})
					//hide the item
					$('.item').hide();
					// display 3 first items
					for(var i = 0; i< 3; i++){
						$('#'+i).show();
					}
    });
		//load more button
		$('.load').on('click', function(){
			for(var  i = loadStart;  i < loadEnd ; i++){
				$('#'+i).show();
				loadStart = i;
				if(i >= array.length){
					$(".load").hide();
				}
			}
			loadEnd = loadStart + 4;
		})

		//filter button
		$('.filter').on('click', function(){
			$(".item").hide();
			$(".load").hide();
			$("."+$('.filter-input').val().toLowerCase()).show();
			$('.back').show();
			$('.filter-input').val('')
		})
		$('.filter-input').keypress(function(e) {
		  if(e.which == 13) {
		  	$(".item").hide();
				$(".load").hide();
				$("."+$('.filter-input').val().toLowerCase()).show();
				$('.back').show();
				$('.filter-input').val('')
		  }
		});

		//exit filter
		$('.back').on('click', function(){
			$('.back').hide();
			$('.load').show();
			loadStart = 3;
    	loadEnd = 6;
			//hide the item
			$('.item').hide();
			// display 3 first items
			for(var i = 0; i< 3; i++){
				$('#'+i).show();
			}
		})
});