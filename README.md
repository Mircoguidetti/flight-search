Flight Search App
===

> Simple Web app using Skyscanner APIs for search flights

## Prerequisites

In order to download and run this application you'll need these programs:
- [Git](https://git-scm.com/)
- [Node.js >= 11.9.0](https://nodejs.org/en/)

## Running the app

Clone the project and execute:

```
git clone https://github.com/Mircoguidetti/flight-search.git
cd flight-search
./start.sh
```

### 2. Setup the database service

If you want to specifically run the app locally here are the steps: (Assuming you are going to have MongoDB installed you need to run these commands to open a connection with the database locally)

```
> mkdir mongo-data
> cd mongo/bin
> ./mongod --dbpath ~/mongo-data
```

`start.sh` will execute `npm install` for you, it's good for
the first time you start the server but afterwards it's preferable
to start it using:

```
npm run start
```

## Development

To start the server in development mode run:
```npm run dev```
