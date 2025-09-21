# backend/api/views.py
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Slide, Product, Booking
from .serializers import SlideSerializer, ProductSerializer, BookingSerializer

class SlideViewSet(viewsets.ModelViewSet):
    queryset = Slide.objects.all()
    serializer_class = SlideSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'slug'                       # important: lookup by slug, not pk

    @action(detail=False, methods=['get'], url_path=r'related/(?P<slug>[^/.]+)')
    def related(self, request, slug=None):
        cur = Product.objects.filter(slug=slug).first()
        if not cur:
            return Response([], status=200)
        qs = Product.objects.filter(category=cur.category).exclude(slug=slug)[:6]
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all().order_by('-created_at')
    serializer_class = BookingSerializer
    http_method_names = ['get','post','head','options']

