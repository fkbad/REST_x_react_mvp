from django.shortcuts import render
# import that gets us the ViewSets
from rest_framework import viewsets

from .models import Language, Genre, Author, Book, BookInstance
from .serializers import LanguageSerializer, GenreSerializer, AuthorSerializer, BookSerializer, BookInstanceSerializer

class LanguageViewSet(viewsets.ModelViewSet):
    # required arguments are the query set 
    # and the serializer_class
    queryset = Language.objects.all()
    serializer_class=LanguageSerializer

class GenreViewSet(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer

class AuthorViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class BookInstanceViewSet(viewsets.ModelViewSet):
    queryset = BookInstance.objects.all()
    serializer_class = BookInstanceSerializer
