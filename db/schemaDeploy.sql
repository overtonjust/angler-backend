
DROP TABLE IF EXISTS watchlists CASCADE;
DROP TABLE IF EXISTS fish_finder ;
DROP TABLE IF EXISTS fish;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(30) NOT NULL,
    email TEXT NOT NULL,
    UNIQUE (username, email)
);


CREATE TABLE watchlists (
    id SERIAL PRIMARY KEY,
    name TEXT,
    is_favorite BOOLEAN DEFAULT false,
    description VARCHAR(80),
    user_id INTEGER REFERENCES users (id)
    ON DELETE CASCADE
);

CREATE TABLE fish (
    id SERIAL PRIMARY KEY,
    name TEXT,
    image TEXT,
    icon TEXT,
    bait TEXT[],
    scrip_type VARCHAR(6),
    CHECK (scrip_type = 'Purple' OR scrip_type = 'Orange'),
    region VARCHAR(20),
    area VARCHAR(30),
    time_window VARCHAR(11),
    weather_found TEXT[],
    closest_aetheryte VARCHAR(30)
);

CREATE TABLE fish_finder (
    watchlist_id INTEGER REFERENCES watchlists (id)
    ON DELETE CASCADE,
    fish_id INTEGER REFERENCES fish (id)
    ON DELETE CASCADE,
    UNIQUE (watchlist_id, fish_id)
);

