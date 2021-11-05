"use strict";


$(document).ready(function(){
        //function goes to recipe.js
        $("#recipe_search").click(function(evt){ 
            evt.preventDefault();
            getAndShowRecipes();
        })

        $("body").on('click', ".page-right", function(evt){
            evt.preventDefault();
            getAndShowNextPage();
        })

        $("body").on('click', ".page-left", function(evt){
            evt.preventDefault();
            getAndShowPreviousPage();
        })

        $("body").on("click", ".favorite-add", function(){
            let recipeNumber = $(this).attr('data-id');
            //uses global variable from recipe.js and calls function in recipe.js, using string value for arg#2
            let recipeNumberSplit = recipeNumber.split('#');
            let recipeNumberUri = recipeNumberSplit[1];
            let icon = $(this).find('i')

            if(icon.hasClass('far fa-heart')){
                $.ajax({
                    type:'POST',
                    url:'/add',
                    data: jQuery.param({
                        favorite: recipeNumberUri
                    }),
                    success: function(result)
                    {
                        if (result) {
                            icon.removeClass().addClass('fas fa-heart'); // <i class="fas fa-heart"></i>
                        } else {
                            alert('removed from fav');
                            icon.removeClass().addClass('far fa-heart'); // <i class="far fa-heart"></i>
                        }
                    }
                })
            }
            if(icon.hasClass('fas fa-heart')){
                $.ajax({
                    type:'DELETE',
                    url:'/remove',
                    data: jQuery.param({
                        favorite: recipeNumberUri
                    }),
                    success: function(result)
                    {
                        if (result) {
                            icon.removeClass().addClass('far fa-heart'); 
                        } else {
                            alert('failed to remove favorite') 
                        }
                    }
                })
            }  
          });
});
    
    

    