RiqueShop=function(){
	var tpl = function(){
		var tpl = new Array();
			tpl.push('<ul>');
				tpl.push('{{#results}}');
					tpl.push('<li>{{title}}</li>');
				tpl.push('{{results}}');	
			tpl.push('</ul>');
		return tpl.join('').trim();
	}();
	
	this.init=function(){
		$('form').on('submit', function(){
			var data = {},
				text = $('input:text', this),
				url = "/search/".concat(text.val().replace(/ /g, '+'));
					  text.attr('disabled', 'disabled');
				
			$.get(url, function(rdata){
				$.extend(rdata, data);
			});
			
			$(document).ajaxStop(function(){
				var render = Mustache.to_html( tpl, data );
					
					/**
					 * @todo código da tpl deve ser adicionado aqui!
					 */
					text.removeAttr('disabled');
					$('#result').html(render);
			})
		});
	}
	
	return this;
}();

$(RiqueShop.init);

