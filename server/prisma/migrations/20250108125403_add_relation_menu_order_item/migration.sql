-- AddForeignKey
ALTER TABLE `order_item` ADD CONSTRAINT `order_item_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `menu`(`item_id`) ON DELETE SET NULL ON UPDATE CASCADE;
