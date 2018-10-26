import axios from "axios";

// The getRecipes method retrieves recipes from the server
export default {
  getRecipes: function(query) {
    return axios.get("/api/recipes", { params: { q: query } });
  }
};
