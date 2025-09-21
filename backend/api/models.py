from django.db import models

class Slide(models.Model):
    title = models.CharField(max_length=255)
    text = models.TextField()
    bg = models.ImageField(upload_to='slides/',  null=True, blank=True)  # store images in media/slides

    def __str__(self):
        return self.title


class Product(models.Model):
    PRODUCT_TYPES = [
        ('tandem_jump', 'Tandem Jump'),
        ('special_offer', 'Special Offer'),
        ('course', 'Course'),
        ('flight', 'Flight'),
        ('service', 'Service'),
    ]

    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True)
    slug = models.SlugField(max_length=255, unique=True)
    short_description = models.TextField(blank=True)
    description = models.TextField(blank=True)
    product_type = models.CharField(max_length=50, choices=PRODUCT_TYPES)
    category = models.CharField(max_length=100)
    sort_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    base_price = models.DecimalField(max_digits=10, decimal_places=2)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    attributes = models.JSONField(blank=True, default=dict)  # works with SQLite in Django >=3.1
    image_url = models.URLField(blank=True)
    video_url = models.URLField(blank=True)
    duration_hours = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)

    # SEO fields
    meta_title = models.CharField(max_length=255, blank=True)
    meta_description = models.CharField(max_length=512, blank=True)
    keywords = models.CharField(max_length=255, blank=True)

    # Booking / CTA
    button_text = models.CharField(max_length=100, blank=True)
    button_link = models.URLField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['sort_order', 'title']
        verbose_name = "Product"
        verbose_name_plural = "Products"

    def __str__(self):
        return self.title


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name