// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.role = "Employee";
    }

    
    getRole() {
        return this.role;
        console.log(this.role, "is my role!");
    }
    getName() { 
        console.log(this.name, " is my name!");
        return this.name;
    }
    getId() { 
        console.log(this.id, " is my id!");
        return this.id;
    }
    getEmail() { 
        console.log(this.email, " is my email!");
        return this.email;
    }
    
}

// var employee1 = new Employee("DeAnna", "504", "rock@yahoo.com", "Intern")
// var employee2 = new Employee("Merlin", "426", "rock@gmail.com", "Employee")
// console.log(employee2)
// console.log(employee1)


module.exports = Employee;