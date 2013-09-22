#coding:utf-8
import unittest
from app import app
from nose.tools import assert_true, assert_equals
from mock import patch
from requests import ConnectionError

class MockMeli(object):
	
	def __init__(self, content=None):
		self.content = content
		
class AppTest(unittest.TestCase):
	
	def setUp(self):
		self.app = app.test_client()
	
	def test_access_home_return_200_ok(self):
		response = self.app.get('?_escaped_fragment_=/')
		assert_equals(response.status, '200 OK')
	
	def test_access_view_return_400_not_found(self):
		response = self.app.get('?_escaped_fragment_=/view')
		assert_equals(response.status, '404 NOT FOUND')
	
	@patch('app.livre.get')
	def test_access_search_return_200_ok(self, livre):
		livre.return_value = MockMeli("{result:[None]}")
		response = self.app.get('/search?_escaped_fragment_=q=baixo+fender')
		assert_equals(response.status, '200 OK')
		assert_equals(response.data, '{\n  "response": "{result:[None]}"\n}')
	
	@patch('app.livre.get')
	def test_access_search_return_500(self, livre):
		livre.side_effect = ConnectionError()
		response = self.app.get('/search?_escaped_fragment_=q=baixo+fender')
		assert_equals(response.status, '500 INTERNAL SERVER ERROR')