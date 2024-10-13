const database = require('../../config/dbClient'); 
const validator = require('../../utils/dataUtils'); 

const { Op } = require('sequelize'); 

module.exports = {
    // Function to add a new organization
    addOrganization: async (data) => {
        try {
            // Validate organization data
            if (!data.name || !validator.isValidStringOnly(data.name)) {
                return new Error('Organization Name is not valid.');
            }

            if (!data.email || !validator.isValidEmail(data.email)) {
                return new Error('Email is not valid.');
            }

            if (!data.phone || !validator.isValidPhoneNumber(data.countryCode, data.phone)) {
                return new Error('Phone number is not valid with country code.');
            }

            // Check for duplicate email or phone
            let existingOrganization = await database.User.findOne({
                where: {
                    [Op.or]: [
                        { email: data.email },
                        { phone: data.phone }
                    ]
                }
            });

            if (existingOrganization) {
                return new Error('Organization with given email or phone already exists.');
            }

            // Create a new organization
            let organization = await database.Organization.create(data);

            let user = {
                userName : data.email,
                password : '123456',
                organizationUid : organization.uid,
                phone : data.phone,
                countryCode : data.countryCode,
                email : data.email,
                admin : 0
            }

            await database.User.create(user);

            return organization;
        } catch (e) {
            return new Error(e.message);
        }
    },

    // Function to update an existing organization
    updateOrganization: async (organizationUid, data) => {
        try {
            let organization = await database.Organization.findOne({
                where: { uid: organizationUid }
            });

            if (!organization) {
                return new Error('Organization not found');
            }

            // Update the organization record
            await organization.update(data);
            return organization;
        } catch (e) {
            return new Error(e.message);
        }
    },

    // Function to delete an organization (soft delete by updating status)
    deleteOrganization: async (organizationUid) => {
        try {
            let organization = await database.Organization.findOne({
                where: { uid: organizationUid }
            });

            if (!organization) {
                return new Error('Organization not found');
            }

            // Soft delete by setting status to 0
            await organization.update({ status: 0 });
            return { message: 'Organization deactivated successfully' };
        } catch (e) {
            return new Error(e.message);
        }
    },

    // Function to get a single organization by UID
    getOrganization: async (organizationUid) => {
        try {
            let organization = await database.Organization.findOne({
                where: { uid: organizationUid, status: 1 },  // Fetch only active organizations
                attributes: ['uid', 'name', 'email', 'prefix', 'userLimit', 'subscriptionType', 'subscriptionPlan', 'phone', 'countryCode', 'status']
            });

            if (!organization) {
                return new Error('Organization not found or is inactive');
            }

            return organization;
        } catch (e) {
            return new Error(e.message);
        }
    }
}
