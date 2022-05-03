from hashlib import new
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
template_dir = '../client-side/templates'
static_dir = '../client-side/static'
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
            username = request.form['username']
            # username = request.form['username'].encode('utf-8')
            # username = f.encrypt(username)
            # print(username)
            # username = username.decode('utf-8')
            
            password = request.form['password']
            # password = request.form['password'].encode('utf-8')
            # password = f.encrypt(password)
            # password = password.decode("utf-8") 
                
            # Username and password validation
            with mysql.connection.cursor(MySQLdb.cursors.DictCursor) as cursor:
                cursor.execute('SELECT * FROM admin WHERE username = %s AND password = %s', (username, password,))
                admin = cursor.fetchone()
                if not admin:
                    cursor.execute('SELECT * FROM dokter WHERE username = %s AND password = %s', (username, password,))
                    dokter = cursor.fetchone()
                if not admin and not dokter:
                    cursor.execute('SELECT * FROM kasir WHERE username = %s AND password = %s', (username, password,))
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
                
        return render_template('Login.html', msg=msg)
    return redirect(url_for('dashboard'))
    
@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('login'))

@app.route('/dashboard', methods=['GET', 'POST'])
def dashboard():
    if 'loggedin' in session:
        if request.method == 'GET':
            if session['acc_type'] == 'admin':
                return render_template('BerandaAdmin.html')
    return redirect('/login')

@app.route('/pasien', methods=['GET', 'POST'])
def pasien():
    if 'loggedin' in session:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM pasien ORDER BY no_rekam_medik ASC')
        pasien = cursor.fetchall()
        if request.method == 'GET':
            if session['acc_type'] == 'admin':
                return render_template('DataPasienAdmin.html',pasien=pasien)
    return redirect('/login')

@app.route('/pasien_tambah', methods=['GET', 'POST'])
def pasien_tambah():
    if 'loggedin' in session:
        if request.method == 'GET':
            return render_template('TambahPasienAdmin.html')
        elif request.method == 'POST':
            if session['acc_type'] == 'admin':
                nama_pasien =  request.form['nama_pasien']
                no_rekam_medis = request.form['no_rekam_medis']
                no_bpjs = request.form['no_bpjs']
                kelamin = request.form['jenis_kelamin']
                ttl = request.form['ttl']
                alamat = request.form['alamat']
                no_hp = request.form['no_hp']
                riwayat_penyakit = request.form['riwayat_penyakit']
                cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                cursor.execute('INSERT INTO pasien (nama, no_rekam_medik, no_bpjs, jenis_kelamin, ttl, alamat, no_hp, riwayat_penyakit) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)', (nama_pasien, no_rekam_medis, no_bpjs, kelamin, ttl, alamat, no_hp, riwayat_penyakit))
                mysql.connection.commit()
                return redirect(url_for('pasien'))
    return redirect('/login')

@app.route('/pasien_edit/<no_rekam_medik>', methods=['GET', 'POST'])
def pasien_edit(no_rekam_medik):
    if 'loggedin' in session:
        if request.method == 'GET':
            if session['acc_type'] == 'admin':
                cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                
                cursor.execute('SELECT * FROM pasien WHERE no_rekam_medik = %s', (no_rekam_medik,))
                pasien = cursor.fetchone()
                
                return render_template('UbahPasienAdmin.html', pasien=pasien)
        elif request.method == 'POST':
            if session['acc_type'] == 'admin':
                cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                
                if 'nama_pasien' in request.form:
                    new_nama_pasien =  request.form['nama_pasien']
                    cursor.execute('UPDATE pasien SET nama = %s WHERE no_rekam_medik = %s', (new_nama_pasien, no_rekam_medik))
                    mysql.connection.commit()
                
                if 'no_rekam_medis' in request.form:
                    new_no_rekam_medik = request.form['no_rekam_medis']
                    cursor.execute('UPDATE IGNORE pasien SET no_rekam_medik = %s WHERE no_rekam_medik = %s', (new_no_rekam_medik, no_rekam_medik))
                    mysql.connection.commit()
                
                if 'no_bpjs' in request.form:
                    new_no_bpjs = request.form['no_bpjs']
                    cursor.execute('UPDATE IGNORE pasien SET no_bpjs = %s WHERE no_rekam_medik = %s', (new_no_bpjs, no_rekam_medik))
                    mysql.connection.commit()
                
                if 'jenis_kelamin' in request.form:
                    new_kelamin = request.form['jenis_kelamin']
                    cursor.execute('UPDATE IGNORE pasien SET jenis_kelamin = %s WHERE no_rekam_medik = %s', (new_kelamin, no_rekam_medik))
                    mysql.connection.commit()
                
                if 'ttl' in request.form:
                    new_ttl = request.form['ttl']
                    cursor.execute('UPDATE IGNORE pasien SET ttl = %s WHERE no_rekam_medik = %s', (new_ttl, no_rekam_medik))
                    mysql.connection.commit()
                
                if 'alamat' in request.form:
                    new_alamat = request.form['alamat']
                    cursor.execute('UPDATE IGNORE pasien SET alamat = %s WHERE no_rekam_medik = %s', (new_alamat, no_rekam_medik))
                    mysql.connection.commit()
                
                if 'no_hp' in request.form:
                    new_no_hp = request.form['no_hp']
                    cursor.execute('UPDATE IGNORE pasien SET no_hp = %s WHERE no_rekam_medik = %s', (new_no_hp, no_rekam_medik))
                    mysql.connection.commit()
                
                if 'riwayat_penyakit' in request.form:
                    new_riwayat_penyakit = request.form['riwayat_penyakit']
                    cursor.execute('UPDATE IGNORE pasien SET riwayat_penyakit = %s WHERE no_rekam_medik = %s', (new_riwayat_penyakit, no_rekam_medik))
                    mysql.connection.commit()
                
                return redirect(url_for('pasien'))

    return redirect('/login')

@app.route('/pasien_hapus/<no_rekam_medik>', methods=['GET', 'POST'])
def pasien_hapus(no_rekam_medik):
    if 'loggedin' in session:
        if request.method == 'GET':
            if session['acc_type'] == 'admin':
                cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                cursor.execute('DELETE FROM pasien WHERE no_rekam_medik = %s', (no_rekam_medik,))
                mysql.connection.commit()
                return redirect(url_for('pasien'))
    return redirect('/login')

@app.route('/pasien_rekam_medis/<no_rekam_medik>', methods=['GET', 'POST'])
def pasien_rekam_medis(no_rekam_medik):
    if 'loggedin' in session:
        if request.method == 'GET':
            if session['acc_type'] == 'admin':
                cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                cursor.execute('SELECT * FROM pasien WHERE no_rekam_medik = %s', (no_rekam_medik,))
                pasien = cursor.fetchone()
                cursor.execute('SELECT * FROM rekam_medik WHERE no_rm_pasien = %s', (no_rekam_medik,))
                rekam_medik = cursor.fetchall()
                i=1
                return render_template('HistoryRekamMedisAdmin.html', pasien=pasien, rekam_medik=rekam_medik)
    return redirect('/login')

@app.route('/rekam_medik_tambah_umum/<no_rekam_medik>', methods=['GET', 'POST'])
def rekam_medik_tambah_umum(no_rekam_medik):
    if 'loggedin' in session:
        if request.method == 'GET':
            if session['acc_type'] == 'admin':
                cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                cursor.execute('SELECT * FROM pasien WHERE no_rekam_medik = %s', (no_rekam_medik,))
                pasien = cursor.fetchone()
                return render_template('FormUmumAdmin.html', pasien=pasien)
        elif request.method == 'POST':
            if session['acc_type'] == 'admin':
                cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                cursor.execute('INSERT INTO rekam_medik (no_rm_pasien, tanggal, keluhan, diagnosa, terapi, tindakan) VALUES (%s, %s, %s, %s, %s, %s)', (no_rekam_medik, request.form['tanggal'], request.form['keluhan'], request.form['diagnosa'], request.form['terapi'], request.form['tindakan']))
                mysql.connection.commit()
                return redirect(url_for('pasien_rekam_medis', no_rekam_medik=no_rekam_medik))
    return redirect('/login')
    
@app.route('/rekam_medik_tambah_gigi/<no_rekam_medik>', methods=['GET', 'POST'])
def rekam_medik_tambah_gigi(no_rekam_medik):
    if 'loggedin' in session:
        if request.method == 'GET':
            if session['acc_type'] == 'admin':
                cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                cursor.execute('SELECT * FROM pasien WHERE no_rekam_medik = %s', (no_rekam_medik,))
                pasien = cursor.fetchone()
                return render_template('FormGigiAdmin.html', pasien=pasien)
        elif request.method == 'POST':
            if session['acc_type'] == 'admin':
                cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                cursor.execute('INSERT INTO rekam_medik (no_rm_pasien, tanggal, keluhan, diagnosa, terapi, tindakan) VALUES (%s, %s, %s, %s, %s, %s)', (no_rekam_medik, request.form['tanggal'], request.form['keluhan'], request.form['diagnosa'], request.form['terapi'], request.form['tindakan']))
                mysql.connection.commit()
                return redirect(url_for('pasien_rekam_medis', no_rekam_medik=no_rekam_medik))

@app.route('/tindakan_medis', methods=['GET', 'POST'])
def tindakan_medis():
    if 'loggedin' in session:
        if request.method == 'GET':
            if session['acc_type'] == 'admin':
                return render_template('DataTindakanAdmin.html')
            
@app.route('/obat', methods=['GET', 'POST'])
def obat():
    if 'loggedin' in session:
        if request.method == 'GET':
            if session['acc_type'] == 'admin':
                cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                cursor.execute('SELECT * FROM obat ORDER BY nama_obat ASC')
                obat = cursor.fetchall()
                return render_template('DataObatAdmin.html', obat=obat)

@app.route('/obat_tambah', methods=['GET', 'POST'])
def obat_tambah():
    if 'loggedin' in session:
        if request.method == 'GET':
            if session['acc_type'] == 'admin':
                return render_template('TambahObatAdmin.html')
        elif request.method == 'POST':
            if session['acc_type'] == 'admin':
                cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                new_id_obat = request.form['id_obat']
                new_nama_obat = request.form['nama_obat']
                new_kuantitas = request.form['kuantitas']
                new_harga_jual_strip = request.form['harga_jual_strip']
                new_harga_jual_satuan = request.form['harga_jual_satuan']
                new_harga_beli = request.form['harga_beli']
                new_exp_date = request.form['exp_date']
                new_jenis_obat = request.form['jenis_obat']
                cursor.execute('INSERT IGNORE INTO obat (id_obat, nama_obat, kuantitas, harga_strip, harga_satuan, harga_beli, exp_date, jenis_obat) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)', (new_id_obat, new_nama_obat, new_kuantitas, new_harga_jual_strip, new_harga_jual_satuan, new_harga_beli, new_exp_date, new_jenis_obat))
                mysql.connection.commit()
                return redirect(url_for('obat'))
            
@app.route('/obat_edit/<id_obat>', methods=['GET', 'POST'])
def obat_edit(id_obat):
    if 'loggedin' in session:
        if request.method == 'GET':
            if session['acc_type'] == 'admin':
                cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                cursor.execute('SELECT * FROM obat WHERE id_obat = %s', (id_obat,))
                obat = cursor.fetchone()
                return render_template('UbahObatAdmin.html', obat=obat)
        elif request.method == 'POST':
            if session['acc_type'] == 'admin':
                cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                
                if request.form['id_obat'] == '':
                    new_id_obat = request.form['id_obat']
                    cursor.execute('UPDATE IGNORE obat SET id_obat = %s WHERE id_obat = %s', (new_id_obat, id_obat))
                    mysql.connection.commit()
                    
                if request.form['nama_obat'] == '':
                    new_nama_obat = request.form['nama_obat']
                    cursor.execute('UPDATE IGNORE obat SET nama_obat = %s WHERE id_obat = %s', (new_nama_obat, id_obat))
                    mysql.connection.commit()
                    
                if request.form['kuantitas'] == '':
                    new_kuantitas = request.form['kuantitas']
                    cursor.execute('UPDATE IGNORE obat SET kuantitas = %s WHERE id_obat = %s', (new_kuantitas, id_obat))
                    mysql.connection.commit()
                    
                if request.form['harga_strip'] == '':
                    new_harga_strip = request.form['harga_strip']
                    cursor.execute('UPDATE IGNORE obat SET harga_strip = %s WHERE id_obat = %s', (new_harga_strip, id_obat))
                    mysql.connection.commit()
                    
                if request.form['harga_satuan'] == '':
                    new_harga_satuan = request.form['harga_satuan']
                    cursor.execute('UPDATE IGNORE obat SET harga_satuan = %s WHERE id_obat = %s', (new_harga_satuan, id_obat))
                    mysql.connection.commit()
                    
                if request.form['harga_beli'] == '':
                    new_harga_beli = request.form['harga_beli']
                    cursor.execute('UPDATE IGNORE obat SET harga_beli = %s WHERE id_obat = %s', (new_harga_beli, id_obat))
                    mysql.connection.commit()
                    
                if request.form['exp_date'] == '':
                    new_exp_date = request.form['exp_date']
                    cursor.execute('UPDATE IGNORE obat SET exp_date = %s WHERE id_obat = %s', (new_exp_date, id_obat))
                    mysql.connection.commit()
                    
                if request.form['jenis_obat'] == '':
                    new_jenis_obat = request.form['jenis_obat']
                    cursor.execute('UPDATE IGNORE obat SET jenis_obat = %s WHERE id_obat = %s', (new_jenis_obat, id_obat))
                    mysql.connection.commit()
                    
                return redirect(url_for('obat'))
            
@app.route('/obat_hapus/<id_obat>', methods=['GET', 'POST'])
def obat_hapus(id_obat):
    if 'loggedin' in session:
        if request.method == 'GET':
            if session['acc_type'] == 'admin':
                cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                cursor.execute('DELETE FROM obat WHERE id_obat = %s', (id_obat,))
                mysql.connection.commit()
                return redirect(url_for('obat'))
            
@app.route('/akun', methods=['GET', 'POST'])
def akun():
    if 'loggedin' in session:
        if request.method == 'GET':
            if session['acc_type'] == 'admin':
                return render_template('DataAkunAdmin.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)