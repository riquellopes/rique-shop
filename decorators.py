#coging: utf-8
from functools import wraps
from flask import redirect, request

def login_required(func):
	@wraps(func)
	def decorator_view(*args, **kwargs):
		"""
			Decorator validate whether user is authenticated.
		"""
		return func(*args, **kwargs)
	return decorator_view