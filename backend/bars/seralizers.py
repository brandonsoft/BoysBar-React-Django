serializers.py

#  I need serailizers to conver model instance to JSON #
#  so that the frontend can work with the received data.

from rest_framework import serializers
from .models import Bar_Category, Bar

class BarCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Bar_Category
        fields = ('id', 'bar_category_title', 'bar_category_description')

class BarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bar
        fields = ('id', 'bar_title', 'bartype_id', 'bar_position', 'bar_description')