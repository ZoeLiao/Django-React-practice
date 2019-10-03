import arrow
import jwt

from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.db.models import Q
from rest_framework import serializers

from game.models import Word


class WordSerializer(serializers.ModelSerializer):
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


UserModel = get_user_model()

class UserSerializer(serializers.ModelSerializer):

    # do not show password
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        username = validated_data['username']
        email = validated_data['email']
        user_qs = UserModel.objects.filter(username=username)
        if user_qs:
            raise forms.ValidationError("This username has been already registered")

        user = UserModel.objects.create(
            username=username,
            email=email
        )
        user.set_password(validated_data['password'])
        user.save()

        return user

    class Meta:
        model = UserModel
        fields = ( "id", "username", "email", "password", )


class UserLoginSerializer(serializers.ModelSerializer):
    token = serializers.CharField(allow_blank=True, read_only=True)
    username = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField()
    class Meta:
        model = UserModel
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
        user_qs = UserModel.objects.filter(
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
        jwt_token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256').decode('utf-8')
        data['jwt_token'] = jwt_token
        return data
