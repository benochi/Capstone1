# RecipeLookup Application! 

  RecipeLookup uses a list of up to 5 ingredients to search the Edamam database for recipes that you can make 
  with those ingredients.  The database contains over 1.2 million ingredients to match users with several options.
  Users register to use the recipe search function and this allows users to save a list of favorite recipes for easy queueries.
  RecipeLookup will return a picture, recipe name, ingredient list, and a link to the cooking instructions if the user is interested. 

### Features:
    Registration of user accounts.
    Login and logout functionality.    
    Ingredient search of Edamam Database, providing the top 10 results that match the query.
    Queries result in 3 columns.  
      - The first column contains the recipe name, picture and a button to favorite the recipe.
      - The second column gives a list of all ingredients needed for the recipe.  
      - The third column provides a link to the site hosting the recipe.
      
    A user page which allows quick access to stored favorites. This is populated through a secondary API call
    to ensure updated recipes are returned.  Users can view current favorites and delete recipes they are no 
    longer interested in from the database on this page.
    
    These features were picked because I love to cook and wanted a fast way to find recipes from my leftovers.  
    I wanted the user experience to be fast, while also requiring registration to reduce abuse of the Edamam API.
    
## User flow
    Users will register to access the API.  
    This will be followed by searching for recipes using available ingredients.
    Users will get a list of recipes and can select favorites from the list.
    Users will be able to see the instructions for the recipe on the hosting site using a link.
    Users can favorite recipes and continue searching more recipes or go to their page to access favorites.
    Cook and enjoy! 
    
## Edamam API used for this app. 
    Recipe API - https://www.edamam.com/
    Developer docs - https://developer.edamam.com/edamam-docs-recipe-api
    API calls used -
      - Recipe search using ingredients - https://www.edamam.com/api/recipes/v2
      - Favorite individual recipes - https://www.edamam.com/api/recipes/v2/{id}

## Stack used in this app
  HTML, CSS, JavaScript, JQuery, Python, Flask, SQLAlchemy, Jinja2, WTForms, postgreSQL.
   Hosting through Github and Heroku. 
