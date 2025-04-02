from rest_framework import serializers
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.hashers import make_password
from django.conf import settings
from django.core.mail import send_mail
from django.contrib.auth import get_user_model
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes

from .models import Incident


User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields = ("id", "type", "first_name", "last_name", "email", "address", "country", "state", "city", "pincode", "mobile", "fax", "phone")

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ("type", "first_name", "last_name", "email", "password", "address", "country", "state", "city", "pincode", "mobile", "fax", "phone")
    
    def create(self, validated_data):
        
        user = User.objects.create_user(
            type = validated_data["type"],
            email = validated_data["email"],
            password = validated_data["password"],
            username= validated_data["email"],
            first_name = validated_data["first_name"],
            last_name = validated_data.get("last_name", ""),
            address = validated_data["address"],
            country = validated_data["country"],
            state = validated_data["state"],
            city = validated_data["city"],
            pincode = validated_data["pincode"],
            mobile = validated_data["mobile"],
            fax = validated_data.get("fax"),
            phone = validated_data.get("phone"),
        )
        return user

class UserLoginSerializer(serializers.Serializer):
    email = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)


class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        try:
            user = User.objects.get(email=value)
        except User.DoesNotExist:
            raise serializers.ValidationError("User with this email does not exist.")

        # Generate password reset token
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))

        # Generate reset link
        reset_link = f"{settings.BASE_URL_FRONTEND}/forget-password-confirm/?uid={uid}&token={token}"

        # Send reset email
        send_mail(
            "Password Reset Request",
            f"Click the link below to reset your password:\n{reset_link}",
            settings.EMAIL_HOST_USER,
            [user.email],
            fail_silently=False,
        )

        return value


class PasswordResetConfirmSerializer(serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()
    new_password = serializers.CharField(write_only=True, min_length=6)
    confirm_password = serializers.CharField(write_only=True, min_length=6)

    def validate(self, data):
        try:
            if data["new_password"] != data["confirm_password"]:
                raise serializers.ValidationError("New Password and Confirm Password is Different")
            
            uid = urlsafe_base64_decode(data["uid"]).decode()
            user = User.objects.get(pk=uid)
        except (User.DoesNotExist, ValueError, TypeError):
            raise serializers.ValidationError("Invalid UID")

        if not default_token_generator.check_token(user, data["token"]):
            raise serializers.ValidationError("Invalid token")

        # Set new password
        user.password = make_password(data["new_password"])
        user.save()

        return data


class IncidentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Incident
        fields = "__all__"
        read_only_fields = ("incident_id", "reported_at", "reporter", "reporter_name", "reporter_email")