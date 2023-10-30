from django.db import models
from province.models import Province 
from admin_kit.models import SelectField

# Create your models here.

class Bar_Category(models.Model):
    
    bar_category_title =     models.CharField(max_length = 30, verbose_name='ジャンル')
    bar_category_eid =       models.CharField(max_length = 30, verbose_name='ジャンル (English)')
    bar_category_description = models.TextField(verbose_name='現時点で')

    def __str__(self):
        return f"{self.bar_category_title} ({self.bar_category_eid})"
    
class Bar_Facility(models.Model):
    bar_facility_title = models.CharField(max_length = 30, verbose_name='施設タイプ')
    bar_facility_eid = models.CharField(max_length = 30, verbose_name='施設タイプ (English)')
    bar_facility_description = models.TextField(verbose_name='現時点で')

    def __str__(self):
        return f"{self.bar_facility_title} ({self.bar_facility_eid})"

class Bar_Amusement(models.Model):
    bar_amusement_title = models.CharField(max_length= 50, verbose_name='アミューズメント')
    bar_amusement_eid = models.CharField(max_length= 30, verbose_name='アミューズメント (English)')
    bar_amusement_description = models.TextField(verbose_name='現時点で')
    
    def __str__(self):
        return f"{self.bar_amusement_title} ({self.bar_amusement_eid})"

class PaymentMethod(models.Model):
    paymentmethod_title = models.CharField(max_length = 50, verbose_name='支払い方法')
    paymentmethod_eid = models.CharField(max_length = 50, verbose_name='支払い方法 (English)')
    paymentmethod_description = models.TextField(verbose_name='現時点で')
    
    def __str__(self):
        return f"{self.paymentmethod_title} ({self.paymentmethod_eid})"

class Cast(models.Model):

    cast_name = models.CharField(max_length = 30, null = False, default = '', verbose_name='キャスト名')
    sex = (
        (0, '男'),
        (1, '女')
    )

    cast_sex = SelectField(choices=sex, verbose_name='性別')

    cast_birthday = models.DateField(null = True, verbose_name='誕生日')

    blood = (
        (0, 'O型'),
        (1, 'A型'),
        (2, 'B型'),
        (3, 'AB型')
    )
    cast_blood = SelectField(choices=blood, default= 0, verbose_name='血液型')
    cast_horoscope = models.CharField(max_length=20, null = True)
    # cast_photo = models.CharField(max_length= 100) => photo = [no].jpg
    cast_mobilephone = models.CharField(max_length= 30, null = True, verbose_name='携帯電話番号')
    cast_homephone = models.CharField(max_length= 30, null = True, verbose_name='家電番号')
    cast_address = models.CharField(max_length = 100, null = False, default = '', verbose_name='住所')
    cast_height = models.FloatField(null = True, verbose_name='身長')
    cast_weight = models.FloatField(null = True, verbose_name='体重')

    fk_bars =     models.ManyToManyField('Bar', through='Bar_Fk_Casts')

    cast_description = models.TextField(null = True, verbose_name='現時点で')

    def __str__(self):
        return f"{self.cast_name} ({self.cast_sex}, {self.cast_birthday})"
    
class Bar(models.Model):

    bar_title =         models.CharField(max_length = 120, verbose_name='キャスト名・店舗名')
    bar_eid =           models.CharField(max_length = 40, null = True, verbose_name='キャスト名・店舗名 (English)')
    
    fk_province =       models.ForeignKey(Province, on_delete=models.CASCADE, null = False, verbose_name='都道府県選択')

    fk_categorys =      models.ManyToManyField('Bar_Category')
    fk_facilitys =      models.ManyToManyField('Bar_Facility')
    fk_amusements =     models.ManyToManyField('Bar_Amusement')
    fk_paymentmethods = models.ManyToManyField('PaymentMethod')

    fk_casts =          models.ManyToManyField(Cast, through='Bar_Fk_Casts')

    bar_position =      models.TextField(null=True, verbose_name='場所')
    bar_description =   models.TextField(null=True, verbose_name='現時点で')
    bar_vorder =        models.IntegerField(null=True, verbose_name='現時点で')
    
    def __str__(self):
        return f"{self.bar_title} ({self.bar_eid}) [ {self.fk_province} ]"


class Bar_Fk_Casts(models.Model):
    
    bar = models.ForeignKey(Bar, on_delete=models.CASCADE)
    cast = models.ForeignKey(Cast, on_delete=models.CASCADE)

    bar_recorddate = models.DateField(null = True)
    bar_expiredate = models.DateField(null = True)

    def __str__(self):
        return "{}_{}".format(self.bar.__str__(), self.cast.__str__())