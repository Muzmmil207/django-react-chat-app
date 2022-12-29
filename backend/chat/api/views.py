from chat.models import User
from rest_framework import filters, generics, mixins, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import UserSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    # @classmethod
    # def get_token(cls, user):
    #     token = super.get_token(user)
    #     token['username'] = user.username
    #     return token
    pass

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    

@api_view(['GET'])
def get_routes(request):
    routes = [
        '/users'
        '/api/token',
        '/api/token/refresh',
    ]
    return Response(routes)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def UserView(request):
    users = User.objects.exclude(id=request.user.id)
    serializers = UserSerializer(users, many=True)
    return Response(serializers.data)

# class UserView(generics.ListAPIView):
#     """
#     API endpoint that returns all users
#     """
#     queryset = User.objects.all()
#     serializer_class= UserSerializer

