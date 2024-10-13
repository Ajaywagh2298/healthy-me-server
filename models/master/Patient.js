const { EXPECTED_OPTIONS_KEY } = require('dataloader-sequelize');
const withPagination = require("sequelize-cursor-pagination");

module.exports = function (sequelize, DataTypes) {
    const Patient = sequelize.define('patient', {
        uid: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            field: 'uid'
        },
        name : {
            type : DataTypes.STRING,
            allowNull : false,
            field : 'name'
        },
        sex : {
            type : DataTypes.STRING,
            allowNull : false,
            field : 'sex'
        },
        dateOfBirth : {
            type : DataTypes.STRING,
            allowNull : false,
            field : 'dateOfBirth'
        },
        weight : {
            type: DataTypes.STRING,
            allowNull : true,
            field : 'weight'
        } ,
        height : {
            type: DataTypes.STRING,
            allowNull : true,
            field : 'height'
        },
        bloodGroup: {
            type: DataTypes.STRING,
            allowNull : true,
            field : 'bloodGroup'
        } ,
        address: {
            type: DataTypes.STRING,
            allowNull : true,
            field : 'address'
        } ,
        patientDetails : {
            type: DataTypes.JSON,
            allowNull : true,
            field : 'patientDetails'
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            field: 'email'
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
        tableName: 'patient'
    });

    Patient.associate = function (models) {
        Patient.User = Patient.belongsTo(models.User, {
            onUpdate: 'RESTRICT',
            onDelete: 'RESTRICT',
            foreignKey: {
                allowNull: false
            }
        });
        Patient.Organization = Patient.belongsTo(models.Organization, {
            onUpdate: 'RESTRICT',
            onDelete: 'RESTRICT',
            foreignKey: {
                allowNull: false
            }
        });
    }

    const options = {
        methodName: 'paginate',
        primaryKeyField: 'uid'
    }
    // withPagination(options)(Patient);
    return Patient;
}

