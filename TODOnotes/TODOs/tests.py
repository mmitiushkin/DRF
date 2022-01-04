import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient
from mixer.backend.django import mixer
from TODOs.views import ProjectViewSet
from TODOs.models import TODO, Project
from users.models import User


class TestProjectViewSet(TestCase):

    def setUp(self) -> None:
        self.admin = User.objects.create_superuser('asdf', email='test@gmail.com', password='qwerty')

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/projects/')
        force_authenticate(request, user=self.admin)
        view = ProjectViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestTODOViewSet(TestCase):

    def setUp(self) -> None:
        self.admin = User.objects.create_superuser('asdf', email='test@gmail.com', password='qwerty')

    def test_get_detail(self):
        client = APIClient()
        todo = mixer.blend(TODO)
        client.login(username='asdf', password='qwerty')
        response = client.get(f'/api/TODOs/{todo.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.client.logout()
        response = self.client.get(f'/api/TODOs/{todo.id}/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)



