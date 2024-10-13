const withPagination = require("sequelize-cursor-pagination");

module.exports = (sequelize, DataTypes) => {
    const Organization = sequelize.define('organization', {
        uid: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            field: 'uid',
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'name',
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            field: 'email',
        },
        prefix: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'prefix',
        },
        userLimit: {
            type: DataTypes.INTEGER,  // Use INTEGER for userLimit
            allowNull: true,
            defaultValue: 0,
            field: 'userLimit',
        },
        subscriptionType: {  // Fixed typo here
            type: DataTypes.STRING,
            allowNull: true,
            field: 'subscriptionType',
        },
        subscriptionPlan: {  // Fixed typo here
            type: DataTypes.INTEGER,  // Use INTEGER for subscriptionPlan
            allowNull: true,
            defaultValue: 0,
            field: 'subscriptionPlan',
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'phone',
            unique: true,
        },
        countryCode : {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'countryCode'
        },
        status : {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            field: 'status',
        }
    }, {
        tableName: 'organization',
        timestamps: true,  // Enable timestamps if needed
    });

    // Apply cursor-based pagination to Organization
    const options = {
        methodName: 'paginate',
        primaryKeyField: 'uid',
    };

    // withPagination(options)(Organization);

    return Organization;
};
