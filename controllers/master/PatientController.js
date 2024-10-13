const database = require('../../config/dbClient'); // Adjust path as necessary
const validator = require('../../utils/dataUtils'); 
const process = require('process');
const env = process.env.HOST_ENV || 'development'; 
require('dotenv').config();
const defaultOrg = require('../../config/envConfig').defaultOrg[env];
const { Op, where } = require('sequelize'); 

module.exports = {
    // Function to add a new patient
    addPatient: async (data) => {
        try {
            // Validate patient data
            if (!data.name || !validator.isValidStringOnly(data.name)) {
                return new Error('Given Name is Not Valid ...');
            }

            if (!data.email || !validator.isValidEmail(data.email)) {
                return new Error('Given Name is Not Valid ...');
            }

            if (data.phone) {
                if (!validator.isValidPhoneNumber(data.countryCode, data.phone)) {
                    return new Error('Given Phone Number is Not Valid with Country Code Selection ...');
                }
            }
            if (!data.dateOfBirth) {
                return new Error('Date of Birth is required.');
            }
            if(!data.organizationUid) {
                data.organizationUid = defaultOrg.uid
            }
            let existUser = await database.User.findOne({
                where : {
                    [Op.or]: [
                        { email: data.email },
                        { phone: data.phone }
                    ]
                }
            })

            if (existUser) {
                return new Error('Patient with given email or phone already exists.');
            }

            let user = {
                userName : data.email,
                password : data.dateOfBirth,
                organizationUid : data.organizationUid,
                phone : data.phone,
                countryCode : data.countryCode,
                email : data.email
            }

            user = await database.User.create(user);
            data.staffUid = user.uid;
            // Create a new patient
            let patient = await database.Patient.create(data);
            return patient;
        } catch (e) {
            return new Error(e.message);
        }
    },

    // Function to update an existing patient
    updatePatient: async (patientUid, data) => {
        try {
            let patient = await database.Patient.findOne({
                where: { uid: patientUid }
            });

            if (!patient) {
                return new Error('Patient not found');
            }

            // Update the patient record
            await patient.update(data);
            return patient;
        } catch (e) {
            return new Error(e.message);
        }
    },

    // Function to delete a patient (soft delete by updating status)
    deletePatient: async (patientUid) => {
        try {
            let patient = await database.Patient.findOne({
                where: { uid: patientUid}
            });

            if (!patient) {
                return new Error('Patient not found');
            }

            // Soft delete by setting status to 0
            await patient.update({ status: 0 });
            return { message: 'Patient deactivated successfully' };
        } catch (e) {
            return new Error(e.message);
        }
    },

    // Function to get a single patient by ID
    getPatient: async (patientUid) => {
        try {
            let patient = await database.Patient.findOne({
                where: { uid: patientUid, status: 1 },
                attributes: ['uid', 'name', 'dateOfBirth', 'weight', 'height', 'bloodGroup', 'address', 'userDetails', 'status']
            });

            if (!patient) {
                return new Error('Patient not found or is inactive');
            }

            return patient;
        } catch (e) {
            return new Error(e.message);
        }
    },

    // Function to get a list of patients
    getPatientList: async (filter = {}, limit = 10, offset = 0) => {
        try {
            // Fetch patients with optional filters, limit, and offset
            let patients = await database.Patient.findAll({
                where: { ...filter, status: 1 }, // Fetch only active patients
                attributes: ['uid', 'name', 'dateOfBirth', 'weight', 'height', 'bloodGroup', 'address', 'userDetails', 'status'],
                limit,
                offset
            });

            return patients;
        } catch (e) {
            return new Error(e.message);
        }
    }
}
