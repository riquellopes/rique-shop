RiqueShop=function(){
	this.init=function(){
		$('form').on('submit', function(){
			var text = $('input:text', this),
				q = $.trim(text.val()).replace(/ /g, '+'),
				url = "/search/".concat(q);
				text.attr('disabled', 'disabled');
				location.hash = "!/search?q=".concat(q);
		});
	}
	
	return this;
}();

/**
 * Simple route in mode get::
 * 
 * RiqueShop.Route.get('/search\?q=([\w+]*)/', function(q){
 *		console.log(q);
 * });
 */
RiqueShop.Routes=function(){
	var maps=['<mix>','<string>','<number>'],
		smaps=maps.join('||'),
		routes = {500:{callback:function(){}, isDis:false}, 404:{callback:function(){
			window.location.hash="!/404";
			try{
				this._call(arguments);
			}catch(error){ console.log( error )}
		}, isDis:false}},
		
		/**
		 * Function clear query string::
		 */
		clear=function(queryString){
			return queryString.replace(/^[/#!]*/,'');
		},
		/**
		 * Function verification is url content route corret::
		 */
		ok=function(route){
		  var route = clear(route.replace(new RegExp(maps.join("|")), ''));
		  return clear(window.location.hash).indexOf(route) >= 0	
		},
		rewrite=function(){				
			if( /\?/.test(window.location.hash) ){
				var route = this.clear(window.location.hash).split('?');
				return '/'.concat(route[0]).concat('?_escaped_fragment_=').concat(route[1]);
			}else{
				return '/?_escaped_fragment_='.concat(window.location.hash);
			}
		},
		/**
		 * Function for process dispatch::
		 */
		dispatch = function(){
			var routes = this.routes;
			for(r in routes){
				var route = routes[r];
								
					if( this.ok(r) && route.isDis){
						/**
					 	 * Execute method ajax to resquest informations::
					 	 */
						$.ajax({
							type:route.type,
							url:route.url(),
							dataType:"json",
							sucess:route.callback,
							statusCode:{
								404:routes[404].callback,
								500:routes[500].callback
							}
						});
						return;
			 		}
			}
			/**
			 * Routes not maped invoke 404::
			 */
			//routes[404].callback();
		}.bind({routes:routes,self:this, ok:ok});
		
		
		if( 'onhashchange' in window ){
			window.onhashchange=dispatch;
		}else{
			setInterval(dispatch, 500);
		}
		
		window.onload=dispatch;
		
	this.get=function(route, callback){
		routes[route] = {callback:callback, 
						 type:'get',
						 isDis:true,
						 url:rewrite.bind({self:this,
										   route:route,
										   clear:clear})
		};
	};
	
	this.internal_server_error=function(callback){
		routes[500] = {callback:function(rs){
			window.location.hash="!/500";
			callback(rs)
		}, isDis:false}
	};
	
	this.page_not_found=function(callback){
		routes[404].callback.bind({_call:callback});
	}
	
	return this;
};

app = new RiqueShop.Routes();
app.get('/search?q=<mix>', function(data){
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
		
	$('input:text').removeAttr('disabled');
	$('#result').html(Mustache.to_html(tpl, jQuery.parseJSON(data.response) ));
});

app.internal_server_error(function(){
	$('input:text').removeAttr('disabled');
	$('#result').html(Mustache.to_html("Ops error!"));
});

app.page_not_found(function(){
	console.log("Henrique");
});

$(RiqueShop.init);