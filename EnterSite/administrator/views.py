from django.shortcuts import render
from notice.models import *
from student.models import *
from django.http import HttpResponse
from django.core.exceptions import *
import json
from .models import *
from django.views.decorators.csrf import csrf_exempt
import numpy.random as rd


@csrf_exempt
def add_notice(request):
    resp = {}
    title = request.POST['title']
    content = request.POST['content']
    notice = Notice(title=title, content=content)
    notice.save()
    resp['code'] = 0
    return HttpResponse(json.dumps(resp))


@csrf_exempt
def revise_notice(request):
    resp = {}
    title = request.POST['title']
    content = request.POST['content']
    notice_id = request.POST['id']
    notice = Notice.objects.get(id=notice_id)
    notice.title = title
    notice.content = content
    notice.save()
    resp['code'] = 0
    return HttpResponse(json.dumps(resp))


@csrf_exempt
def login(request):
    resp = {}
    username = request.POST['username']
    password = request.POST['password']
    try:
        admin = Admin.objects.get(username=username)
    except ObjectDoesNotExist:
        resp['code'] = 1
        return HttpResponse(json.dumps(resp))
    if admin.password != password:
        resp['code'] = 2
        return HttpResponse(json.dumps(resp))
    resp['code'] = 0
    return HttpResponse(json.dumps(resp))


def get_all_students(request):
    resp = {'students': []}
    students = Student.objects.all()
    for student in students:
        info = student.entry_info
        if info is None:
            continue
        info = info.to_dict()
        info['editable'] = student.editable
        info['id'] = student.id
        resp['students'].append(info)
    resp['code'] = 0
    return HttpResponse(json.dumps(resp))


def student_pass(request):
    resp = {}
    sid = request.GET.get('id')
    status = request.GET.get('status')
    s = Student.objects.get(id=sid)
    entry_info = s.entry_info
    entry_info.status = status
    entry_info.exam_num = rd.randint(1000000000, 9999999999)
    entry_info.save()
    s.save()
    resp['code'] = 0
    return HttpResponse(json.dumps(resp))
