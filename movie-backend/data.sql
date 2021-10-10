SET NAMES utf8mb4;
DROP TABLE IF EXISTS movie;
DROP TABLE IF EXISTS director;
DROP TABLE IF EXISTS genre;

CREATE TABLE `genre` (
    `id` integer NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `director` (
    `id` integer NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    `name` text NOT NULL 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `movie` (
    `id` integer NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    `title` text NOT NULL, 
    `genre_id` integer,
    `director_id` integer,
    CONSTRAINT `fk_genre` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`id`),
    CONSTRAINT `fk_director` FOREIGN KEY (`director_id`) REFERENCES `director` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- genre
INSERT INTO genre (name) VALUES('Drama');
INSERT INTO genre (name) VALUES('Thriller');
INSERT INTO genre (name) VALUES('Comedy');
INSERT INTO genre (name) VALUES('Documentary');

-- director
INSERT INTO director (name) VALUES('Stephen Choice');
INSERT INTO director (name) VALUES('Suzanna Cando');
INSERT INTO director (name) VALUES('Emilia Huber');
INSERT INTO director (name) VALUES('Anthony De Place');

-- movie
INSERT INTO movie (title, genre_id, director_id) VALUES('1-2-3', 3, 1);
INSERT INTO movie (title, genre_id, director_id) VALUES('Where did they go?', 2, 2);
INSERT INTO movie (title, genre_id, director_id) VALUES('knock knock', 2, 2);
INSERT INTO movie (title, genre_id, director_id) VALUES('After 7', 2, 1);
INSERT INTO movie (title, genre_id, director_id) VALUES('The Moon', 4, 3);
INSERT INTO movie (title, genre_id, director_id) VALUES('Polabears', 4, 4);
INSERT INTO movie (title, genre_id, director_id) VALUES('Hidden Treasures', 4, 3);
INSERT INTO movie (title, genre_id, director_id) VALUES('Dance until Midnight', 3, 2);