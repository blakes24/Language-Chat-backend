DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS partners CASCADE;
DROP TABLE IF EXISTS languages CASCADE;

CREATE TABLE users (
    id serial PRIMARY KEY,
    name TEXT,
    email TEXT NOT NULL,
    password TEXT,
    bio TEXT,
    image_url TEXT,
    active BOOLEAN NOT NULL DEFAULT FALSE,
    socket_id TEXT
);

CREATE TABLE messages (
    id serial PRIMARY KEY,
    sent_from INTEGER REFERENCES users ON DELETE CASCADE,
    sent_to INTEGER REFERENCES users ON DELETE CASCADE,
    body TEXT,
    timestamp TIMESTAMP
);

CREATE TABLE partners (
    id serial PRIMARY KEY,
    user_id INTEGER REFERENCES users ON DELETE CASCADE,
    partner_id INTEGER REFERENCES users ON DELETE CASCADE
);

CREATE TABLE languages (
    id serial PRIMARY KEY,
    user_id INTEGER REFERENCES users ON DELETE CASCADE,
    language TEXT,
    level TEXT
);

INSERT INTO users (name, email, bio)
VALUES ('testuser', 'testuser@mail.com', 'my bio');
