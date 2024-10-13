const { EXPECTED_OPTIONS_KEY } = require('dataloader-sequelize');
const withPagination = require("sequelize-cursor-pagination");

module.exports = function (sequelize, DataTypes) {
    const LoginSession = sequelize.define('loginSession', {
        uid: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            field: 'uid'
        },
        accessToken: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'accessToken'
        },
        deviceDetails: {
            type: DataTypes.JSON,
            allowNull: true,
            field: 'deviceDetails'
        },
        deviceName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'deviceName'
        },
        sessionCount: {
            type: DataTypes.INTEGER,  // Corrected data type
            allowNull: true,
            field: 'sessionCount'
        }
    }, {
        tableName: 'loginSession'
    });

    LoginSession.associate = function (models) {
        LoginSession.User = LoginSession.belongsTo(models.User, {
            onUpdate: 'RESTRICT',
            onDelete: 'RESTRICT',
            foreignKey: {
                allowNull: false
            }
        });
    };

    const options = {
        methodName: 'paginate',
        primaryKeyField: 'uid'
    };

    // Uncomment if you want to enable pagination
    // withPagination(options)(LoginSession);

    return LoginSession;
};
