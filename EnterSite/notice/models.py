from django.db import models


class Notice(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    date_time = models.DateTimeField(auto_now=True)

    def to_dict(self):
        return dict(
            id=str(self.id),
            title=self.title,
            content=self.content,
            date_time=self.date_time.isoformat(),
        )

    def title_to_dict(self):
        return dict(
            id=str(self.id),
            title=self.title,
        )
