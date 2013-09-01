#coding: utf-8
from os import path, environ
from sys import path as spath

# add lib in PYTHONPATH
spath.append(path.join(path.dirname(__file__), 'lib'))

TEST = False
PROJECT_ROOT = path.abspath( path.dirname(__file__) )
TEMPLATES_DIR = path.join(PROJECT_ROOT, "templates")
APP_ID = environ.get('APP_ID')
SECRET_KEY = environ.get('SECRET_KEY')
