RiqueShop=function(){
	var tpl = function(){
		var tpl = new Array();
			tpl.push('<ul>');
				tpl.push('{{#results}}');
					tpl.push('<li>{{title}}</li>');
				tpl.push('{{/results}}');	
			tpl.push('</ul>');
		return tpl.join('').trim();
	}();
	
	this.init=function(){
		$('form').on('submit', function(){
			var text = $('input:text', this),
				url = "/search/".concat(text.val().replace(/ /g, '+'));
					  text.attr('disabled', 'disabled');
				
			$.getJSON(url, function(data){
				console.log( jQuery.parseJSON(data.response) );
				var render = Mustache.to_html(tpl, jQuery.parseJSON(data.response) );
				console.log( render );
				
				/**
				 * @todo código da tpl deve ser adicionado aqui!
				 */
				text.removeAttr('disabled');
				$('#result').html(render);
			});
			
		});
	}
	
	return this;
}();

$(RiqueShop.init);

