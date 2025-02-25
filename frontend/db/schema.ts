import { sql } from "drizzle-orm";
import {
  sqliteTable,
  text,
  integer,
  real,
  primaryKey,
  foreignKey,
} from "drizzle-orm/sqlite-core";

// 1. Users Table
export const Users = sqliteTable("Users", {
  userId: integer("user_id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// 2. Exercises Table
export const Exercises = sqliteTable("Exercises", {
  exerciseId: integer("exercise_id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  description: text("description"),
  muscleGroup: text("muscle_group"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// 3. Workouts Table
export const Workouts = sqliteTable("Workouts", {
  workoutId: integer("workout_id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .notNull()
    .references(() => Users.userId),
  name: text("name").notNull(),
  date: text("date").default(sql`CURRENT_TIMESTAMP`),
  notes: text("notes"),
});

// 4. Workout_Exercises Table (Many-to-Many between Workouts and Exercises)
export const WorkoutExercises = sqliteTable("Workout_Exercises", {
  workoutExerciseId: integer("workout_exercise_id").primaryKey({
    autoIncrement: true,
  }),
  workoutId: integer("workout_id")
    .notNull()
    .references(() => Workouts.workoutId),
  exerciseId: integer("exercise_id")
    .notNull()
    .references(() => Exercises.exerciseId),
});

// 5. Sets Table
export const Sets = sqliteTable("Sets", {
  setId: integer("set_id").primaryKey({ autoIncrement: true }),
  workoutExerciseId: integer("workout_exercise_id")
    .notNull()
    .references(() => WorkoutExercises.workoutExerciseId),
  setNumber: integer("set_number").notNull(),
  reps: integer("reps").notNull(),
  weight: real("weight"),
});

// 6. Progress Table
export const Progress = sqliteTable("Progress", {
  progressId: integer("progress_id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .notNull()
    .references(() => Users.userId),
  exerciseId: integer("exercise_id")
    .notNull()
    .references(() => Exercises.exerciseId),
  date: text("date").default(sql`CURRENT_TIMESTAMP`),
  maxWeight: real("max_weight"),
  maxReps: integer("max_reps"),
  notes: text("notes"),
});
