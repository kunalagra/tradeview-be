<h1 align="center">
  <br>
  TradeView Backend
  <br>
</h1>

<h4 align="center">Fastify + Prisma Backend for TradeView</h4>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#credits">Credits</a> •
  <a href="#license">License</a>
</p>


## Key Features

* Websocket for Data Streaming of Indices
* Typescript codebase with schema validations
* Prisma ORM with SQLite DB
* JWT based Auth
* Utilises fastify plugin systems with AutoLoad plugin to load them
- All Endpoints (prefix: v1)
    - POST user/login
    - POST user/register
    - GET user/profile
    - GET portfolio/holdings
    - POST order/place_order
    - GET market/historical-data
    - GET market/unique-symbols
    - Websocket market//ws-market-data
    
  

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/kunalagra/tradeview-be

# Go into the repository
$ cd tradeview-be

# Rename .env.example to .env
$ mv .env.example .env

# Install dependencies
$ npm install

# Run the app
$ npm run dev
```
> [!IMPORTANT]  
> Populate your .env keys with their respective values. 

> [!NOTE]
> If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

## Credits

This software uses the following packages:

- [Node.js](https://nodejs.org/)
- [Fastify](https://fastify.dev/)
- [Prisma](https://www.prisma.io/)


## You may also like...

- [Codegamy](https://github.com/kunalagra/codegamy) - An AIO Medical platform to connect doctors and patients
- [Sikho](https://github.com/kunalagra/sikho) - Professional Learning Marketplace

## License

AGPL-3
