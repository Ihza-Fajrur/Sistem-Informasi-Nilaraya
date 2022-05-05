-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 05, 2022 at 06:01 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.28

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
('gAAAAABic-NbeXDyLknngW7JRTKV2ubc9jOoMrIt4e3y-Z8ibJfDDzr6LfWBaHxiM1j4VDsNjQUyA2Nc_VXl16J2E-7WXntVyw==', 'Ihza Fajrur Rachman Hasani', 'gAAAAABic-NbLEWGZdWMmYxePOrhKTtaUKzIRo3ZEH1VLNk0aaAV3h31fcRLB1nHPAW--99Zx81MMHGWM6CcQ8jx_YkqVS8Dfg=='),
('gAAAAABic_B276scQfOhDY6Gg1qZ1DB-ooDa9830RWuRlaFbC0NkY6JillQvGp5ZfV42p5QbPKjluhKUvUnHDoTE_IpmGBO-ZQ==', 'Admin', 'gAAAAABic_B2CpcJ0SZacZNd0idA8sXMRP51u6caBtdWfk5yw0gKDKr3bDQTKKv3VmSiBsyo3ye2ShI8ckKJuFK-vE_bVyRz9Q==');

-- --------------------------------------------------------

--
-- Table structure for table `dokter`
--

CREATE TABLE `dokter` (
  `username` varchar(100) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `jenis_dokter` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dokter`
--

INSERT INTO `dokter` (`username`, `nama`, `password`, `jenis_dokter`) VALUES
('gAAAAABic-vmlsPS1GEzka9wDLc7Fu_kGnaFcoYZS4yuGhw3rzwzMVhdHI3KBcC6OBmrb_JhoFk24TSzjxUAPiNJXuWU23Xu8A==', 'Nila Dewi Andayani', 'gAAAAABic-vnTQt0HfjlWvS5XtSEzOeeX12AOqnP5f-y5mpVlynyk4ZJ0wUcoGsC_hiG9iPSz9y5qH7BLBQ49niyLwqvvQiNFg==', 'Dokter Gigi');

-- --------------------------------------------------------

--
-- Table structure for table `kasir`
--

CREATE TABLE `kasir` (
  `username` varchar(100) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kasir`
--

INSERT INTO `kasir` (`username`, `nama`, `password`) VALUES
('gAAAAABic-KZreEVQ7Xo60yiTPsKDfjSbQ_bK9cDqnP4-P11GEfR9RAJj5GdDW2ldFmmHEcUn-uyz9OrGWmXIQ7Ah-gEGzMqeA==', 'Mita', 'gAAAAABic9j27Wun3I-uKIlrTo6HKIQqhLNfige6sZvR33kNZRWriZhVBsFiaod7na0hMoW_u6immJLzUh8SNFCQOFmJ2v48MA==');

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
  `harga_beli` int(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `pasien`
--

CREATE TABLE `pasien` (
  `no_rekam_medik` varchar(10) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `ttl` varchar(225) DEFAULT NULL,
  `jenis_kelamin` varchar(10) NOT NULL,
  `riwayat_penyakit` text DEFAULT NULL,
  `no_bpjs` varchar(20) DEFAULT NULL,
  `no_hp` varchar(15) DEFAULT NULL,
  `alamat` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pasien`
--

INSERT INTO `pasien` (`no_rekam_medik`, `nama`, `ttl`, `jenis_kelamin`, `riwayat_penyakit`, `no_bpjs`, `no_hp`, `alamat`) VALUES
('419', 'Mujib Hulyufi', '1999-01-01', 'Laki-laki', 'None', '', '085707781974', 'Kediri');

-- --------------------------------------------------------

--
-- Table structure for table `rekam_medik`
--

CREATE TABLE `rekam_medik` (
  `no_rm_pasien` varchar(10) NOT NULL,
  `kode_tindakan` varchar(3) DEFAULT NULL,
  `nama_tindakan` varchar(50) NOT NULL,
  `diagnosis` text NOT NULL,
  `keterangan` text NOT NULL,
  `tanggal` date NOT NULL,
  `tipe` varchar(10) NOT NULL,
  `username_dokter` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rekam_medik`
--

INSERT INTO `rekam_medik` (`no_rm_pasien`, `kode_tindakan`, `nama_tindakan`, `diagnosis`, `keterangan`, `tanggal`, `tipe`, `username_dokter`) VALUES
('419', '000', 'Dummy Data', 'dsadsa', 'dsa', '2022-05-04', 'Umum', 'admin'),
('419', '000', 'Dummy Data', 'dsadsa', 'gfdgfd', '2022-05-05', 'Umum', 'dokter'),
('419', '000', 'Dummy Data', 'dsa', 'dsads', '2022-05-05', 'Umum', 'dokter'),
('419', '000', 'Dummy Data', 'fdhgf', 'hgfgfhgf', '2022-05-05', 'Umum', 'dokter'),
('419', '000', 'Dummy Data', ';lkl;kl', ';lkfhj', '2022-05-05', 'Umum', 'dokter'),
('419', '000', 'Dummy Data', ';lkl;kl', ';lkfhj', '2022-05-05', 'Umum', 'dokter'),
('419', '000', 'Dummy Data', 'fgdhdf', 'bfvcbfvcb', '2022-05-05', 'Umum', 'dokter'),
('419', '000', 'Dummy Data', 'fdsfsfs', 'jhgghj', '2022-05-05', 'Umum', 'dokter'),
('419', '000', 'Dummy Data', 'dsadsa', 'dsadsadsa', '2022-05-05', 'Umum', 'dokter');

-- --------------------------------------------------------

--
-- Table structure for table `tagihan`
--

CREATE TABLE `tagihan` (
  `id_tagihan` int(11) NOT NULL,
  `no_rm_pasien` varchar(10) NOT NULL,
  `tanggal` date NOT NULL,
  `biaya_admin` int(6) DEFAULT NULL,
  `kode_tindakan` varchar(3) NOT NULL,
  `biaya_tindakan` int(9) DEFAULT NULL,
  `nama_dokter` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tagihan`
--

INSERT INTO `tagihan` (`id_tagihan`, `no_rm_pasien`, `tanggal`, `biaya_admin`, `kode_tindakan`, `biaya_tindakan`, `nama_dokter`) VALUES
(1, '419', '2022-05-05', 15000, '000', 100000, 'dokter'),
(2, '419', '2022-05-05', 15000, '000', 100000, 'dokter'),
(3, '419', '2022-05-05', 15000, '000', 100000, 'dokter'),
(4, '419', '2022-05-05', 15000, '000', 100000, 'dokter'),
(5, '419', '2022-05-05', 15000, '000', 100000, 'dokter'),
(6, '419', '2022-05-05', 15000, '000', 100000, 'dokter'),
(7, '419', '2022-05-05', 15000, '000', 100000, 'dokter');

-- --------------------------------------------------------

--
-- Table structure for table `tindakan`
--

CREATE TABLE `tindakan` (
  `kode_tindakan` varchar(3) NOT NULL,
  `nama_tindakan` varchar(50) NOT NULL,
  `klasifikasi_umur` varchar(10) NOT NULL,
  `jenis_tindakan` varchar(10) NOT NULL,
  `tarif` int(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tindakan`
--

INSERT INTO `tindakan` (`kode_tindakan`, `nama_tindakan`, `klasifikasi_umur`, `jenis_tindakan`, `tarif`) VALUES
('000', 'Dummy Data', 'Anak-anak', 'Umum', 100000);

-- --------------------------------------------------------

--
-- Table structure for table `waiting_list_gigi`
--

CREATE TABLE `waiting_list_gigi` (
  `no_urut` int(5) NOT NULL,
  `no_rekam_medis` varchar(10) NOT NULL,
  `nama_pasien` varchar(50) NOT NULL,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `waiting_list_gigi`
--

INSERT INTO `waiting_list_gigi` (`no_urut`, `no_rekam_medis`, `nama_pasien`, `status`) VALUES
(1, '419', 'Mujib Hulyufi', 'Mengantri');

-- --------------------------------------------------------

--
-- Table structure for table `waiting_list_umum`
--

CREATE TABLE `waiting_list_umum` (
  `no_urut` int(5) NOT NULL,
  `no_rekam_medis` varchar(10) NOT NULL,
  `nama_pasien` varchar(50) NOT NULL,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `waiting_list_umum`
--

INSERT INTO `waiting_list_umum` (`no_urut`, `no_rekam_medis`, `nama_pasien`, `status`) VALUES
(1, '419', 'Mujib Hulyufi', 'Mengantri');

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
  ADD PRIMARY KEY (`id_obat`);

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
  ADD KEY `username_dokter` (`username_dokter`);

--
-- Indexes for table `tagihan`
--
ALTER TABLE `tagihan`
  ADD PRIMARY KEY (`id_tagihan`),
  ADD KEY `no_rm_pasien` (`no_rm_pasien`),
  ADD KEY `username_kasir` (`nama_dokter`),
  ADD KEY `tagihan_ibfk_2` (`kode_tindakan`);

--
-- Indexes for table `tindakan`
--
ALTER TABLE `tindakan`
  ADD PRIMARY KEY (`kode_tindakan`);

--
-- Indexes for table `waiting_list_gigi`
--
ALTER TABLE `waiting_list_gigi`
  ADD PRIMARY KEY (`no_urut`),
  ADD KEY `waitListGigi` (`no_rekam_medis`);

--
-- Indexes for table `waiting_list_umum`
--
ALTER TABLE `waiting_list_umum`
  ADD PRIMARY KEY (`no_urut`),
  ADD KEY `waitListUmum` (`no_rekam_medis`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tagihan`
--
ALTER TABLE `tagihan`
  MODIFY `id_tagihan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `rekam_medik`
--
ALTER TABLE `rekam_medik`
  ADD CONSTRAINT `rekam_medik_ibfk_1` FOREIGN KEY (`no_rm_pasien`) REFERENCES `pasien` (`no_rekam_medik`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rekam_medik_ibfk_2` FOREIGN KEY (`kode_tindakan`) REFERENCES `tindakan` (`kode_tindakan`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tagihan`
--
ALTER TABLE `tagihan`
  ADD CONSTRAINT `tagihan_ibfk_1` FOREIGN KEY (`no_rm_pasien`) REFERENCES `pasien` (`no_rekam_medik`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tagihan_ibfk_2` FOREIGN KEY (`kode_tindakan`) REFERENCES `tindakan` (`kode_tindakan`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `waiting_list_gigi`
--
ALTER TABLE `waiting_list_gigi`
  ADD CONSTRAINT `waitListGigi` FOREIGN KEY (`no_rekam_medis`) REFERENCES `pasien` (`no_rekam_medik`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `waiting_list_umum`
--
ALTER TABLE `waiting_list_umum`
  ADD CONSTRAINT `waitListUmum` FOREIGN KEY (`no_rekam_medis`) REFERENCES `pasien` (`no_rekam_medik`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
