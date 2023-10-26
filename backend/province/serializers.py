#  I need serailizers to conver model instance to JSON #
#  so that the frontend can work with the received data.

from rest_framework import serializers
from .models import Province, Area

class ProvinceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Province
        fields = ('id', 'province_title', 'area_id', 'province_description', 'province_vorder')

class AreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Area
        fields = ('id', 'area_title', 'area_description', 'area_vorder')