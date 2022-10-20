from distutils.log import error
from functools import reduce
from django.shortcuts import render,HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from .models import *
from btech_reportform.method.reduce_report import *

def reportform(request):
    if request.method == 'GET':
        return render(request, 'reportform.html')
    else:
        print(request.POST)
        return render(request, 'reportform.html')
    
@api_view(['GET', 'POST'])
def react_reportform(request):
    cs_name = 'マコー株式会社'
    #code = salesforce`s APIcode
    if request.method == 'GET':
        res_list = {}
        case = Btest_case.objects.get_or_create(
            customer_name = cs_name,
        )
        case = Btest_case.objects.get(
            customer_name = cs_name,
        )
        print(case)
        res_list = case.getJson()
        return Response(res_list)
    
    elif request.method == 'POST':
        try:
            print(request)
            print(' data: {} '.format(request.POST))
            data = request.POST
            case = Btest_case.objects.get(
                customer_name = cs_name,
            )
            reduce_Post_to_Json(data)
            return JsonResponse(data)
        except Exception as e:
            error('error')
            print(e)