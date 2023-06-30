-- SELECT employee.id, CONCAT(employee.first_name, ', ', employee.last_name) AS 'Employee', role.title, salary, manager_id
-- FROM employee
-- JOIN role ON employee.role_id = role.id
-- ORDER BY id;

SELECT employee.id, employee.first_name, employee.last_name, role.title, salary, manager_id
FROM employee
JOIN role ON employee.role_id = role.id
ORDER BY id;

SELECT e.id, e.first_name, e.last_name, CONCAT(m.first_name, ', ', m.last_name) AS 'Manager', e.role_id
FROM employee e
LEFT OUTER JOIN employee m ON e.manager_id = m.id
ORDER BY id;

SELECT r.id, r.title, r.salary, department.name
FROM role r
JOIN department ON r.department_id = department.id
ORDER BY id;

SELECT id 
FROM employee 
WHERE first_name = 'Kay' AND last_name = 'El'
ORDER BY id;

SELECT id 
FROM department 
WHERE name = 'Fabricator';