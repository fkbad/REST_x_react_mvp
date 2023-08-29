# https://developer.mozilla.rg/en-US/docs/Learn/Server-side/Django/Models
from django.db import models
import uuid # Required for unique book instances

class Genre(models.Model):
    """Model representing a book genre."""
    name = models.CharField(
            max_length=200, 
            help_text='Enter a book genre (e.g. Science Fiction)'
            )

    def __str__(self):
        """String for representing the Model object."""
        return self.name


class Author(models.Model):
    """ class to represent an Author
    an Author has 1+ books associated with it 
    """
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    date_of_birth = models.DateField(null=True, blank=True)
    date_of_death = models.DateField('Died', null=True, blank=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    class Meta:
        ordering=['id']

class Book(models.Model):
    """Model representing a book, conceptual idea of one"""

    title = models.CharField(
            max_length=200,
            help_text="Enter the Full Title of the Book (including subtitle)"
            )
    # one author to many books
    # on delete, set the author to null
    author = models.ForeignKey(
            Author,
            on_delete=models.SET_NULL, 
            null=True,
            related_name="books"
            )
    # text field which allows longer entries
    summary = models.TextField(
            max_length=3000, 
            help_text='Enter a brief description of the book'
            )
    isbn = models.CharField(
            max_length=14,
            unique=True,
            verbose_name="ISBN",
            help_text='13 Character <a href="https://www.isbn-international.org/content/what-isbn">ISBN number</a>',
            )
    genre = models.ManyToManyField(
            Genre, 
            help_text='Select a genre for this book',
            # setting the related name 
            # such that the serializer can 
            related_name="books"

            )
    language = models.ManyToManyField(
            'Language',
            related_name="books")

    def __str__(self):
        return f"{self.title} - {self.author}"

class BookInstance(models.Model):
    """
    Model representing a specific copy of a book (i.e. that can be borrowed from the library).
    """

    id = models.UUIDField(
            primary_key=True, 
            default=uuid.uuid4, 
            help_text='Unique ID for this particular book across whole library'
            )

    book = models.ForeignKey(
            'Book', 
            # don't allow the deletion of Book concepts
            on_delete=models.RESTRICT, 
            null=True,
            related_name="instances"
            )

    imprint = models.CharField(
            max_length=200,
            help_text="Specific Information about this books version"
            )

    due_back = models.DateField(
            null=True, 
            blank=True
            )

    LOAN_STATUS = (
        ('m', 'Maintenance'),
        ('o', 'On loan'),
        ('a', 'Available'),
        ('r', 'Reserved'),
    )
    status = models.CharField(
        max_length=1,
        choices=LOAN_STATUS,
        blank=True,
        default='m',
        help_text='Book availability',
    )

    class Meta:
        ordering = ['due_back']

    def __str__(self):
        """String for representing the Model object."""
        return f'{self.id} ({self.book.title})'

class Language(models.Model):
    """
    class to represent the language associated with a particular book
    """
    name = models.CharField(
            max_length=200,
            help_text="The primary language a book is written in",
            # this uniqueness is case sensitive
            unique=True,
            )

    def __str__(self):
        return f"{self.name}"

