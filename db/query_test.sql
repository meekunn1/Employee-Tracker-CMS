SELECT r.id, r.title, r.salary, department.name
FROM role r
JOIN department ON r.department_id = department.id
ORDER BY id;