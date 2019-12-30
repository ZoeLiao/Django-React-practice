import uuid
from django.shortcuts import render
from drf_yasg.utils import swagger_auto_schema

from rest_framework.status import (
    HTTP_200_OK,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
)
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import (
    mixins,
    generics,
    serializers,
    viewsets,
)
from rest_framework.decorators import (
    api_view,
    permission_classes,
)
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
)
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.generics import (
    CreateAPIView,
    ListAPIView,
)
from rest_framework.views import APIView

from backend.constant import (
    SUCCESS,
    FAILURE
)
from game.models import Word
from game.serializers import WordSerializer


# viewsets: provides the implementation for CRUD
class WordView(viewsets.ModelViewSet):
    permission_classes = [
        AllowAny
    ]
    serializer_class = WordSerializer
    queryset = Word.objects.all()
