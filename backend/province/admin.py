from django.contrib import admin
from .models import Province, Area

# Register your models here.
class ProvinceAdmin(admin.ModelAdmin):
    list_display = ('province_title', 'province_eid', 'area_id', 'province_description', 'province_vorder')

class AreaAdmin(admin.ModelAdmin):
    list_display = ('area_title', 'area_eid', 'area_description', 'area_vorder')
# Register your provinces here.add()

admin.site.register(Province, ProvinceAdmin)    
admin.site.register(Area, AreaAdmin)
