from django.shortcuts import render
from .models import *
from django.http import HttpResponse
import json
from django.views.decorators.csrf import csrf_exempt


def get_all_room(request):
    resp = {'rooms': []}
    rooms = Room.objects.all()
    resp['code'] = 0
    for room in rooms:
        resp['rooms'].append(room.to_dict())
    return HttpResponse(json.dumps(resp))


@csrf_exempt
def add_room(request):
    resp = {}
    province = request.POST['province']
    place = request.POST['place']
    size = request.POST['size']
    room = Room(province=province, place=place, size=size)
    room.save()
    resp['code'] = 0
    return HttpResponse(json.dumps(resp))
