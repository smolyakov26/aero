# api/views.py
from rest_framework import viewsets
from .models import Slide, Product
from .serializers import SlideSerializer,ProductSerializer

class SlideViewSet(viewsets.ModelViewSet):
    queryset = Slide.objects.all()
    serializer_class = SlideSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer