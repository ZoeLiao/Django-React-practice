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
