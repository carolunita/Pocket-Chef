var db = require("../models");
const axios = require("axios");

module.exports = app => {
	
	// ---------------
	// GET REQUESTS
	// ---------------

	// Retrieve Recipess
	app.post("/api/recipes", (req, res) => {
		var query = {};
	  //query.UserId =1;
		query.UserId = req.body.user_id; //
		db.Recipe.findAll({
			where: query,
			include: [db.User]
		}).then(recipes => {
			res.json(recipes);
		});
	});

	// Retrieve Filtered Recipe Cards
	app.post("/api/recipes/filter", (req, res) => { 
		var query = {};
		query.UserId = req.body.user_id;
		query.categoryName = req.body.categoryName;
		db.Recipe.findAll({
			where: query,
			include: [db.User]
		}).then(recipes => {
			res.json(recipes);
		});
	});

	// Retrieve a Single Recipe
	app.post("/api/recipes/recipe", (req, res) => {
		var query = {};
		query.id = req.body.id;
		db.Recipe.findAll({
			where:query,
			include: [db.User]
		}).then(recipes => {
			res.json(recipes);
		});
	});

	// Retrieve Recipe Cards based on Recipe ID
	app.post("/api/cards/:recipeId", (req, res) => {
		db.Card.findAll({
			where: {
				RecipeId: req.params.recipeId
			},
			include: [db.Recipe]
		}).then(cards => {
			res.json(cards);
		});
	});

	// Retrieve all cards from all Recipes (for debugging)
	app.get("/api/cards", (req, res) => {
		db.Card.findAll({}).then(cards => {
			res.json(cards);
		});
	});

	// ---------------
	// POST REQUESTS
	// ---------------

	// Post Recipes
	app.post("/api/recipes/create", (req, res) => {
		let recipe=req.body;
	 // recipe.UserId=1;
		db.Recipe.create(req.body).then(result => {
			res.json(result);
		});
	});

	// Post cards
	app.post("/api/cards", (req, res) => {
		db.Card.create(req.body).then(result => {
			res.json(result);
		});
	});
	
	// ---------------
	// DELETE REQUESTS
	// ---------------

	// Delete Recipes
	app.delete("/api/recipes/:recipeId", (req, res) => {
		db.Recipe.destroy({
			where: {
				id: req.params.recipeId
			}
		}).then(result => {
			res.json(result);
		});
	});

	// Delete all cards with given Recipe ID
	app.delete("/api/cards/:recipeId", (req, res) => {
		db.Card.destroy({
			where: {
				RecipeId: req.params.recipeId
			}
		}).then(result => {
			res.json(result);
		});
	});

	// Deletes a card with given card id
	app.delete("/api/cards/delete/:id", (req, res) => {
		db.Card.destroy({
			where: {
				id: req.params.id
			}
		}).then(result => {
			res.json(result);
		});
	});


	// ---------------
	// SEARCH RECIPES
	// ---------------

	// Recipes Api to search for recipes
	app.get("/api/recipes", (req, res) => {
		axios
		  .get("http://www.recipepuppy.com/api/", { params: req.query })
		  .then(({ data: { results } }) => {
			  res.json(results)
		  })
		  .catch(err => res.status(422).json(err));
	  });
};