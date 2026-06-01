import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const responsesTable = pgTable("responses", {
  id: serial("id").primaryKey(),
  edad: integer("edad").notNull(),
  genero: text("genero").notNull(),
  acepta: text("acepta").notNull(),
  valor: integer("valor").notNull(),       
  color: integer("color").notNull(),       
  olor: integer("olor").notNull(),         
  sabor: integer("sabor").notNull(),       
  textura: integer("textura").notNull(),   
  consume: text("consume").notNull(),      
  prefiere: text("prefiere"),              
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertResponseSchema = createInsertSchema(responsesTable).omit({
  id: true,
  createdAt: true,
});
export type InsertResponse = z.infer<typeof insertResponseSchema>;
export type Response = typeof responsesTable.$inferSelect;