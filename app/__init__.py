from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__, static_url_path='')
app.config.from_object('config')
db = SQLAlchemy(app)


from app.models import user
from app.models import business
from app.models import Chassis
from app.models import Module
from app.routes import index

from app.routes import users
from app.routes import businesses
from app.routes import Chassis
from app.routes import Modules
