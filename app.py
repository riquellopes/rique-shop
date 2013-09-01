#coding: utf-8
from flask import Flask, render_template, jsonify

app = Flask(__name__)
app.config.from_object('settings')

from meli.meli import Meli as MercadoLivre
livre=MercadoLivre(client_id=app.config['APP_ID'], client_secret=app.config['SECRET_KEY'])

@app.route('/')
def home():
	"""
		Invoke controller /
	"""
	return render_template('index.html')

@app.route('/search/<q>')
def search(q):
	"""
		Start search on mercadolivre
	"""
	response=livre.get(path='/sites/MLA/search?q={0}'.format(q))
	return response.content