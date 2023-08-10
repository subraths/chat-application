export const MESSAGE_QUERY = `WITH user_messages AS (
  select 
    from_user.username AS sender,
    to_user.username AS receiver,
    m.id AS message_id,
    m.content AS content,
    u.id AS user_id,
    u.first_name AS firstName,
    u.last_name AS lastName,
    u.username
  AS username from users u
    LEFT JOIN messages m ON
      m.fromid = u.id OR m.toid = u.id 
    LEFT JOIN users from_user ON
      m.fromid = from_user.id 
    LEFT JOIN users to_user ON 
      m.toid = to_user.id 
  WHERE m.fromid = $1 OR m.toid = $1
 ) 
  SELECT 
    user_id,
    username,
    firstName,
    lastName,
  JSON_AGG(JSON_BUILD_OBJECT(
    'message_id', message_id,
    'message', content,
    'sender', sender,
    'receiver', receiver
  ) ORDER BY message_id
)
  AS messages FROM user_messages 
  GROUP BY 
    user_id, firstName, lastName, username;`;
