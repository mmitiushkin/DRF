import graphene
from graphene_django import DjangoObjectType

from TODOs.models import TODO, Project
from users.models import User


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = ('id', 'username')


class TODOType(DjangoObjectType):
    class Meta:
        model = TODO
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class Query(graphene.ObjectType):
    all_Projects = graphene.List(ProjectType)

    def resolve_all_Projects(root, info):
        return Project.objects.all()


schema = graphene.Schema(query=Query)
