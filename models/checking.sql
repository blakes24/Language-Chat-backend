SELECT
  u.id,
  u.name,
  u.email,
  u.bio,
  u.image_url AS "imageUrl",
  active,
  social_provider AS "socialProvider",
  COALESCE(json_agg(json_build_object('code', l1.code, 'language', l1.name))) AS speaks,
  COALESCE(json_agg(json_build_object('code', l2.code, 'language', l2.name, 'level', ll.level))) AS learning
FROM
  users AS u
  JOIN speaks_languages AS sl ON u.id = sl.user_id
  JOIN languages AS l1 ON l1.code = sl.language_code
  JOIN learning_languages AS ll ON u.id = ll.user_id
  JOIN languages AS l2 ON l2.code = ll.language_code
WHERE
  u.id = $1
GROUP BY
  u.id
