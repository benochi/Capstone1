//example URL https://api.edamam.com/search?q=chicken&app_key=32509beddb44b3a9db39d36d46528abc&app_id=ae41cac9


const APP_KEY = "&app_key=32509beddb44b3a9db39d36d46528abc";
const APP_ID = "&app_id=ae41cac9";
const API_URL ="https://api.edamam.com/search?q=";
const HEADERS = ['Accept-Encoding:: gzip',
'Content-Encoding:: gzip', 'Content-Type: application/json'];

$(document).ready(function(){
    
    let ingredient_list=[];
    let instruction_list=[];
    
    let $recipeGrid = $('#recipe-grid');

    $("#recipe_search").click(function(evt){
        evt.preventDefault();
        let ing1 = $('#ing1').val();
        let ing2 = $('#ing2').val();
        let ing3 = $('#ing3').val();
        let ing4 = $('#ing4').val();
        let ing5 = $('#ing5').val();
        let ingredients = [ing1, ing2, ing3, ing4, ing5];
        let full_url = API_URL + ingredients + APP_KEY + APP_ID;
            $.ajax({
                type: 'GET',
                url: full_url,
                success: function(data){
                    console.log(data.hits);
                    $(data.hits).each(function(i, value) { 
                        $.each(value, function(index, item) { 
                            let recipe_name = value.recipe.label;
                            let image = value.recipe.image;
                            let recipe_url = value.recipe.url;
                            let counter = 0;
                            if (value.recipe.ingredientLines){
                                for(let i = 0; i < value.recipe.ingredientLines.length; i++){
                                    let ings = value.recipe.ingredientLines[i];
                                    ingredient_list.push(ings);
                                    counter = i;                                         
                                };
                            };                                
                            
                            recipeDivMaker(recipe_name, image, recipe_url, counter);
                            ingredientDivMaker(ingredient_list, counter);
                            //need create element div class='row' to append these too. currently appending to the same row Over and Over= uneven. 
                            /*    $recipes.append(recipes +'<br>',
                                            recipe_name +'<br>',
                                            '<img src="' + image + '" alt="' + recipe_name + '" width="200" height="200"><br>',
                                            '<a href="' + recipe_url +'">View recipe for ' + recipe_name +'!</a><br>',
                                            );
                                $ingredients.append(ingredient_list + '<br>');
                                //$instructions.append(instruction_list);//recipe_url*/
                            
                            })
                    })
                }
            })
    });
            /*<div 
            </div>
            <div class="col-md-5 text-align" id="ingredients">     
            </div>
            <div class="col-md-5 text-align" id="instructions">
            </div>*/
    function recipeDivMaker(recipe_name, image, recipe_url, counter) {
        let newDiv = jQuery("<div></div>");
        newDiv.prependTo(jQuery(this).parents("#recipe-grid"));
        newDiv.append(this);
        $(this).attr('id', 'recipes'+counter);
        $(this).attr('class', 'col-md-2 text-align');
        $(recipes,
        recipe_name +'<br>',
        '<img src="' + image + '" alt="' + recipe_name + '" width="200" height="200"><br>',
        '<a href="' + recipe_url +'">View recipe for ' + recipe_name +'!</a><br>',
        ).appendTo(this);
    };

    function ingredientDivMaker(ingredient_list, counter) {
        let newDiv = jQuery("<div>" + ingredient_list + "</div>");
        newDiv.prependTo(jQuery(this).parents("#recipe-grid"));
        newDiv.append(this);
        $(this).attr('id', 'ingredients'+counter);
        $(this).attr('class', 'col-md-6 text-align');
    };
});
    
