from django.db import models


class Room(models.Model):
    province = models.CharField(max_length=255)
    place = models.CharField(max_length=1023)
    size = models.IntegerField()

    def to_dict(self):
        return dict(
            id=str(self.id),
            province=self.province,
            place=self.place,
            size=str(self.size),
        )
