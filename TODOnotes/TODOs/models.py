from django.db import models
from users.models import User

class Project(models.Model):
    name = models.CharField(max_length=64)
    repository = models.CharField(max_length=64, blank=True)
    users = models.ManyToManyField(User)

    def __str__(self):
        return f'{self.name}'


class TODO(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    text = models.CharField(max_length=200)
    created = models.DateTimeField(verbose_name='Создан', auto_now_add=True)
    updated = models.DateTimeField(verbose_name='Обновлен', auto_now=True)


    is_active = models.BooleanField(verbose_name='аткивен', default=True)

    def __str__(self):
        return f'{self.text}'



