CREATE TABLE `data` (
	`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`sn` VARCHAR(8) NOT NULL,
	`site` VARCHAR(100) NOT NULL,
	`location` VARCHAR(100) NOT NULL,
	`mod` INT UNSIGNED NOT NULL,
	`sid` INT UNSIGNED NOT NULL,
	`type` INT UNSIGNED NOT NULL,
	`cid` INT UNSIGNED NOT NULL,
	`name` VARCHAR(100) NOT NULL,
	`unit` VARCHAR(100) NOT NULL,
	`value` DECIMAL(20,10),
	`raw` DECIMAL(20,10),
	`ts` INT UNSIGNED NOT NULL,
	PRIMARY KEY (id)
);