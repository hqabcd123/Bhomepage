from django.shortcuts import render,HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *

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
        print(request.POST)
        data = request.POST
        lenght = len(data.getlist('regular'))
        case = Btest_case.objects.get_or_create(
            customer_name = cs_name,
            Command = data['command']
        )
        case = Btest_case.objects.get(
            customer_name = cs_name,
            Command = data['command']
        )
        for i in range(lenght):
            test_data.objects.get_or_create(
                Case = case,
                No = i,
                Regular_P = data.getlist('regular')[i],
                Suray = data.getlist('suray')[i],
                Pump_P = data.getlist('pump')[i],
                is_show = True if data.get('check{}'.format(i)) == 'on' else False
            )
            pass
        return Response({
            'succes': True,
        })