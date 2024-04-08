DROP TABLE IF EXISTS public.user;

CREATE TABLE public.user (
    id SERIAL PRIMARY KEY NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    mobile VARCHAR(255) NOT NULL
);

