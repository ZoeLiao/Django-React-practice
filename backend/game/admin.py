from django.contrib import admin

from game.models import Word


# Register your models here.
class WordAdmin(admin.ModelAdmin):
    list_dieplay = ('word', 'language', 'meaning')


admin.site.register(Word, WordAdmin)
