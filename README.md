# Django-React-practice

Django + React + Bootstrap + uwsgi
- This is a simple website for memorizing vocabulary words

## Overview
### Backend - Django
- A famouse high-level python web framework
- [Official Document](https://www.djangoproject.com/start/overview/)
- The backend is made by Django and built REST APIs by [Django REST framework](https://www.django-rest-framework.org/)
- By using Django, you can simply build a backend by:
    - `pip install django`
    - `django-admin startproject <project name>`
    - `cd <project name>`
    - `python manage.py startapp <app name>`
    - `python manage.py migrate`
    - `python manage.py runserver`
    - than visit [http://localhost:8000](http://localhost:8000)

### Frontend - React
- A JavaScript library for building user interfaces, which is made by Facebook
- [Official Document](https://reactjs.org/)
- You can quickly build a frontend by using the `create-react-app` CLI tool:
    - `npm install -g create-react-app`
    - `create-react-app <site name>`
    - `cd <site name>`
    - `yarn start`
    - than visit [http://localhost:3000](http://localhost:3000)
- Spice up the UI by [bootstrap](https://www.npmjs.com/package/bootstrap) and [reactstrap](https://reactstrap.github.io/)

### Frontend - Bootstrap
- An open source toolkit for developing with HTML, CSS, and JS
- [Official Document](https://getbootstrap.com/)

### uwsgi
- TBD

## Setup
###
- `pip install -r requirements.txt`
- `export PYTHONPATH=$PWD`

###
Migrate the database
- `python manage.py makemigrations game`
- `python manage.py migrate game`

## Reference
- [Build a To-Do application Using Django and React](https://scotch.io/tutorials/build-a-to-do-application-using-django-and-react#toc-setting-up-the-apis)
