-- CreateTable
CREATE TABLE `fasilitas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_fasilitas` VARCHAR(100) NOT NULL,
    `lokasi` VARCHAR(100) NOT NULL,
    `pic` VARCHAR(100) NOT NULL,
    `foto_uri` VARCHAR(100) NOT NULL,
    `status` TINYINT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `peminjaman` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `id_fasilitas` INTEGER NOT NULL,
    `tgl_pengajuan` DATE NOT NULL,
    `tgl_pinjam` DATE NOT NULL,
    `jam_mulai` TIME(0) NOT NULL,
    `jam_selesai` TIME(0) NOT NULL,
    `proses` ENUM('Diproses', 'Diterima', 'Ditolak', 'Dibatalkan') NOT NULL DEFAULT 'Diproses',
    `notes` TEXT NULL,
    `kak_uri` VARCHAR(100) NOT NULL,
    `disposisi_uri` VARCHAR(100) NULL,
    `status` TINYINT NULL DEFAULT 1,

    INDEX `peminjaman_fasilitas_FK`(`id_fasilitas`),
    INDEX `peminjaman_users_FK`(`id_user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nim` VARCHAR(100) NOT NULL,
    `nama` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NULL,
    `program_studi` VARCHAR(100) NULL,
    `fakultas` VARCHAR(100) NULL,
    `role` TINYINT NOT NULL DEFAULT 1,
    `password` VARCHAR(100) NOT NULL,
    `status` TINYINT NULL DEFAULT 1,
    `foto_profil` VARCHAR(100) NULL,

    UNIQUE INDEX `user_nim_key`(`nim`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `peminjaman` ADD CONSTRAINT `peminjaman_fasilitas_FK` FOREIGN KEY (`id_fasilitas`) REFERENCES `fasilitas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `peminjaman` ADD CONSTRAINT `peminjaman_users_FK` FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
