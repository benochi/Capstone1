"use strict";
//instance of recipeList
//references models.js and recipe.js
let recipeListReponse = [];
let favoriteRecipesList =[];
let tempList = []; 

async function getAndShowRecipes() {
    const recipeList = await Recipe.getRecipes();
    putRecipesOnPage(recipeList);
    recipeListReponse = recipeList;
  }

async function generateRecipeMarkup(recipe) {
  //create bootstrap grid rows for up to ten results. Link to recipe page for cooking directions(not included in API response) 

    return $(`
    <div class="row">
      <div class="col-md-2 text-align" id="${recipe.recipeId}"><h3>${recipe.recipeName}</h3><br>
      <img src="${recipe.image}"alt="${recipe.recipeName}"width="200" height="200"><br>
      <button type="submit" id="AddFavorite" data-id="${recipe.uri}" class="favorite-add btn btn-primary mb-2">Favorite!</button>
      </div>
      <div class="col-md-8 text-align" id="ingredients_${recipe.recipeId}">${recipe.ingredients}    
      </div>
      <div class="col-md-2 text-align" id="instructions_${recipe.recipeId}">
      <a href="${recipe.url}">View cooking instructions for ${recipe.recipeName}!</a><br>  
      </div>
    </div><br><hr>
      `);
  }

async function putRecipesOnPage(recipeList) {
  
    $recipeGrid.empty(); //clear existing recipes from the HTML grid
    // loop through all recipes and generate HTML for them
      for (let recipe of recipeList) {
        const $recipe = await generateRecipeMarkup(recipe);
        $recipeGrid.append($recipe);
      }
    $recipeGrid.show();
  }

