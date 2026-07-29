import type { z } from "zod";

import { profileSchema } from "../schemas/profileSchema";

export type ProfileFormData = z.infer<typeof profileSchema>