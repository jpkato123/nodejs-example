import { body, validationResult } from "express-validator"
import HttpStatusCode from "../exceptions/HttpStatusCode.js"
import { studentRepository } from "../respositories/index.js"
import { MAX_RECORDS } from '../Global/constants.js'

async function getAllStudents(req, res) {
    //http://localhost:3002?page=1&size=100
    let { page = 1, size = MAX_RECORDS, searchString = '' } = req.query
    size = size >= MAX_RECORDS ? MAX_RECORDS : size
    try {
        let filteredStudents = await studentRepository.getAllStudents({
            size, page, searchString
        })
        res.status(HttpStatusCode.OK).json({
            message: "get all students successfully !",
            size: filteredStudents.length,
            page,
            searchString,
            data: filteredStudents

        })
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.message,
        })
    }
}

async function getStudentById(req, res) {
    let studentID = req.params.id
    try {
        const student = await studentRepository.getStudentById(studentID)
        res.status(HttpStatusCode.OK).json({
            message: 'Get detail students successflully',
            data: student
        })
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.message
        })
    }

}
async function updateStudent(req, res) {
    const {
        id,
        name,
        email,
        languages,
        gender,
        phoneNumber,
        address
    } = req.body
    // not need validate
    try {
        const student = await studentRepository.updateStudent(req.body)
        res.status(HttpStatusCode.OK).json({
            message: 'update students successflully',
            data: student
        })
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.message
        })
    }
}
async function insertStudent(req, res) {
    try {
        const student = await studentRepository.insertStudent(req.body)
        res.status(HttpStatusCode.OK).json({
            message: 'insert student successfully',
            data: student
        })
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'cannot insert student' + exception,
            validationErrors: exception.validationErrors
        })
    }
}
async function generateFakeStudents(req, res) {
    await studentRepository.generateFakeStudents(req.body)
    res.status(HttpStatusCode.INSERT_OK).json({
        message: 'insert student successfully',
        //data: student
    })
}
export default {
    getAllStudents,
    getStudentById,
    updateStudent,
    insertStudent,
    generateFakeStudents,// shoule be "private"
}