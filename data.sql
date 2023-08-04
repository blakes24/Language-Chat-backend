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
    social_id text,
    verified boolean NOT NULL DEFAULT FALSE
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

INSERT INTO users (name, email, password, bio, image_url)
    VALUES ('Alaina', 'Edythe_Gutmann71@gmail.com', 'Jg3Mb4YRuH_6Sfi', 'scientist', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/115.jpg'), ('Ozella', 'Vidal_Roberts21@yahoo.com', 'IN5Ik6YFpGj6sGv', 'model', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/155.jpg'), ('Jesus', 'Sarina.Greenholt10@hotmail.com', 'oTJC5B9KKp7S6NW', 'traveler, grad, artist', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/287.jpg'), ('Daisha', 'Meagan_Jacobson@hotmail.com', 'jxvJCIIeuOZfYXz', 'geek', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/433.jpg'), ('Keyon', 'Abigale.Schuppe@gmail.com', 'TGnhBJ98A4J6v2m', 'trigonometry devotee, person 🥛', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/354.jpg'), ('Chesley', 'Alec46@hotmail.com', 'jhbwXqqcf1OsRev', 'moment supporter, parent', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/986.jpg'), ('Cecile', 'Brent27@gmail.com', 'SjQwzWQtX2DBLRK', 'quince junkie  🍬', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/471.jpg'), ('Kale', 'Jarred.Gleichner73@yahoo.com', 'BOwvY6JQ0kcw5YG', 'civilisation junkie, friend', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/775.jpg'), ('Arnaldo', 'Janae_Brown60@hotmail.com', 'Vzjr3bnIPRHl2rR', 'engineer', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/340.jpg'), ('Yasmeen', 'Patricia_Wintheiser@hotmail.com', 'SL_MHo2yn96rR0j', 'grad, film lover, scientist 🥁', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/19.jpg'), ('Colten', 'Helena_Tremblay@hotmail.com', 'Dc84BRSGMynXMR9', 'headphones junkie', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/270.jpg'), ('Evalyn', 'Lauryn_Olson@hotmail.com', 'XmOnMZbRQFzhxLl', 'designer', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/822.jpg'), ('Nicolette', 'Earlene60@gmail.com', 'M_vbCtIF5br4yIS', 'patriot', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/451.jpg'), ('Valentine', 'Julia47@hotmail.com', 'IOztApw7MMrmN7i', 'attendant enthusiast, engineer 👎🏾', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1164.jpg'), ('Emiliano', 'Vince_Haley@gmail.com', 'vuYjvpFKsbCVGrX', 'cheetah enthusiast, public speaker', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/853.jpg'), ('Angus', 'Deangelo.Hahn38@hotmail.com', 'qDQxBMFtk2NbBB3', 'statement lover, geek ➖', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/453.jpg'), ('Serenity', 'Jaunita28@gmail.com', 'M6v9uxoaTHKGQx7', 'musician, singer, friend ❤️', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/345.jpg'), ('Angeline', 'Andy_Pouros@yahoo.com', 'dGulBMELlUKwuBW', 'creator', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/299.jpg'), ('Lacey', 'Lisa.Lueilwitz15@yahoo.com', 'FXUVAoEt9n_ewRj', 'walking enthusiast, founder 🏌🏿', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1067.jpg'), ('Jules', 'German.Rippin8@gmail.com', 'QvSHG4HUCDVkI9X', 'oversight enthusiast', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1240.jpg'), ('Tad', 'Dusty44@yahoo.com', 'TGnXTB_HaBWTyfh', 'filmmaker, photographer, public speaker ⏳', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/877.jpg'), ('Ressie', 'Easton.Pagac47@hotmail.com', 'DUNF32WnQhTDOAm', 'forehead junkie  🌚', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1045.jpg'), ('Lourdes', 'Rhett6@gmail.com', 'L8bQOVmyDfpuzPw', 'environmentalist, engineer, activist 🥁', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/283.jpg'), ('Winfield', 'Perry7@hotmail.com', 'JwSFAKZdybyIATE', 'thorn lover, scientist', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg'), ('Andrew', 'Victoria.Douglas69@gmail.com', 'w0qQqXEFvnj56Em', 'lawn supporter', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1000.jpg'), ('Reese', 'Russell14@gmail.com', '8TOCAM12spnjtiS', 'writer', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/940.jpg'), ('Alphonso', 'Devin.Kling@yahoo.com', '9JKyl5n29IguEuJ', 'star supporter', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/911.jpg'), ('Reagan', 'Alene_Ryan72@yahoo.com', 'XZAUVYADZNCuZBg', 'traveler, veteran', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/135.jpg'), ('Vito', 'Fletcher_Koelpin84@gmail.com', 'jmQAtlWkIVHTdhb', 'patriot, environmentalist, developer 🅿️', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1181.jpg'), ('Jaclyn', 'Gabriel20@hotmail.com', 'lfWN__6s8D3yHvp', 'typeface junkie, engineer 😫', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/335.jpg'), ('Myrtle', 'Destin70@hotmail.com', 'x4BWfqY_B5A_Zkj', 'mandolin junkie, model 🇨🇴', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1031.jpg'), ('Garret', 'Jakayla.Walker@hotmail.com', 'b80KXbqCqc3FYfl', 'tug devotee', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/612.jpg'), ('Rosemarie', 'Jake91@yahoo.com', 'iQftpTTZKXuUg8i', 'resist advocate, dreamer 🦢', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1068.jpg'), ('Abbigail', 'Dimitri.Koch@yahoo.com', 'TXsYgjyOpubUI5V', 'filmmaker, parent, model', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/935.jpg'), ('Jalyn', 'Mack90@hotmail.com', 'AWWxu1SHhmwFLhL', 'musician, musician, veteran', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/724.jpg'), ('Brent', 'Juana_Hickle@yahoo.com', 'b2dnM3xYXpFj1k_', 'boom fan, educator 📵', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/78.jpg'), ('Queenie', 'Kayley.Murazik@gmail.com', 'PcU5mzrmTUiZEnp', 'feast lover  🛸', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/397.jpg'), ('Zion', 'Ansley72@gmail.com', 'UQ2gw48dnyk7coq', 'deathwatch fan, streamer 🥘', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/496.jpg'), ('Trenton', 'Bennie.Rice@gmail.com', 'CY9ov2TJkuUomUP', 'buddy devotee  🧦', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/283.jpg'), ('Hermina', 'Abelardo57@gmail.com', 'SCs_Mw00IcMn1Xc', 'scientist, developer', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/72.jpg');

INSERT INTO languages (code, name)
    VALUES ('ar', 'Arabic'), ('zh', 'Chinese'), ('en', 'English'), ('fr', 'French'), ('de', 'German'), ('hi', 'Hindi'), ('id', 'Indonesian'), ('it', 'Italian'), ('ja', 'Japanese'), ('ko', 'Korean'), ('pt', 'Portuguese'), ('ru', 'Russian'), ('es', 'Spanish');

INSERT INTO speaks_languages (user_id, language_code)
    VALUES (1, 'it'), (2, 'ja'), (3, 'it'), (4, 'it'), (5, 'ru'), (6, 'en'), (7, 'pt'), (8, 'ko'), (9, 'it'), (10, 'ru'), (11, 'pt'), (12, 'ko'), (13, 'es'), (14, 'fr'), (15, 'en'), (16, 'es'), (17, 'en'), (18, 'ko'), (19, 'pt'), (20, 'fr'), (21, 'id'), (22, 'ja'), (23, 'de'), (24, 'fr'), (25, 'zh'), (26, 'hi'), (27, 'ar'), (28, 'zh'), (29, 'en'), (30, 'ja'), (31, 'en'), (32, 'ko'), (33, 'it'), (34, 'it'), (35, 'zh'), (36, 'ko'), (37, 'fr'), (38, 'ar'), (39, 'ko'), (40, 'zh');

INSERT INTO learning_languages (user_id, language_code, level)
    VALUES (1, 'ko', 2), (2, 'en', 1), (3, 'en', 1), (4, 'en', 3), (5, 'ar', 3), (6, 'zh', 3), (7, 'it', 1), (8, 'es', 2), (9, 'pt', 3), (10, 'ko', 3), (11, 'de', 3), (12, 'zh', 2), (13, 'id', 3), (14, 'pt', 2), (15, 'id', 2), (16, 'de', 3), (17, 'en', 2), (18, 'en', 3), (19, 'ko', 1), (20, 'pt', 3), (21, 'zh', 2), (22, 'hi', 3), (23, 'ja', 3), (24, 'ar', 1), (25, 'hi', 1), (26, 'zh', 3), (27, 'ko', 3), (28, 'ar', 1), (29, 'ar', 1), (30, 'es', 2), (31, 'fr', 1), (32, 'ru', 1), (33, 'ja', 1), (34, 'ja', 2), (35, 'fr', 2), (36, 'en', 1), (37, 'it', 2), (38, 'ja', 1), (39, 'fr', 2), (40, 'ar', 2);
