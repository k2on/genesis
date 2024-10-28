import z from "zod";

export const config = (name: string): Config => ({ name });

export const ConfigSchema = z.object({
    name: z.string(),
});
export type Config = z.infer<typeof ConfigSchema>;
