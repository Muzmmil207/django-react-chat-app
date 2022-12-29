from chat.models import ChatGroup, Conversation, GroupMessage
from django.contrib.auth.models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username"]
        read_only = True



class ConversationSerializer(serializers.ModelSerializer):
    
    from_user = serializers.StringRelatedField()
    to_user = serializers.StringRelatedField()

    class Meta:
        model = Conversation
        fields = ["id", "from_user", "to_user" , "content"]
