module.exports = (sequelize, DataTypes) => {
    const EmployeeShiftAllocation = sequelize.define('EmployeeShiftAllocation', {
        mappingId: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        employeeId: {
            type: DataTypes.INTEGER,
			references: {
				model: 'Employees',
				key: 'id',
			},
        },
        shiftId: {
            type: DataTypes.INTEGER,
			references: {
				model: 'Shifts',
				key: 'id',
			},
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false
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

    EmployeeShiftAllocation.associate = (models) => {
        EmployeeShiftAllocation.hasMany(models.Forms, {foreignKey: 'shiftAllocationId'});
        EmployeeShiftAllocation.belongsTo(models.Employees, { foreignKey: 'employeeId' });
        EmployeeShiftAllocation.belongsTo(models.Shifts, { foreignKey: 'shiftId' });
    }

    return EmployeeShiftAllocation;
}