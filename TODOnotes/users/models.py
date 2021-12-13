from django.db import models

# Create your models here.

class User(models.Model):
    username = models.CharField(max_length=64)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    email = models.EmailField(max_length=64, unique=True)

    def __str__(self):
        return f'{self.username}'

