# Employee-Tracker-CMS

## Description

This is a command line app to access and manipulate employee database. It uses [mySQL](https://www.mysql.com/) for database with [npm mysql2](https://www.npmjs.com/package/mysql2) and [npm insuirer v8.2.4](https://www.npmjs.com/package/inquirer/v/8.2.4) to interact with it. Though making this app, I was able to practice using SQL commands and have better understanding of objects and arrays.

## Table of Contents

- [Employee-Tracker-CMS](#employee-tracker-cms)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Future](#future)
  - [Questions](#questions)

## Installation

Please go to the directory of this app. You would first need to copy paste the .env example file and rename it to just ".env". Go into the .env file and please enter your information. Next, go to termninal, make sure you are in the same directory as the package.json file, and run "npm i". This will install all the nexessary npm modlules to run this app. Lastly, you will need to run mysql and source the schema.sql and seeds.sql to build the database.

## Usage

In the terminal at the server.js directory, enter "node server.js" to get the app started. The app will start off with main menu options. Please follow the prompts to perform the selected actions. Once finished, you can end the app by choosing the exit option and following its direction.

Please go to my [googledrive video link](https://drive.google.com/file/d/1gNlp5sBgPZKf5RpKV4AIeQmqwsyUHKEw/view) for a video demonstration of this application.


## License
  
[![license](https://img.shields.io/badge/License-MIT-green)](https://choosealicense.com/licenses/mit/)

## Future

This is just an MVP.
Future tasks for this project includes creating funtions to update employee manager, view emplpoyee by managers, view employee by department, function to add salaries of all employees per department, and delete function for department, role, and employee.
Also, the server.js file is a total mess. I would like to reorganize by dividing it into separate js files.

## Questions

For any questions, please visit my [GitHub profile](https://github.com/meekunn1).

For any additinal questions, please contact me through email at: meekunn@gmail.com