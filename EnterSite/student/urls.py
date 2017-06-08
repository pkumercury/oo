from django.conf.urls import url
from .views import *

urlpatterns = [
    url(r'^login', login),
    url(r'^register', register),
    url(r'^check_login', check_login),
    url(r'^confirm', confirm),
    url(r'^fill_form', fill_form),
    url(r'^get_info', get_info),
]
