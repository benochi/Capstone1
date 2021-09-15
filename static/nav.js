"use strict";


$(document).ready(function(){

        $("#recipe_search").click(function(evt){
            evt.preventDefault();
            getAndShowRecipes();
            console.log("recipe search executed");
        })
    });
    