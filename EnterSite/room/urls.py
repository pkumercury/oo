from django.conf.urls import url
from .views import *

urlpatterns = [
    url(r'^$', get_all_room),
    url(r'^add$', add_room),
]
