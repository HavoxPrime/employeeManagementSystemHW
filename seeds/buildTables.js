const connection = require("../config/connection");

const createDepartments = `CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT, 
  name VARCHAR(45) NULL, 
  PRIMARY KEY (department_id), 
  UNIQUE INDEX department_id_UNIQUE (department_id ASC) VISIBLE);`;

const createRoles = `CREATE TABLE roles (
  role_id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(45) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (role_id),
  UNIQUE INDEX role_id_UNIQUE (role_id ASC) VISIBLE,
  INDEX fk_roles_1_idx (department_id ASC) VISIBLE,
  CONSTRAINT fk_roles_1
    FOREIGN KEY (department_id)
    REFERENCES departments (department_id));
`;
const createEmployees = `CREATE TABLE employees (
  employee_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(45) NOT NULL,
  last_name VARCHAR(45) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NULL REFERENCES employees(employee_id),
  PRIMARY KEY (employee_id),
  UNIQUE INDEX employee_id_UNIQUE (employee_id ASC) VISIBLE,
  INDEX fk_employees_1_idx (role_id ASC) VISIBLE,
  CONSTRAINT fk_employees_1
    FOREIGN KEY (role_id)
    REFERENCES roles (role_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
`;

const dropIfDepExists = `departments;`;
const dropIfRolesExists = `roles;`;
const dropIfEmpExists = `employees;`;

async function createTables() {
  connection.query(dropIfDepExists);
  connection.query(dropIfRolesExists);
  connection.query(dropIfEmpExists);
  connection.query(createDepartments);
  connection.query(createRoles);
  connection.query(createEmployees);
}

createTables();
