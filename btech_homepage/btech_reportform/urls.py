from django.urls import path
from . import views

urlpatterns = [
    path('', views.reportform),
    path('react/', views.react_reportform),
]