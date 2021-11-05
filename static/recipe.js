"use strict";
//instance of recipeList
//references models.js and recipe.js
let recipeListReponse = [];
let favoriteRecipesList =[];
let tempList = []; 
let resultCount = 10;

async function getAndShowRecipes() {
  if (typeof $('#ing1').val() != 'undefined' && $('#ing1').val() != '') {
    const recipeList = await Recipe.getRecipes();
    if(recipeList.length == 0){
      putNoRecipesErrorOnPage();
    }
    else{
      putRecipesOnPage(recipeList);
      recipeListReponse = recipeList;
      addPaginationButton(recipeListReponse);
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

  function addPaginationButton(recipeListReponse) {
    if(recipeListReponse.length >= 10) {
      $('#pager').empty().append('<button type="submit" id="page_right" data-id="${recipe.uri}" class="btn page-right"><i class="fas fa-arrow-right fa-5x"></i></button>');
    }
  }
  
// Pagination functions

async function getAndShowNextPage(){
  console.log("Running get and show next page");
  if (typeof $('#ing1').val() != 'undefined' && $('#ing1').val() != '') {
    const recipePagesList = await Recipe.paginationRecipes(resultCount);
    if(recipePagesList.length == 0){
      putNoMorePagesError();
    }
    else{
      putRecipesOnPage(recipePagesList);
      recipeListReponse = recipePagesList;
      addPaginationButton(recipeListReponse);
      resultCount += 10
      console.log("resultcount increased")
    }
  }
  else {
    putStringErrorOnPage($('ing1').val())
  }
}

function putNoMorePagesError() {
  $recipeGrid.empty(); //clear existing recipes from the HTML grid
    // display error message with val
      const error = `<div class="alert alert-danger">
                        <h2>No more recipes matched your search.</h2>
                      </div>`
      $recipeGrid.append(error);
    $recipeGrid.show();
  }

//https://api.edamam.com/search?q=%22chicken%22&app_id=ae41cac9&app_key=32509beddb44b3a9db39d36d46528abc&from=10&to=20
    /* "_links" : {
    "next" : {
      "title" : "Next page",
      "href" : "https://api.edamam.com/api/food-database/v2/parser?..."
    }
} */