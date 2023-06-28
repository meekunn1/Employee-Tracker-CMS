INSERT INTO department (name)
VALUES ("Administration"),
       ("Sales"),
       ("Data"),
       ("CNC Operators"),
       ("Fabricator");

INSERT INTO role (title, salary, department_id)
VALUES ("CAD Manager", 50000.00, 3),
       ("Fabricator Manager", 50000.00, 5),
       ("Sales Manager", 50000, 2),
       ("Office staff", 45000.00, 1),
       ("Sales representative", 40000.00, 2),
       ("CAD designer", 40000.00, 3),
       ("CAM programmer", 41000.00, 3),
       ("Trouble shooter", 45000.00, 3),
       ("Fabricator", 40000.00, 5),
       ("Welder", 41000.00, 5),
       ("Upholsterer", 41000.00, 5),
       ("Painter", 42000.00, 5),
       ("Electric Engineer", 43000.00, 5),
       ("CNC Operator", 40000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Ay', 'Bee', 3, NULL),
       ('See', 'Dee', 4, NULL),
       ('Yee', 'Eff', 4, 2),
       ('Jee', 'Ache', 5, 1),
       ('Ai', 'Jay', 5, 1),
       ('Kay', 'El', 1, NULL),
       ('Emm', 'Enn', 6, 6),
       ('Oh', 'Pea', 6, 6),
       ('Cue', 'Arr', 7, 6),
       ('Es', 'Tea', 8, 6),
       ('Yu', 'Vee', 2, NULL),
       ('UU', 'Ex', 9, 11),
       ('Why', 'Zee', 10, 11),
       ('Juan', 'Too', 11, 11),
       ('Three', 'Foe', 12, 11),
       ('Fyve', "Syx", 13, 11),
       ('Steven', "Ayt", 14, 11);