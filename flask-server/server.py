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
                username = username.decode('utf-8')
            with bytes(request.form['password'], encoding='utf-8') as password:
                password = f.encrypt(password)
                password = password.decode("utf-8") 
                
            # Username and password validation
            with mysql.connection.cursor(MySQLdb.cursors.DictCursor) as cursor:
                cursor.execute('SELECT username, password FROM admin WHERE username = %s AND password = %s', (username, password,))
                admin = cursor.fetchone()
                cursor.execute('SELECT username, password FROM dokter WHERE username = %s AND password = %s', (username, password,))
                dokter = cursor.fetchone()
                cursor.execute('SELECT username, password FROM kasir WHERE username = %s AND password = %s', (username, password,))
                kasir = cursor.fetchone()
            
            # If admin account is valid
            if admin:
                # Create session data
                session['loggedin'] = True
                session['username'] = admin['nama']
                session['acc_type'] = 'admin'
            
            # If dokter account is valid
            if dokter:
                # Create session data
                session['loggedin'] = True
                session['username'] = dokter['nama']
                session['acc_type'] = 'dokter'
                
            # If kasir account is valid
            if kasir:
                # Create session data
                session['loggedin'] = True
                session['username'] = kasir['nama']
                session['acc_type'] = 'kasir'      
                
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