from django  import forms
from django.contrib.admin.widgets import AdminFileWidget
from .models import Bar, Bar_Category, Bar_Facility, Bar_Amusement, PaymentMethod, Cast
from django.contrib.admin.widgets import FilteredSelectMultiple

class BarForm(forms.ModelForm):

    fk_categorys = forms.ModelMultipleChoiceField(
        queryset = Bar_Category.objects.all(),
        widget = FilteredSelectMultiple(
            verbose_name = 'ジャンル',
            is_stacked = False
        ),
        label="ジャンル 選択",
    )
    
    fk_facilitys = forms.ModelMultipleChoiceField(required=False,
                                             widget=forms.CheckboxSelectMultiple,
                                             queryset=Bar_Facility.objects.all(),
                                             label="施設タイプ 選択",
                                            help_text="")
    
    fk_amusements = forms.ModelMultipleChoiceField(required=False,
                                             widget=forms.CheckboxSelectMultiple,
                                             queryset=Bar_Amusement.objects.all(),
                                             label="アミューズメント 選択",
                                            help_text="")
    
    fk_paymentmethods = forms.ModelMultipleChoiceField(required=False,
                                             widget=forms.CheckboxSelectMultiple,
                                             queryset=PaymentMethod.objects.all(),
                                             label="支払い方法 選択",
                                            help_text="")
    
    fk_casts = forms.ModelMultipleChoiceField(
        queryset = Cast.objects.all(),
        widget = FilteredSelectMultiple(
            verbose_name='キャスト',
            is_stacked = False
        ),
        label="キャスト選択",
    )
                                   
    class Meta:
        model = Bar
        fields = '__all__'        



class CastForm(forms.ModelForm):

    fk_bars = forms.ModelMultipleChoiceField(
        queryset = Bar.objects.all(),
        widget = FilteredSelectMultiple(
            verbose_name='キャスト',
            is_stacked = False
        ),
        label="キャスト選択",
    )

    class Meta:
        model = Cast
        fields = '__all__'        
        widgets = {
            'photo': AdminFileWidget(attrs={'class': 'admin-file-widget'}),
        }