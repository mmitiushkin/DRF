from django.test import TestCase
from rest_framework import status
from mixer.backend.django import mixer
from users.models import User
from rest_framework.test import APITestCase, APIRequestFactory, force_authenticate

from users.views import UserModelViewSet


class TestUserViewSet(APITestCase):

    def setUp(self) -> None:
        self.admin = User.objects.create_superuser('asdf', email='test@gmail.com', password='qwerty')

    def test_get_list(self):
        self.client.login(username='asdf', password='qwerty')
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_user(self):
        factory = APIRequestFactory()
        user = mixer.blend(User)

        request = factory.post('/api/users/', {
            'username': 'adsfasdf',
            'email': 'asdfasdf@mail.ru',
            "first_name": "asdf",
            "last_name": "asdfasdf",
            'password': 'asdfasdf'
        })
        force_authenticate(request, user=self.admin)
        view = UserModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


