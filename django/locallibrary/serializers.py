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

class BookInstanceSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = BookInstance
        fields = ['url','id','book','imprint','due_back','status']
        read_only_fields = ['id']
        

class BookSerializer(serializers.ModelSerializer):
    language = LanguageSerializer(
            many=True,
            read_only=True,
            )

    # https://stackoverflow.com/questions/26561640/django-rest-framework-read-nested-data-write-integer
    # how to do nested read flat write
    language_ids = serializers.PrimaryKeyRelatedField(
            many=True,
            # only want to reference the ids when I'm writing
            write_only=True,
            source='language',
            queryset=Language.objects.all(),
            )
    
    genre = GenreSerializer(
            many=True,
            read_only=True,
            )

    genre_ids = serializers.PrimaryKeyRelatedField(
            many=True,
            # only want to reference the ids when I'm writing
            write_only=True,
            source='genre',
            queryset=Genre.objects.all(),
            )

    instances = BookInstanceSerializer(
            many=True, 
            read_only=True,
            # you can create a book with no instances
            required=False,
            );

    author = AuthorSerializer(
            many=False, 
            read_only=True,
            )

    author_id = serializers.PrimaryKeyRelatedField(
            many=False,
            # only want to reference the ids when I'm writing
            write_only=True,
            source='author',
            queryset=Author.objects.all(),
            )

    class Meta:
        model = Book
        # fields must be the computer names, not verbose_name's
        fields = ['url',
                  'id',
                  'title',
                  'summary',
                  'isbn',
                  'author',
                  'author_id',
                  'genre',
                  'genre_ids',
                  'language',
                  'language_ids',
                  'instances',
                  ]


