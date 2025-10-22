
import Student from "../models/student.js";


export function getStudents(req, res) {
    Student.find().then((students) => {
        res.status(200).json(students)  
    }
    ).catch((err) => {
        res.status(500).json({
            message: "Error retrieving student data",
            error: err
        })
    }); 
}

export function saveStudent(req, res) {
    const student = new Student(req.body)
    student.save().then(() => {
        res.status(201).json({
            message: "Student data saved successfully"
        })
    }).catch((err) => {
        res.status(500).json({
            message: "Error saving student data",
            error: err
        })
    });
}   

export function updateStudent(req, res) {
    const studentId = req.params.id;
    Student.findByIdAndUpdate(studentId, req.body, { new: true }).then((student) => {
        res.status(200).json({
            message: "Student data updated successfully",
            student: student
        })
    }).catch((err) => {
        res.status(500).json({
            message: "Error updating student data",
            error: err
        })
    });
}

export function deleteStudent(req, res) {
    const studentId = req.params.id;
    Student.findByIdAndDelete(studentId).then(() => {
        res.status(200).json({
            message: "Student data deleted successfully"
        })
    }).catch((err) => {
        res.status(500).json({
            message: "Error deleting student data",
            error: err
        })
    });
}