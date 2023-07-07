from flask import Flask, make_response, jsonify, request, session
from flask_migrate import Migrate
from models import db, User, Hotel, Park, Ranger, Review, Booking
from flask_cors import CORS
from flask_bcrypt import Bcrypt

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///jambo.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY']=b'\xbe\xd7b\x87\xdbF\x1e\xcf\xc1\xa7\xb7\x12\xc5Y\xe7\
xd9\xa6\x86\xc7PH\xbea'

CORS(app)
migrate = Migrate(app, db)
db.init_app(app)
bycrypt = Bcrypt(app)

@app.route('/')
def home():
    return jsonify({'message': 'Welcome to the jambo API'})

@app.route('/login', methods=['POST'])
def login():
    username = request.json['username']
    password = request.json['password']
    user = User.query.filter_by(username=username).first()
    if user:
        if bycrypt.check_password_hash(user.password, password):
            session['id'] = user.id
            return jsonify({'message': 'Login Successful'})
        else:
            return jsonify({'message': 'Invalid Credentials'})
    else:
        return jsonify({'message': 'User not found'})

@app.route('/register', methods=['POST'])
def register():
    if 'username' in request.json and 'password' in request.json:
        username = request.json['username']
        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            return jsonify({'message': 'Username already exists'})
        else:
            password = request.json['password']
            hashed_password = bycrypt.generate_password_hash(password)
            new_user = User(
                username=username,
                phone_number=request.json['phone_number'],
                password=hashed_password
            )
            db.session.add(new_user)
            db.session.commit()
            session['id'] = new_user.id
            return jsonify({'message': 'Registration Successful'})
    else:
        return jsonify({'message': 'Missing username or password'})


@app.route('/logout', methods=['POST'])
def logout():
    session.pop('id', None) 
    return {"msg": "User logged out"}


@app.route('/users', methods=['GET'])
def get_users():
    if request.method == 'GET':
            users = User.query.all()
            user_list = []
            for user in users:
                user_dict = {
                    'id': user.id,
                    'username': user.username,
                    'phone_number': user.phone_number,
                    'password': user.password
                }
                user_list.append(user_dict)
            response = make_response(
                jsonify(user_list),
                200
            )
            return response
    
@app.route('/user/<int:id>', methods=['GET', 'DELETE'])
def get_user(id):
    if request.method == 'GET':
            user = User.query.filter_by(id=id).first()
            if user:
                response = make_response(
                    jsonify(user_dict = {
                        'id': user.id,
                        'username': user.username,
                        'phone_number': user.phone_number,
                        'password': user.password
                    }),
                    200
                )
                return response
            else:
                response = make_response(
                    jsonify({'message': 'User not found'}),
                    404
                )
                return response

    elif request.method == 'DELETE':
        if 'id' in session:
            user = User.query.filter_by(id=id).first()
            if user:
                db.session.delete(user)
                db.session.commit()
                response = make_response(
                    jsonify({'message': 'User deleted'}),
                    200
                )
                return response
            else:
                response = make_response(
                    jsonify({'message': 'User not found'}),
                    404
                )
                return response
        else:
            response = make_response(
                jsonify({'message': 'Unauthorized access'}),
                401
            )
            return response
    
@app.route('/hotels', methods=['GET', 'POST'])
def get_hotels():
    if request.method == 'GET':
            hotels = Hotel.query.all()
            hotel_list = []
            for hotel in hotels:
                hotel_dict = {
                    'id': hotel.id,
                    'name': hotel.name,
                    'image_url': hotel.image_url,
                    'description': hotel.description,
                    'location': hotel.location,
                    'prices': hotel.prices,
                }
                hotel_list.append(hotel_dict)
            response = make_response(
                jsonify(hotel_list),
                200
            )
            return response
    elif request.method == 'POST':
        if 'id' in session:
            name = request.json['name']

            # Check if the name already exists in the parks table
            existing_hotel = Hotel.query.filter_by(name=name).first()
            if existing_hotel:
                # Handle the case when the name already exists
                # You can choose to update the existing record or return an error response
                return make_response(jsonify(error='Hotel with the same name already exists'), 400)
            new_hotel = Hotel(
                name=request.json['name'],
                image_url=request.json['image_url'],
                description=request.json['description'],
                location=request.json['location'],
                prices=request.json['prices'],
            )
            db.session.add(new_hotel)
            db.session.commit()

            response = make_response(
                jsonify(new_hotel={
                    'id': new_hotel.id,
                    'name': new_hotel.name,
                    'image_url': new_hotel.image_url,
                    'description': new_hotel.description,
                    'location': new_hotel.location,
                    'prices': new_hotel.prices,
                }),
                201
            )
            return response
        else:
            response = make_response(
                jsonify({'message': 'Unauthorized access'}),
                401
            )
            return response

    
@app.route('/hotel/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def get_hotel(id):
    if request.method == 'GET':
            hotel = Hotel.query.filter_by(id=id).first()
            if hotel:
                response = make_response(
                    jsonify(hotel={
                        'id': hotel.id,
                        'name': hotel.name,
                        'image_url': hotel.image_url,
                        'description': hotel.description,
                        'location': hotel.location,
                        'prices': hotel.prices,
                    }),
                    200
                )
                return response
            else:
                response = make_response(
                    jsonify({'message': 'Hotel not found'}),
                    404
                )
                return response
    
    if request.method == 'PATCH':
        if 'id' in session:
            hotel = Hotel.query.filter_by(id=id).first()
            if hotel:
                attributes_to_update = ['name', 'image_url', 'description', 'location', 'prices']
                for attribute in attributes_to_update:
                    value = request.json[attribute]
                    if value:
                        setattr(hotel, attribute, value)
                db.session.commit()

                response = make_response(
                    jsonify(hotel={
                        'id': hotel.id,
                        'name': hotel.name,
                        'image_url': hotel.image_url,
                        'description': hotel.description,
                        'location': hotel.location,
                        'prices': hotel.prices,
                    }),
                    200
                )
                return response
            else:
                response = make_response(
                    jsonify({'message': 'Hotel not found'}),
                    404
                )
                return response
        else:
            response = make_response(
                jsonify({'message': 'Unauthorized access'}),
                401
            )
            return response

    if request.method == 'DELETE':
        if 'id' in session:
            hotel = Hotel.query.filter_by(id=id).first()
            if hotel:
                db.session.delete(hotel)
                db.session.commit()

                response = make_response(
                    jsonify({'message': 'Hotel deleted'}),
                    200
                )
                return response
            else:
                response = make_response(
                    jsonify({'message': 'Hotel not found'}),
                    404
                )
                return response
        else:
            response = make_response(
                jsonify({'message': 'Unauthorized access'}),
                401
            )
            return response

        
@app.route('/parks', methods=['GET', 'POST'])
def get_parks():
    if request.method == 'GET':
            parks = Park.query.all()
            park_list = []
            for park in parks:
                park_dict = {
                    'id': park.id,
                    'name': park.name,
                    'image_url': park.image_url,
                    'description': park.description,
                    'location': park.location,
                    'prices': park.prices,
                }
                park_list.append(park_dict)
            response = make_response(jsonify(park_list), 200)
            return response

    if request.method == 'POST':
        if 'id' in session:
            name = request.json['name']

            # Check if the name already exists in the parks table
            existing_park = Park.query.filter_by(name=name).first()
            if existing_park:
                # Handle the case when the name already exists
                # You can choose to update the existing record or return an error response
                return make_response(jsonify(error='Park with the same name already exists'), 400)

            new_park = Park(
                name=request.json['name'],
                image_url=request.json['image_url'],
                description=request.json['description'],
                location=request.json['location'],
                prices=request.json['prices'],
            )
            db.session.add(new_park)
            db.session.commit()

            response = make_response(jsonify(
                new_park={
                    'id': park.id,
                    'name': park.name,
                    'image_url': park.image_url,
                    'description': park.description,
                    'location': park.location,
                    'prices': park.prices,
                }
            ), 201)
            return response
        else:
            response = make_response(jsonify({'message': 'Unauthorized access'}), 401)
            return response

    
@app.route('/park/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def get_park(id):
    if request.method == 'GET':
        if 'id' in session:
            park = Park.query.filter_by(id=id).first()
            if park:
                response = make_response(
                    jsonify(park={
                        'id': park.id,
                        'name': park.name,
                        'image_url': park.image_url,
                        'description': park.description,
                        'location': park.location,
                        'prices': park.prices,
                    }),
                    200
                )
                return response
            else:
                response = make_response(
                    jsonify({'message': 'Park not found'}),
                    404
                )
                return response
        else:
            response = make_response(
                jsonify({'message': 'Unauthorized access'}),
                401
            )
            return response

    if request.method == 'PATCH':
        if 'id' in session:
            park = Park.query.filter_by(id=id).first()
            if park:
                attributes_to_update = ['name', 'image_url', 'description', 'location']
                for attribute in attributes_to_update:
                    value = request.json[attribute]
                    if value:
                        setattr(park, attribute, value)
                db.session.commit()

                response = make_response(
                    jsonify(park={
                        'id': park.id,
                        'name': park.name,
                        'image_url': park.image_url,
                        'description': park.description,
                        'location': park.location,
                        'prices': park.prices,
                    }),
                    200
                )
                return response
            else:
                response = make_response(
                    jsonify({'message': 'Park not found'}),
                     404
                )
                return response
        else:
            response = make_response(
                jsonify({'message': 'Unauthorized access'}),
                401
            )
            return response

    if request.method == 'DELETE':
        if 'id' in session:
            park = Park.query.filter_by(id=id).first()
            if park:
                db.session.delete(park)
                db.session.commit()

                response = make_response(
                    jsonify({'message': 'Park deleted'}),
                    200
                )
                return response
            else:
                response = make_response(
                    jsonify({'message': 'Park not found'}),
                    404
                )
                return response
        else:
            response = make_response(
                jsonify({'message': 'Unauthorized access'}),
                401
            )
            return response

@app.route('/rangers', methods=['GET', 'POST'])
def get_rangers():
    if request.method == 'GET':
            rangers = Ranger.query.all()
            ranger_list = []
            for ranger in rangers:
                ranger_dict = {
                    'id': ranger.id,
                    'name': ranger.name,
                    'gender': ranger.gender,
                }
                ranger_list.append(ranger_dict)
            response = make_response(
                jsonify(ranger_list),
                200
            )
            return response

    elif request.method == 'POST':
        if 'id' in session:
            new_ranger = Ranger(
                name=request.json['name'],
                gender=request.json['gender'],
            )
            db.session.add(new_ranger)
            db.session.commit()
            response = make_response(
                jsonify(new_ranger={
                    'id': new_ranger.id,
                    'name': new_ranger.name,
                    'gender': new_ranger.gender,
                }),
                201
            )
            return response
        else:
            response = make_response(
                jsonify({'message': 'Unauthorized access'}),
                401
            )
            return response
    
@app.route('/ranger/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def get_ranger(id):
    if request.method == 'GET':
            ranger = Ranger.query.filter_by(id=id).first()
            if ranger:
                response = make_response(
                    jsonify(ranger={
                        'id': ranger.id,
                        'name': ranger.name,
                        'gender': ranger.gender,
                    }),
                    200
                )
                return response
            else:
                response = make_response(
                    jsonify({'message': 'Ranger not found'}),
                    404
                )
                return response

    if request.method == 'PATCH':
        if 'id' in session:
            ranger = Ranger.query.filter_by(id=id).first()
            if ranger:
                attributes_to_update = ['name', 'gender']
                for attribute in attributes_to_update:
                    value = request.json[attribute]
                    if value:
                        setattr(ranger, attribute, value)
                db.session.commit()

                response = make_response(
                    jsonify(ranger={
                        'id': ranger.id,
                        'name': ranger.name,
                        'gender': ranger.gender,
                    }),
                    200
                )
                return response
            else:
                response = make_response(
                    jsonify({'message': 'Ranger not found'}),
                    404
                )
                return response
        else:
            response = make_response(
                jsonify({'message': 'Unauthorized access'}),
                401
            )
            return response

    if request.method == 'DELETE':
        if 'id' in session:
            ranger = Ranger.query.filter_by(id=id).first()
            if ranger:
                db.session.delete(ranger)
                db.session.commit()

                response = make_response(
                    jsonify({'message': 'Ranger deleted'}),
                    200
                )
                return response
            else:
                response = make_response(
                    jsonify({'message': 'Ranger not found'}),
                    404
                )
                return response
        else:
            response = make_response(
                jsonify({'message': 'Unauthorized access'}),
                401
            )
            return response

@app.route('/reviews', methods=['GET', 'POST'])
def get_reviews():
    if request.method == 'GET':
            reviews = Review.query.all()
            review_list = []
            for review in reviews:
                review_dict = {
                    'name': review.name,
                    'email': review.email,
                    'feedback': review.feedback,
                    'user_id': review.user_id,
                }
                review_list.append(review_dict)
            response = make_response(jsonify(review_list), 200)
            return response

    if request.method == 'POST':
        if 'id' in session:
            name = request.json['name']
            email = request.json['email']
            feedback = request.json['feedback']
            user_id = request.json['user_id']

            new_review = Review(
                name=name,
                email=email,
                feedback=feedback,
                user_id=user_id,
            )
            db.session.add(new_review)
            db.session.commit()

            response = make_response(jsonify({"message": "Create a new review"}))
            return response
        else:
            response = make_response(jsonify({'message': 'Unauthorized access'}), 401)
            return response

@app.route('/bookings', methods=['GET', 'POST'])
def get_bookings():
    if request.method == 'GET':
            bookings = Booking.query.all()
            booking_list = []
            for booking in bookings:
                booking_dict = booking={
                    'id': booking.id,
                    'username': booking.username,
                    'hotel_name': booking.hotel_name,
                    'park_name': booking.park_name,
                    'check_in': booking.check_in,
                    'check_out': booking.check_out,
                }
                booking_list.append(booking_dict)
            response = make_response(
                jsonify(booking_list),
                200
            )
            return response

    
    if request.method == 'POST':
        if 'id' in session:
           
            username=request.json["username"]
            check_in=request.json['check_in']
            check_out=request.json['check_out']

            new_booking = Booking(
                username=username,
                check_in=check_in,
                check_out=check_out,
            )
            
            db.session.add(new_booking)
            db.session.commit()

            response = make_response(jsonify({"message": "Create a new Booking"}))
            return response
        else:
            response = make_response(
                jsonify({'message': 'Unauthorized access'}),
                401
            )
            return response

if __name__ == '__main__':
    app.run(debug=True)
    
