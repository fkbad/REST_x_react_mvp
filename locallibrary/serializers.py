from rest_framework import serializers
from .models import Language, Book, BookInstance, Genre, Author

# model serializer class is a short cut 
# to create serializers for our model objects
# which includes automatically determining what fields will be part
# of the serialized output and implmenting 
class LanguageSerializer(serializers.HyperlinkedModelSerializer):
    # related name in the Book class is "books", thus the 
    # variable name is books
    books = serializers.HyperlinkedRelatedField(
            view_name="book-detail",
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
            read_only=True,
            )

    # instances = serializers.HyperlinkedRelatedField(
    #         view_name='-detail',
    #         many=True, 
    #         read_only=True,
    #         )
    class Meta:
        model = Book
        # fields must be the computer names, not verbose_name's
        # fields = ['url','id','title','author','summary','isbn','genre','language','instances']
        fields = ['url','id','title','author','summary','isbn','genre','language']

class BookInstanceSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = BookInstance
        fields = ['url','id','book','imprint','due_back','status']
        read_only_fields = ['id']
        
