from django.urls import path
from . import views

urlpatterns = [
    path('bars/all_features', views.allBarFeatures, name="all_bar_features"),

    path('bars/bars_suggest', views.bars_suggest, name="bars_suggest"),
    path('bars/bars_search', views.bars_search, name="bars_search"),

    path('bars/casts_suggest', views.casts_suggest, name="casts_suggest"),
    path('bars/casts_search', views.casts_search, name="casts_search"),

    path('bars/casts_checkimage_exist', views.casts_checkimage_exist, name="casts_checkimage_exist"),
]