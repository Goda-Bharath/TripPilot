from django.urls import path
from .views import Registerview, Loginview,BusListCreateView, BuseDetailView, UserBookingView,BookingView

urlpatterns = [
    path('buses/', BusListCreateView.as_view(),name='buslist'),
    path('buses/<int:pk>/', BuseDetailView.as_view(), name='bus-detail'),
    path('register/', Registerview.as_view(), name='register'),
    path('login/', Loginview.as_view(), name='login'),
    path('user/<int:user_id>/bookings/', UserBookingView.as_view(),name='user-bookings'),
    path('booking/', BookingView.as_view(), name='bookings'),
]
