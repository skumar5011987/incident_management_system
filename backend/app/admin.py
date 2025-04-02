from django.contrib import admin
from .models import User, Incident


class IncidentAdmin(admin.ModelAdmin):
    list_display = ("incident_id", "reporter_name", "reporter_email", "title", "status", "priority", "reported_at")
    list_filter = ("status", "priority", "type", "reported_at")
    search_fields = ("incident_id", "reporter_name", "reporter_email", "title", "details")
    readonly_fields = ("incident_id", "reported_at", "reporter", "reporter_name", "reporter_email")

    def has_add_permission(self, request):
        """Disable adding incidents from the admin panel"""
        return False  # This will prevent manual creation

admin.site.register(Incident, IncidentAdmin)
