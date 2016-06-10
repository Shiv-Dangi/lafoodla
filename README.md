#Lafoodla project

##Every programmer should follow  below instructions for the setup of the project:

Update:

    sudo apt-get update

Install python3 (If you don't have it installed already.)

    sudo apt-get install python3

and its setup tools
    
    sudo apt-get install python3-setuptools
    sudo easy_install3 pip

Few dependencies required for the project requirements    

    sudo apt-get install libjpeg-dev python3-dev build-essentials


### Install postgresql

Run  below command 

    sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ $(lsb_release -cs)-pgdg main 9.5" > /etc/apt/sources.list.d/pgdg.list'
    wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
    sudo apt-get update
    sudo apt-get install postgresql-9.5 libpq-dev

Create Database

    $ sudo su - postgres
    postgres@ubuntu:~$ createuser --interactive -P
    Enter name of role to add: dbuser
    Enter password for new role: <b><i>dbpassword</i></b>
    Enter it again: <b><i>admin123</i></b>
    Shall the new role be a superuser? (y/n) n
    Shall the new role be allowed to create databases? (y/n) n
    Shall the new role be allowed to create more new roles? (y/n) n
    postgres@ubuntu:~$
    postgres@ubuntu:~$ createdb --owner dbuser database_name
    postgres@django:~$ logout
    $

/*Note: Please report any errors you face while the postgres installation to Shivshankar. */

### Setup Virtual Environment

Create virtual environment and activate it(For virtualenvwrapper you can use http://docs.python-guide.org/en/latest/dev/virtualenvs/)

    sudo pip3 install virtualenv
    sudo pip3 install virtualenvwrapper
    sudo sh -c 'echo "export WORKON_HOME=~/Envs" >> ~/.bashrc'
    sudo sh -c 'echo "export VIRTUALENVWRAPPER_PYTHON=/usr/bin/python" >> ~/.bashrc'
    sudo sh -c 'echo "source /usr/local/bin/virtualenvwrapper.sh" >> ~/.bashrc'
    mkvirtualenv -p `which python3.4` hashenv 

Find requirements directory in cloned project under lafoodla/ and run

    pip install -r requirements/base.txt


### Setup local settings
Add the following to your `hashgrowth/hashgrowth/hashgrowth/settings/local.py`:

    from .base import *
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'USER': 'dbuser',
            'NAME': 'dbname',
            'PASSWORD': 'dbpassword',
            'HOST': 'localhost',
            'PORT': '5432',
        }
    }
    EMAIL_HOST = 'localhost'
    EMAIL_PORT = 1025

Edit the `manage.py` to configure according to your local settings:    

    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "testproject.settings.local")
    
Run the development server:    

    python3 manage.py makemigrations
    python3 manage.py migrate
    python3 manage.py runserver
    
Then you can create a `superuser` and again run the above. Your development server is up and running now.    

    python3 manage.py createsuperuser
