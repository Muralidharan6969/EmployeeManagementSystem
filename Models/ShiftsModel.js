module.exports = (sequelize, DataTypes) => {
    const Shift = sequelize.define('Shifts', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        shiftName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        shiftStartHour: {
            type: DataTypes.INTEGER,
        },
        shiftStartMinutes: {
            type: DataTypes.INTEGER,
        },
        shiftEndHour: {
            type: DataTypes.INTEGER,
        },
        shiftEndMinutes: {
            type: DataTypes.INTEGER,
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        deletedAt: {
            type: DataTypes.DATE
        }
    },
    {
        paranoid: true,
        freezeTableName: true
    });

    Shift.associate = (models) => {
        // Many-to-Many relationship with Employee through EmployeeShiftAllocation
        Shift.belongsToMany(models.Employees, { through: models.EmployeeShiftAllocation, foreignKey: 'shiftId', otherKey: 'employeeId' });
    };

    return Shift;
}