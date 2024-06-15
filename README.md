# Zapper Backend
This repository contains a REST API for Zapper, a course project for PTI @FIB(UPC) 23-24.

## Modules
- **Nodemon:** auto-startup server when we save changes.
- **Mongoose:** module to connect with Atlas.
- **Dotenv:** create custom enviornment variables.
- **Mongo-sanitize**: module that sanitizes inputs against query selector injection attacks.
- **Morgan:** log requests.

## How to test

To run the server simply run and `nodemon` will restart the server every time we save the project.
```bash
npm run start
```

To test basic endpoints, there is a basic Bash script named `tester.sh`. To print usage run:
```bash
./tester.sh
```

## Troubleshooting
In case of getting an error running `npm run start` check current Node version. Try using the Node LTS version with `nvm`.
```bash
nvm use --lts
```
