from django.shortcuts import render
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import ModelViewSet
from rest_framework.serializers import Serializer, CharField, IntegerField, ValidationError

from TODOs.models import Project, TODO
from users.models import User
from users.serializers import UserModelSerializer
from TODOs.serializers import ProjectModelSerializer, TODOModelSerializer

# Create your views here.

class UserViewSet(ModelViewSet):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = User.objects.all()
    serializer_class = UserModelSerializer


class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer


class TODOViewSet(ModelViewSet):
    queryset = TODO.objects.all()
    serializer_class = TODOModelSerializer


class UserSerializer(Serializer):
    username = CharField(max_length=64)
    first_name = CharField(max_length=64)
    last_name = CharField(max_length=64)
    email = CharField(max_length=64)


    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)
        instance.save()
        return instance

    def create(self, validated_data):
        user = User(**validated_data)
        user.save()
        return user


class ProjectSerializer(Serializer):
    name = CharField(max_length=64)
    users = UserSerializer(many=True)


class TODOSerializer(Serializer):
    project = ProjectSerializer()
    text = CharField(max_length=64)
    user = UserSerializer()


