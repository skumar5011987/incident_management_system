from django.urls import path
from . import views

urlpatterns = [
    path("auth/sign-up/", views.UserRegisterView.as_view(), name="register"),
    path("auth/login/", views.UserLoginView.as_view(), name="login"),
    path("auth/forget-password/", views.ForgrtPasswordView.as_view(), name="forget_password"),
    path("auth/forget-password-confirm/", views.ForgrtPasswordConfirmView.as_view(), name="forget_password_confirm"),

    path("dashboard/", views.LoggedInUserView.as_view(), name="user-info"),
    path("incidents/", views.IncidentListCreateView.as_view(), name="incident-list-create"),
    path("incident/<str:incident_id>/", views.IncidentGetUpdateView.as_view(), name="incident-get-update"),

]