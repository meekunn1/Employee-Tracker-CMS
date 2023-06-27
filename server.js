require('dotenv').config();
const inquirer = require('inquirer');
const mysql = require('mysql2');

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
            choices: ['1) View all Departments', '2) View all Roles', '3) View all Employees', '4) Add a Department', '5) Add a Role', '6) Add an Employee', '7) Update ad Employee Role'],
        }
    ])
    .then(({menu}) => {
        if (menu === '1) View all Departments') {
            return op1ViewDepartment();
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
        } else {
            console.log('error');
            return intro();
        }
    })
};

intro();

const op1ViewDepartment = () => {
    console.log('1');
    return menu();
};

const op2ViewAllRole = () => {
    console.log('2');
    return menu();
};

const op3ViewAllEmployees = () => {
    console.log('3');
    return menu();
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
