from django.shortcuts import render
from rest_framework import viewsets
from game.models import Word
from game.serializers import WordSerializer


# viewsets: provides the implementation for CRUD
class WordView(viewsets.ModelViewSet):
    serializer_class = WordSerializer
    queryset = Word.objects.all()

