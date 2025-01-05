-- CreateTable
CREATE TABLE `menu` (
    `item_id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(20) NULL,
    `item_name` VARCHAR(60) NULL,
    `price` INTEGER NULL,
    `src` VARCHAR(500) NULL,
    `active` BOOLEAN NULL DEFAULT true,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orders_id` INTEGER NULL,
    `centre_id` INTEGER NULL,
    `table_id` INTEGER NULL,
    `item_id` INTEGER NULL,
    `quantity` INTEGER NULL,
    `price_item` INTEGER NULL DEFAULT 0,
    `active` BOOLEAN NULL DEFAULT true,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `orders_id` INTEGER NOT NULL AUTO_INCREMENT,
    `centre_id` INTEGER NULL,
    `order_code` INTEGER NULL DEFAULT 0,
    `table_id` INTEGER NULL,
    `active` BOOLEAN NULL DEFAULT true,
    `date_order` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `total_cost` INTEGER NULL DEFAULT 0,
    `status` VARCHAR(45) NULL DEFAULT 'PENDING',
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`orders_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `restaurant_centre` (
    `centre_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(47) NULL,
    `address` VARCHAR(100) NULL,
    `area` VARCHAR(30) NULL,
    `hotline` VARCHAR(15) NULL,
    `opening_month` INTEGER NULL,
    `opening_year` INTEGER NULL,
    `active` BOOLEAN NULL DEFAULT true,
    `quantity_table` INTEGER NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`centre_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `centre_id` INTEGER NULL,
    `role` VARCHAR(10) NULL,
    `email` VARCHAR(30) NULL,
    `password` VARCHAR(60) NULL,
    `otp` VARCHAR(6) NULL,
    `otp_expires` BIGINT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
