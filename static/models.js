"use strict";

const APP_KEY = "&app_key=32509beddb44b3a9db39d36d46528abc";
const APP_ID = "&app_id=ae41cac9";
const API_URL ="https://api.edamam.com/search?q=";
const HEADERS = ['Accept-Encoding:: gzip',
'Content-Encoding:: gzip', 'Content-Type: application/json'];

//Recipe class and API calls to get data

class Recipe{
    //make instance of recipe from data object from API:
    constructor({recipeId, recipeName, image, recipeUrl, recipeUri, ingredientList}){
        this.recipeId = recipeId;
        this.recipeName = recipeName;
        this.image = image;
        this.url = recipeUrl;
        this.uri = recipeUri;
        this.ingredients = ingredientList;
    };
    

    static async getRecipes(){
        //User values on homepage
        let ing1 = $('#ing1').val();
        let ing2 = $('#ing2').val();
        let ing3 = $('#ing3').val(); 
        let ing4 = $('#ing4').val();
        let ing5 = $('#ing5').val();
        let ingredients = [ing1, ing2, ing3, ing4, ing5]; //put values into array for API call
        
        let recipeList =[];
        let counter = 0;
        let full_url = API_URL + ingredients + APP_KEY + APP_ID; //dynamic API call using user ingredients
        await $.ajax({
                type: 'GET',
                url: full_url,
                success: function(data){ //get data.hits
                    console.log(data.hits[1]);
                    $(data.hits).each(function(i, value) {  //deconstruct the object inner arrays                        
                    $.each(value, function(index, item) { //deconstruct the object inner arrays again
                            let recipeName = value.recipe.label; 
                            let image = value.recipe.image;
                            let recipeUrl = value.recipe.url;
                            let recipeUri = value.recipe.uri;
                            let ingredientList=[];                          

                            if (value.recipe.ingredientLines){ //seperate ingredients from the other data. 
                                for(let i = 0; i < value.recipe.ingredientLines.length; i++){
                                    let ings = value.recipe.ingredientLines[i];
                                    ingredientList.push(ings);                                                                             
                                };
                            counter+=1;
                            //turn recipe obj from API into instance of Recipe class
                            //recipes = [recipeName, image, recipeUrl];
                            let recipeId = "recipe" + counter;
                            const recipe = new Recipe({recipeId, recipeName, image, recipeUrl, recipeUri, ingredientList});
                            recipeList.push(recipe);    
                            };      
                        });
                        
                    })
                    
                }
        })
        return recipeList;
    }

    static async pagination(){
        //Show previous/next 10 recipes
        let ing1 = $('#ing1').val();
        let ing2 = $('#ing2').val();
        let ing3 = $('#ing3').val(); 
        let ing4 = $('#ing4').val();
        let ing5 = $('#ing5').val();
        let ingredients = [ing1, ing2, ing3, ing4, ing5]; //put values into array for API call
        let pageNum = $('pager').val();
        let from;
        let to;

        let recipeList =[];
        let counter = 0;
        let full_url = API_URL + ingredients + APP_KEY + APP_ID ; //dynamic API call using user ingredients
        await $.ajax({
                type: 'GET',
                url: full_url,
                success: function(data){ //get data.hits
                    console.log(data.hits[1]);
                    $(data.hits).each(function(i, value) {  //deconstruct the object inner arrays                        
                    $.each(value, function(index, item) { //deconstruct the object inner arrays again
                            let recipeName = value.recipe.label; 
                            let image = value.recipe.image;
                            let recipeUrl = value.recipe.url;
                            let recipeUri = value.recipe.uri;
                            let ingredientList=[];                          
                            let isMore = value.recipe.more;
                            console.log(isMore);
                            
                            if (value.recipe.ingredientLines){ //seperate ingredients from the other data. 
                                for(let i = 0; i < value.recipe.ingredientLines.length; i++){
                                    let ings = value.recipe.ingredientLines[i];
                                    ingredientList.push(ings);                                                                             
                                };
                            counter+=1;
                            //turn recipe obj from API into instance of Recipe class
                            //recipes = [recipeName, image, recipeUrl];
                            let recipeId = "recipe" + counter;
                            const recipe = new Recipe({recipeId, recipeName, image, recipeUrl, recipeUri, ingredientList});
                            recipeList.push(recipe);    
                            };      
                        });
                        
                    })
                    
                }
        })
        return recipeList;
    }
} 



