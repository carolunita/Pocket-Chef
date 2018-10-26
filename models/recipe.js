module.exports = (sequelize, DataTypes) => {
	var Recipe = sequelize.define("Recipe", {
		recipeName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		categoryName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		bg: {
			type: DataTypes.STRING
		},
		ingredients: {
			type: DataTypes.STRING
		},
		instructions: {
			type: DataTypes.STRING
		},
	});

	Recipe.associate = models => {
		Recipe.belongsTo(models.User, {
			foreignKey: {
				allowNull: false
			}
		});
		Recipe.hasMany(models.Card, {
			onDelete: "cascade"
		});
	};

	return Recipe;
};