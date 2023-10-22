# U.S. City Populations
## Requirements
- node version 18
- npm version 9

## Getting Started

First, clone the project locally:
```
git clone https://github.com/CORT0619/population-project.git
```

Then install the project dependencies:
```
npm install
```

Create a .env file in the root of the project with the following environment variables:
```
HOST
USER
PASSWORD
DATABASE
PORT

```

Once you're done the environment file should look like:
```
HOST=""
USER=""
PASSWORD=""
DATABASE=""
PORT=""
```



Once all dependencies have been installed, start the project and run:
```
npm start

```

In order to run the development server:
```
npm run dev
```

## Future Development
- make sure pg pools is used effectively
- better error handling
- implement real caching with redis