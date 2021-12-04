class Student {
    constructor(name, role) {
        this.name = name; 
        this.role = role; 
    }

    describe() {
        return `${this.name} is a ${this.role} in this club.`; 
    }
}

class Club {
    constructor(name) {
        this.name = name;
        this.students = [];
    }

    addStudent(student) {
        if (student instanceof Student){
            this.students.push(student);
        } 
    } 

    describe() {
        return `${this.name} has ${this.students.length} students.`; 
    }
}

class Menu {
    constructor() {
        this.clubs = [];
        this.selectedClub = null;
    }

    start() {
        let selection = this.showMainMenuOptions();

        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createClub();
                    break;
                case '2':
                    this.viewClub();
                    break;
                case '3':
                    this.deleteClub();
                    break;
                case '4':
                    this.displayClubs();
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions(); 
        }

        alert('Leaving Menu Prompt.');
    }

    showMainMenuOptions() {
        return prompt(`
        0. Exit
        1. Add New a Club
        2. View a Club
        3. Delete a Club
        4. Display All of the Clubs
        `)
    }

    showClubMenuOptions(clubInfo) {
        return prompt(`
        0. Return to Menu
        1. Add a Student
        2. Delete a Student
        -----------------
        ${clubInfo}
        `); 
    }

    displayClubs() { 
        let clubString = '';
        for(let i = 0; i < this.clubs.length; i++){
            clubString += i + ') ' + this.clubs[i].name + '\n'; 
        }

        alert(clubString);
    }

    createClub() {
        let name = prompt('Please enter the name of the new club: '); 
        this.clubs.push(new Club(name)); 
    }

    viewClub() {
        let index = prompt('Please enter the index number of the club you would like to view:');
        if(index > -1 && index < this.clubs.length) {
            this.selectedClub = this.clubs[index]; 
            let description = 'Club Name: ' + this.selectedClub.name + '\n';
            
            for (let i = 0; i < this.selectedClub.students.length; i++) {
                description += i + '. ' + this.selectedClub.students[i].name + ' - ' + this.selectedClub.students[i].position + '\n';
            }
            
            let selection = this.showClubMenuOptions(description);
            switch (selection) {
                case '1': 
                    this.createStudent();
                    break;
                case '2':
                    this.deleteStudent();
            }
        }
    }

    deleteClub() {
        let index = prompt('Please enter the index number of the club you you would like to delete:'); 
        if (index > -1 && index.clubs.length) {
            this.clubs.splice(index, 1);
        }
    }

    createStudent() {
        let name = prompt('Please add a name of a new student:');
        let role = prompt('Please add the role this new student has in the club:');
        this.selectedClub.students.push(new Student(name, role));
    }

    deleteStudent() {
        let index = prompt('Please enter the index number of the student you would like to delete:');
        if(index > -1 && index < this.selectedClub.students.length) {
            this.selectedClub.students.splice(index, 1);
        }
    }

}

let menu = new Menu ();
menu.start();