# api/serializers.py

from rest_framework import serializers
from .models import Slide, Product, Category


class SlideSerializer(serializers.ModelSerializer):
    # Use use_url=True to return full URL for the image
    bg = serializers.ImageField(use_url=True)

    class Meta:
        model = Slide
        fields = ["id", "title", "text", "bg"]


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            "id",
            "title",
            "subtitle",
            "slug",
            "short_description",
            "description",
            "product_type",
            "category",
            "sort_order",
            "is_active",
            "is_featured",
            "base_price",
            "price",
            "attributes",
            "image_url",
            "video_url",
            "duration_hours",
            "meta_title",
            "meta_description",
            "keywords",
            "button_text",
            "button_link",
            "created_at",
            "updated_at",
        ]


class CategorySerializer(serializers.ModelSerializer):
    # Optionally, include related products
    products = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ["id", "name", "slug", "description", "products"]
