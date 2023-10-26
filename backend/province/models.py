from django.db import models

# Create your models here.
class Province(models.Model):

    
    province_title = models.CharField(max_length = 120, verbose_name='都道府県')
    province_eid = models.CharField(max_length = 30, null = True, verbose_name='都道府県 (English)')
    area = models.ForeignKey('Area', on_delete=models.CASCADE, verbose_name='領域選択')
    province_description = models.TextField(verbose_name='説明') 
    province_vorder = models.IntegerField(null = True, verbose_name='現時点で')   

    def __str__(self):
        return f"{self.area} / {self.province_title} ({self.province_eid})"
    
class Area(models.Model):
    
    area_title = models.CharField(max_length = 120, verbose_name='領域')
    area_eid = models.CharField(max_length = 30, null = True, verbose_name='領域 (English)')
    area_description = models.CharField(max_length = 120, verbose_name='説明')
    area_vorder = models.IntegerField(null = True, verbose_name='現時点で')

    def __str__(self):
        return f"{self.area_title} ({self.area_eid})"

