## Installation
- Clone or download this repository.
- Go to proper directory and install packages
```
- cd pokedex
- npm i
```
- Go back and enter data directory and run Json server
```
- cd ..
- cd data
- json-server --watch db.json
```
- If you will have a problem turning on Json server, type:
```
- Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
- json-server --watch db.json
```
- Open new terminal and go to pokedex and run dev mode
```
- to open new terminal press ctrl+shift+`
- cd pokedex
- npm run dev
```
Project will start at: http://localhost:5173/
