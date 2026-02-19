CREATE TABLE `imageLibrary` (
	`id` int AUTO_INCREMENT NOT NULL,
	`filename` varchar(255) NOT NULL,
	`relativePath` varchar(500) NOT NULL,
	`fileSize` int,
	`mimeType` varchar(50),
	`description` text,
	`category` varchar(100),
	`uploadedBy` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `imageLibrary_id` PRIMARY KEY(`id`),
	CONSTRAINT `imageLibrary_relativePath_unique` UNIQUE(`relativePath`)
);
