import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const responsesTable = pgTable("responses", {
  id: serial("id").primaryKey(),
  edad: integer("edad").notNull(),
  genero: text("genero").notNull(),
  acepta: text("acepta").notNull(),
  valor: integer("valor").notNull(),       // escala -2 a 2
  color: integer("color").notNull(),       // escala 1-5
  olor: integer("olor").notNull(),         // escala 1-5
  sabor: integer("sabor").notNull(),       // escala 1-5
  textura: integer("textura").notNull(),   // escala 1-5
  consume: text("consume").notNull(),      // "Sí" | "No"
  prefiere: text("prefiere"),              // nullable
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertResponseSchema = createInsertSchema(responsesTable).omit({
  id: true,
  createdAt: true,
});
export type InsertResponse = z.infer<typeof insertResponseSchema>;
export type Response = typeof responsesTable.$inferSelect;