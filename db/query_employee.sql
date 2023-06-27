SELECT employee.id, CONCAT(employee.first_name, ', ', employee.last_name) AS 'Employee', role.title, salary, manager_id
FROM employee
JOIN role ON employee.role_id = role.id
ORDER BY id;

