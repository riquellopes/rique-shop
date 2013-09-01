RiqueShop=function(){
	this.init=function(){
		$('form').on('submit', function(){
			var url = "/search/".concat($('input:text', this).val().replace(/ /g, '+'));
				
			$.get(url, function(data){
				console.log( data )
			});
		});
	}
	
	return this;
}();

$(RiqueShop.init);

