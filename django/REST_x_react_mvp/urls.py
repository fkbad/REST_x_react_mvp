"""
URL configuration for REST_x_react_mvp project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include

# two imports needed to configure ViewSets and Routers
from rest_framework.routers import DefaultRouter
from locallibrary import views


# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'languages', views.LanguageViewSet,basename="language")
router.register(r'genres', views.GenreViewSet,basename="genre")
router.register(r'authors', views.AuthorViewSet,basename="author")
# router.register(r'books', views.BookViewSet,basename="book-but-a-longer_viewname_with_extra-shit")
router.register(r'books', views.BookViewSet,basename="book")
router.register(r'bookinstances', views.BookInstanceViewSet,basename="bookinstance")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
]
