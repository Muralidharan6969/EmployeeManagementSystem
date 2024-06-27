module.exports = (sequelize, DataTypes) => {
    const Form = sequelize.define('Forms', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        partNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        startTime: {
            type: DataTypes.DATE,
        },
        endTime: {
            type: DataTypes.DATE,
        },
        shiftAllocationId: {
            type: DataTypes.INTEGER,
			references: {
				model: 'EmployeeShiftAllocation',
				key: 'mappingId',
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

    Form.associate = (models) => {
        Form.belongsTo(models.EmployeeShiftAllocation, {foreignKey: 'shiftAllocationId'});
    }

    return Form;
}