import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Appointment bookings table
 */
export const appointments = mysqlTable("appointments", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  consultationSubject: varchar("consultationSubject", { length: 100 }).notNull(),
  consultationType: mysqlEnum("consultationType", ["phone", "in-person"]).notNull(),
  preferredDate: timestamp("preferredDate"),
  preferredTimeSlots: text("preferredTimeSlots"),
  gender: varchar("gender", { length: 20 }),
  maritalStatus: varchar("maritalStatus", { length: 20 }),
  education: varchar("education", { length: 50 }),
  englishLevel: varchar("englishLevel", { length: 20 }),
  hasExamScore: boolean("hasExamScore"),
  workExperience: varchar("workExperience", { length: 50 }),
  hasRefusal: boolean("hasRefusal"),
  refusalReason: text("refusalReason"),
  hasCriminalRecord: boolean("hasCriminalRecord"),
  criminalRecordDetails: text("criminalRecordDetails"),
  message: text("message"),
  status: mysqlEnum("status", ["pending", "confirmed", "completed", "cancelled"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Appointment = typeof appointments.$inferSelect;
export type InsertAppointment = typeof appointments.$inferInsert;

/**
 * Blog articles table
 */
export const blogPosts = mysqlTable("blogPosts", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  category: varchar("category", { length: 100 }),
  coverImage: varchar("coverImage", { length: 500 }),
  published: boolean("published").default(false).notNull(),
  authorId: int("authorId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = typeof blogPosts.$inferInsert;

/**
 * Success cases table
 */
export const successCases = mysqlTable("successCases", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  caseType: varchar("caseType", { length: 100 }).notNull(),
  clientBackground: text("clientBackground").notNull(),
  challenge: text("challenge"),
  solution: text("solution").notNull(),
  outcome: text("outcome").notNull(),
  coverImage: varchar("coverImage", { length: 500 }),
  published: boolean("published").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SuccessCase = typeof successCases.$inferSelect;
export type InsertSuccessCase = typeof successCases.$inferInsert;

/**
 * Unified posts table for both blog articles and success cases
 */
export const posts = mysqlTable("posts", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  subtitle: varchar("subtitle", { length: 255 }),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  type: mysqlEnum("type", ["blog", "success-case"]).notNull(),
  category: varchar("category", { length: 100 }),
  blogCategory: mysqlEnum("blogCategory", [
    "policy-interpretation",
    "news",
    "immigration-life",
    "immigration-story",
    "immigration-project"
  ]),
  successCaseCategory: mysqlEnum("successCaseCategory", [
    "investment-immigration",
    "skilled-worker",
    "family-reunion",
    "reconsideration",
    "temporary-visit"
  ]),
  contentCategory: mysqlEnum("contentCategory", [
    "investment-immigration",
    "family-reunion",
    "maple-leaf-renewal",
    "reconsideration",
    "temporary-resident",
    "skilled-worker",
    "citizenship",
    "other"
  ]),
  tags: text("tags"), // JSON array stored as string
  coverImage: varchar("coverImage", { length: 500 }),
  author: varchar("author", { length: 100 }).default("OXEC Immigration").notNull(),
  published: boolean("published").default(false).notNull(),
  publishedAt: timestamp("publishedAt"),
  authorId: int("authorId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Post = typeof posts.$inferSelect;
export type InsertPost = typeof posts.$inferInsert;
