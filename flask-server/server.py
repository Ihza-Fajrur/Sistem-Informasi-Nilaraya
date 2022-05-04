from calendar import c
from hashlib import new
from flask import Flask,render_template,url_for, request,jsonify,session,flash,redirect
from flask_mysqldb import MySQL
import MySQLdb.cursors
import re
from werkzeug.utils import append_slash_redirect
from cryptography.fernet import Fernet
from crypto_key import key
from datetime import datetime
# from flask_mail import Mail, Message

#Crypto key
f = Fernet(key())

#inisialisasi
template_dir = '../client-side/templates'
static_dir = '../client-side/static'
app = Flask(__name__, template_folder=template_dir, static_folder=static_dir)
app.secret_key = '069420'

#Koneksi, inisialisasi DB
# app.config['MYSQL_HOST'] = '192.168.1.29'
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
                cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                cursor.execute('SELECT jenis_dokter FROM dokter WHERE username = %s AND password = %s', (username, password,))
                jenis_dokter = cursor.fetchone()
                # Create session data
                session['loggedin'] = True
                session['name'] = dokter['nama']
                session['acc_type'] = jenis_dokter['jenis_dokter']
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
            elif session['acc_type'] == 'kasir':
                return render_template('BerandaKasir.html')
            elif session['acc_type'] == 'Dokter Umum' or session['acc_type'] == 'Dokter Gigi':
                return redirect(url_for('daftar_pasien'))
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
            elif session['acc_type'] == 'kasir':
                return render_template('DataPasienKasir.html',pasien=pasien)
    return redirect('/login')

@app.route('/pasien_tambah', methods=['GET', 'POST'])
def pasien_tambah():
    if 'loggedin' in session:
        if request.method == 'GET':
            if session['acc_type'] == 'admin':
                return render_template('TambahPasienAdmin.html')
            elif session['acc_type'] == 'kasir':
                return render_template('TambahPasienKasir.html')
        elif request.method == 'POST':
            if session['acc_type'] == 'admin' or session['acc_type'] == 'kasir':
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
                cursor.execute('SELECT * FROM rekam_medik WHERE no_rm_pasien = %s ORDER BY tanggal', (no_rekam_medik,))
                rekam_medik = cursor.fetchall()
                # cursor.execute('SELECT nama_tindakan FROM tindakan WHERE kode_tindakan = %s', (rekam_medik['kode_tindakan'],))
                # nama_tindakan = cursor.fetchone()
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
                cursor.execute('SELECT * FROM tindakan WHERE jenis_tindakan = %s', ('Umum',))
                tindakan = cursor.fetchall()
                return render_template('FormUmumAdmin.html', pasien=pasien, tindakan=tindakan)
        elif request.method == 'POST':
            if session['acc_type'] == 'admin':
                cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                new_diagnosis = request.form['diagnosis']
                new_tindakan = request.form['tindakan']
                new_keterangan = request.form['keterangan']
                cursor.execute('SELECT nama_tindakan FROM tindakan WHERE kode_tindakan = %s', (new_tindakan,))
                nama_tindakan = cursor.fetchone()
                cursor.execute('INSERT INTO rekam_medik (no_rm_pasien, kode_tindakan, nama_tindakan, keterangan, diagnosis, tanggal, tipe, username_dokter) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)', (no_rekam_medik, new_tindakan, nama_tindakan['nama_tindakan'], new_keterangan, new_diagnosis, datetime.now(), "Umum", session['name']))
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
                cursor.execute('SELECT * FROM tindakan WHERE jenis_tindakan = %s', ('Gigi',))
                tindakan = cursor.fetchall()
                return render_template('FormGigiAdmin.html', pasien=pasien, tindakan=tindakan)
        elif request.method == 'POST':
            if session['acc_type'] == 'admin':
                cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                new_diagnosis = request.form['diagnosis']
                new_tindakan = request.form['tindakan']
                new_keterangan = request.form['keterangan']
                cursor.execute('SELECT nama_tindakan FROM tindakan WHERE kode_tindakan = %s', (new_tindakan,))
                nama_tindakan = cursor.fetchone()
                cursor.execute('INSERT INTO rekam_medik (no_rm_pasien, kode_tindakan, nama_tindakan, keterangan, diagnosis, tanggal, tipe, username_dokter) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)', (no_rekam_medik, new_tindakan, nama_tindakan['nama_tindakan'], new_keterangan, new_diagnosis, datetime.now(), "Gigi", session['name']))
                mysql.connection.commit()
                return redirect(url_for('pasien_rekam_medis', no_rekam_medik=no_rekam_medik))
    return redirect('/login')

@app.route('/tindakan_medis', methods=['GET', 'POST'])
def tindakan_medis():
    if 'loggedin' in session:
        if request.method == 'GET':
            if session['acc_type'] == 'admin':
                cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                cursor.execute('SELECT * FROM tindakan')
                tindakan = cursor.fetchall()
                return render_template('DataTindakanAdmin.html', tindakan=tindakan)
    return redirect('/login')
            
@app.route('/tindakan_tambah', methods=['GET', 'POST'])
def tindakan_tambah():
    if 'loggedin' in session:
        if request.method == 'GET':
            if session['acc_type'] == 'admin':
                return render_template('TambahTindakanAdmin.html')
        elif request.method == 'POST':
            if session['acc_type'] == 'admin':
                cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                new_kode_tindakan = request.form['kode_tindakan']
                new_nama_tindakan = request.form['nama_tindakan']
                new_klasifikasi_umur = request.form['klasifikasi_umur']
                new_jenis_tindakan = request.form['jenis_tindakan']
                new_tarif = request.form['tarif']
                cursor.execute('INSERT INTO tindakan (kode_tindakan, nama_tindakan, klasifikasi_umur, jenis_tindakan, tarif) VALUES (%s, %s, %s, %s, %s)', (new_kode_tindakan, new_nama_tindakan, new_klasifikasi_umur, new_jenis_tindakan, new_tarif))
                mysql.connection.commit()
                return redirect(url_for('tindakan_medis'))
    return redirect('/login')

@app.route('/tindakan_edit/<kode_tindakan>', methods=['GET', 'POST'])
def tindakan_edit(kode_tindakan):
    if 'loggedin' in session:
        if request.method == 'GET':
            if session['acc_type'] == 'admin':
                cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                cursor.execute('SELECT * FROM tindakan WHERE kode_tindakan = %s', (kode_tindakan,))
                tindakan = cursor.fetchone()
                return render_template('UbahTindakanAdmin.html', tindakan=tindakan)
        elif request.method == 'POST':
            if session['acc_type'] == 'admin':
                cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                
                if not request.form['kode_tindakan'] == '':
                    new_kode_tindakan = request.form['kode_tindakan']
                    cursor.execute('UPDATE IGNORE tindakan SET kode_tindakan = %s WHERE kode_tindakan = %s', (new_kode_tindakan, kode_tindakan))
                    mysql.connection.commit()
                
                if not request.form['nama_tindakan'] == '':
                    new_nama_tindakan = request.form['nama_tindakan']
                    cursor.execute('UPDATE IGNORE tindakan SET nama_tindakan = %s WHERE kode_tindakan = %s', (new_nama_tindakan, kode_tindakan))
                    mysql.connection.commit()
                
                if not request.form['klasifikasi_umur'] == '':
                    new_klasifikasi_umur = request.form['klasifikasi_umur']
                    cursor.execute('UPDATE IGNORE tindakan SET klasifikasi_umur = %s WHERE kode_tindakan = %s', (new_klasifikasi_umur, kode_tindakan))
                    mysql.connection.commit()
                    
                if not request.form['jenis_tindakan'] == '':
                    new_jenis_tindakan = request.form['jenis_tindakan']
                    cursor.execute('UPDATE IGNORE tindakan SET jenis_tindakan = %s WHERE kode_tindakan = %s', (new_jenis_tindakan, kode_tindakan))
                    mysql.connection.commit()
                    
                if not request.form['tarif'] == '':
                    new_tarif = request.form['tarif']
                    cursor.execute('UPDATE IGNORE tindakan SET tarif = %s WHERE kode_tindakan = %s', (new_tarif, kode_tindakan))
                    mysql.connection.commit()
                
                return redirect(url_for('tindakan_medis'))
            
    return redirect('/login')

@app.route('/tindakan_hapus/<kode_tindakan>', methods=['GET', 'POST'])
def tindakan_hapus(kode_tindakan):
    if 'loggedin' in session:
        if request.method == 'GET':
            if session['acc_type'] == 'admin':
                cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                cursor.execute('DELETE FROM tindakan WHERE kode_tindakan = %s', (kode_tindakan,))
                mysql.connection.commit()
                return redirect(url_for('tindakan_medis'))
    return redirect('/login')
       
@app.route('/obat', methods=['GET', 'POST'])
def obat():
    if 'loggedin' in session:
        if request.method == 'GET':
            if session['acc_type'] == 'admin':
                cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                cursor.execute('SELECT * FROM obat ORDER BY nama_obat ASC')
                obat = cursor.fetchall()
                return render_template('DataObatAdmin.html', obat=obat)
    return redirect('/login')

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
    return redirect('/login')
            
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
                cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                cursor.execute('SELECT * FROM admin')
                admin = cursor.fetchall()
                cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                cursor.execute('SELECT * FROM kasir')
                kasir = cursor.fetchall()
                cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                cursor.execute('SELECT * FROM dokter')
                dokter = cursor.fetchall()
                return render_template('DataAkunAdmin.html', admin=admin, kasir=kasir, dokter=dokter)

@app.route('/akun_tambah', methods=['GET', 'POST'])
def akun_tambah():
    if 'loggedin' in session:
        if request.method == 'GET':
            if session['acc_type'] == 'admin':
                return render_template('TambahAkunAdmin.html')
        elif request.method == 'POST':
            if session['acc_type'] == 'admin':
                cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                new_username = request.form['username']
                new_password = request.form['password']
                new_nama = request.form['nama']
                new_acc_type = request.form['tipe_akun']
                if new_acc_type == 'Kasir':
                    cursor.execute('INSERT INTO kasir (username, password, nama) VALUES (%s, %s, %s)', (new_username, new_password, new_nama))
                    mysql.connection.commit()
                elif new_acc_type == 'Admin':
                    cursor.execute('INSERT INTO admin (username, password, nama) VALUES (%s, %s, %s)', (new_username, new_password, new_nama))
                    mysql.connection.commit()
                elif new_acc_type == 'Dokter':
                    new_tipe_dokter = request.form['tipe_dokter']
                    cursor.execute('INSERT INTO dokter (username, password, nama, jenis_dokter) VALUES (%s, %s, %s, %s)', (new_username, new_password, new_nama, new_tipe_dokter))
                    mysql.connection.commit()
                return redirect(url_for('akun'))
    return redirect(url_for('login'))

@app.route('/akun_hapus/<username>', methods=['GET', 'POST'])
def akun_hapus(username):
    if 'loggedin' in session:
        if request.method == 'GET':
            if session['acc_type'] == 'admin':
                cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                cursor.execute('DELETE FROM admin WHERE username = %s', (username,))
                mysql.connection.commit()
                cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                cursor.execute('DELETE FROM kasir WHERE username = %s', (username,))
                mysql.connection.commit()
                cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                cursor.execute('DELETE FROM dokter WHERE username = %s', (username,))
                mysql.connection.commit()
                return redirect(url_for('akun'))
    return redirect(url_for('login'))

@app.route('/akun_edit/<username>', methods=['GET', 'POST'])
def akun_edit(username):
    if 'loggedin' in session:
        if request.method == 'GET':
            if session['acc_type'] == 'admin':
                cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                cursor.execute('SELECT * FROM admin WHERE username = %s', (username,))
                admin = cursor.fetchone()
                cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                cursor.execute('SELECT * FROM kasir WHERE username = %s', (username,))
                kasir = cursor.fetchone()
                cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                cursor.execute('SELECT * FROM dokter WHERE username = %s', (username,))
                dokter = cursor.fetchone()
                return render_template('UbahAkunAdmin.html', admin=admin, kasir=kasir, dokter=dokter)
        elif request.method == 'POST':
            if session['acc_type'] == 'admin':
                cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                
                if request.form['username'] != '':
                    new_username = request.form['username']
                    tipe_akun = request.form['tipe_akun']
                    if tipe_akun == 'Admin':
                        cursor.execute('UPDATE IGNORE admin SET username = %s WHERE username = %s', (new_username, username))
                        mysql.connection.commit()
                    elif request.form['tipe_akun'] == 'Kasir':
                        cursor.execute('UPDATE IGNORE kasir SET username = %s WHERE username = %s', (new_username, username))
                        mysql.connection.commit()
                    elif request.form['tipe_akun'] == 'Dokter':
                        cursor.execute('UPDATE IGNORE dokter SET username = %s WHERE username = %s', (new_username, username))
                        mysql.connection.commit()
                
                if request.form['password'] != '':
                    new_password = request.form['password']
                    if request.form['tipe_akun'] == 'Admin':
                        cursor.execute('UPDATE IGNORE admin SET password = %s WHERE username = %s', (new_password, username))
                        mysql.connection.commit()
                    elif request.form['tipe_akun'] == 'Kasir':
                        cursor.execute('UPDATE IGNORE kasir SET password = %s WHERE username = %s', (new_password, username))
                        mysql.connection.commit()
                    elif request.form['tipe_akun'] == 'Dokter':
                        cursor.execute('UPDATE IGNORE dokter SET password = %s WHERE username = %s', (new_password, username))
                        mysql.connection.commit()
                
                if request.form['nama'] != '':    
                    new_nama = request.form['nama']
                    if request.form['tipe_akun'] == 'Admin':
                        cursor.execute('UPDATE IGNORE admin SET nama = %s WHERE username = %s', (new_nama, username))
                        mysql.connection.commit()
                    elif request.form['tipe_akun'] == 'Kasir':
                        cursor.execute('UPDATE IGNORE kasir SET nama = %s WHERE username = %s', (new_nama, username))
                        mysql.connection.commit()
                    elif request.form['tipe_akun'] == 'Dokter':
                        cursor.execute('UPDATE IGNORE dokter SET nama = %s WHERE username = %s', (new_nama, username))
                        mysql.connection.commit()
                        
                if request.form['tipe_akun'] == 'Dokter':
                    new_tipe_dokter = request.form['tipe_dokter']
                    cursor.execute('UPDATE IGNORE dokter SET jenis_dokter = %s WHERE username = %s', (new_tipe_dokter, username))
                    mysql.connection.commit()       
            return redirect(url_for('akun'))
    return redirect(url_for('login')) 

@app.route('/waiting_list_gigi', methods=['GET', 'POST'])
def waiting_list_gigi():
    if 'loggedin' in session:
        if request.method == 'GET':
            if session['acc_type'] == 'kasir':
                cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                cursor.execute('SELECT * FROM waiting_list_gigi ORDER BY no_urut ASC')
                wlg = cursor.fetchall()
                return render_template('WaitingListGigi.html', wlg=wlg)
    return redirect(url_for('login'))

@app.route('/waiting_list_umum', methods=['GET', 'POST'])
def waiting_list_umum():
    if 'loggedin' in session:
        if request.method == 'GET':
            if session['acc_type'] == 'kasir':
                cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                cursor.execute('SELECT * FROM waiting_list_umum ORDER BY no_urut ASC')
                wlu = cursor.fetchall()
                return render_template('WaitingListUmum.html', wlu=wlu)
    return redirect(url_for('login'))

@app.route('/waiting_list_umum_tambah/<no_rekam_medik>', methods=['GET', 'POST'])
def waiting_list_umum_tambah(no_rekam_medik):
    if 'loggedin' in session:
        if request.method == 'GET':
            if session['acc_type'] == 'kasir':
                cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                cursor.execute('SELECT * FROM pasien WHERE no_rekam_medik = %s', (no_rekam_medik,))
                pasien = cursor.fetchone()
                cursor.execute('SELECT MAX(no_urut) FROM waiting_list_umum')
                no_urut = cursor.fetchone()
                if no_urut['MAX(no_urut)'] is None:
                    no_urut = 1
                else:
                    no_urut = no_urut['MAX(no_urut)'] + 1
                cursor.execute('INSERT IGNORE INTO waiting_list_umum (no_urut, no_rekam_medis, nama_pasien, status) VALUES (%s, %s, %s, %s)', (no_urut, pasien['no_rekam_medik'], pasien['nama'], 'Mengantri'))
                mysql.connection.commit()
                return redirect(url_for('waiting_list_umum'))
    return redirect(url_for('login'))

@app.route('/waiting_list_gigi_tambah/<no_rekam_medik>', methods=['GET', 'POST'])
def waiting_list_gigi_tambah(no_rekam_medik):
    if 'loggedin' in session:
        if request.method == 'GET':
            if session['acc_type'] == 'kasir':
                cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                cursor.execute('SELECT * FROM pasien WHERE no_rekam_medik = %s', (no_rekam_medik,))
                pasien = cursor.fetchone()
                cursor.execute('SELECT MAX(no_urut) FROM waiting_list_gigi')
                no_urut = cursor.fetchone()
                if no_urut['MAX(no_urut)'] is None:
                    no_urut = 1
                else:
                    no_urut = no_urut['MAX(no_urut)'] + 1
                cursor.execute('INSERT IGNORE INTO waiting_list_gigi (no_urut, no_rekam_medis, nama_pasien, status) VALUES (%s, %s, %s, %s)', (no_urut, pasien['no_rekam_medik'], pasien['nama'], 'Mengantri'))
                mysql.connection.commit()
                return redirect(url_for('waiting_list_gigi'))
    return redirect(url_for('login'))

@app.route('/waiting_list_umum_hapus/<no_urut>', methods=['GET', 'POST'])
def waiting_list_umum_hapus(no_urut):
    if 'loggedin' in session:
        if request.method == 'GET':
            if session['acc_type'] == 'kasir':
                cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                cursor.execute('DELETE FROM waiting_list_umum WHERE no_urut = %s', (no_urut,))
                mysql.connection.commit()
                return redirect(url_for('waiting_list_umum'))
    return redirect(url_for('login'))

@app.route('/waiting_list_gigi_hapus/<no_urut>', methods=['GET', 'POST'])
def waiting_list_gigi_hapus(no_urut):
    if 'loggedin' in session:
        if request.method == 'GET':
            if session['acc_type'] == 'kasir':
                cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                cursor.execute('DELETE FROM waiting_list_gigi WHERE no_urut = %s', (no_urut,))
                mysql.connection.commit()
                return redirect(url_for('waiting_list_gigi'))
    return redirect(url_for('login'))

@app.route('/tagihan_umum/<no_rekam_medis>', methods=['GET', 'POST'])
def tagihan_umum(no_rekam_medis):
    if 'loggedin' in session:
        if request.method == 'GET':
            if session['acc_type'] == 'kasir':
                today = datetime.now()
                cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                cursor.execute('SELECT * FROM tagihan WHERE no_rekam_medik = %s', (no_rekam_medis,))
                wlu = cursor.fetchone()
                return render_template('TagihanUmum.html', wlu=wlu, today=today.strftime('%Y-%m-%d %H:%M:%S'))
    return redirect(url_for('login'))

@app.route('/daftar_pasien', methods=['GET', 'POST'])
def daftar_pasien():
    if 'loggedin' in session:
        if request.method == 'GET':
            if session['acc_type']  == 'Dokter Umum':
                cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                cursor.execute('SELECT * FROM waiting_list_umum')
                pasien = cursor.fetchall()
                return render_template('DaftarPasienUmum.html', pasien=pasien)
            elif session['acc_type'] == 'Dokter Gigi':
                cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                cursor.execute('SELECT * FROM waiting_list_gigi')
                pasien = cursor.fetchall()
                return render_template('DaftarPasienGigi.html', pasien=pasien)
    return redirect(url_for('login'))

@app.route('/history_rekam_medis_dokter/<no_rm_pasien>', methods=['GET', 'POST'])
def history_rekam_medis_dokter(no_rm_pasien):
    if 'loggedin' in session:
        if request.method == 'GET':
            if session['acc_type']  == 'Dokter Umum' or session['acc_type'] == 'Dokter Gigi':
                cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                cursor.execute('SELECT * FROM rekam_medik WHERE no_rm_pasien = %s ORDER BY tanggal DESC', (no_rm_pasien,))
                rekam_medis = cursor.fetchall()
                cursor.execute('SELECT * FROM pasien WHERE no_rekam_medik = %s', (no_rm_pasien,))
                pasien = cursor.fetchone()
                return render_template('HistoryRekamMedisDokter.html', rekam_medis=rekam_medis, pasien=pasien)
    return redirect(url_for('login'))
    
@app.route('/tagihan_gigi/<no_rekam_medis>', methods=['GET', 'POST'])
def tagihan_gigi(no_rekam_medis):
    if 'loggedin' in session:
        if request.method == 'GET':
            if session['acc_type'] == 'kasir':
                cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                cursor.execute('SELECT * FROM tagihan WHERE no_rekam_medik = %s', (no_rekam_medis,))
                wlg = cursor.fetchone()
                today = datetime.now()
                return render_template('TagihanGigi.html', wlg=wlg, today=today.strftime('%Y-%m-%d %H:%M:%S'))
    return redirect(url_for('login'))

@app.route('/form_dokter/<no_rekam_medis>', methods=['GET', 'POST'])
def form_dokter(no_rekam_medis):
    if 'loggedin' in session:
        if request.method == 'GET':
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute('SELECT * FROM pasien WHERE no_rekam_medik = %s', (no_rekam_medis,))
            pasien = cursor.fetchone()
            
            if session['acc_type'] == 'Dokter Umum':
                cursor.execute('SELECT * FROM tindakan WHERE jenis_tindakan = %s', ('Umum',))
                tindakan = cursor.fetchall()
                return render_template('FormUmumDokter.html',pasien=pasien, tindakan=tindakan)
            elif session['acc_type'] == 'Dokter Gigi':
                cursor.execute('SELECT * FROM tindakan WHERE jenis_tindakan = %s', ('Gigi',))
                tindakan = cursor.fetchall()
                return render_template('FormGigiDokter.html',pasien=pasien, tindakan=tindakan)
        elif request.method == 'POST':
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            if session['acc_type'] == 'Dokter Umum':
                new_diagnosis = request.form['diagnosis']
                new_tindakan = request.form['tindakan']
                new_tanggal = datetime.now()
                new_keterangan = request.form['keterangan']
                new_tipe="Umum"
                new_name=session['name']
                cursor.execute('SELECT nama_tindakan FROM tindakan WHERE kode_tindakan = %s', (new_tindakan,))
                nama_tindakan = cursor.fetchone()
                cursor.execute('INSERT INTO rekam_medik (no_rm_pasien, diagnosis, nama_tindakan, tanggal, keterangan, tipe, username_dokter,kode_tindakan) VALUES (%s, %s, %s, %s, %s, %s, %s,%s)', (no_rekam_medis, new_diagnosis, nama_tindakan['nama_tindakan'], new_tanggal, new_keterangan, new_tipe, new_name,new_tindakan))
                mysql.connection.commit()
            elif session['acc_type'] == 'Dokter Gigi':
                new_diagnosis = request.form['diagnosis']
                new_tindakan = request.form['tindakan']
                new_tanggal = datetime.now()
                new_keterangan = request.form['keterangan']
                new_tipe="Gigi"
                new_name=session['name']
                cursor.execute('SELECT nama_tindakan FROM tindakan WHERE kode_tindakan = %s', (new_tindakan,))
                nama_tindakan = cursor.fetchone()
                cursor.execute('INSERT INTO rekam_medik (no_rm_pasien, diagnosis, nama_tindakan, tanggal, keterangan, tipe, username_dokter,kode_tindakan) VALUES (%s, %s, %s, %s, %s, %s, %s,%s)', (no_rekam_medis, new_diagnosis, nama_tindakan['nama_tindakan'], new_tanggal, new_keterangan, new_tipe, new_name,new_tindakan))
                mysql.connection.commit()
            return redirect(url_for('daftar_pasien' ))
    return redirect(url_for('login'))



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)