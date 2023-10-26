from django.urls import path
from . import views

urlpatterns = [
    path('province/all_area_province', views.allProvinceAreaview, name="all_area_province"),
]