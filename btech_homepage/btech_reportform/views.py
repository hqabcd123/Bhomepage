from django.shortcuts import render,HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

def reportform(request):
    if request.method == 'GET':
        return render(request, 'reportform.html')
    else:
        print(request.POST)
        return render(request, 'reportform.html')
    
@api_view(['GET', 'POST'])
def react_reportform(request):
    res_list = {
        'id': 1,
        'message': 'hello reaAPI',
    }
    return Response(res_list)