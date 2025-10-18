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

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__' 
        read_only_fields = ('fechaCreacion', 'fechaModificacion')

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

