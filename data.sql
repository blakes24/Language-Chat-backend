DROP TABLE IF EXISTS users CASCADE;

DROP TABLE IF EXISTS messages CASCADE;

DROP TABLE IF EXISTS partners CASCADE;

DROP TABLE IF EXISTS languages CASCADE;

DROP TABLE IF EXISTS speaks_languages CASCADE;

DROP TABLE IF EXISTS learning_languages CASCADE;

DROP TABLE IF EXISTS rooms CASCADE;

CREATE TABLE users (
    id serial PRIMARY KEY,
    name text,
    email text UNIQUE NOT NULL,
    password TEXT,
    bio text,
    image_url text,
    active boolean NOT NULL DEFAULT TRUE,
    social_provider text,
    social_id text
);

CREATE TABLE messages (
    id serial PRIMARY KEY,
    sent_from integer REFERENCES users ON DELETE CASCADE,
    sent_to integer REFERENCES users ON DELETE CASCADE,
    body text,
    timestamp timestamp
);

CREATE TABLE partners (
    id serial PRIMARY KEY,
    user_id integer REFERENCES users ON DELETE CASCADE,
    partner_id integer REFERENCES users ON DELETE CASCADE
);

CREATE TABLE languages (
    code varchar(6) PRIMARY KEY,
    name TEXT
);

CREATE TABLE speaks_languages (
    id serial PRIMARY KEY,
    user_id integer REFERENCES users ON DELETE CASCADE,
    language_code text REFERENCES languages ON DELETE CASCADE
);

CREATE TABLE learning_languages (
    id serial PRIMARY KEY,
    user_id integer REFERENCES users ON DELETE CASCADE,
    language_code text REFERENCES languages ON DELETE CASCADE,
    level TEXT
);

CREATE TABLE rooms (
    id serial PRIMARY KEY,
    user_one integer REFERENCES users ON DELETE CASCADE,
    user_two integer REFERENCES users ON DELETE CASCADE,
    last_active timestamp
);

INSERT INTO users (name, email, PASSWORD, bio, image_url)
  VALUES ('Agustina', 'Dane.Johnston2@gmail.com', 'gD0wGD4dY9g41CE', 'Vero accusamus recusandae eaque vitae necessitatibus. Aut consequatur ex. In nesciunt architecto nemo. Quibusdam ab eum iusto ea laborum qui quo alias. Et voluptatum voluptatem dolorem laudantium odit. Soluta nobis quisquam rerum accusantium sequi quam.', 'https://cdn.fakercloud.com/avatars/brenton_clarke_128.jpg'), ('Susanna', 'Simeon_Kovacek50@hotmail.com', 'CIXzmie_VV225YY', 'Sit soluta qui iure commodi iste non necessitatibus. Porro veniam quia temporibus magnam officia est. Omnis deserunt enim voluptas ut eveniet.', 'https://cdn.fakercloud.com/avatars/agromov_128.jpg'), ('Lexi', 'Dangelo_Walter55@yahoo.com', 'dtY3Il8qzducSv4', 'Natus ducimus nostrum quas. Quis necessitatibus soluta rerum consequatur. Est ipsam eveniet est explicabo consectetur pariatur. Ut officia facere et harum. Est et a animi. Quidem et temporibus quia aperiam magnam nemo et explicabo.', 'https://cdn.fakercloud.com/avatars/shvelo96_128.jpg'), ('Reece', 'Jarred.Lowe@gmail.com', '5LK5KsxLZyJF0Sb', 'Et dolorem sit. Eligendi reiciendis dicta. Eligendi vel deserunt. Aut reiciendis ut. Quo dolores et repellat. Dolorem dolorem labore.', 'https://cdn.fakercloud.com/avatars/edobene_128.jpg'), ('Kurt', 'Alisha_Ryan45@gmail.com', 'Ar5eMyJYKh9Btss', 'Quaerat corrupti rerum quo modi eos. Omnis ut assumenda voluptates et sed adipisci et placeat. Voluptatem distinctio eaque quos officiis qui. Adipisci reprehenderit explicabo voluptas sit. Eos quo eveniet doloremque omnis nihil saepe voluptas.', 'https://cdn.fakercloud.com/avatars/josecarlospsh_128.jpg'), ('Ole', 'Edmond.Nitzsche@hotmail.com', 'WY_s9x_o0ds23tF', 'Odit libero unde consequatur. Repellendus et ab ab nostrum molestias. Quam ullam repudiandae vel. At consectetur velit dignissimos non occaecati quis autem qui. Iste dignissimos incidunt nostrum.', 'https://cdn.fakercloud.com/avatars/souperphly_128.jpg'), ('Vaughn', 'Damion_Bins54@yahoo.com', 'xL8PR_e2cSZHMbm', 'Quaerat suscipit qui enim et minima quo. Cum et enim aut debitis unde consectetur. Quasi dolores labore ut. Velit sequi facere aperiam. Dicta unde ratione aspernatur architecto optio quia aut neque minus.', 'https://cdn.fakercloud.com/avatars/iamkeithmason_128.jpg'), ('Easton', 'Hortense.Casper@yahoo.com', 'F4OT53aQ8gqYp7H', 'In odio rem et iusto sint aperiam. Aut sunt eum assumenda sit quasi sed sed. Saepe magnam consectetur sit. Eum qui aut aliquid culpa occaecati.', 'https://cdn.fakercloud.com/avatars/tweetubhai_128.jpg'), ('Shirley', 'Wilma71@hotmail.com', 'D_fQBOUfxioSjmX', 'Earum perferendis inventore vel eveniet beatae. Temporibus quia tenetur id ea labore. Distinctio magnam placeat dolore repudiandae.', 'https://cdn.fakercloud.com/avatars/rdbannon_128.jpg'), ('Nicolette', 'Nicklaus93@yahoo.com', 'NupyXOayNOTgp_P', 'Omnis natus est unde possimus. Laudantium dolorem aut repellendus. Officia qui qui odit ea corporis rerum molestiae reiciendis.', 'https://cdn.fakercloud.com/avatars/djsherman_128.jpg');

INSERT INTO languages (code, name)
  VALUES ('ar', 'Arabic'), ('zh', 'Chinese'), ('en', 'English'), ('fr', 'French'), ('de', 'German'), ('hi', 'Hindi'), ('id', 'Indonesian'), ('it', 'Italian'), ('ja', 'Japanese'), ('ko', 'Korean'), ('pt', 'Portuguese'), ('ru', 'Russian'), ('es', 'Spanish');

INSERT INTO speaks_languages (user_id, language_code)
  VALUES (1, 'ru'), (2, 'en'), (3, 'zh'), (4, 'es'), (5, 'fr'), (6, 'it'), (7, 'en'), (8, 'es'), (9, 'zh'), (10, 'en');

INSERT INTO learning_languages (user_id, language_code, level)
  VALUES (10, 'ru', 'beginner'), (9, 'en', 'beginner'), (9, 'zh', 'beginner'), (7, 'es', 'beginner'), (6, 'fr', 'intermediate'), (5, 'it', 'beginner'), (4, 'en', 'beginner'), (3, 'es', 'advanced'), (2, 'zh', 'beginner'), (1, 'en', 'beginner');