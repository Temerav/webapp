DROP TABLE IF EXISTS work_item;

CREATE TABLE work_item (
    id SERIAL PRIMARY KEY NOT NULL,
    item_name VARCHAR(255) NOT NULL,
    item_details VARCHAR(255) NOT NULL,
    picture_path VARCHAR(255) NOT NULL
);
