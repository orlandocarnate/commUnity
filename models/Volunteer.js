module.exports = (sequelize, DataTypes) => {
    const Volunteer = sequelize.define('Volunteer', {
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true
        },
        username: {
            type: DataTypes.TEXT,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
        },
        state: {
            type: DataTypes.STRING,
        },
        zip: {
            type: DataTypes.STRING,
        }
    });

    return Volunteer;
}
