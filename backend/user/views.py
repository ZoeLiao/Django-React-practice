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
from user.serializers import (
    UserRegisterSerializer,
    UserLoginSerializer,
)
from user.models import User


class UserRegistrationAPIView(CreateAPIView):
    model = User
    # let anon users register
    permission_classes = [
        AllowAny
    ]
    serializer_class = UserRegisterSerializer

    def post(self, request):
        try:
            sz = self.serializer_class(data=request.data)
            sz.is_valid(raise_exception=True)
            sz.save()
            res = SUCCESS
            res['data'] = request.data
        except Exception as e:
            res = FAILURE
            res['cause'] = str(e)

        return JsonResponse(res)


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

class UserLogoutAllView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary='Logout',
    )
    def post(self, request, *args, **kwargs):
        user = request.user
        user.jwt_secret = uuid.uuid4()
        user.save()
        return Response(status=HTTP_204_NO_CONTENT)
