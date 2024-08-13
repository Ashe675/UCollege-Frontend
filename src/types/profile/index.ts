import { z } from 'zod';

const userSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  institutionalEmail: z.string(),
  regionalCenter: z.string(),
  carerr: z.string(),
  institutionalCode: z.string(),
  role: z.string(),
});

export default userSchema;
