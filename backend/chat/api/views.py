from rest_framework import filters, viewsets
from rest_framework.permissions import IsAuthenticated

from .serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    ...
