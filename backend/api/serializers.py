# backend/api/serializers.py (replace/extend existing)

from rest_framework import serializers
from .models import Slide, Product, Category, Booking

class SlideSerializer(serializers.ModelSerializer):
    bg = serializers.ImageField(use_url=True)
    class Meta:
        model = Slide
        fields = ["id", "title", "text", "bg"]

class ProductSerializer(serializers.ModelSerializer):
    # adaptations for frontend naming
    mainImage = serializers.SerializerMethodField()
    gallery = serializers.SerializerMethodField()
    fullDescription = serializers.CharField(source='description')
    price = serializers.SerializerMethodField()
    duration = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            "id", "slug", "title", "subtitle", "short_description",
            "fullDescription", "description", "product_type", "category",
            "sort_order", "is_active", "is_featured",
            "base_price", "price", "price", "attributes",
            "mainImage", "gallery", "video_url",
            "duration_hours", "fullDescription", "meta_title",
            "meta_description", "keywords", "button_text", "button_link",
            "created_at", "updated_at","duration" 
        ]

    def get_mainImage(self, obj):
        return obj.image_url or ""

    def get_gallery(self, obj):
        # Best-effort mapping: put image_url as single-item gallery
        return [{"src": obj.image_url, "alt": obj.title}] if obj.image_url else []

    def get_price(self, obj):
        return str(obj.price) if obj.price is not None else ""

    def get_duration(self, obj):
        return str(obj.duration_hours) if obj.duration_hours is not None else None

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ["id","name","phone","email","date","time","comments","service","created_at"]

class CategorySerializer(serializers.ModelSerializer):
    # safe method: return products that match category name
    products = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ["id", "name", "slug", "description", "products"]

    def get_products(self, obj):
        from .models import Product
        qs = Product.objects.filter(category=obj.name)
        return ProductSerializer(qs, many=True).data
