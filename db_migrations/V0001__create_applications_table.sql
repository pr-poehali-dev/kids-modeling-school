CREATE TABLE IF NOT EXISTS applications (
    id SERIAL PRIMARY KEY,
    child_name VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL CHECK (age >= 7 AND age <= 14),
    parent_phone VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);