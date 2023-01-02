import uuid

from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class Conversation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    from_user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="messages_from_me"
    )
    to_user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="messages_to_me"
    )
    content = models.CharField(max_length=1024)
    timestamp = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-timestamp']
    def __str__(self):
        return f"From {self.from_user.username} to {self.to_user.username}: {self.content} [{self.timestamp}]"


class ChatGroup(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=128)
    online = models.ManyToManyField(to=User, blank=True)

    def get_online_count(self):
        return self.online.count()

    def join(self, user):
        self.online.add(user)
        self.save()

    def leave(self, user):
        self.online.remove(user)
        self.save()

    class Meta:
        verbose_name_plural = 'Chats Groups'
        ordering = ['name']

    def __str__(self):
        return f"{self.name} ({self.get_online_count()})"


class GroupMessage(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    conversation = models.ForeignKey(
        ChatGroup, on_delete=models.CASCADE, related_name="messages"
    )
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="user_messages"
    )
    content = models.CharField(max_length=1024)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} | {self.conversation}: {self.content} [{self.timestamp}]"
