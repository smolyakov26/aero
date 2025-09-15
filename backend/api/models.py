from django.db import models

class Slide(models.Model):
    title = models.CharField(max_length=255)
    text = models.TextField()
    bg = models.ImageField(upload_to='slides/',  null=True, blank=True)  # store images in media/slides

    def __str__(self):
        return self.title
