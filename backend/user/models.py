import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    jwt_secret = models.UUIDField(default=uuid.uuid4)

    class Meta(AbstractUser.Meta):
        pass
