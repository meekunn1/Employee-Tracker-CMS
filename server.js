require('dotenv').config();
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const db = mysql.createConnection(
    {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
    },
    console.log(`Connected to the database: ${process.env.DB_NAME}`)
    );

//starting command
const intro = () => {
    console.log('Welcome to Employee Manager');
    console.log('Here, you can view and manipulate employee database.')
    return menu()
};

//intro prompt
const menu = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'Please choose from the following options.',
            choices: ['1) View all Departments', '2) View all Roles', '3) View all Employees', '4) Add a Department', '5) Add a Role', '6) Add an Employee', '7) Update ad Employee Role', '8) Exit'],
        }
    ])
    .then(({menu}) => {
        if (menu === '1) View all Departments') {
            return op1ViewAllDepartment();
        } else if (menu === '2) View all Roles') {
            return op2ViewAllRole();
        } else if (menu === '3) View all Employees') {
            return op3ViewAllEmployees();
        } else if (menu === '4) Add a Department') {
            return op4AddDepartment();
        } else if (menu === '5) Add a Role') {
            return op5AddRole();
        } else if (menu === '6) Add an Employee') {
            return op6AddEmployee();
        } else if (menu === '7) Update ad Employee Role') {
            return op7UpdateEmployeeRole()
        } else if (menu === '8) Exit') {
            return exit();
        } else {
            console.log('error');
            return intro();
        }
    })
};

intro();

const op1ViewAllDepartment = () => {
    const sql = `SELECT * FROM department
    ORDER BY id;`;
    db.query(sql, (err, results) => {
      if (err) {
        console.log("Error: something went wrong");
        return menu();
      }  else{
        console.log(`
-----All Department-----`);
        console.table(results);
        return menu();
      }
    });
};

const op2ViewAllRole = () => {
    const sql = `SELECT r.id, r.title, r.salary, department.name
    FROM role r
    JOIN department ON r.department_id = department.id
    ORDER BY id;`;
    db.query(sql, (err, results) => {
      if (err) {
        console.log("Error: something went wrong");
        return menu();
      }  else{
        console.log(`
-----All Role-----`);
        console.table(results);
        return menu();
      }
    });
};

const op3ViewAllEmployees = () => {
    const sql = `SELECT e.id, e.first_name, e.last_name, role.title, salary, CONCAT(m.first_name, ' ', m.last_name) AS 'Manager'
    FROM employee e
    LEFT OUTER JOIN employee m ON e.manager_id = m.id
    JOIN role ON e.role_id = role.id
    ORDER BY id;`;
    db.query(sql, (err, results) => {
      if (err) {
        console.log("Error: something went wrong");
        return menu();
      }  else{
        console.log(`
-----All Employees-----`);
        console.table(results);
        return menu();
      }
    });
};

const op4AddDepartment = () => {
    console.log('4');
    return menu();
};

const op5AddRole = () => {
    console.log('5');
    return menu();
};

const op6AddEmployee = () => {
    console.log('6');
    return menu();
};

const op7UpdateEmployeeRole = () => {
    console.log('7');
    return menu();
};

const exit = () => {
    console.clear();
    console.log(`----------
Exiting Employee Manager...

Please input "ctrl + c" in terminal to close this app.
----------`);
}