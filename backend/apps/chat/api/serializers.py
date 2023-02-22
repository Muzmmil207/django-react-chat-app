from apps.chat.models import ChatGroup, Conversation, GroupMessage
from django.contrib.auth.models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    messages_from_me = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Conversation.objects.all()
    )

    class Meta:
        model = User
        fields = ["id", "username", "messages_from_me"]
        read_only = True


class ConversationSerializer(serializers.ModelSerializer):

    from_user = serializers.StringRelatedField()
    to_user = serializers.StringRelatedField()

    class Meta:
        model = Conversation
        fields = ["id", "from_user", "to_user", "content"]
