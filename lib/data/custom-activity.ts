import { z } from "zod";
import { PERIODS, type Period } from "./activities";

export const ActivityDraftSchema = z.object({
  title: z.string().trim().min(1, "Give the activity a name").max(60),
  emoji: z.string().trim().min(1).max(16),
  duration: z.string().trim().max(30),
  description: z.string().trim().max(400),
});

export type ActivityDraft = z.infer<typeof ActivityDraftSchema>;

export const PeriodSchema = z.enum(PERIODS as [Period, ...Period[]]);
