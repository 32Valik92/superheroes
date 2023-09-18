# Getting Started with Heroes App

## Start
You will have two directories:\
Back: "server" directory.\
Front: "client" directory.

## How to launch project 

You have to open two cmd in your IDE or use something else like cmd.\
Then you have to do next steps:\

1. Install dependencies from '...\client\package.json' and '...\server\package.json'. 

2. Launch BackEnd:\
   In the first cmd you have to move to path where is "server" directory: '...\superheroes\server'. And use command:
### `npm run dev`

3. Launch FrontEnd:\
In the second cmd you have to move to path where is "client" directory: '...\superheroes\client'. And use command:
### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.\
BackEnd you can open [http://localhost:5000](http://localhost:5000)

The page will reload if you make edits.\
You will also see any lint errors in the console.


## About Project
After launching the project, you will see a Header that contains two options: Heroes page with create form and all info about chosen hero.\
\
Heroes page:
1. A form for creating a hero, where you need to enter the respective data about the hero you want to create.
2. A paginated list of heroes, where you can select any hero and navigate to their page with full information about them. You can also delete a hero or update their data.

HeroInfoPAge:
1. All information about chosen hero.
2. Image form where you can upload some image to your hero.
3. Hero's images list where you will see hero's images and there you can delete their if you want.