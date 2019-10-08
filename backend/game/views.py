from django.contrib.auth.models import User
from django.shortcuts import render
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_400_BAD_REQUEST
)

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

from game.models import Word
from game.serializers import (
    WordSerializer,
    UserRegisterSerializer,
    UserLoginSerializer,
)


# viewsets: provides the implementation for CRUD
class WordView(viewsets.ModelViewSet):
    serializer_class = WordSerializer
    queryset = Word.objects.all()


class UserRegistrationAPIView(CreateAPIView):
    model = User
    # let anon users register
    permission_classes = [
        AllowAny
    ]
    serializer_class = UserRegisterSerializer


class UserLoginAPIView(APIView):
    permission_classes = [
        AllowAny
    ]
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            new_data = serializer.data
            return Response(new_data, status=HTTP_200_OK)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
