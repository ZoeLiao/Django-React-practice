import arrow
import jwt

from django.conf import settings
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.db.models import Q
from rest_framework import serializers as sz
from rest_framework_jwt.settings import api_settings

from game.models import Word


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


class GetFullUserSerializer(sz.ModelSerializer):
    class Meta:
        model = User
        fields = ('username','is_superuser','first_name', 'last_name')

class UserSerializer(sz.ModelSerializer):

    # do not show password
    password = sz.CharField(write_only=True)
    token = sz.SerializerMethodField()

    def get_token(self, object):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
        payload = jwt_payload_handler(object)
        token = jwt_encode_handler(payload)
        return token 

    def create(self, validated_data):
        username = validated_data['username']
        email = validated_data['email']
        user_qs = User.objects.filter(username=username)
        if user_qs:
            raise forms.ValidationError('This username has been already registered')

        user = User.objects.create(
            username=username,
            email=email
        )
        user.set_password(validated_data['password'])
        user.save()

        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'token')
