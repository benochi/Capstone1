import os, requests
from flask import Flask, render_template, redirect, session, jsonify, json, request, url_for
from werkzeug.exceptions import Unauthorized
from flask_sqlalchemy import SQLAlchemy
from models import connect_db, db, User, Favorite
from forms import RegisterForm, LoginForm, DeleteForm




app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql:///capstone"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'shhh'


connect_db(app)

# edamam API info

API_URL ="https://api.edamam.com/api/recipes/v2/"
APP_TYPE = "&type=public"
APP_KEY = "&app_key=32509beddb44b3a9db39d36d46528abc"
APP_ID = "&app_id=ae41cac9"
HEADERS = ['Accept-Encoding:: gzip',
'Content-Encoding:: gzip', 'Content-Type: application/json']

### recipe mthod to make API call to Edamam, Chart.js, then convert that into HTML markup for Jinja ###
## Status 200 example.
##https://api.edamam.com/api/recipes/v2/recipe_b79327d05b8e5b838ad6cfd9576b30b6?id=recipe_b79327d05b8e5b838ad6cfd9576b30b6&type=public&app_id=ae41cac9&app_key=32509beddb44b3a9db39d36d46528abc

@app.route("/") #get method
def homepage():
    """Homepage"""
    if "username" in session:
        return render_template("index.html")
    if "username" not in session:
        return redirect("/login")

@app.route('/register', methods=['GET', 'POST']) #get method route -> shows form
def register():
    """Form that will register/create a user"""
    if "username" in session:
        return redirect(f"/users/{session['username']}")
    form = RegisterForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        first_name = form.first_name.data
        last_name = form.last_name.data
        email = form.email.data
        user = User.register(username, password, first_name, last_name, email)
        db.session.commit()
        session['username'] = user.username
        return redirect(f"/users/{user.username}")
    else:
        return render_template("users/register.html", form=form)

@app.route('/login', methods=['GET', 'POST'])
def login():
    """Produce login form or handle login."""
    if "username" in session:
        return redirect(f"/users/{session['username']}")
    form = LoginForm()
    if form.validate_on_submit(): 
        username = form.username.data
        password = form.password.data
        user = User.authenticate(username, password) 
        if user:
            session['username'] = user.username
            return redirect(f"/users/{user.username}")
        else:
            form.username.errors = ["Invalid username/password."]
            return render_template("users/login.html", form=form)
    return render_template("users/login.html", form=form)

@app.route("/logout")
def logout():
    """Logout route."""
    session.pop("username") #logout user from session. 
    return redirect("/login") #Clear any information from the session and redirect to /

@app.route("/users/<username>")
def show_user(username):
    """Page for users."""
    if "username" not in session or username != session['username']:
        raise Unauthorized() #unauthorized from werkzueg
    user = User.query.filter_by(username=username).first()
    form = DeleteForm()
    return render_template("users/user.html", user=user, form=form)

@app.route("/users/<username>/delete", methods=["POST"])
def remove_user(username):
    """Remove user and redirect to login."""
    if "username" not in session or username != session['username']:
        raise Unauthorized()
    user = User.query.filter_by(username=username).first()
    db.session.delete(user)
    db.session.commit()
    session.pop("username")
    return redirect("/login")

### Handle favorites for specific user ###

@app.route('/add', methods=['POST'])
def add_favorite():
    """add favorite recipe for User"""
    username = session['username']
    if request.method == 'POST':
        favorites_id = request.values['favorite']   
        user = User.query.filter_by(username=username).first()
        user_id = user.users_id        
        favorite = Favorite(users_id=user_id, favorites_id=favorites_id)
        
        db.session.add(favorite)
        db.session.commit()
    return(favorites_id)

@app.route('/users/<username>/favorites') #methods=['GET', 'POST'])
def show_favorites(username):
    """send user favorites to edamam API as GET and generate markup from response"""
    if "username" not in session or username != session['username']:
        raise Unauthorized()
    user = User.query.filter_by(username=username).first_or_404()
    favorite_list =[]
    favorites = Favorite.query.filter(Favorite.users_id == user.users_id)
    #iterate over Database favorite_ids and only add unique URLs
    for i in favorites:
        if i.favorites_id not in favorite_list:
            favorite_list.append(i.favorites_id)

    #handle favorite recipe API calls and responses
    #https://api.edamam.com/api/recipes/v2/{id}
    #limit to first 5 results.
    fav_list = favorite_list[:3]
     
    fav_dict = {"recipe":[]}
    for recipe_id in fav_list:
        if 'recipe' in recipe_id:
            full_url = API_URL + recipe_id + '?id=' + recipe_id + APP_TYPE + APP_KEY + APP_ID
            response = requests.get(full_url)
            print(response)
            recipe_data = response.json()
            fav_uri = recipe_data['recipe']['uri']
            f_id = fav_uri.split("#")
            fav_id = f_id[1]
            fav_url = recipe_data['recipe']['url']
            fav_img = recipe_data['recipe']['image']
            fav_name = recipe_data['recipe']['label']
            fav_ings = recipe_data['recipe']['ingredientLines']
            fat = recipe_data['recipe']['totalNutrients']['FAT']['quantity']
            carbs = recipe_data['recipe']['totalNutrients']['CHOCDF']['quantity']
            protein = recipe_data['recipe']['totalNutrients']['PROCNT']['quantity']

            fav_recipe = {'uri': fav_uri, 'url' : fav_url, 'img' : fav_img, 'name': fav_name, 'recipe_id': fav_id}
            fav_recipe["ingredients"] = fav_ings
            fav_recipe["fat"] = fat
            fav_recipe["carbs"] = carbs
            fav_recipe["protein"] = protein
            fav_dict["recipe"].append(fav_recipe)
        else:
            fav_list.remove(recipe_id)

    print(fav_dict)
    return render_template("users/favorites.html", user=user, fav_dict=fav_dict)

@app.route("/delete/<id>", methods=["GET", "POST"])
def delete_favorite(id):
    """Remove favorite recipe"""
    user = session['username']
    recipe_to_delete = Favorite.query.filter(Favorite.favorites_id == id).first()
   
    db.session.delete(recipe_to_delete)
    db.session.commit()
    return redirect(url_for('show_favorites', username=user))


