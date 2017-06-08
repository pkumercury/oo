from django.conf.urls import url
from .views import *

urlpatterns = [
    url(r'^(?P<notice_id>[0-9]+)/', get_notice),
    url(r'^all/', get_all_notice),
]
