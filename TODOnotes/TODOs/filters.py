from django_filters import rest_framework as filters
from TODOs.models import TODO


class TodoFilter(filters.FilterSet):
    created = filters.DateFromToRangeFilter()

    class Meta:
        model = TODO
        fields = ['project', 'created']