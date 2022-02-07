from .base import *

DEBUG = False
ALLOWED_HOSTS = ['*']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'TODOnotes',
        'USER': 'mitrosha',
        'PASSWORD': 'password',
        'HOST': 'db',
        'PORT': '5432'
    }
}
