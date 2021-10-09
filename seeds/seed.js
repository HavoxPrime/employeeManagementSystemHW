const seedData = require("./seedData.json");
const connection = require("../config/connection");

function seedDepts(data) {
  for (const entry of data) {
    connection.query(`INSERT INTO departments(name) values ('${entry.name}')`);
  }
}

function seedRoles(data) {
  for (const entry of data) {
    connection.query(`INSERT INTO roles(title, salary, department_id) values
      ('${entry.title}', '${entry.salary}', '${entry.department_id}')`);
  }
}

function seedEmployees(data) {
  for (const entry of data) {
    if (entry?.manager_id)
      connection.query(`INSERT INTO employees(first_name, last_name, role_id, manager_id) values
      ('${entry.first_name}', '${entry.last_name}', '${entry.role_id}', '${entry.manager_id}')`);
    else
      connection.query(`INSERT INTO employees(first_name, last_name, role_id) values
      ('${entry.first_name}', '${entry.last_name}', '${entry.role_id}')`);
  }
}

seedDepts(seedData[0]);
seedRoles(seedData[1]);
seedEmployees(seedData[2]);
