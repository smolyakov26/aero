# backend/api/urls.py
from rest_framework.routers import DefaultRouter
from .views import SlideViewSet, ProductViewSet, BookingViewSet

router = DefaultRouter()
router.register(r'slides', SlideViewSet, basename='slide')
router.register(r'products', ProductViewSet, basename='product')
router.register(r'bookings', BookingViewSet, basename='booking')

urlpatterns = router.urls
