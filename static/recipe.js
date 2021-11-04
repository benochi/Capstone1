"use strict";
//instance of recipeList
//references models.js and recipe.js
let recipeListReponse = [];
let favoriteRecipesList =[];
let tempList = []; 

async function getAndShowRecipes() {
  console.log($('#ing1').val())
  if (typeof $('#ing1').val() != 'undefined' && $('#ing1').val() != '') {
    console.log(ing1)
    const recipeList = await Recipe.getRecipes();
    if(recipeList.length == 0){
      putNoRecipesErrorOnPage();
    }
    else{
      putRecipesOnPage(recipeList);
      recipeListReponse = recipeList;
    }
  }
  else {
    putStringErrorOnPage($('ing1').val())
  }
}

async function generateRecipeMarkup(recipe) {
  //create bootstrap grid rows for up to ten results. Link to recipe page for cooking directions(not included in API response) 

    return $(`
    <div class="row">
      <div class="col-md-4 text-align" id="${recipe.recipeId}"><h3>${recipe.recipeName}</h3><br>
      <img class="visible-lg" src="${recipe.image}" alt="${recipe.recipeName} width="200" height="200" /><br>
      <button type="submit" id="AddFavorite" data-id="${recipe.uri}" class="favorite-add btn btn-danger mb-2">
        <i class="far fa-heart"></i>
      </button>
      </div>
      <div class="col-md-6 text-align" id="ingredients_${recipe.recipeId}"><h3>${recipe.ingredients}</h3>    
      </div>
      <div class="col-md-2 text-align" id="instructions_${recipe.recipeId}">
      <a href="${recipe.url}" target="_blank" rel="noopener noreferrer"><h3>View cooking instructions for ${recipe.recipeName}!</h3></a><br>  
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

function putStringErrorOnPage(val) {
  
    $recipeGrid.empty(); //clear existing recipes from the HTML grid
    // display error message with val
      const error = `<div class="alert alert-danger">
                        <h2>ingredient 1: "${val}"" is not a valid ingredient</h2>
                      </div>`
      $recipeGrid.append(error);
    $recipeGrid.show();
  }

function putNoRecipesErrorOnPage() {
  $recipeGrid.empty(); //clear existing recipes from the HTML grid
    // display error message with val
      const error = `<div class="alert alert-danger">
                        <h2>No recipes matched your search.</h2>
                      </div>`
      $recipeGrid.append(error);
    $recipeGrid.show();
  }
