ALTER TABLE `appointments` MODIFY COLUMN `preferredDate` timestamp;--> statement-breakpoint
ALTER TABLE `appointments` ADD `consultationSubject` varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE `appointments` ADD `preferredTimeSlots` text;--> statement-breakpoint
ALTER TABLE `appointments` ADD `gender` varchar(20);--> statement-breakpoint
ALTER TABLE `appointments` ADD `maritalStatus` varchar(20);--> statement-breakpoint
ALTER TABLE `appointments` ADD `education` varchar(50);--> statement-breakpoint
ALTER TABLE `appointments` ADD `englishLevel` varchar(20);--> statement-breakpoint
ALTER TABLE `appointments` ADD `hasExamScore` boolean;--> statement-breakpoint
ALTER TABLE `appointments` ADD `workExperience` varchar(50);--> statement-breakpoint
ALTER TABLE `appointments` ADD `hasRefusal` boolean;--> statement-breakpoint
ALTER TABLE `appointments` ADD `refusalReason` text;--> statement-breakpoint
ALTER TABLE `appointments` ADD `hasCriminalRecord` boolean;--> statement-breakpoint
ALTER TABLE `appointments` ADD `criminalRecordDetails` text;