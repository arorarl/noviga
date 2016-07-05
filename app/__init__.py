from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__, static_url_path='')
app.config.from_object('config')
db = SQLAlchemy(app)


from app.models import user
from app.models import business
from app.models import Chassis
from app.models import Module
from app.models import hardwareSetup
from app.models import hwchassismap
from app.models import hwchaschanmap
from app.models import channelsetup
from app.models import quantity
from app.models import unit
from app.models import project
from app.routes import index

from app.routes import users
from app.routes import businesses
from app.routes import Chassis
from app.routes import Modules
from app.routes import hardwaresetups
from app.routes import hwchassismaps
from app.routes import hwchaschanmaps
from app.routes import channelsetups
from app.routes import quantities
from app.routes import units
from app.routes import projects
