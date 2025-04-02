from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response

from .models import User, Incident
from .serializers import (
    UserRegisterSerializer,
    UserLoginSerializer, 
    UserSerializer, 
    PasswordResetSerializer, 
    PasswordResetConfirmSerializer,
    IncidentSerializer
)


class UserRegisterView(generics.CreateAPIView):
    users = User.objects.all()
    serializer_class = UserRegisterSerializer

class LoggedInUserView(APIView):
    """API view to retrieve logged-in user data"""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserLoginView(APIView):
    """Handle user login"""
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        password = request.data.get("password")

        user = authenticate(username=email, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user=user)
            user_serializer = UserSerializer(user)
            data = {
                "user": user_serializer.data,
                "refresh": str(refresh),
                "access": str(refresh.access_token)
            }
            print(data)
            return Response(data, status=status.HTTP_200_OK)
        
        return Response({
            "error":"Invalid Login Credentials."
        }, status=401)


class ForgrtPasswordView(generics.GenericAPIView):
    """Handle Forget Password"""
    serializer_class = PasswordResetSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            return Response({"message": "Password reset email sent."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ForgrtPasswordConfirmView(generics.GenericAPIView):
    """Handle Forget Password confirmation"""
    serializer_class = PasswordResetConfirmSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            return Response({"message": "Password successfully reset."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class IncidentListCreateView(generics.ListCreateAPIView):
    """Handles listing and creating incidents"""

    serializer_class = IncidentSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """Return incidents only related to the authenticated user"""
        return Incident.objects.filter(reporter=self.request.user)

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(
            reporter=user,
            reporter_name=user.get_full_name() or user.username,
            reporter_email=user.email
        )
        

class IncidentGetUpdateView(APIView):
    """Handles retrieving and updating a single incident"""
    permission_classes = (IsAuthenticated,)

    def get_object(self, incident_id, user):
        """Retrieve an incident ensuring the user is the reporter"""
        incident = get_object_or_404(Incident, incident_id=incident_id)
        if incident.reporter != user:
            raise PermissionDenied("You do not have permission to access this incident.")
        return incident

    def get(self, request, incident_id):
        """Retrieve a single incident"""
        incident = self.get_object(incident_id, request.user)
        serializer = IncidentSerializer(incident)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, incident_id):
        """Update a single incident"""
        incident = self.get_object(incident_id, request.user)
        serializer = IncidentSerializer(incident, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save(
                reporter_name=incident.reporter_name,  # Prevent changes
                reporter_email=incident.reporter_email  # Prevent changes
            )
            data = {
                "status": 200,
                "message": "Incident Updated successfuly.",
                "data":serializer.data,
            }
            return Response(data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
