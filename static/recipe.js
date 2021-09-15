"use strict";
//instance of recipeList

async function getAndShowRecipes() {
    const recipeList = await Recipe.getRecipes();
    //$recipesLoadingMsg.remove();
    //console.log(recipeList, "This is inside getandShow")
    putRecipesOnPage(recipeList);
    //console.log("get and show executed");
  }

async function generateRecipeMarkup(recipe) {
  //create bootstrap grid rows for up to ten results. Link to recipe page for cooking directions(not included in API response) 

    return $(`
    <div class="row">
      <div class="col-md-2 text-align" id="${recipe.recipeId}"><h3>${recipe.recipeName}<h3><br>
      <img src="${recipe.image}"alt="${recipe.recipeName}"width="200" height="200"><br>
      </div>
      <div class="col-md-8 text-align" id="ingredients + ${recipe.recipeId}">${recipe.ingredients}    
      </div>
      <div class="col-md-2 text-align" id="instructions + ${recipe.recipeId}">
      <a href="${recipe.url}">View cooking instructions for ${recipe.recipeName}!</a><br>
      </div>
    </div><br><hr>
      `);
  }

async function putRecipesOnPage(recipeList) {
    console.debug("putRecipesOnPage");
  
    $recipeGrid.empty(); //clear existing recipes from the HTML grid
    // loop through all recipes and generate HTML for them
      for (let recipe of recipeList) {
        const $recipe = await generateRecipeMarkup(recipe);
        $recipeGrid.append($recipe);
      }

    console.log("putRecipesOnPage end!")
    $recipeGrid.show();
  }