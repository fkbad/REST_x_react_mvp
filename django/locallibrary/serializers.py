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
    language = LanguageSerializer(
            many=True,
            read_only=False,
            )
    
    genre = GenreSerializer(
            many=True,
            read_only=False,
            )

    instances = serializers.HyperlinkedRelatedField(
            # basename "bookinstance" in urls.py router 
            view_name='bookinstance-detail',
            many=True, 
            read_only=False,
            queryset=BookInstance.objects.all()
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
        

