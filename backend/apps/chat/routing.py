from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path(r'(?P<users_ids>\w+)/',  consumers.ChatConsumer.as_asgi())
]
