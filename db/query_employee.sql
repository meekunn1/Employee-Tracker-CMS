-- SELECT employee.id, CONCAT(employee.first_name, ', ', employee.last_name) AS 'Employee', role.title, salary, manager_id
-- FROM employee
-- JOIN role ON employee.role_id = role.id
-- ORDER BY id;

-- SELECT employee.id, employee.first_name, employee.last_name, role.title, salary, manager_id
-- FROM employee e
-- JOIN role ON employee.role_id = role.id
-- ORDER BY id;

SELECT e.id, e.first_name, e.last_name, role.title, salary, CONCAT(m.first_name, ', ', m.last_name) AS 'Manager'
FROM employee e
LEFT OUTER JOIN employee m ON e.manager_id = m.id
JOIN role ON e.role_id = role.id
ORDER BY id;
