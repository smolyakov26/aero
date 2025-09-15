# api/urls.py
from django.urls import path
from .views import SlideViewSet

urlpatterns = [
    path('slides/', SlideViewSet.as_view({'get': 'list'}), name='slide-list'),
]