# RIVAL-Learning
Learning Platform For R I V A L Guildies

https://laravel.com/docs/5.8

https://laravel.com/docs/5.8/blade

https://laravel.com/docs/5.8/requests

https://laravel.com/docs/5.8/responses

https://laravel.com/docs/5.8/views

# FIRST THINGS FIRST
This part will be tricky. 
You'll need to open cmder and "CD" to the location where you pulled the repo

CD is how your shell maneuvers around your file structure.

My Repos are located in my D:\Repos\

To access these I have to open Cmder and enter the following, your path will be different on step two.

> D:

> cd /Repos/Rival-Learning/app

then run

> npm install

> composer install

after that  

> cd ..

> docker-compose up -d


# Controllers 
https://laravel.com/docs/5.8/controllers

app > app > Http > Controllers

# Models 
app > app > Models 

# Views ( The Pages )
app > resources > views

Layouts > This is the overall layout for the entire application, 
all the pages will be extended off of the app layout unless a 
different layout is necessary.

Partials > These are pieces that make up the a whole page, they can be passed data 
from the view that includes them

view > These are the individual pages, there will be a new page similar to 'index.blade.php'
for every new page, these will have @includes() that bring in partials. Whenever something will be used on multiple
views, make it a partial and then @include() it

# Resources
app > resources

Assets >
 - js
    This is where you will create any new javascript files and then import them into the app.js to be executed.
 - sass
    This is where you will create and custom styles for the html pages.

Lang > Don't worry about lang, just don't mess with it.



# Public
app > public

There's no reason to touch or change anything in here because 
this all gets generated based on what you have in your resource folder

# Routes
app > routes

This is how the server knows what to give the client.

i.e. https://facebook.com/kase.tebo 

the route would be something like

Route::get('/{username}', 'profileController@index')->name('user.profile');

This tells the server that if there's anything after the 
slash it's a username and it will send it to the**profileController**
and run the function index in the**profileController**, which would then return
the profile**view** to the client.

**There are multiple types of routes**

GET - POST - PATCH - PUT - DELETE - OPTIONS

These each do different things, find the specific one for your purpose

https://laravel.com/docs/5.8/routing