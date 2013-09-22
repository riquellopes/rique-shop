#coding: utf-8
from flask import Flask, render_template, jsonify, request, redirect, json, abort
from flask_debugtoolbar import DebugToolbarExtension
from requests import ConnectionError

app = Flask(__name__)
app.config.from_object('settings')
toolbar = DebugToolbarExtension(app)

from meli.meli import Meli as MercadoLivre
livre=MercadoLivre(client_id=app.config['APP_ID'], client_secret=app.config['SECRET_KEY'])

@app.route('/')
def home():
	"""
		Invoke controller /
		/#!/
	"""
	app.logger.debug('home')
	return render_template('index.html')		
	
@app.route('/search')
def search():
	"""
		Start search on mercadolivre
		/#!/search?q=juca
	"""
	try:
		q=request.args.get('q').replace(' ', '+')
		response=livre.get(path='/sites/MLA/search?q={0}'.format(q))
		return jsonify(response=response.content)
	except ConnectionError:
		return abort(500)

@app.errorhandler(404)
def not_found(error):
	app.logger.error('Error')
	return render_template('page-not-found.html', error=error), 404
	
class EscapeFragmentMiddleware(object):
	
	def __init__(self, app):
		self.app = app
	
	def __call__(self, env, start_response):
		"""
			snippet based in:
			https://github.com/indabamusic/rack-escaped-fragment/blob/master/lib/rack/escaped_fragment.rb
		"""
		from werkzeug import url_decode
		from re import search
		
		if search('_escaped_fragment_', env.get('QUERY_STRING', '')):
			query_string = url_decode(env['QUERY_STRING'])
			env['QUERY_STRING']=query_string.get('_escaped_fragment_')
			##DEFINE INFORMATION ABOUT PATH_INFO::
			if search('/\w', query_string.get('_escaped_fragment_')):
				env['PATH_INFO'] = query_string.get('_escaped_fragment_')
			app.logger.info(env['PATH_INFO'])
		return self.app(env, start_response)	
app.wsgi_app = EscapeFragmentMiddleware(app.wsgi_app)