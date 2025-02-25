CREATE TABLE `Exercises` (
	`exercise_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`muscle_group` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Exercises_name_unique` ON `Exercises` (`name`);--> statement-breakpoint
CREATE TABLE `Progress` (
	`progress_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`exercise_id` integer NOT NULL,
	`date` text DEFAULT CURRENT_TIMESTAMP,
	`max_weight` real,
	`max_reps` integer,
	`notes` text,
	FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`exercise_id`) REFERENCES `Exercises`(`exercise_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Sets` (
	`set_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`workout_exercise_id` integer NOT NULL,
	`set_number` integer NOT NULL,
	`reps` integer NOT NULL,
	`weight` real,
	FOREIGN KEY (`workout_exercise_id`) REFERENCES `Workout_Exercises`(`workout_exercise_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Users` (
	`user_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text NOT NULL,
	`email` text NOT NULL,
	`password_hash` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Users_username_unique` ON `Users` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `Users_email_unique` ON `Users` (`email`);--> statement-breakpoint
CREATE TABLE `Workout_Exercises` (
	`workout_exercise_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`workout_id` integer NOT NULL,
	`exercise_id` integer NOT NULL,
	FOREIGN KEY (`workout_id`) REFERENCES `Workouts`(`workout_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`exercise_id`) REFERENCES `Exercises`(`exercise_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Workouts` (
	`workout_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`name` text NOT NULL,
	`date` text DEFAULT CURRENT_TIMESTAMP,
	`notes` text,
	FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
DROP TABLE `lists`;--> statement-breakpoint
DROP TABLE `tasks`;