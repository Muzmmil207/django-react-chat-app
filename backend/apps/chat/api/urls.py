from django.urls import include, path
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from . import views

urlpatterns = [
    path("", views.get_routes, name="get_routes"),
    path("users/", views.UserView, name="user-view"),
    path("register/", views.UserRegisterView),
    path("users-messages/<int:user_id>/", views.UserMessageView, name="message_api_view"),
    # tokens views
    path("token/", views.MyTokenObtainPairView.as_view(), name="token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh-token"),
]

urlpatterns += [
    path("api-auth/", include("rest_framework.urls")),
]

urlpatterns = format_suffix_patterns(urlpatterns)
