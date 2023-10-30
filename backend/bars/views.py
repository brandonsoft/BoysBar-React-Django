from django.http import JsonResponse
from django.db import connection
from django.conf import settings

import os
import json
import urllib.parse
import datetime

# ======== datetime.date objects handle funtion ======================================= #
class CustomJSONEncoder(json.JSONEncoder):
    """Custom JSON encoder that can handle datetime.date objects."""
    def default(self, obj):
        if isinstance(obj, datetime.date):
            return obj.isoformat()
        return super().default(obj)

# ======== request funtion ======================================= #
# ==== i.e. bars/casts_search?q=keyword => key_decode: keyword === #
# ================================================================ #
def handleRequest(request):

    key = str(request)
    x = key.find("?")
    x += 1
    key = key[x : -2]       # key = cast=xy

    x = key.find("=")
    x += 1
    key = key[x:]
    key_decode = urllib.parse.unquote(key)

    return key_decode

def allBarFeatures(request):

    bar_features = []

    with connection.cursor() as cursor:

        # table [ bars_bar_category ]
        cursor.execute("select id, bar_category_title, bar_category_eid from bars_bar_category")
        bar_category = cursor.fetchall()

        bar_features.append({"id": 'category', "value": 'ジャンル', "category": 0});
    
        for item in bar_category:
            bar_features.append({"id": "bars_bar_category-"+str(item[0]), "eid": item[2], "value": item[1], "category": 1});
    
        # table [ bars_bar_facility ]
        cursor.execute("select id, bar_facility_title, bar_facility_eid from bars_bar_facility")
        bar_facility = cursor.fetchall()

        bar_features.append({"id": 'facility_type', "value": '施設タイプ', "category": 0});
    
        for item in bar_facility:
            bar_features.append({"id": "bars_bar_facility-"+str(item[0]), "eid": item[2], "value": item[1], "category": 1});
    
        # table [ bars_bar_amusement ]
        cursor.execute("select id, bar_amusement_title, bar_amusement_eid from bars_bar_amusement")
        bar_amusement = cursor.fetchall()

        bar_features.append({"id": 'amusement', "value": 'アミューズメント', "category": 0});
    
        for item in bar_amusement:
            bar_features.append({"id": "bars_bar_amusement-"+str(item[0]), "eid": item[2], "value": item[1], "category": 1});

        # table [ bar_paymentmethod ]
        cursor.execute("select id, paymentmethod_title, paymentmethod_eid from bars_paymentmethod")
        paymentmethod = cursor.fetchall()

        bar_features.append({"id": 'payment_method', "value": '支払い方法', "category": 0});
    
        for item in paymentmethod:
            bar_features.append({"id": "bars_paymentmethod-"+str(item[0]), "eid": item[2], "value": item[1], "category": 1});

    return JsonResponse(bar_features, safe=False)

def bars_suggest(request):

    with connection.cursor() as cursor: 

        cursor.execute("select * from bar_search_tbl")

        results = cursor.fetchall()
        rows = [dict(zip([column[0] for column in cursor.description], row)) for row in results]
        # create a JSON response
        response_data = json.dumps(rows)
        json_data = json.loads(response_data)
        response = JsonResponse(json_data, safe=False)

    # return the JSON response
    return response

def bars_search(request):
    
    # ======== analysis request ==============.
    key = str(request)
    x = key.find("?")
    x += 1
    key = key[x : -2]
   
    key_array = key.split("&")
    # ['keyword=V1veUMDnsq', 'prefecture=1', 'prefecture=4', 'feature=bars_bar_category-2', 'feature=bars_bar_facility-1', 'feature=bars_bar_amusement-2', 'feature=bars_paymentmethod-1', 'feature=bars_paymentmethod-2']
    # ========================================.

    # ======= where ==========================.
    # ======= & get feature array ============.
    where_keyword = ""
    
    where_prefecture = "(id=0"
    
    where_category = "(id=0"    
    where_facility = "(id=0"    
    where_amusement = "(id=0"    
    where_payment = "(id=0"    

    for key in key_array:
        if key.__contains__("keyword="):
            
            x = key.find("=")
            x += 1
            key = key[x:]
            key_decode = urllib.parse.unquote(key)

            where_keyword += " (bar_title like '%"+key_decode+"%' or province like '%"+key_decode+"%')"

        elif key.__contains__("prefecture="):
            x = key.find("=")
            x += 1
            key = key[x:]
            
            where_prefecture += " or fk_province_id =" + key
    
        elif key.__contains__("feature="): 
            
            x = key.find("=")
            x += 1
            temp = key[x:]
            if temp.__contains__("bars_bar_category"):
                y = temp.find("-")
                y += 1
                ttemp = temp[y:]
                where_category += " or bar_category_ids like '%," + ttemp + ",%'"
            elif temp.__contains__("bars_bar_facility"):
                y = temp.find("-")
                y += 1
                ttemp = temp[y:]
                where_facility += " or bar_facility_ids like '%," + ttemp + ",%'"
            elif temp.__contains__("bars_bar_amusement"):
                y = temp.find("-")
                y += 1
                ttemp = temp[y:]
                where_amusement += " or bar_amusement_ids like '%," + ttemp + ",%'"
            elif temp.__contains__("paymentmethod"):
                y = temp.find("-")
                y += 1
                ttemp = temp[y:]
                where_payment += " or paymentmethod_ids like '%," + ttemp + ",%'"

    where_prefecture += ")"
    where_category += ")"
    where_facility += ")"
    where_amusement += ")"
    where_payment += ")"

    sql = "select * from bar_search_tbl where 1 "
    if len(where_keyword) > 0:
        sql += " and " + where_keyword

    if len(where_prefecture) > 6:    # except "(id=0)"
        sql += " and " + where_prefecture   

    if len(where_category) > 6:    # except "(id=0)"
        sql += " and " + where_category   

    if len(where_facility) > 6:    # except "(id=0)"
        sql += " and " + where_facility   

    if len(where_amusement) > 6:    # except "(id=0)"
        sql += " and " + where_amusement

    if len(where_payment) > 6:    # except "(id=0)"
        sql += " and " + where_payment   

    # print("===== 2024.10.25 sql ="+sql) 

    with connection.cursor() as cursor: 

        cursor.execute(sql)
        results = cursor.fetchall()

        rows = [dict(zip([column[0] for column in cursor.description], row)) for row in results]
        # create a JSON response
        response_data = json.dumps(rows)
        json_data = json.loads(response_data)
        response = JsonResponse(json_data, safe=False)


    # return the JSON response
    return response


def casts_suggest(request):

    with connection.cursor() as cursor: 

        cursor.execute("select * from cast_search_tbl")

        results = cursor.fetchall()

        # print(results)
        rows = [dict(zip([column[0] for column in cursor.description], row)) for row in results]
        # create a JSON response
        response_data = json.dumps(rows, cls=CustomJSONEncoder)
        json_data = json.loads(response_data)
        response = JsonResponse(json_data, safe=False)

    # return the JSON response
    return response

def casts_search(request):

    # ======== analysis request ==============.
    key_decode = handleRequest(request)

    where_keyword = " where cast_name like '%"+key_decode+"%' or provinces like '%"+key_decode+"%'"
    sql = "select * from cast_search_tbl" + where_keyword

    with connection.cursor() as cursor: 

        cursor.execute(sql)

        results = cursor.fetchall()

        # print(results)
        rows = [dict(zip([column[0] for column in cursor.description], row)) for row in results]
        # create a JSON response
        response_data = json.dumps(rows, cls=CustomJSONEncoder)
        json_data = json.loads(response_data)
        response = JsonResponse(json_data, safe=False)

    # return the JSON response
    return response

def casts_per_bar(request):

    # ======== analysis request ==============.
    key_decode = handleRequest(request)
    
    where_keyword = " where bar_ids like '%,"+key_decode+",%'"
    sql = "select * from cast_search_tbl" + where_keyword

    with connection.cursor() as cursor: 

        cursor.execute(sql)

        results = cursor.fetchall()

        # print(results)
        rows = [dict(zip([column[0] for column in cursor.description], row)) for row in results]
        # create a JSON response
        response_data = json.dumps(rows, cls=CustomJSONEncoder)
        json_data = json.loads(response_data)
        response = JsonResponse(json_data, safe=False)

    # return the JSON response
    return response

def search_image_files(prefix):
    
    media_root = os.path.abspath(settings.MEDIA_ROOT)

    # Loop over all files in the media directory
    filenames = os.listdir(media_root + '/bars/')
    matching_filenames = []
    for filename in filenames:
        # Check if the file has the given prefix and is an image file
        if filename.startswith(prefix) and filename.lower().endswith(('.jpg', '.jpeg', '.png')):
            matching_filenames.append(filename)
    
    # Return the list of matching filenames
    return matching_filenames


def casts_checkimage_exist(request):

    prefix = handleRequest(request)

    if prefix is None:
        return JsonResponse({
            'error': 'Missing prefix parameter'
        })    
    
    filenames = search_image_files(prefix)

    response_data = json.dumps(filenames, cls=CustomJSONEncoder)
    json_data = json.loads(response_data)
    response = JsonResponse(json_data, safe=False)

    return response


# sql of view [bar_search_tbl]

# SELECT CONCAT_WS(" / ", pa.area_title, pp.province_title) province, bb.*, 
# 				(					
# 						select GROUP_CONCAT(CONCAT(",", bars_bar_category.id, ",") SEPARATOR ',') as categoryset
# 						from bars_bar_fk_categorys 
# 						LEFT JOIN bars_bar_category on bars_bar_category.id = bars_bar_fk_categorys.bar_category_id
# 						where bar_id = bb.id
# 				) as bar_category_ids, 
# 				(					
# 						select GROUP_CONCAT(bars_bar_category.bar_category_title SEPARATOR ',') as categoryset
# 						from bars_bar_fk_categorys 
# 						LEFT JOIN bars_bar_category on bars_bar_category.id = bars_bar_fk_categorys.bar_category_id
# 						where bar_id = bb.id
# 				) as bar_categorys, 
# 				(					
# 						select GROUP_CONCAT(CONCAT(",",bars_bar_facility.id, ',') SEPARATOR ',') as facilityset
# 						from bars_bar_fk_facilitys 
# 						LEFT JOIN bars_bar_facility on bars_bar_facility.id = bars_bar_fk_facilitys.bar_facility_id
# 						where bar_id = bb.id
# 				) as bar_facility_ids,
# 				(					
# 						select GROUP_CONCAT(bars_bar_facility.bar_facility_title SEPARATOR ',') as facilityset
# 						from bars_bar_fk_facilitys 
# 						LEFT JOIN bars_bar_facility on bars_bar_facility.id = bars_bar_fk_facilitys.bar_facility_id
# 						where bar_id = bb.id
# 				) as bar_facilitys,
# 				(					
# 						select GROUP_CONCAT(bars_paymentmethod.paymentmethod_title SEPARATOR ',') as paymentmethodset
# 						from bars_bar_fk_paymentmethods
# 						LEFT JOIN bars_paymentmethod on bars_paymentmethod.id = bars_bar_fk_paymentmethods.paymentmethod_id
# 						where bar_id = bb.id
# 				) as paymentmethods,
# 				(					
# 						select GROUP_CONCAT(CONCAT(",",bars_paymentmethod.id, ",") SEPARATOR ',') as paymentmethodset
# 						from bars_bar_fk_paymentmethods
# 						LEFT JOIN bars_paymentmethod on bars_paymentmethod.id = bars_bar_fk_paymentmethods.paymentmethod_id
# 						where bar_id = bb.id
# 				) as paymentmethod_ids,
# 				(					
# 						select GROUP_CONCAT(bars_bar_amusement.bar_amusement_title SEPARATOR ',') as amusementset
# 						from bars_bar_fk_amusements 
# 						LEFT JOIN bars_bar_amusement on bars_bar_amusement.id = bars_bar_fk_amusements.bar_amusement_id
# 						where bar_id = bb.id
# 				) as bar_amusements,
# 				(					
# 						select GROUP_CONCAT(CONCAT(",",bars_bar_amusement.id, ",") SEPARATOR ',') as amusementset
# 						from bars_bar_fk_amusements 
# 						LEFT JOIN bars_bar_amusement on bars_bar_amusement.id = bars_bar_fk_amusements.bar_amusement_id
# 						where bar_id = bb.id
# 				) as bar_amusement_ids,
# 				(
# 						select count(*) from bars_bar_fk_casts where bar_id = bb.id
# 				) as cast_cnt
# 		FROM bars_bar as bb 
# 		LEFT JOIN province_province as pp on bb.fk_province_id = pp.id
# 		left join province_area as pa on pa.id = pp.area_id 
# ======================= sql end ===========================================

# = ======== sql of view [bar_search_tbl] ===================================
# select bc.*, 
# 	(
# 		select 	GROUP_CONCAT(concat(',', bars_bar.id, ',') SEPARATOR ",") bars 					
# 		from bars_bar_fk_casts
# 		LEFT JOIN bars_bar on bars_bar.id = bars_bar_fk_casts.bar_id		
# 		where bars_bar_fk_casts.cast_id = bc.id
# 	) as bar_ids,
# 	(
# 		select 	GROUP_CONCAT(bars_bar.bar_title SEPARATOR ",") bars 					
# 		from bars_bar_fk_casts
# 		LEFT JOIN bars_bar on bars_bar.id = bars_bar_fk_casts.bar_id		
# 		where bars_bar_fk_casts.cast_id = bc.id
# 	) as bars,
# 	(
# 		select 	GROUP_CONCAT(CONCAT_WS(" / ", province_area.area_title, province_province.province_title) SEPARATOR ", ") provinces 
# 		from bars_bar_fk_casts
# 		LEFT JOIN bars_bar on bars_bar.id = bars_bar_fk_casts.bar_id
# 		left join province_province on province_province.id = bars_bar.fk_province_id
# 		left join province_area on province_province.area_id = province_area.id
# 		where bars_bar_fk_casts.cast_id = bc.id
# 	) as provinces
# from bars_cast bc 
# ======================= sql end ===========================================



