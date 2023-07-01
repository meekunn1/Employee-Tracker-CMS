require('dotenv').config();
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const db = mysql.createConnection(
    {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    }
    // console.log(`Connected to the database: ${process.env.DB_NAME}`)
    );

//starting command
const intro = () => {
    console.clear();
    console.log(`
Welcome to Employee Manager`);
    console.log('Here, you can view and manipulate employee database.');
    return menu();
};

//intro prompt
const menu = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'Please choose from the following options.',
            choices: ['1) View all Departments', '2) View all Roles', '3) View all Employees', '4) Add a Department', '5) Add a Role', '6) Add an Employee', '7) Update an Employee Role', '8) Exit'],
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
        } else if (menu === '7) Update an Employee Role') {
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

//View All Department function
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
        console.log(`-----End of Table-----
        
What else would you like to do?`);
        return menu();
      }
    });
};

//View All Role function
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
        console.log(`-----End of Table-----

What else would you like to do?`);
        return menu();
      }
    });
};

//View All Employee function
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
        console.log(`-----End of Table-----
        
What else would you like to do?`);
        return menu();
      }
    });
};
//Add department function
const op4AddDepartment = () => {
    inquirer.prompt([
        {
          type: 'text',
          name: 'addDepartment',
          message: 'Please enter a name for the new Department. (Leave blank to return to main menu.)',
        }
    ]).then(({addDepartment}) => {
        if (!addDepartment.trim()) {
            console.log('There was no input. Returning to main menu.');
            return menu();
        } else {
        const sql = `INSERT INTO department (name) VALUES ("${addDepartment.trim()}");`;
        db.query(sql, (err, results) => {
            if (err) {
                console.log("Error: something went wrong");
                return menu();
            } else {
                console.log(
`----------
"${addDepartment.trim()}" have been added to Department database.
----------`);
                return menu();
            }
        })}
    });
};
//add role function
const op5AddRole = () => {
    let name = ''
    let salary = ''
    let department = ''
    const listSql = `SELECT name FROM department
    ORDER BY id;`;

    const rollName = () => {
        return inquirer.prompt([
            {
            type: 'text',
            name: 'addRoleName',
            message: 'Please enter a name for the new Role. (Leave blank to return to main menu.)',
            }
        ])
        .then(({addRoleName}) => {
            if (!addRoleName.trim()) {
                console.log('There was no input. Returning to main menu.');
                return menu();
            } else {
                name = addRoleName.trim();
                return rollSalary();}
        });
    };

    const rollSalary = () => {
        return inquirer.prompt([
            {
            type: 'number',
            name: 'addRoleSalary',
            message: 'Please enter the salary for the new Role.',
            },
        ])
        .then(({addRoleSalary}) => {
            if (!Number.isInteger(addRoleSalary)) {
                console.log('Please enter an number.');
                return rollSalary();
            } else {
                salary = addRoleSalary;
                return connectDepartment();
            }
        });
    };

const connectDepartment = async () => {
        return inquirer.prompt([
            {
              type: 'list',
              name: 'toDepartment',
              message: 'Choose the Department for this Role.',
              choices: await db.promise().query(listSql).then(([deptList]) => {return deptList})
            },
        ]).then(({toDepartment}) => {
            const sqlDept = `SELECT id FROM department WHERE name = '${toDepartment}';`;
        db.query(sqlDept, (err, results) => {
            if (err) {
                console.log("Error: something went wrong on sqlDept");
                return menu();
            } else {
                department = results[0].id;
                return addRoll();
            };
        });
    });
    }

    const addRoll = async () => {
            const buildSql = `INSERT INTO role (title, salary, department_id) VALUES ('${name}', ${salary}, ${department});`
            db.query(buildSql, (err, results) => {
                if (err) {
                    console.log("Error: something went wrong on buildSQL");
                    return menu();
                } else {
                    console.log(
`----------
"${name.trim()}" have been added to Role database.
----------

What else would you like to do?`);
                    return menu();
                };
        });
        }
rollName();
};

//Add employee function
const op6AddEmployee = () => {
    let eFirstName = '';
    let eLastName = '';
    let eRoleID = '';
    let eManagerID = '';
    const roleListSql = `SELECT title FROM role ORDER BY id;`;
    const managerListSql = `SELECT id, first_name, last_name FROM employee ORDER BY id;`;
    
    const addFirstName = () => {
    return inquirer.prompt([
        {
          type: 'text',
          name: 'FirsttName',
          message: 'Please enter the First Name of the Employee.',
        }
    ])
    .then(({FirsttName}) => {
        if (!FirsttName) {
            console.log('There was no input.');
            return addFirstName();
        } else {
            eFirstName = FirsttName.trim();
            return addLastName();
        }
      })
    };

    const addLastName = () => {
    return inquirer.prompt([
        {
          type: 'text',
          name: 'LastName',
          message: 'Please enter the Last Name of the Employee.',
        }
    ])
    .then(({LastName}) => {
        if (!LastName) {
            console.log('There was no input.');
            return addLastName();
        } else {
            eLastName = LastName.trim();
            return connectRole();
        }
      })
    };

    const connectRole = async () => {
        return inquirer.prompt([
            {
              type: 'list',
              name: 'toRole',
              message: 'What is the Role of this Employee?',
              choices: await db.promise().query(roleListSql).then(([roleList]) => {return roleList.map((r) => { return r.title})})
            },
        ]).then(({toRole}) => {
            const sqlRole = `SELECT id FROM role WHERE title = '${toRole}';`;
        db.query(sqlRole, (err, results) => {
            if (err) {
                console.log("Error: something went wrong on sqlRole");
                return menu();
            } else {
                eRoleID = results[0].id;
                return connectManager();
            };
        });
    });
    }

    const connectManager = async () => {
        return inquirer.prompt([
            {
              type: 'list',
              name: 'toManager',
              message: 'Who will manage this Employee?',
              choices: await db.promise().query(managerListSql).then(([maganerList]) => {return maganerList.map((r) => {return `${r.id} - ${r.first_name} ${r.last_name}`})})
            },
        ]).then(({toManager}) => {
            console.log(toManager);
            eManagerID = toManager.split('-')[0];
            console.log(eManagerID);
            return addEmployee();
    });
    }
    
    const addEmployee = async () => {
            const buildSql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${eFirstName}', '${eLastName}', ${eRoleID}, ${eManagerID});`
            db.query(buildSql, (err, results) => {
                if (err) {
                    console.log("Error: something went wrong on here");
                    return menu();
                } else {
                    console.log(
`----------
"${eFirstName} ${eLastName}" have been added to Employee database.
----------

What else would you like to do?`);
                    return menu();
                };
    });
    }
addFirstName();
};

//function to update the role of employee
const op7UpdateEmployeeRole = () => {
    let employeeID = '';
    let newRoleID = '';
    let employeeName = '';
    const EmployeeListSQL = `SELECT id, first_name, last_name FROM employee ORDER BY id;`;
    const roleListSql = `SELECT title FROM role ORDER BY id;`;
    const chooseEmployee = async () => {
        return inquirer.prompt([
            {
              type: 'list',
              name: 'theEmployee',
              message: 'Please choose who you would like to update.',
              choices: await db.promise().query(EmployeeListSQL).then(([EmployeeList]) => {return EmployeeList.map((r) => {return `${r.id} - ${r.first_name} ${r.last_name}`})})
            },
        ]).then(({theEmployee}) => {
            console.log(theEmployee);
            employeeName = theEmployee
            employeeID = theEmployee.split('-')[0];
            console.log(employeeID);
            return chooseRole();
    });
    }

    const chooseRole = async () => {
        return inquirer.prompt([
            {
              type: 'list',
              name: 'theRole',
              message: 'What is the new Role for this Employee?',
              choices: await db.promise().query(roleListSql).then(([roleList]) => {return roleList.map((r) => { return r.title})})
            },
        ]).then(({theRole}) => {
            const sqlRole = `SELECT id FROM role WHERE title = '${theRole}';`;
        db.query(sqlRole, (err, results) => {
            if (err) {
                console.log("Error: something went wrong on sqlRole");
                return menu();
            } else {
                newRoleID = results[0].id;
                return updateEmployee();
            };
        });
    });
    }
    
    const updateEmployee = async () => {
            const employeeUpdateSQL = `UPDATE employee SET role_id = ${newRoleID} WHERE id = ${employeeID}`
            db.query(employeeUpdateSQL, (err, results) => {
                if (err) {
                    console.log("Error: something went wrong on here");
                    return menu();
                } else {
                    console.log(
`----------
Role have been updated for "${employeeName}".
----------

What else would you like to do?`);
                return menu();
            };
    });
    }
chooseEmployee();
};
    

//Exit function
const exit = () => {
    console.clear();
    console.log(`----------
Exiting Employee Manager...

Please input "ctrl + c" in terminal to close this app.
----------`);
};