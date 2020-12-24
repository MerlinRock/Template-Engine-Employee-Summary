// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
// import { Employee } from "./Employee.mjs";
const Employee = require ("./Employee");
// console.log(Emp.name)


class Manager extends Employee {
    constructor(name, id, email, officeNum) {
        super(name, id, email);
        this.officeNumber = officeNum;
        // this.role = "Manager";
    }

    getOfficeNumber() {
        return this.officeNumber;
    }
}

module.exports = Manager;