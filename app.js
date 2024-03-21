const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

let students = [];
var idSetter = 0;

class Student {
    constructor(name, registrationNum) {
        this.name = name;
        this.registrationNum = registrationNum;
    }
}

function initializeStudentsArray() {
    let student1 = { id: ++idSetter, student: new Student("John", "16003089") };
    let student2 = { id: ++idSetter, student: new Student("Dan", "15003095") };
    let student3 = { id: ++idSetter, student: new Student("Robert", "17003698") };

    students.push(student1);
    students.push(student2);
    students.push(student3);
}

initializeStudentsArray();

app.get('/students', (req, res) => {
    res.json(students);
});

app.post('/students/:name-:registrationNum', (req, res) => {
    let data = req.params;
    let newStudent = { id: ++idSetter, student: new Student(data.name, data.registrationNum) };
    students.push(newStudent);
    res.status(201).json(newStudent);
});



app.put('/students/:id.:field-:value', (req, res) => {
    let data = req.params;

    if (data.field != "name" && data.field != "registrationNum") {
        res.status(404).send("The field submited is not from the ones a student has!");
        return;
    }

    let index = students.findIndex(student => student.id == data.id);

    if (index != -1) {
        students[index].student[data.field] = data.value;
        res.status(201).json(students[index]);
    } else {
        res.status(404).send("The id submited is not from any student!");
    }
})

app.delete('/students/:id', (req, res) => {
    let data = req.params;
    let index = students.findIndex(student => student.id == data.id);

    if (index != -1) {
        let tempCopy = JSON.stringify(students[index].student);
        students.splice(index, 1)
        res.status(201).json(`The student ${tempCopy} has been removed successfully`);
    } else {
        res.status(404).send("The id submited is not from any student!");
    }
})


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

