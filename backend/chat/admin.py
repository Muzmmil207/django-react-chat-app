from django.contrib import admin

from .models import ChatGroup, Conversation, GroupMessage

admin.site.register(Conversation)
admin.site.register(ChatGroup)
admin.site.register(GroupMessage)
