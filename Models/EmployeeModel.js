module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define('Employees', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        employeeType: {
            type: DataTypes.ENUM('0', '1', '2')
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            type: DataTypes.STRING
        },
        reportsTo: {
            type: DataTypes.INTEGER,
            references: {
				model: 'Employees',
				key: 'id',
			},
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

    Employee.associate = (models) => {
        Employee.hasMany(Employee, { as: 'subordinates', foreignKey: 'reportsTo' });
        Employee.belongsTo(Employee, { as: 'manager', foreignKey: 'reportsTo' });
        Employee.belongsToMany(models.Shifts, { through: models.EmployeeShiftAllocation, foreignKey: 'employeeId', otherKey: 'shiftId' });
    }

    return Employee;
}