from rest_framework import serializers as sz
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
