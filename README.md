# Full-Stack Real-Time Chat Application

A Real-Time chat application like Whatsapp with React, Redux-Toolkit, Material-UI, Expressjs, Socket.io and Postgresql.

- Implemented Authentication and Authorization using JsonWebTokens and Tokens are stored in httpOnly Secure Cookies.
- Cookie data is stored on server side using Express-Session for better security.
- Added Refresh Tokens in case Access Tokens expire
- Socket.io is used to implement websocket connection and real-time communications.
- User data and messages are stored in Postgresql database
