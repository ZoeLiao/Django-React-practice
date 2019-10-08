import arrow
import jwt
import uuid

from django.conf import settings
from django.core.exceptions import ValidationError
from django.db.models import Q
from rest_framework import serializers as sz
from rest_framework_jwt.settings import api_settings

from game.models import Word, User


class WordSerializer(sz.ModelSerializer):
    class Meta:
        model = Word
        fields = (
            'id',
            'word',
            'meaning',
            'language',
            'test_status',
            'test_number'
        )


class UserRegisterSerializer(sz.ModelSerializer):

    # do not show password
    password = sz.CharField(write_only=True)

    def create(self, validated_data):
        username = validated_data['username']
        email = validated_data['email']
        user_qs = User.objects.filter(username=username)
        if user_qs:
            raise forms.ValidationError('This username has been already registered')

        user = User.objects.create(
            username=username,
            email=email,
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    class Meta:
        model = User
        fields = (
            'id',
            'email',
            'username',
            'password',
        )


class UserLoginSerializer(sz.ModelSerializer):
    username = sz.CharField()
    email = sz.EmailField()
    password = sz.CharField()

    class Meta:
        model = User
        fields = [
	    'username',
	    'email',
            'password',
            'token',
        ]
        extra_kwargs = {
            "password":
            {"write_only": True}
        }

    def validate(self, data):
        user_obj = None
        email = data.get('email', None)
        username = data.get('username', None)
        password = data.get('password', None)
        if not username:
            raise ValidationError("A username or email is required to login.")
        user_qs = User.objects.filter(
            Q(email=email) |
            Q(username=username)
            ).distinct()
        user_qs = user_qs.exclude(email__isnull=True).exclude(email__iexact="")
        if user_qs.exists() and user_qs.count() == 1:
            user_obj = user_qs.first()
        else:
            raise ValidationError("This username/email is not valid.")

        if user_obj:
            if not user_obj.check_password(password):
                raise ValidationError("Incorrent credentials please try again.")
        payload = {
            'username': username,
            'iat': arrow.now().timestamp,
            'exp': arrow.now().shift(minutes=5).timestamp
        }

        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
        payload = jwt_payload_handler(user_obj)
        token = jwt_encode_handler(payload)
        data['token'] = token
        return data
