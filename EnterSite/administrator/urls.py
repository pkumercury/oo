from django.conf.urls import url
from .views import *

urlpatterns = [
    url(r'^login/', login),
    url(r'^add_notice/', add_notice),
    url(r'^revise_notice/', revise_notice),
    url(r'^students/', get_all_students),
    url(r'^pass/', student_pass),
]
