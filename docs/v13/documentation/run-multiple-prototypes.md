---
heading: Run multiple prototypes
title: Run multiple prototypes
---

You can run as many prototypes as you like, but each prototype needs a different port number. The default port is `3000` and you can view the prototype at http://localhost:3000/.

1. Open a new terminal. 
2. Navigate to your prototype folder and run the kit.
3. Enter `Y` to change to an available port.
4. View your prototype at http://localhost:3001/. 

## Set a port number
You can set a port number when you start your prototype. Run:
`PORT=3001 npm run dev`

## If you want to regularly run multiple prototypes
You can set a port number for your prototype in `app/config.js`:

```
{
  "serviceName": "Service name goes here",
  "port": 3001
}
```