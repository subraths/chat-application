# Full-Stack Real-Time Chat Application

A Real-Time chat application like Whatsapp with React, Redux-Toolkit, Material-UI, Expressjs, Socket.io and Postgresql.

### Demo
![Untitled_ Aug 12, 2023 9_49 AM](https://github.com/subraths/chat-application/assets/46223342/df8ce0e0-e161-4971-8fdb-d8ba01bb186d)


### Back-end

- Implemented Authentication and Authorization using JsonWebTokens and Tokens are stored in httpOnly Secure Cookies.
- Cookie data is stored on server side using Express-Session for better security.
- Added Refresh Tokens in case Access Tokens expire.
- Socket.io is used to implement websocket connection and real-time communications.
- User data and messages are stored in Postgresql database.

### Front-end

- React with typescript.
- Redux-Toolkit for state management and data fetching.
- Material-UI used as styled components.
- React-Router for client-side navigation.
