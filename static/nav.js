"use strict";


$(document).ready(function(){
        //function goes to recipe.js
        $("#recipe_search").click(function(evt){ 
            evt.preventDefault();
            getAndShowRecipes();
        })

        $("body").on("click", ".favorite-add", function(){
            let recipeNumber = $(this).attr('data-id');
            //uses global variable from recipe.js and calls function in recipe.js, using string value for arg#2
            let recipeNumberSplit = recipeNumber.split('#');
            let recipeNumberUri = recipeNumberSplit[1];
            
            $.ajax({
                type:'POST',
                url:'/add',
                data: jQuery.param({
                    favorite: recipeNumberUri
                }),
                success: function()
                {
                    alert('Favorited!');
                }
            }) 
          }); 

        $("#user-favorites").click(function(evt){
            evt.preventDefault();
            getAndShowFavorites();
        })

    });
    
