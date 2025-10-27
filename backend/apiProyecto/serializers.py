from rest_framework import serializers
from .models import *

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'
        read_only_fields = ('fechaCreacion', 'fechaModificacion')

class MarcaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Marca
        fields = '__all__' 
        read_only_fields = ('fechaCreacion', 'fechaModificacion')

class ModeloSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modelo
        fields = '__all__' 
        read_only_fields = ('fechaCreacion', 'fechaModificacion')

class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = '__all__' 
        read_only_fields = ('fechaCreacion', 'fechaModificacion')

class TallaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Talla
        fields = '__all__' 
        read_only_fields = ('fechaCreacion', 'fechaModificacion')


class UsuariorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__' 
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
    



class EntidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Entidad
        fields = '__all__' 
        read_only_fields = ('fechaCreacion', 'fechaModificacion')

class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = '__all__' 
        read_only_fields = ('fechaCreacion', 'fechaModificacion')

class PermisoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permiso
        fields = '__all__' 
        read_only_fields = ('fechaCreacion', 'fechaModificacion')

class ModuloSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modulo
        fields = '__all__' 
        read_only_fields = ('fechaCreacion', 'fechaModificacion')

class CargaCSVSerializer(serializers.ModelSerializer):
    class Meta:
        model = CargaCSV
        fields = '__all__'





