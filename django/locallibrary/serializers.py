from rest_framework import serializers
from .models import Language, Book, BookInstance, Genre, Author

# model serializer class is a short cut 
# to create serializers for our model objects
# which includes automatically determining what fields will be part
# of the serialized output and implmenting 
class LanguageSerializer(serializers.HyperlinkedModelSerializer):
    # related_name in the Book class is "books", thus the 
    # variable name is books
    books = serializers.HyperlinkedRelatedField(
            view_name="book-detail",
            # testing longer basename
            # view_name = "book-but-a-longer_viewname_with_extra-shit-detail",
            many=True, 
            read_only=True,
            )
    class Meta:
        model = Language
        # include the URL so in the list view we can immediately see the link
        # to get to any specific book
        fields = ['url','id','name','books']

class GenreSerializer(serializers.HyperlinkedModelSerializer):
    books = serializers.HyperlinkedRelatedField(
            # each book will be turned into its
            # API route for the detail view
            view_name="book-detail",
            many=True, 
            read_only=True,
            )
    class Meta:
        model = Genre
        fields = ['url','id','name','books']

class AuthorSerializer(serializers.HyperlinkedModelSerializer):
    books = serializers.HyperlinkedRelatedField(
            # each book will be turned into its
            # API route for the detail view
            view_name="book-detail",
            many=True, 
            read_only=True,
            )
    class Meta:
        model = Author
        fields = ['url','id','first_name', 'last_name', 'date_of_birth', 'date_of_death','books']

class BookSerializer(serializers.ModelSerializer):
    # https://www.django-rest-framework.org/api-guide/relations/#slugrelatedfield
    # the name of the variables (in this case 'language' and 'genre' need to match 
                                 # the field name we're referencing in the model)
    # it couldn't be "languages = ..." because the field is called langauge (no s)
    language = serializers.HyperlinkedRelatedField(
            view_name='language-detail',
            allow_empty=False, 
            many=True, 
            read_only=True,
            )
    genre = serializers.HyperlinkedRelatedField(
            view_name='genre-detail',
            allow_empty=False, 
            many=True, 
            # this read only means that it is not allowed to be 
            # changed from the web REST API
            read_only=True,
            # queryset=Genre.objects.all(),
            )

    instances = serializers.HyperlinkedRelatedField(
            # basename "bookinstance" in urls.py router 
            view_name='bookinstance-detail',
            many=True, 
            read_only=True,
            )

    author = serializers.HyperlinkedRelatedField(
            # basename "bookinstance" in urls.py router 
            view_name='author-detail',
            many=False, 
            queryset=Author.objects.all()
            )

    class Meta:
        model = Book
        # fields must be the computer names, not verbose_name's
        fields = ['url','id','title','author','summary','isbn','genre','language','instances']

class BookInstanceSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = BookInstance
        fields = ['url','id','book','imprint','due_back','status']
        read_only_fields = ['id']
        

August 20, 2023 - August 26, 2023
3.5 hours : Mon, 8/21 06:00 PM-09:30 PM : more react learning
3.5 hours : Tue, 8/22 08:00 AM-11:30 AM : react + revised weekly meeting
2 hours : Tue, 8/22 12:00 PM-02:00 PM : more react
4.25 hours : Wed, 8/23 09:45 AM-02:00 PM : react work
3 hours : Wed, 8/23 06:00 PM-09:00 PM : react work on slightly larger project! woo!
4.5 hours : Thu, 8/24 08:30 AM-01:00 PM : rest framework learning!
4 hours : Thu, 8/24 01:30 PM-05:30 PM : server code for MVP up!
0.75 hours : Thu, 8/24 06:00 PM-06:45 PM : finishing hyperlinked REST api
4.5 hours : Fri, 8/25 10:00 AM-02:30 PM : react work with Django

30 total hours
