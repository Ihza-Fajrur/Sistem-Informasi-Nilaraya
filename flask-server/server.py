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
template_dir = '../client-side'
static_dir = '../client-side'
app = Flask(__name__, template_folder=template_dir, static_folder=static_dir)
app.secret_key = '069420'

#Koneksi, inisialisasi DB
app.config['MYSQL_HOST'] = '192.168.1.29'
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
            username = request.form['username'].encode('utf-8')
            username = f.encrypt(username)
            print(username)
            username = username.decode('utf-8')
            
            password = request.form['password'].encode('utf-8')
            password = f.encrypt(password)
            password = password.decode("utf-8") 
                
            # Username and password validation
            with mysql.connection.cursor(MySQLdb.cursors.DictCursor) as cursor:
                cursor.execute('SELECT username, password FROM admin WHERE username = %s AND password = %s', (username, password,))
                admin = cursor.fetchone()
                if not admin:
                    cursor.execute('SELECT username, password FROM dokter WHERE username = %s AND password = %s', (username, password,))
                    dokter = cursor.fetchone()
                if not admin and not dokter:
                    cursor.execute('SELECT username, password FROM kasir WHERE username = %s AND password = %s', (username, password,))
                    kasir = cursor.fetchone()
            
            # If admin account is valid
            if admin:
                # Create session data
                session['loggedin'] = True
                session['name'] = admin['nama']
                session['acc_type'] = 'admin'
                # Redirect to dashboard if account is valid
                return redirect(url_for('dashboard'))
            
            # If dokter account is valid
            elif dokter:
                # Create session data
                session['loggedin'] = True
                session['name'] = dokter['nama']
                session['acc_type'] = 'dokter'
                # Redirect to dashboard if account is valid
                return redirect(url_for('dashboard'))
                
            # If kasir account is valid
            elif kasir:
                # Create session data
                session['loggedin'] = True
                session['name'] = kasir['nama']
                session['acc_type'] = 'kasir'      
                # Redirect to dashboard if account is valid
                return redirect(url_for('dashboard'))
                
            elif not admin and not dokter and not kasir:
                msg = 'Invalid username or password!'
                
        return render_template('./templates/Login.html', msg=msg)
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