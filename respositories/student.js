import Exception from "../exceptions/Exception.js"
import { Student } from "../models/index.js"
import { faker } from '@faker-js/faker'


const getAllStudents = async ({
    page,
    size,
    searchString,
}) => {
    //console.log("get All student with paging")
    // aggregate data for all students
    page = parseInt(page)
    size = parseInt(size)
    //searchString? name, email, address contains searchString
    let filteredStudents = await Student.aggregate([
        {
            $match: {
                $or: [
                    {
                        name: { $regex: `.*${searchString}`, $options: 'i' }
                    },//ignore case
                    {
                        email: { $regex: `.*${searchString}`, $options: 'i' }
                    },//ignore case
                    {
                        address: { $regex: `.*${searchString}`, $options: 'i' }
                    },//ignore case
                ]
            }
        },
        { $skip: (page - 1) * size },
        { $limit: size },

    ])
    return filteredStudents
}

const getStudentById = async (studentId) => {
    const student = await Student.findById(studentId)
    if (!student) {
        throw new Exception('cannot find student with id' + studentId)
    }
    return student
}
//languages : "english, vietnamese,japanese"
const insertStudent = async ({
    name,
    email,
    languages,
    gender,
    phoneNumber,
    adress
}) => {
    try {
        const student = await Student.create({
            name,
            email,
            languages,
            gender,
            phoneNumber,
            address
        })
        return student
    } catch (exception) {
        //error from validation
        if (!!exception.errors) {
            throw new Exception('input error', exception.errors)
        }
    }
    //console.log("insert student")
}
const updateStudent = async({
    id,
    name,
    email,
    languages,
    gender,
    phoneNumber,
    address
}) => {
    const student = await Student.findById(id)
    student.name = name ?? student.name
    student.email = email ?? student.email
    student.languages = languages ?? student.languages
    student.gender = gender ?? student.gender
    student.phoneNumber = phoneNumber ?? student.phoneNumber
    student.address = address ?? student.address
    await student.save()
    return student
}
async function generateFakeStudents() {
    [...Array(1000).keys()].forEach(async (index) => {
        let fakeStudent = {
            name: `${faker.person}-fake`,
            email: faker.internet.email(),
            languages: [
                faker.helpers.arrayElement(['English', 'Vietnamese', 'Japanes']),
                faker.helpers.arrayElement(['Korean', 'French', 'Chinese'])
            ],
            gender: faker.helpers.arrayElement(['Male', 'Female']),
            phoneNumber: faker.phone.imei(),
            address: faker.location

        }
        await Student.create(fakeStudent)
    })
}
export default {
    getAllStudents,
    insertStudent,
    updateStudent,
    generateFakeStudents,
    getStudentById,
}