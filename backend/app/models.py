import uuid
import random
from datetime import datetime
from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    USER_TYPE = [
        ("individual", "Individual"),
        ("enterprise", "Enterprise"),
        ("government", "Government"),
    ]
    type = models.CharField("User type", max_length=12, choices=USER_TYPE, default="individual")
    address = models.CharField("Address", max_length=128)
    country = models.CharField("Country", max_length=64)
    state = models.CharField("State", max_length=64)
    city = models.CharField("City", max_length=64)
    pincode = models.CharField("Pin code", max_length=8)
    mobile = models.CharField("Mobile no", max_length=15)
    fax = models.CharField("Fax no", max_length=15, blank=True, null=True)
    phone = models.CharField("Phone no", max_length=15, blank=True, null=True)


class Incident(models.Model):
    PRIORITY = [
        ("low", "Low"),
        ("medium", "Medium"),
        ("high", "High"),
    ]
    STATUS = [
        ("open", "Open"),
        ("in_progress", "In Progress"),
        ("closed", "Closed"),
    ]
    INCIDENT_TYPE = [
        ("enterprise", "Enterprise"),
        ("government", "Government"),
    ]

    incident_id = models.CharField(max_length=15, unique=True, primary_key=True, editable=False)
    reporter = models.ForeignKey(User, on_delete=models.CASCADE, related_name="incidents")
    reporter_name = models.CharField(max_length=255)
    reporter_email = models.EmailField()
    reporter_phone = models.CharField(max_length=15, blank=True, null=True)
    title = models.CharField("Title", max_length=255)
    details = models.TextField("Incident Detail")
    type = models.CharField("User type", max_length=12, choices=INCIDENT_TYPE, default="enterprise")
    status = models.CharField("Status", max_length=16, choices=STATUS, default="open")
    priority = models.CharField("Priority", max_length=8, choices=PRIORITY, default="low")
    reported_at = models.DateTimeField("Reported date", auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.incident_id:
            self.incident_id = self.generate_unique_incident_id()
        super().save(*args, **kwargs)
    
    def generate_unique_incident_id(self):
        current_year = datetime.now().year
        while True:
            random_number = random.randint(10000, 99999)
            incident_id = f"RMG{random_number}{current_year}"
            if not Incident.objects.filter(incident_id=incident_id).exists():
                return incident_id
    
    def __str__(self):
        return f"{self.incident_id} - {self.reporter_name}"