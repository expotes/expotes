import {
  pgEnum,
  pgTable,
  primaryKey,
  timestamp,
  uuid,
  varchar,
  boolean,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { teamsTable } from './teams';
import { relations, sql } from 'drizzle-orm';

export const usersTable = pgTable(
  'users',
  {
    id: uuid('id').primaryKey(),
    email: varchar('email').notNull().unique(),
    password: varchar('password').notNull(),

    createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  },
  (t) => ({
    emailIdx: uniqueIndex('email_idx').on(sql`lower(${t.email})`),
  }),
);

export const roleEnum = pgEnum('role', ['admin', 'user']);

export const usersToTeams = pgTable(
  'users_to_teams',
  {
    userId: uuid('user_id')
      .references(() => usersTable.id)
      .notNull(),
    teamId: uuid('team_id')
      .references(() => teamsTable.id)
      .notNull(),

    role: roleEnum('role').notNull().default('user'),

    isSuspened: boolean('is_suspened'),
    createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  },
  (t) => {
    return {
      pk: primaryKey({ columns: [t.userId, t.teamId] }),
    };
  },
);

export const usersToTeamsRelation = relations(usersToTeams, ({ one }) => ({
  user: one(usersTable, {
    fields: [usersToTeams.userId],
    references: [usersTable.id],
  }),
  team: one(teamsTable, {
    fields: [usersToTeams.teamId],
    references: [teamsTable.id],
  }),
}));

// export const sessionsTable = pgTable("sessions", {
// 	id: text("id").primaryKey(),
// 	userId: uuid("user_id")
// 		.notNull()
// 		.references(() => usersTable.id),

// 	expiresAt: timestamp("expires_at", {
// 		withTimezone: true,
// 		mode: "date"
// 	}).notNull()
// });