const db = require("./database");

db.exec(`
  CREATE TABLE IF NOT EXISTS problems (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    requirements TEXT NOT NULL,
    difficulty TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS attempts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    problem_id INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'DRAFT',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (problem_id)
      REFERENCES problems(id)
  );

  CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    attempt_id INTEGER NOT NULL UNIQUE,
    assumptions TEXT NOT NULL,
    classes TEXT NOT NULL,
    responsibilities TEXT NOT NULL,
    explanation TEXT NOT NULL,
    tradeoffs TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (attempt_id)
      REFERENCES attempts(id)
      ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS evaluations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    attempt_id INTEGER NOT NULL UNIQUE,
    overall_score INTEGER,
    status TEXT NOT NULL,
    summary TEXT,
    strengths TEXT,
    improvements TEXT,
    retry_challenge TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (attempt_id)
      REFERENCES attempts(id)
      ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS criterion_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    evaluation_id INTEGER NOT NULL,
    criterion TEXT NOT NULL,
    score INTEGER NOT NULL,
    evidence TEXT,
    concern TEXT,
    suggestion TEXT,
    confidence REAL,

    FOREIGN KEY (evaluation_id)
      REFERENCES evaluations(id)
      ON DELETE CASCADE
  );
`);

module.exports = db;