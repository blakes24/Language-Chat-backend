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

CREATE TABLE partners (
    id serial PRIMARY KEY,
    user_id integer REFERENCES users ON DELETE CASCADE,
    partner_id integer REFERENCES users ON DELETE CASCADE
);

CREATE TABLE languages (
    code varchar(6) PRIMARY KEY,
    name text NOT NULL
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
    level integer NOT NULL
);

CREATE TABLE rooms (
    id text PRIMARY KEY,
    user_one integer REFERENCES users ON DELETE CASCADE,
    user_two integer REFERENCES users ON DELETE CASCADE
);

CREATE TABLE messages (
    id serial PRIMARY KEY,
    sent_from integer REFERENCES users ON DELETE CASCADE,
    sent_to integer REFERENCES users ON DELETE CASCADE,
    body text NOT NULL,
    room_id text REFERENCES rooms ON DELETE CASCADE,
    sent_at timestamp DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email, PASSWORD, bio, image_url)
    VALUES ('Brady', 'Elton77@yahoo.com', 'u3XirxotnlX28tb', 'Eos nobis autem sint ducimus illo.', 'https://cdn.fakercloud.com/avatars/happypeter1983_128.jpg'), ('Juliet', 'Gayle8@gmail.com', 'skKTNeufByEyahX', 'Fuga aperiam quia dolores minima temporibus.', 'https://cdn.fakercloud.com/avatars/krystalfister_128.jpg'), ('Halie', 'Devon.Hyatt9@gmail.com', '8xajhAwLyhI5wtP', 'Laboriosam voluptatem beatae cum rerum veritatis est itaque mollitia.', 'https://cdn.fakercloud.com/avatars/davidbaldie_128.jpg'), ('Spencer', 'Mario.Fahey17@yahoo.com', 'Gw5akP45kgKlkgc', 'Fugiat porro minus voluptates sed nisi impedit error harum.', 'https://cdn.fakercloud.com/avatars/byryan_128.jpg'), ('Jaycee', 'Dereck_Legros19@hotmail.com', 'Kgp8D7lKkR3s6Nd', 'Tempore nam dolorem voluptas.', 'https://cdn.fakercloud.com/avatars/_victa_128.jpg'), ('Furman', 'Trent.Towne@hotmail.com', 'G55uFgWlEPUnSO2', 'Vitae consectetur tempore eveniet vel id minus et accusamus laborum.', 'https://cdn.fakercloud.com/avatars/heykenneth_128.jpg'), ('Alana', 'Virgie.Orn57@gmail.com', 'MEi2T2oIFofBd0z', 'Veniam occaecati minus deleniti in reiciendis libero.', 'https://cdn.fakercloud.com/avatars/omnizya_128.jpg'), ('Alfreda', 'Kelvin.Hackett10@gmail.com', 'dOvEvjhO09bRZmO', 'Sunt deleniti repellat maiores necessitatibus qui.', 'https://cdn.fakercloud.com/avatars/dahparra_128.jpg'), ('Kitty', 'Marcelina.Friesen76@gmail.com', 'Ng5OXkcvwF6cmqo', 'Ut dolor qui quibusdam beatae ipsa natus.', 'https://cdn.fakercloud.com/avatars/silvanmuhlemann_128.jpg'), ('Lottie', 'Marcelina_King15@hotmail.com', 'quEAN4zsex__tVx', 'Libero autem dolor mollitia.', 'https://cdn.fakercloud.com/avatars/shaneIxD_128.jpg'), ('Darryl', 'Schuyler84@hotmail.com', 'hPojv2RFuavJeEG', 'Veritatis deleniti autem minus impedit quam voluptatem dicta voluptas veritatis.', 'https://cdn.fakercloud.com/avatars/yehudab_128.jpg'), ('Geoffrey', 'Layne_Macejkovic@gmail.com', 'X5e1SDQ0EHNGHk0', 'Ea velit qui nisi voluptatum culpa sed veritatis dolorem.', 'https://cdn.fakercloud.com/avatars/geneseleznev_128.jpg'), ('Maureen', 'Blair89@hotmail.com', '4OICu41Z_JQhYHb', 'Nostrum culpa dolor possimus reprehenderit ut ut sed omnis libero.', 'https://cdn.fakercloud.com/avatars/erwanhesry_128.jpg'), ('Domenico', 'Hermann70@gmail.com', 'sx7aQKQ4h9GEWVr', 'Quia est libero perspiciatis corrupti vel.', 'https://cdn.fakercloud.com/avatars/hota_v_128.jpg'), ('Zoey', 'Viola6@hotmail.com', 'b1eTYsatZWIs6oF', 'Fugit earum explicabo quis.', 'https://cdn.fakercloud.com/avatars/kolsvein_128.jpg'), ('Laila', 'Osborne73@yahoo.com', 'NVuvUsJ_aCBvqfR', 'In dicta accusamus dolores autem.', 'https://cdn.fakercloud.com/avatars/nathalie_fs_128.jpg'), ('Kattie', 'Tania.Bailey@yahoo.com', 'XxF5LE1crl4KJvc', 'Sed velit dolores dolor modi dolor enim fugiat.', 'https://cdn.fakercloud.com/avatars/terryxlife_128.jpg'), ('Elijah', 'Kyle.Berge48@hotmail.com', 'r2gPUcDaSMfQHyT', 'Voluptatem voluptatum assumenda.', 'https://cdn.fakercloud.com/avatars/doronmalki_128.jpg'), ('Ulises', 'Linda52@hotmail.com', '2z3S6010QUvys4E', 'Velit neque esse non quia animi ut ducimus.', 'https://cdn.fakercloud.com/avatars/dudestein_128.jpg'), ('Emilio', 'Eleonore.Wisoky16@yahoo.com', 'FFOaaI0Q5SDalOX', 'Omnis at cumque et necessitatibus est suscipit.', 'https://cdn.fakercloud.com/avatars/tur8le_128.jpg'), ('Zula', 'Greg1@hotmail.com', 'hjqKv4rknXIhR6K', 'Quasi est fugiat.', 'https://cdn.fakercloud.com/avatars/byrnecore_128.jpg'), ('Alessandra', 'Janick_Lockman27@gmail.com', 'haSuttaup3d4pND', 'Libero dolores vero dolor esse repellat nihil et.', 'https://cdn.fakercloud.com/avatars/vlajki_128.jpg'), ('Merle', 'Lucienne.Jacobs@yahoo.com', 'k4MygvbNNgUtcpJ', 'Facere et maxime velit aut quia eum molestiae.', 'https://cdn.fakercloud.com/avatars/muridrahhal_128.jpg'), ('Edythe', 'Krystina.Padberg@hotmail.com', 'yroUIsUQzPTJpvd', 'Aut distinctio repellendus.', 'https://cdn.fakercloud.com/avatars/ateneupopular_128.jpg'), ('Rosetta', 'Kaleigh_Pollich@gmail.com', '4cu2vg67e39YpZD', 'Veritatis laudantium ratione ea et voluptas.', 'https://cdn.fakercloud.com/avatars/rtyukmaev_128.jpg'), ('Leilani', 'Raymundo_Smith@hotmail.com', 'Hsjsjxp8pIEQqta', 'Et laboriosam laboriosam omnis blanditiis quo.', 'https://cdn.fakercloud.com/avatars/jarsen_128.jpg'), ('Deron', 'Bernardo75@yahoo.com', '7np5rUCuAK0xhFy', 'Alias eos ratione non.', 'https://cdn.fakercloud.com/avatars/moynihan_128.jpg'), ('Desmond', 'Izaiah.Abernathy@hotmail.com', 'QKOvf9jUgqyATd9', 'Impedit doloremque sint rerum reprehenderit.', 'https://cdn.fakercloud.com/avatars/santi_urso_128.jpg'), ('Vincent', 'Reece_Crist@yahoo.com', 'VvHGYlvEy3zjPIC', 'Molestiae eveniet error doloribus sint fugiat.', 'https://cdn.fakercloud.com/avatars/richardgarretts_128.jpg'), ('Dennis', 'Holly.Hamill44@gmail.com', 'rmpcolAkX8noUfa', 'Aliquid eum et.', 'https://cdn.fakercloud.com/avatars/madshensel_128.jpg'), ('Sibyl', 'Elza_Collins@hotmail.com', 'i_5AVl4g_whU53n', 'Quaerat velit autem eum praesentium iusto necessitatibus aut veniam est.', 'https://cdn.fakercloud.com/avatars/juanmamartinez_128.jpg'), ('Antwan', 'Alessandro97@gmail.com', 'UMMghpORJGIIAqv', 'Eos repudiandae et ut sequi quia officiis.', 'https://cdn.fakercloud.com/avatars/ralph_lam_128.jpg'), ('Lemuel', 'Armand_Mraz17@yahoo.com', 'lLeFf4PzuZr9XGU', 'Totam libero impedit expedita nisi delectus est earum.', 'https://cdn.fakercloud.com/avatars/psdesignuk_128.jpg'), ('Liza', 'Zora.Rolfson5@hotmail.com', '7DtSDWb3HICcjQl', 'Doloremque aut debitis quas provident qui a et repellendus.', 'https://cdn.fakercloud.com/avatars/pmeissner_128.jpg'), ('Royce', 'Roxane_Schroeder52@hotmail.com', 'qgT6q60HbdgcKKf', 'Vel qui culpa libero atque eum corrupti tempora autem.', 'https://cdn.fakercloud.com/avatars/murrayswift_128.jpg'), ('Daphney', 'Adolph_Labadie44@yahoo.com', 'WvIXnA05uURJz44', 'Laudantium minima est.', 'https://cdn.fakercloud.com/avatars/hoangloi_128.jpg'), ('Dayna', 'Hester.Jaskolski@gmail.com', '250TN5My_7Yz9Xi', 'Dolorum labore ab iure omnis.', 'https://cdn.fakercloud.com/avatars/janpalounek_128.jpg'), ('Eleazar', 'Melany37@gmail.com', 'wVPraZNqA2nd4ZZ', 'Quas eum qui ut minus nesciunt aut placeat rerum.', 'https://cdn.fakercloud.com/avatars/sunlandictwin_128.jpg'), ('Cydney', 'Arvilla80@yahoo.com', '53oYf8TkuZx8rcU', 'Facilis officia quae temporibus et.', 'https://cdn.fakercloud.com/avatars/rohixx_128.jpg'), ('Geraldine', 'Yvonne33@gmail.com', '3aqnO5v01UMDLHB', 'Nobis placeat iusto veritatis aspernatur cum possimus omnis sapiente.', 'https://cdn.fakercloud.com/avatars/andrewabogado_128.jpg'), ('Nico', 'nico1@mail.com', '$2b$13$VDWzli4fiJm9CsEoJbn2hexLBnlk/.Qk1Y3kV8/2iDUgiRqwF9lDC', 'Omnis natus est unde possimus. Laudantium dolorem aut repellendus.', 'https://cdn.fakercloud.com/avatars/djsherman_128.jpg');

INSERT INTO languages (code, name)
    VALUES ('ar', 'Arabic'), ('zh', 'Chinese'), ('en', 'English'), ('fr', 'French'), ('de', 'German'), ('hi', 'Hindi'), ('id', 'Indonesian'), ('it', 'Italian'), ('ja', 'Japanese'), ('ko', 'Korean'), ('pt', 'Portuguese'), ('ru', 'Russian'), ('es', 'Spanish');

INSERT INTO speaks_languages (user_id, language_code)
    VALUES (1, 'it'), (2, 'ja'), (3, 'it'), (4, 'it'), (5, 'ru'), (6, 'en'), (7, 'pt'), (8, 'ko'), (9, 'it'), (10, 'ru'), (11, 'pt'), (12, 'ko'), (13, 'es'), (14, 'fr'), (15, 'en'), (16, 'es'), (17, 'en'), (18, 'ko'), (19, 'pt'), (20, 'fr'), (21, 'id'), (22, 'ja'), (23, 'de'), (24, 'fr'), (25, 'zh'), (26, 'hi'), (27, 'ar'), (28, 'zh'), (29, 'en'), (30, 'ja'), (31, 'en'), (32, 'ko'), (33, 'it'), (34, 'it'), (35, 'zh'), (36, 'ko'), (37, 'fr'), (38, 'ar'), (39, 'ko'), (40, 'zh'), (41, 'ja');

INSERT INTO learning_languages (user_id, language_code, level)
    VALUES (1, 'ko', 2), (2, 'en', 1), (3, 'en', 1), (4, 'en', 3), (5, 'ar', 3), (6, 'zh', 3), (7, 'it', 1), (8, 'es', 2), (9, 'pt', 3), (10, 'ko', 3), (11, 'de', 3), (12, 'zh', 2), (13, 'id', 3), (14, 'pt', 2), (15, 'id', 2), (16, 'de', 3), (17, 'en', 2), (18, 'en', 3), (19, 'ko', 1), (20, 'pt', 3), (21, 'zh', 2), (22, 'hi', 3), (23, 'ja', 3), (24, 'ar', 1), (25, 'hi', 1), (26, 'zh', 3), (27, 'ko', 3), (28, 'ar', 1), (29, 'ar', 1), (30, 'es', 2), (31, 'fr', 1), (32, 'ru', 1), (33, 'ja', 1), (34, 'ja', 2), (35, 'fr', 2), (36, 'en', 1), (37, 'it', 2), (38, 'ja', 1), (39, 'fr', 2), (40, 'ar', 2), (41, 'es', 1);
