RiqueShop=function(){
	var tpl = function(){
		var tpl = new Array();
			tpl.push('<ul>');
				tpl.push('{{#results}}');
					tpl.push('<li><div>');
					tpl.push('<img src="{{thumbnail}}"/><a href="{{permalink}}" target="_blank">{{title}}</a>');
					tpl.push('</div></li>');
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
				var render = Mustache.to_html(tpl, jQuery.parseJSON(data.response) );
				
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

