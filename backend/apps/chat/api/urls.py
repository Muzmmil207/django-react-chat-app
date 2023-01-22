from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from . import views

urlpatterns = [
    path("", views.get_routes, name="get_routes"),
    path('users/', views.UserView, name="users_api_view"),
    path('users-messages/<int:user_id>/', views.UserMessageView, name="message_api_view"),

    path('token/', views.MyTokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),

]
