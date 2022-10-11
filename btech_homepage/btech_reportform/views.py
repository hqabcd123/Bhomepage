from django.shortcuts import render,HttpResponse

def reportform(request):
    if request.method == 'GET':
        return render(request, 'reportform.html')
    else:
        print(request.POST)
        return render(request, 'reportform.html')