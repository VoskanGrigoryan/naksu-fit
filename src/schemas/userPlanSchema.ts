import { z } from "zod";

export const classTypeEnum = z.enum([
  "muay_thai",
  "sipalki_do",
  "competidores",
  "kick_boxing",
  "boxeo",
  "boxeo_comp_thai",
  "yoga",
]);

export const userPlanItemSchema = z.object({
  classType: classTypeEnum,

  totalClasses: z
    .number()
    .int("Debe ser un número entero")
    .min(1, "Debe ser mayor a 0"),

  amountPaid: z
    .number()
    .min(0, "No puede ser negativo"),

  pricePerClass: z
    .number()
    .min(0, "No puede ser negativo")
    .optional(),
});

export const userPlanSchema = z.object({
  classes: z.array(userPlanItemSchema),
});

export type UserPlanFormValues = z.infer<typeof userPlanSchema>;
