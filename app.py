from flask import Flask ,jsonify ,request
# del modulo flask importar la clase Flask y los métodos jsonify,request
from flask_cors import CORS       # del modulo flask_cors importar CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
app=Flask(__name__)  # crear el objeto app de la clase Flask
CORS(app) #modulo cors es para que me permita acceder desde el frontend al backend


# configuro la base de datos, con el nombre el usuario y la clave
app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://root:root2023@localhost/galeria'
# URI de la BBDD                          driver de la BD  user:clave@URLBBDD/nombreBBDD
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False #none
db= SQLAlchemy(app)   #crea el objeto db de la clase SQLAlquemy
ma=Marshmallow(app)   #crea el objeto ma de de la clase Marshmallow


# defino las tablas
class Animal(db.Model):   # la clase Animal hereda de db.Model    
    id=db.Column(db.Integer, primary_key=True)   #define los campos de la tabla
    especie=db.Column(db.String(100))
    ubicacion=db.Column(db.String(100))
    artista=db.Column(db.String(100))
    imagen=db.Column(db.String(400))
    def __init__(self,especie,ubicacion,artista,imagen):   #crea el  constructor de la clase
        self.especie=especie   # no hace falta el id porque lo crea sola mysql por ser auto_incremento
        self.ubicacion=ubicacion
        self.artista=artista
        self.imagen=imagen




    #  si hay que crear mas tablas , se hace aqui




with app.app_context():
    db.create_all()  # aqui crea todas las tablas
#  ************************************************************
class AnimalSchema(ma.Schema):
    class Meta:
        fields=('id','especie','ubicacion','artista','imagen')




animal_schema=AnimalSchema()            # El objeto animal_schema es para traer un animal
animales_schema=AnimalSchema(many=True)  # El objeto animales_schema es para traer multiples registros de animal




# crea los endpoint o rutas (json)
@app.route('/animales',methods=['GET'])
def get_Animales():
    all_animales=Animal.query.all()         # el metodo query.all() lo hereda de db.Model
    result=animales_schema.dump(all_animales)  # el metodo dump() lo hereda de ma.schema y
                                                 # trae todos los registros de la tabla
    return jsonify(result)                       # retorna un JSON de todos los registros de la tabla




@app.route('/animales/<id>',methods=['GET'])
def get_animal(id):
    animal=Animal.query.get(id)
    return animal_schema.jsonify(animal)   # retorna el JSON de un animal recibido como parametro


@app.route('/animales/<id>',methods=['DELETE'])
def delete_animal(id):
    animal=Animal.query.get(id)
    db.session.delete(animal)
    db.session.commit()                     # confirma el delete
    return animal_schema.jsonify(animal) # me devuelve un json con el registro eliminado


@app.route('/animales', methods=['POST']) # crea ruta o endpoint
def create_animal():
    #print(request.json)  # request.json contiene el json que envio el cliente
    especie=request.json['especie']
    ubicacion=request.json['ubicacion']
    artista=request.json['artista']
    imagen=request.json['imagen']
    new_animal=Animal(especie,ubicacion,artista,imagen)
    db.session.add(new_animal)
    db.session.commit() # confirma el alta
    return animal_schema.jsonify(new_animal)


@app.route('/animales/<id>' ,methods=['PUT'])
def update_animal(id):
    animal=Animal.query.get(id)
 
    animal.especie=request.json['especie']
    animal.ubicacion=request.json['ubicacion']
    animal.artista=request.json['artista']
    animal.imagen=request.json['imagen']


    db.session.commit()    # confirma el cambio
    return animal_schema.jsonify(animal)    # y retorna un json con el animal
 


# programa principal *******************************
if __name__=='__main__':  
    app.run(debug=True, port=5000)    # ejecuta el servidor Flask en el puerto 5000
