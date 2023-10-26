from django.contrib import admin
from .forms import BarForm, CastForm
from .models import Bar_Category, Bar_Facility, Bar_Amusement, PaymentMethod, Bar, Cast
from django.utils.safestring import mark_safe


# Register your models here.
class Bar_CategoryAdmin(admin.ModelAdmin):
    list_display = ('bar_category_title', 'bar_category_eid', 'bar_category_description')

class Bar_FacilityAdmin(admin.ModelAdmin):
    list_display = ('bar_facility_title', 'bar_facility_eid', 'bar_facility_description')    

class Bar_AmusementAdmin(admin.ModelAdmin):
    list_display = ('bar_amusement_title', 'bar_amusement_eid', 'bar_amusement_description')  

class PaymentMethodAdmin(admin.ModelAdmin):
    list_display = ('paymentmethod_title', 'paymentmethod_eid', 'paymentmethod_description')  

class BarAdmin(admin.ModelAdmin):
    
    form = BarForm
    add_form = BarForm
    list_display = ('bar_title', 'bar_eid', 'fk_province')  
    
class CastAdmin(admin.ModelAdmin):

    form = CastForm
    add_form = CastForm
    list_display = ('id', 'display_photo', 'cast_name', 'cast_sex', 'cast_birthday', 'cast_description', 'cast_address')

    def display_photo(self, obj):
        return mark_safe(f'<img src="/media/casts/{obj.id}.jpg" width="100" height="100" />')
    display_photo.short_description = 'Photo'
    display_photo.allow_tags = False

admin.site.site_header = "ぼいば 管理ページ" 
admin.site.site_title = "ぼいば 管理ページ"
admin.site.index_title = "ぼいば 管理ページ"

admin.site.register(Bar_Category,    Bar_CategoryAdmin)
admin.site.register(Bar_Facility,    Bar_FacilityAdmin)
admin.site.register(Bar_Amusement,   Bar_AmusementAdmin)
admin.site.register(PaymentMethod,  PaymentMethodAdmin)
admin.site.register(Bar, BarAdmin)
admin.site.register(Cast, CastAdmin)