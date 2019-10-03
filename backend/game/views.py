from django.contrib.auth import get_user_model
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
    permissions,
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
    UserLoginSerializer,
    UserSerializer,
)


# viewsets: provides the implementation for CRUD
class WordView(viewsets.ModelViewSet):
    serializer_class = WordSerializer
    queryset = Word.objects.all()


UserModel = get_user_model()

class UserList(ListAPIView):
    queryset= UserModel.objects.all()
    serializer_class = UserSerializer

class UserRegistrationAPIView(CreateAPIView):
    model = get_user_model()
    # let anon users register
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializer


class UserLoginAPIView(APIView):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            new_data = serializer.data
            return Response(new_data, status=HTTP_200_OK)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
