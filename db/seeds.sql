INSERT INTO department (id, name)
VALUES (1, "Administration"),
       (2, "Sales"),
       (3, "Data"),
       (4, "CNC Operators"),
       (5, "Fabricator");

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "CAD Manager", 50000.00, 3),
       (2, "Fabricator Manager", 50000.00, 5),
       (3, "Sales Manager", NULL, 2),
       (4, "Office staff", 40000.00, 1),
       (5, "Sales representative", 40000.00, 2),
       (6, "CAD designer", 40000.00, 3),
       (7, "CAM programmer", 40000.00, 3),
       (8, "Trouble shooter", 40000.00, 3),
       (9, "Fabricator", 40000.00, 5),
       (10, "Welder", 40000.00, 5),
       (11, "Upholsterer", 40000.00, 5),
       (12, "Painter", 40000.00, 5),
       (13, "Electric Engineer", 40000.00, 5),
       (14, "CNC Operator", 40000.00, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, 'Ay', 'Bee', 3, NULL),
       (2, 'See', 'Dee', 4, NULL),
       (3, 'Yee', 'Eff', 4, 2),
       (4, 'Jee', 'Ache', 5, 1),
       (5, 'Ai', 'Jay', 5, 1),
       (7, 'Emm', 'Enn', 1, NULL),
       (6, 'Kay', 'El', 6, 7),
       (8, 'Oh', 'Pea', 6, 7),
       (9, 'Cue', 'Arr', 7, 7),
       (10, 'Es', 'Tea', 8, 7),
       (11, 'Yu', 'Vee', 2, NULL),
       (12, 'UU', 'Ex', 9, 11),
       (13, 'Why', 'Zee', 10, 11),
       (14, 'Juan', 'Too', 11, 11),
       (15, 'Three', 'Foe', 12, 11),
       (16, 'Fyve', "Syx", 13, 11),
       (17, 'Steven', "Ayt", 14, 11);