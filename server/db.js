const { neon } = require('@neondatabase/serverless');

const rawDatabaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!rawDatabaseUrl) {
  throw new Error('DATABASE_URL or POSTGRES_URL is required');
}

const databaseUrl = new URL(rawDatabaseUrl);
databaseUrl.searchParams.delete('sslmode');

const sql = neon(databaseUrl.toString(), { fullResults: true });

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function withDatabaseRetry(operation) {
  const maxAttempts = 4;
  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      const code = error?.code || error?.sourceError?.cause?.code;
      const isTransient =
        code === 'ECONNRESET' ||
        code === 'UND_ERR_SOCKET' ||
        error?.message?.includes('fetch failed') ||
        error?.message?.includes('other side closed');

      if (!isTransient || attempt === maxAttempts) {
        throw error;
      }

      await wait(250 * attempt);
    }
  }

  throw lastError;
}

const pool = {
  query(text, params = []) {
    return withDatabaseRetry(() => sql.query(text, params, { fullResults: true }));
  },
};

function mapUser(row) {
  if (!row) return null;

  return {
    id: row.id,
    _id: row.id,
    fullName: row.full_name,
    name: row.full_name,
    email: row.email,
    password: row.password,
    role: row.role,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapReport(row) {
  if (!row) return null;

  const report = {
    id: row.id,
    _id: row.id,
    user: row.user_id,
    category: row.category,
    description: row.description,
    location: row.location,
    imageUrl: row.image_url,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    resolvedAt: row.resolved_at,
  };

  if (row.user_full_name || row.user_email) {
    report.user = {
      id: row.user_id,
      _id: row.user_id,
      fullName: row.user_full_name,
      name: row.user_full_name,
      email: row.user_email,
    };
  }

  return report;
}

async function initializeDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS reports (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      category TEXT NOT NULL CHECK (category IN ('Pothole', 'Street Light', 'Water Leak', 'Illegal Dumping', 'Other')),
      description TEXT NOT NULL,
      location TEXT NOT NULL,
      image_url TEXT,
      status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'In Progress', 'Resolved')),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      resolved_at TIMESTAMPTZ
    );
  `);

  await pool.query('ALTER TABLE reports ADD COLUMN IF NOT EXISTS resolved_at TIMESTAMPTZ;');

  await pool.query('CREATE INDEX IF NOT EXISTS reports_user_id_created_at_idx ON reports (user_id, created_at DESC);');
  await pool.query('CREATE INDEX IF NOT EXISTS reports_created_at_idx ON reports (created_at DESC);');
}

module.exports = {
  initializeDatabase,
  mapReport,
  mapUser,
  pool,
};
