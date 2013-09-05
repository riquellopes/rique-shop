RiqueShop=function(){
	this.init=function(){
		$('form').on('submit', function(){
			var text = $('input:text', this),
				url = "/search/".concat(text.val().replace(/ /g, '+'));
					  text.attr('disabled', 'disabled');
				
			$.get(url, function(data){
				/**
				 * @todo código da tpl deve ser adicionado aqui!
				 */
				text.removeAttr('disabled');
			});
		});
	}
	
	return this;
}();

$(RiqueShop.init);

