from django.shortcuts import render
from django.http import HttpResponse
from .models import *
from django.core.exceptions import ObjectDoesNotExist
from django.views.decorators.csrf import csrf_exempt
import json


# code: 0 ok
#       1 wrong password or email
#       2 missing password or email
@csrf_exempt
def login(request):
    resp = {}
    email = request.POST.get('email')
    password = request.POST.get('password')

    if email is None or password is None:
        resp['code'] = 2
        return HttpResponse(json.dumps(resp))

    # student = None
    try:
        student = Student.objects.get(email=email)
    except ObjectDoesNotExist:
        resp['code'] = 1
        return HttpResponse(json.dumps(resp))
    if str(student.password) == password:
        resp['code'] = 0
        resp['first_login'] = student.first_login
        response = HttpResponse(json.dumps(resp))
        response.set_cookie('email', email)
        return response
    else:
        resp['code'] = 1
        return HttpResponse(json.dumps(resp))


# code: 0 ok
#       1 not log in
#       2 not sign up
#       3 missing information
#       4 data and field not match
@csrf_exempt
def fill_form(request):
    resp = {}

    try:
        email = request.COOKIES['email']
    except KeyError:
        resp['code'] = 1
        return HttpResponse(json.dumps(resp))

    try:
        student = Student.objects.get(email=email)
    except ObjectDoesNotExist:
        resp['code'] = 2
        return HttpResponse(json.dumps(resp))

    try:
        name = request.POST['name']
        gender = bool(int(request.POST['gender']))
        age = int(request.POST['age'])
        province = request.POST['province']
        city = request.POST['city']
        county = request.POST['county']
        high_school = request.POST['high_school']
        ncee_id = int(request.POST['ncee_id'])
        department = bool(int(request.POST['department']))
        card_id = int(request.POST['card_id'])
        acquired_glories = request.POST['acquired_glories']

    except KeyError:
        resp['code'] = 3
        return HttpResponse(json.dumps(resp))

    try:
        entry_info = EntryInfo(name=name, gender=gender, age=age, province=province,
                               city=city, county=county, high_school=high_school, ncee_id=ncee_id,
                               department=department, card_id=card_id, acquired_glories=acquired_glories)
        entry_info.save()
    except ValueError:
        resp['code'] = 4
        return HttpResponse(json.dumps(resp))

    student.entry_info = entry_info
    student.first_login = False
    student.save()
    resp['code'] = 0
    return HttpResponse(json.dumps(resp))


# register: only email and password information are needed
# ---set cookie
# code: 0 ok
#       1 missing email or password
#       2 email already in use
@csrf_exempt
def register(request):
    resp = {}
    print(request.POST)
    try:
        email = request.POST['email']
        password = request.POST['password']
    except KeyError:
        resp['code'] = 1                        # missing email or password
        return HttpResponse(json.dumps(resp))
    if Student.objects.filter(email=email).exists():
        resp['code'] = 2
        return HttpResponse(json.dumps(resp))   # email already in use

    student = Student.objects.create(email=email, password=password)
    student.save()
    resp['code'] = 0
    response = HttpResponse(json.dumps(resp))
    response.set_cookie('email', email)
    return response


# check_login: check whether the user has logged in
# code: 0 ok
#       1 no cookie
#       2 no such user
def check_login(request):
    resp = {}
    try:
        email = request.COOKIES['email']
    except ValueError:
        resp['code'] = 1
        return HttpResponse(json.dumps(resp))
    try:
        student = Student.objects.get(email=email)
    except ObjectDoesNotExist:
        resp['code'] = 2
        return HttpResponse(json.dumps(resp))
    resp['code'] = 0
    resp['first_login'] = student.first_login
    return HttpResponse(json.dumps(resp))


def confirm(request):
    resp = {}
    try:
        email = request.COOKIES['email']
    except ValueError:
        resp['code'] = 1
        return HttpResponse(json.dumps(resp))
    student = Student.objects.get(email=email)
    student.editable = 1
    try:
        student.save()
    except ValueError:
        resp['code'] = 2
        return HttpResponse(json.dumps(resp))
    resp['code'] = 0
    return HttpResponse(json.dumps(resp))


def get_info(request):
    resp = {}
    try:
        email = request.COOKIES['email']
    except KeyError:
        resp['code'] = 1                    # not log in
        return HttpResponse(json.dumps(resp))
    try:
        student = Student.objects.get(email=email)
    except ObjectDoesNotExist:
        resp['code'] = 2                    # no such user
        return HttpResponse(json.dumps(resp))

    info = student.entry_info
    resp['code'] = 0
    if info:
        resp['self_info'] = info.to_dict()
    return HttpResponse(json.dumps(resp))
