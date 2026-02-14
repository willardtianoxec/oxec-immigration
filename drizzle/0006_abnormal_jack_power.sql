ALTER TABLE `blogPosts` MODIFY COLUMN `category` varchar(255);--> statement-breakpoint
ALTER TABLE `blogPosts` MODIFY COLUMN `coverImage` varchar(2048);--> statement-breakpoint
ALTER TABLE `posts` MODIFY COLUMN `subtitle` varchar(500);--> statement-breakpoint
ALTER TABLE `posts` MODIFY COLUMN `category` varchar(255);--> statement-breakpoint
ALTER TABLE `posts` MODIFY COLUMN `coverImage` varchar(2048);--> statement-breakpoint
ALTER TABLE `posts` MODIFY COLUMN `author` varchar(255) NOT NULL DEFAULT 'OXEC Immigration';--> statement-breakpoint
ALTER TABLE `successCases` MODIFY COLUMN `coverImage` varchar(2048);