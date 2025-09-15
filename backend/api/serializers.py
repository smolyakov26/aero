# api/serializers.py

from rest_framework import serializers
from .models import Slide

class SlideSerializer(serializers.ModelSerializer):
    # Use use_url=True to return full URL for the image
    bg = serializers.ImageField(use_url=True)

    class Meta:
        model = Slide
        fields = ['id', 'title', 'text', 'bg']
