-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 25, 2022 at 05:54 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nilaraya`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `username` varchar(100) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`username`, `nama`, `password`) VALUES
('gAAAAABiZsPZLyJi8aTaIONjE7sSBQ3_wtpnp_39kGk2uvb7k__X2C-34KOIAj5mRRt2BkTIEMNaKEEkUYFmOS6OcxHEeTgTNw==', 'admin', 'gAAAAABiZsPZLyJi8aTaIONjE7sSBQ3_wtpnp_39kGk2uvb7k__X2C-34KOIAj5mRRt2BkTIEMNaKEEkUYFmOS6OcxHEeTgTNw==');

-- --------------------------------------------------------

--
-- Table structure for table `dokter`
--

CREATE TABLE `dokter` (
  `username` varchar(100) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `kasir`
--

CREATE TABLE `kasir` (
  `username` varchar(100) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `obat`
--

CREATE TABLE `obat` (
  `id_obat` varchar(4) NOT NULL,
  `nama_obat` varchar(50) NOT NULL,
  `kuantitas` int(4) NOT NULL,
  `exp_date` date NOT NULL,
  `jenis_obat` varchar(10) NOT NULL,
  `harga_satuan` int(9) NOT NULL,
  `harga_strip` int(9) DEFAULT NULL,
  `harga_beli` int(9) NOT NULL,
  `username_admin` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `pasien`
--

CREATE TABLE `pasien` (
  `no_rekam_medik` varchar(10) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `tgl_lahir` date DEFAULT NULL,
  `jenis_kelamin` varchar(10) NOT NULL,
  `riwayat_penyakit` text DEFAULT NULL,
  `no_bpjs` varchar(20) DEFAULT NULL,
  `no_hp` varchar(15) DEFAULT NULL,
  `no_antrian` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pasien`
--

INSERT INTO `pasien` (`no_rekam_medik`, `nama`, `tgl_lahir`, `jenis_kelamin`, `riwayat_penyakit`, `no_bpjs`, `no_hp`, `no_antrian`) VALUES
('', 'Mujib Hulyufi', '1999-01-01', 'Laki-Laki', NULL, NULL, '085707781974', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `rekam_medik`
--

CREATE TABLE `rekam_medik` (
  `no_rm_pasien` varchar(10) NOT NULL,
  `kode_tindakan` varchar(3) DEFAULT NULL,
  `diagnosis` text NOT NULL,
  `keterangan` text NOT NULL,
  `tanggal` date NOT NULL,
  `tipe` varchar(10) NOT NULL,
  `username_dokter` varchar(10) NOT NULL,
  `id_obat` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tagihan`
--

CREATE TABLE `tagihan` (
  `id_tagihan` varchar(10) NOT NULL,
  `harga_obat` int(9) DEFAULT NULL,
  `no_rm_pasien` varchar(10) NOT NULL,
  `tanggal` date NOT NULL,
  `biaya_admin` int(6) DEFAULT NULL,
  `biaya_tindakan` int(9) DEFAULT NULL,
  `media_pembayaran` varchar(20) NOT NULL,
  `username_kasir` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tindakan`
--

CREATE TABLE `tindakan` (
  `kode_tindakan` varchar(3) NOT NULL,
  `nama_tindakan` varchar(50) NOT NULL,
  `klasifikasi_umur` varchar(10) NOT NULL,
  `tarif` int(9) NOT NULL,
  `username_admin` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `dokter`
--
ALTER TABLE `dokter`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `kasir`
--
ALTER TABLE `kasir`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `obat`
--
ALTER TABLE `obat`
  ADD PRIMARY KEY (`id_obat`),
  ADD KEY `username_admin` (`username_admin`);

--
-- Indexes for table `pasien`
--
ALTER TABLE `pasien`
  ADD PRIMARY KEY (`no_rekam_medik`);

--
-- Indexes for table `rekam_medik`
--
ALTER TABLE `rekam_medik`
  ADD KEY `no_rm_pasien` (`no_rm_pasien`),
  ADD KEY `kode_tindakan` (`kode_tindakan`),
  ADD KEY `id_obat` (`id_obat`),
  ADD KEY `username_dokter` (`username_dokter`);

--
-- Indexes for table `tagihan`
--
ALTER TABLE `tagihan`
  ADD PRIMARY KEY (`id_tagihan`),
  ADD KEY `no_rm_pasien` (`no_rm_pasien`),
  ADD KEY `username_kasir` (`username_kasir`);

--
-- Indexes for table `tindakan`
--
ALTER TABLE `tindakan`
  ADD PRIMARY KEY (`kode_tindakan`),
  ADD KEY `username_admin` (`username_admin`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `obat`
--
ALTER TABLE `obat`
  ADD CONSTRAINT `obat_ibfk_1` FOREIGN KEY (`username_admin`) REFERENCES `admin` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `rekam_medik`
--
ALTER TABLE `rekam_medik`
  ADD CONSTRAINT `rekam_medik_ibfk_1` FOREIGN KEY (`no_rm_pasien`) REFERENCES `pasien` (`no_rekam_medik`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rekam_medik_ibfk_2` FOREIGN KEY (`kode_tindakan`) REFERENCES `tindakan` (`kode_tindakan`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rekam_medik_ibfk_3` FOREIGN KEY (`id_obat`) REFERENCES `obat` (`id_obat`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rekam_medik_ibfk_4` FOREIGN KEY (`username_dokter`) REFERENCES `dokter` (`username`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tagihan`
--
ALTER TABLE `tagihan`
  ADD CONSTRAINT `tagihan_ibfk_1` FOREIGN KEY (`no_rm_pasien`) REFERENCES `pasien` (`no_rekam_medik`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tagihan_ibfk_2` FOREIGN KEY (`username_kasir`) REFERENCES `kasir` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tindakan`
--
ALTER TABLE `tindakan`
  ADD CONSTRAINT `tindakan_ibfk_1` FOREIGN KEY (`username_admin`) REFERENCES `admin` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
