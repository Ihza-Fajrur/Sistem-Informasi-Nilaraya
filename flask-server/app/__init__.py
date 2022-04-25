from flask import Flask,render_template,url_for, request,jsonify,session,flash,redirect
from flask_mysqldb import MySQL
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.secret_key = '069420'
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

#Crypto key
from cryptography.fernet import Fernet
from app import crypto_key
f = Fernet(crypto_key.key())

from app import routes