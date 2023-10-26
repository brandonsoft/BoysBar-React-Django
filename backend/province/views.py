from django.http import JsonResponse
from django.db import connection

# Create your views here.


def allProvinceAreaview(request):
    
    provice_area = [];

    with connection.cursor() as cursor:
        cursor.execute("select id, area_eid, area_title, 0 as state from province_area")
        areas = cursor.fetchall();

        for area in areas:
            provice_area.append({"id": area[0], "eid" : area[1], "value": area[2], "category": area[3]})

            cursor.execute("select id, province_eid, province_title, 1 as state from province_province where area_id = %s order by province_vorder", [area[0]])
            
            provinces_per_area = cursor.fetchall()

            for province in provinces_per_area:
                provice_area.append({"id": province[0], "eid" : province[1], "value": province[2], "category": province[3]})
    
    # provice_area = [
                #         {
                #             "id": "hokkaido",
                #             "value": "北海道・東北",
                #             "category": True
                #         },
                #         {
                #             "id": "hokkaido",
                #             "value": "北海道",
                #             "category": False
                #         },     
                #     ];
    return JsonResponse(provice_area, safe=False);