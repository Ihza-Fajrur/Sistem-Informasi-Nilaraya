from flask import Flask,render_template,url_for, request,jsonify,session,flash,redirect
from flask_mysqldb import MySQL
import MySQLdb.cursors
import re
from werkzeug.utils import append_slash_redirect
from cryptography.fernet import Fernet
from crypto_key import key
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

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.json['username']
        password = request.json['password']
        cur = mysql.connection.cursor()
        result = cur.execute("SELECT * FROM user WHERE username = %s AND password = %s", [username, password])
        if result > 0:
            session['logged_in'] = True
            session['username'] = username
            flash('Anda berhasil login', 'success')
            return redirect(url_for('dashboard'))
        else:
            flash('Username atau password salah', 'danger')
            return redirect(url_for('login'))
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.clear()
    flash('Anda berhasil logout', 'success')
    return redirect(url_for('login'))

@app.route('/dashboard', methods=['GET', 'POST'])
def dashboard():
    pass

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)