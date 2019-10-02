from django.shortcuts import render
from django.contrib.auth import get_user_model

from rest_framework import (
    mixins,
    generics,
    serializers,
    viewsets,
    permissions,
)
from rest_framework.generics import CreateAPIView

from game.models import Word
from game.serializers import WordSerializer, UserSerializer


# viewsets: provides the implementation for CRUD
class WordView(viewsets.ModelViewSet):
    serializer_class = WordSerializer
    queryset = Word.objects.all()


class UserRegistrationAPIView(CreateAPIView):
    model = get_user_model()
    permission_classes = [
        permissions.AllowAny # Or anon users can't register
    ]
    serializer_class = UserSerializer
