import mysql from "mysql2/promise";

type GlobalWithMysql = typeof globalThis & {
  mysqlPool?: mysql.Pool;
  contentTablesReady?: boolean;
};

const requiredEnv = ["DB_HOST", "DB_NAME", "DB_USER", "DB_PASSWORD"] as const;

export function hasDatabaseConfig() {
  return requiredEnv.every((key) => Boolean(process.env[key]));
}

export function getPool() {
  if (!hasDatabaseConfig()) {
    return null;
  }

  const globalForMysql = globalThis as GlobalWithMysql;

  if (!globalForMysql.mysqlPool) {
    globalForMysql.mysqlPool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT ?? 3306),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectionLimit: 5,
      waitForConnections: true,
      namedPlaceholders: true
    });
  }

  return globalForMysql.mysqlPool;
}

export async function ensureContentTables() {
  const pool = getPool();

  if (!pool) {
    return false;
  }

  const globalForMysql = globalThis as GlobalWithMysql;

  if (globalForMysql.contentTablesReady) {
    return true;
  }

  await pool.query(`
    CREATE TABLE IF NOT EXISTS services (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      title VARCHAR(160) NOT NULL,
      slug VARCHAR(180) NOT NULL,
      description TEXT NOT NULL,
      category VARCHAR(120) NOT NULL,
      icon_key VARCHAR(60) NOT NULL DEFAULT 'wrench',
      image_path VARCHAR(255) NOT NULL,
      features JSON NOT NULL,
      sort_order INT NOT NULL DEFAULT 0,
      is_active TINYINT(1) NOT NULL DEFAULT 1,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY services_slug_unique (slug),
      KEY services_public_idx (is_active, sort_order)
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS gallery_projects (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      title VARCHAR(180) NOT NULL,
      slug VARCHAR(200) NOT NULL,
      category VARCHAR(120) NOT NULL,
      location VARCHAR(120) NOT NULL,
      description TEXT NOT NULL,
      image_path VARCHAR(255) NOT NULL,
      sort_order INT NOT NULL DEFAULT 0,
      is_active TINYINT(1) NOT NULL DEFAULT 1,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY gallery_projects_slug_unique (slug),
      KEY gallery_public_idx (is_active, sort_order)
    )
  `);

  globalForMysql.contentTablesReady = true;
  return true;
}
