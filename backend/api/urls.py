# api/urls.py
from django.urls import path
from .views import SlideViewSet, ProductViewSet

urlpatterns = [
    path('slides/', SlideViewSet.as_view({'get': 'list'}), name='slide-list'),
    path('products/',ProductViewSet.as_view({'get': 'list'}), name='product-list')
]