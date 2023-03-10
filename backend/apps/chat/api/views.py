from apps.chat.models import Conversation, User
from django.contrib.auth.forms import UserCreationForm
from django.db.models import Q
from rest_framework import filters, generics, mixins, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import ConversationSerializer, UserSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    # @classmethod
    # def get_token(cls, user):
    #     token = super.get_token(user)
    #     token['username'] = user.username
    #     return token
    pass


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(["GET"])
def get_routes(request, format=None):
    return Response(
        {
            "users": reverse("user-view", request=request, format=format),
            "token": reverse("token", request=request, format=format),
            "refresh-token": reverse("refresh-token", request=request, format=format),
        }
    )


@api_view(["POST"])
def UserRegisterView(request):
    data = request.data
    user = UserSerializer(data)

    if User.objects.filter(username=data.get("username")).exists():
        return Response(
            {"response": "User with this name already exists, please try another username"}
        )
    elif data.get("password1") == None or data.get("password1") != data.get("password2"):
        return Response({"response": "password did not match"})
    elif user.is_valid():
        user.save()
        return Response({"response": "Done"})
    else:
        return Response({"response": "The data dose not valid"})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def UserView(request, format=None):
    users = User.objects.exclude(id=request.user.id)
    serializers = UserSerializer(users, many=True)
    return Response(serializers.data)


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def UserMessageView(request, user_id):
    if request.method == "POST":
        data = request.data
        from_user = User.objects.get(id=data["from_user"])
        to_user = User.objects.get(id=data["to_user"])
        Conversation.objects.create(
            from_user=from_user,
            to_user=to_user,
            content=data["content"],
        )

    users_message = Conversation.objects.filter(
        Q(from_user=request.user.id, to_user=user_id)
        | Q(from_user=user_id, to_user=request.user.id)
    )

    serializers = ConversationSerializer(users_message, many=True)
    return Response(serializers.data)


# class UserView(generics.ListAPIView):
#     """
#     API endpoint that returns all users
#     """
#     queryset = User.objects.all()
#     serializer_class= UserSerializer
