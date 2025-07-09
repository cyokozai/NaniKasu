import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || 'postgres://nanikasu:nanikasu_password@localhost:5432/nanikasu',
  },
  verbose: true,
  strict: true,
}); 