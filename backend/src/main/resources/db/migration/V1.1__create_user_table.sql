DROP TABLE IF EXISTS "user";

CREATE TABLE "user" (
    id INTEGER PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email_address VARCHAR(255) NOT NULL,
    secret_code VARCHAR(255),
    activated BOOLEAN NOT NULL
);

