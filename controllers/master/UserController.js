
const database = require('../../config/dbClient')
const validator = require('../../utils/dataUtils')
const jwt = require('jsonwebtoken');
const auth = require('../../auth-service/authClient')
const process = require('process');
const env = process.env.HOST_ENV || 'development'; 
require('dotenv').config();

const hostConfig = require('../../config/envConfig').serviceConfig[env];
const defaultOrg = require('../../config/envConfig').defaultOrg[env];

module.exports = {
    addUser: async (data) => {
        try {
            if (data.userName) {
                if (!validator.isValidString(data.userName)) {
                    return new Error('Given User Name is Not Valid ...')
                }
            }

            if (data.email) {
                if (!validator.isValidEmail(data.email)) {
                    return new Error('Given Email is Not Valid ...')
                }
            }

            if (data.phone) {
                if (!validator.isValidPhoneNumber(data.countryCode, data.phone)) {
                    return new Error('Given Phone Number is Not Valid with Country Code Selection ...');
                }
            }

            if( !data.password ) {
                data.password = '123456'
            }
            if (!data.userName) {
                data.userName = data.email
            }

            if(!data.organizationUid) {
                data.organizationUid = defaultOrg.uid
            }
            
            let user = await database.User.create(data);

            return user;

        } catch (e) {
            return new Error(e.message);
        }
    },
    login : async ( header, data ) => {

        try {
            let devDetials = header['user-details']
            let devName = header['user-device-name']
            if (data.userName) {
                if (!validator.isValidString(data.userName)) {
                    return new Error('Given User Name is Not Valid ...')
                }
            }
    
            if (!data.password) {
                return new Error('Plase add the Valid Password...')
            }
    
            let user = await database.User.findOne({
                attributes : ['uid', 'userName'],
                where : {
                    userName : data.userName,
                    password : data.password
                } 
            })
    
            // Generate a secure token
            const token = await auth.generateToken(user);
    
            let login = {
                accessToken : token,
                staffUid : user.uid,
                deviceName : devName,
                deviceDetails : devDetials,
                sessionCount : 1   
            }
    
            let loginUser = await database.LoginSession.create(login)
    
            return loginUser;
        } catch (e) {
            return new Error(e.message);
        }
    },
    updateUser: async (userId, data) => {
        try {
            let user = await database.User.findOne({
                where: { uid: userId }
            });
    
            if (!user) {
                return new Error('User not found');
            }
    
            // Validate the new data
            if (data.userName) {
                if (!validator.isValidString(data.userName)) {
                    return new Error('Given User Name is Not Valid ...');
                }
            }
    
            if (data.email) {
                if (!validator.isValidEmail(data.email)) {
                    return new Error('Given Email is Not Valid ...');
                }
            }
    
            if (data.phone) {
                if (!validator.isValidPhoneNumber(data.countryCode, data.phone)) {
                    return new Error('Given Phone Number is Not Valid with Country Code Selection ...');
                }
            }
    
            // Update user details
            await user.update(data);
            return user;
    
        } catch (e) {
            return new Error(e.message);
        }
    },
    logout: async (loginUser) => {
        try {
            // Find active login session for the user
            let session = await database.LoginSession.findOne({
                where: {
                    staffUid: loginUser.staffUid,
                    accessToken : loginUser.accessToken
                }
            });
    
            if (!session) {
                return new Error('No active session found for user');
            }
    
            // End the session (delete or update its status)
            await session.destroy();
            return { message: 'Logged out successfully' };
    
        } catch (e) {
            return new Error(e.message);
        }
    },
    resetLoginUser: async (userUid) => {
        try {
            // Find all active login sessions for the user
            let sessions = await database.LoginSession.findAll({
                where: {
                    staffUid: userUid
                }
            });
    
            if (!sessions.length) {
                return new Error('No active sessions found for user');
            }
    
            // Delete all active sessions
            await database.LoginSession.destroy({
                where: {
                    staffUid: userUid
                }
            });
    
            return { message: 'All login sessions reset for the user' };
    
        } catch (e) {
            return new Error(e.message);
        }
    },
    deleteUser: async (userUid) => {
        try {
            let user = await database.User.findOne({
                where: { uid: userUid}
            });
    
            if (!user) {
                return new Error('User not found');
            }
    
            // Update status to 0 (indicating deletion)
            await user.update({ status: 0 });
            return { message: 'User deactivated successfully' };
    
        } catch (e) {
            return new Error(e.message);
        }
    },
    getUser: async (userUid) => {
        try {
            let user = await database.User.findOne({
                where: { uid: userUid },
                attributes: ['uid', 'userName', 'email', 'phone', 'status']  // Only return certain fields
            });
    
            if (!user) {
                return new Error('User not found');
            }
    
            return user;
    
        } catch (e) {
            return new Error(e.message);
        }
    },
    getUserList: async (filter = {}, limit = 10, offset = 0) => {
        try {
            let users = await database.User.findAll({
                where: filter,   // You can filter by certain fields, e.g., status: 1 for active users
                attributes: ['uid', 'userName', 'email', 'phone', 'status'],
                limit: limit,
                offset: offset
            });
    
            return users;
    
        } catch (e) {
            return new Error(e.message);
        }
    }
            
}