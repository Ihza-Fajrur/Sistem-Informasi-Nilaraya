from flask import Flask,render_template,url_for, request,jsonify,session,flash,redirect
from flask_mysqldb import MySQL
import MySQLdb.cursors
import re
from werkzeug.utils import append_slash_redirect
from cryptography.fernet import Fernet
from crypto_key import key
from flask_restful import Resource, Api
# from flask_mail import Mail, Message

#Crypto key
f = Fernet(key())

#inisialisasi
app = Flask(__name__)
app.secret_key = '069420'
# mail= Mail(app)

#Fungsi kirim e-mail
# app.config['MAIL_SERVER']='smtp.gmail.com'
# app.config['MAIL_PORT'] = 465
# app.config['MAIL_USERNAME'] = 'ihzafrh@gmail.com'
# app.config['MAIL_PASSWORD'] = 'dolnvpurclfubzjo'
# app.config['MAIL_USE_TLS'] = False
# app.config['MAIL_USE_SSL'] = True
# mail = Mail(app)

#Koneksi, inisialisasi DB
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'nilaraya'
mysql = MySQL(app)

@app.route('/', methods=['POST', 'GET'])
def function():
    if not 'loggedin' in session:
        return redirect('/login')
    return redirect(url_for('dashboard'))

@app.route('/login', methods=['GET','POST'])
def login():
    if not 'loggedin' in session:
        msg = ''
        if request.method == 'POST' and 'username' in request.form and 'password' in request.form:
            # Username and password encrytion
            with bytes(request.form['username'], encoding='utf-8') as username:
                username = f.encrypt(username)
            with bytes(request.form['password'], encoding='utf-8') as password:
                password = f.encrypt(password)
                
            # Username and password validation
            with mysql.connection.cursor(MySQLdb.cursors.DictCursor) as cursor:
                cursor.execute('SELECT username, password FROM accounts WHERE username = %s AND password = %s', (username, password,))
            account = cursor.fetchone()
            
            # If account is valid
            if account:
                # Create session data
                session['loggedin'] = True
                session['username'] = account['username']
                session['acc_type'] = account['acc_type']
                
            # Redirect to dashboard if account is valid
            return redirect(url_for('dashboard'))
        # return render_template('HalamanLogin.html', msg=msg)
    return redirect(url_for('dashboard'))
    

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('login'))

@app.route('/dashboard', methods=['GET', 'POST'])
def dashboard():
    return "<h1>In Developement<h1>"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)