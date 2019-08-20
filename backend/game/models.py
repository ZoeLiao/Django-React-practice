from django.db import models
from django_mysql.models import ListTextField

from game.utils.const import EN


class Word(models.Model):
    word = models.CharField(max_length=100)
    meaning = models.CharField(max_length=200, default="")
    language = models.CharField(max_length=10, default=EN)
    examples = ListTextField(
        base_field=models.CharField(max_length=400),
        max_length=10,
        blank=True
    )
    notes = ListTextField(
        base_field=models.CharField(max_length=400),
        max_length=10,
        blank=True
    )
    test_status = models.IntegerField(default=0)
    test_number = models.IntegerField(default=0)

    def __str__(self):
        return self.word
