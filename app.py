from flask import Flask, render_template, redirect, session
from flask_debugtoolbar import DebugToolbarExtension
from werkzeug.exceptions import Unauthorized
from models import connect_db, db, User
from forms import RegisterForm, LoginForm


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "postgres:///capstone"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'shhh'

toolbar = DebugToolbarExtension(app)

connect_db(app)

BASE_URL = "https://api.edamam.com"
APP_KEY = "32509beddb44b3a9db39d36d46528abc"
APP_ID = "ae41cac9"

@app.route("/") #get method
def homepage():
    """Homepage redirects to register."""
    return render_template("index.html")

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
#@app.route('/secret') #make a GET request for /secret return “You made it!” (don’t worry, we’ll get rid of this soon)
#def secret():
 #   return redirect('/secret')
@app.route("/logout")
def logout():
    """Logout route."""
    session.pop("username") #logout user from session. 
    return redirect("/login") #Clear any information from the session and redirect to /

'''@app.route("/users/<username>")
def show_user(username):
    """Page for users."""
    if "username" not in session or username != session['username']:
        raise Unauthorized() #unauthorized from werkzueg
    user = User.query.get(username)
    form = DeleteForm()
    return render_template("users/show.html", user=user, form=form)
@app.route("/users/<username>/delete", methods=["POST"])
def remove_user(username):
    """Remove user nad redirect to login."""
    if "username" not in session or username != session['username']:
        raise Unauthorized()
    user = User.query.get(username)
    db.session.delete(user)
    db.session.commit()
    session.pop("username")
    return redirect("/login")
@app.route("/users/<username>/feedback/new", methods=["GET", "POST"])
def new_feedback(username):
    """Show add-feedback form and process it."""
    if "username" not in session or username != session['username']:
        raise Unauthorized()
    form = FeedbackForm()
    if form.validate_on_submit():
        title = form.title.data
        content = form.content.data
        feedback = Feedback(title=title, content=content, username=username)
        db.session.add(feedback)
        db.session.commit()
        return redirect(f"/users/{feedback.username}")
    else:
        return render_template("feedback/new.html", form=form)
@app.route("/feedback/<int:feedback_id>/update", methods=["GET", "POST"])
def update_feedback(feedback_id):
    """Show update-feedback form and handle it."""
    feedback = Feedback.query.get(feedback_id) #get feedback for specific user
    if "username" not in session or feedback.username != session['username']:
        raise Unauthorized()
    form = FeedbackForm(obj=feedback)
    if form.validate_on_submit():
        feedback.title = form.title.data
        feedback.content = form.content.data
        db.session.commit()
        return redirect(f"/users/{feedback.username}")
    return render_template("/feedback/edit.html", form=form, feedback=feedback)
@app.route("/feedback/<int:feedback_id>/delete", methods=["POST"])
def delete_feedback(feedback_id):
    """Delete feedback."""
    feedback = Feedback.query.get(feedback_id)
    if "username" not in session or feedback.username != session['username']:
        raise Unauthorized()
    form = DeleteForm()
    if form.validate_on_submit():
        db.session.delete(feedback)
        db.session.commit()
    return redirect(f"/users/{feedback.username}")
'''