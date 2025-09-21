from django.contrib import admin
from .models import Slide, Product, Category


@admin.register(Slide)
class SlideAdmin(admin.ModelAdmin):
    list_display = ('title',)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'product_type', 'price', 'is_active', 'is_featured')
    list_filter = ('product_type', 'is_active', 'is_featured', 'category')
    search_fields = ('title', 'subtitle', 'description', 'category')

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    search_fields = ('name',)
