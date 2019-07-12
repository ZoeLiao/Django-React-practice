from django.db import models
from django_mysql.models import ListTextField


# Create your models here.

class Word(models.Model):
    word = models.CharField(max_length=100)
    meaning = models.CharField(max_length=200)
    language = models.CharField(max_length=10)
    examples = ListTextField(
        base_field=models.CharField(max_length=400),
        max_length=10
    )
    notes = ListTextField(
        base_field=models.CharField(max_length=400),
        max_length=10
    )
    test_status = models.IntegerField(default=0)
    test_number = models.IntegerField(default=0)

    def __str__(self):
        return self.word
