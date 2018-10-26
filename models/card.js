module.exports = (sequelize, DataTypes) => {
	var Card = sequelize.define("Card", {
		recipe: {
			type: DataTypes.STRING,
			allowNull: false
		},
	});

	Card.associate = models => {
		Card.belongsTo(models.Recipe, {
			foreignKey: {
				allowNull: false
			}
		});
	};

	return Card;
};