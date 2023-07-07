from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(), unique=True)
    phone_number = db.Column(db.String())
    password = db.Column(db.String())

    bookings = db.relationship('Booking', backref='user',)
    reviews = db.relationship('Review', backref='user',)

    def __init__(self, username, phone_number, password):
        self.username = username
        self.phone_number = phone_number
        self.password = password

    def check_password(self, password):
        return self.password == password

class Hotel(db.Model):
    __tablename__ = 'hotels'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), unique=True)
    image_url = db.Column(db.String())
    description = db.Column(db.String())
    location = db.Column(db.String())
    prices = db.Column(db.Integer())
    bookings = db.relationship('Booking', backref='hotel',)

class Park(db.Model):
    __tablename__ = 'parks'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), unique=True)
    image_url = db.Column(db.String())
    description = db.Column(db.String())
    location = db.Column(db.String())
    prices = db.Column(db.Integer())
    ranger_id = db.Column(db.Integer, db.ForeignKey("rangers.id"))
    bookings = db.relationship('Booking', backref='park',)

class Ranger(db.Model):
    __tablename__ = 'rangers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), unique=True)
    gender = db.Column(db.String())
    parks = db.relationship('Park', backref='ranger',)

class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    email = db.Column(db.String())
    feedback = db.Column(db.String())
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), )

class Booking(db.Model):
    __tablename__ = 'bookings'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Integer, db.ForeignKey("users.username"),)
    hotel_name = db.Column(db.String(), db.ForeignKey("hotels.name"),)
    park_name = db.Column(db.String(), db.ForeignKey("parks.name"),)
    check_in = db.Column(db.String())
    check_out = db.Column(db.String())
