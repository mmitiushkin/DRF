from django.shortcuts import render
from rest_framework import mixins
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework import viewsets
from rest_framework.viewsets import ModelViewSet

from .models import User
from .serializers import UserModelSerializer, UserModelSerializerV2


# Create your views here.
class UserModelViewSet(ModelViewSet):

    queryset = User.objects.all()
    # serializer_class = UserModelSerializer
    def get_serializer_class(self):
        if self.request.version == 'v2':
            return UserModelSerializerV2
        return UserModelSerializer


class UserAPIView(mixins.ListModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  viewsets.GenericViewSet):
    renderer_classes = [JSONRenderer]
    queryset = User.objects.all()
    serializer_class = UserModelSerializer

    def get(self, request, *args, **kwargs):
        if 'pk' in kwargs:
            return self.retrieve(request, *args, **kwargs)
        return self.list(request, *args, **kwargs)



