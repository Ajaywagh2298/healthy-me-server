const withPagination = require("sequelize-cursor-pagination");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        uid: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            field: 'uid'
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'userName'
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            field: 'email'
        },
        admin: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            field: 'admin',
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'password'
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
        tableName: 'user',
        timestamps: true, // Assuming you need timestamps for createdAt/updatedAt
    });

    // Define associations
    User.associate = (models) => {
        User.belongsTo(models.Organization, {
            onUpdate: 'RESTRICT',
            onDelete: 'RESTRICT',
            foreignKey: {
                allowNull: false,
                name: 'organizationUid', // Adjust the foreign key name if needed
            },
            as: 'organization' // Alias for the relation
        });
    };

    // Enable cursor-based pagination
    const paginationOptions = {
        methodName: 'paginate', // Adds the paginate method to the model
        primaryKeyField: 'uid', // Pagination will work based on the 'uid' field
    };

    // Apply the pagination plugin
    // withPagination(paginationOptions)(User);

    return User;
};
