from django.shortcuts import render
from django.http import HttpResponse
import json
from student.models import *
from .models import *
from django.core.exceptions import *


def get_all_notice(request):
    resp = {}
    try:
        email = request.COOKIES['email']
    except KeyError:
        resp['code'] = 1
        return HttpResponse(resp)
    try:
        student = Student.objects.get(email=email)
    except ObjectDoesNotExist:
        resp['code'] = 2
        return HttpResponse(resp)

    notices = Notice.objects.all().order_by('-date_time')
    resp['notices'] = []
    for notice in notices:
        resp['notices'].append(notice.title_to_dict())
    resp['code'] = 0
    return HttpResponse(json.dumps(resp))


def get_notice(request, notice_id):
    resp = {}
    try:
        notice = Notice.objects.get(id=notice_id)
    except ObjectDoesNotExist:
        resp['code'] = 1
        return HttpResponse(json.dumps(resp))
    resp['code'] = 0
    resp['notice'] = notice.to_dict()
    return HttpResponse(json.dumps(resp))
