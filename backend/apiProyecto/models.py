from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class Entidad(models.Model):
    class Meta:
        db_table = 'GEN_Entidad'
    id = models.AutoField(primary_key=True)
    nombreEntidad = models.CharField(max_length=100,blank=True,null=True)
    documentoIdentidad = models.CharField(max_length=50, unique=True,blank=True,null=True)
    direccion = models.CharField(max_length=200,blank=True,null=True)
    correo = models.EmailField(unique=True,blank=True,null=True)
    telefono = models.CharField(max_length=20,blank=True,null=True)
    fechaCreacion = models.DateTimeField(auto_now_add=True)
    fechaModificacion = models.DateTimeField(auto_now=True)

class Rol(models.Model):
    class Meta:
        db_table = 'GEN_Rol'
    id = models.AutoField(primary_key=True)
    rol = models.CharField(max_length=50,blank=True,null=True)
    fechaCreacion = models.DateTimeField(auto_now_add=True)
    fechaModificacion = models.DateTimeField(auto_now=True)

class Permiso(models.Model):
    class Meta:
        db_table = 'GEN_Permiso'
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    acceso = models.CharField(max_length=100)
    tipo = models.CharField(max_length=50)
    activo = models.BooleanField(default=True)
    descripcion = models.TextField(blank=True, null=True)
    fechaCreacion = models.DateTimeField(auto_now_add=True)
    fechaModificacion = models.DateTimeField(auto_now=True)


class Usuario(AbstractUser):
    class Meta:
        db_table = 'GEN_Usuario'
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=128)
    idEntidad = models.ForeignKey(Entidad, on_delete=models.CASCADE)
    idRol = models.ForeignKey(Rol, on_delete=models.CASCADE)
    idPermiso = models.ForeignKey(Permiso, on_delete=models.CASCADE)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []



class Marca(models.Model):
    class Meta:
        db_table = 'PRO_Marca'
    id = models.AutoField(primary_key=True)
    nombreMarca = models.CharField(max_length=100)
    fechaCreacion = models.DateTimeField(auto_now_add=True)
    fechaModificacion = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nombreMarca

class Modelo(models.Model):
    class Meta:
        db_table = 'PRO_Modelo'
    id = models.AutoField(primary_key=True)
    nombreModelo = models.CharField(max_length=100)
    fechaCreacion = models.DateTimeField(auto_now_add=True)
    fechaModificacion = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.nombreModelo

class Color(models.Model):
    class Meta:
        db_table = 'PRO_Color'
    id = models.AutoField(primary_key=True)
    nombreColor = models.CharField(max_length=50)
    codigoHex = models.CharField(max_length=7,null=True, blank=True)  # e.g., #FF5733
    fechaCreacion = models.DateTimeField(auto_now_add=True)
    fechaModificacion = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nombreColor


class Talla(models.Model):
    class Meta:
        db_table = 'PRO_Talla'
    id = models.AutoField(primary_key=True)
    numeroCalzado = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    fechaCreacion = models.DateTimeField(auto_now_add=True)
    fechaModificacion = models.DateTimeField(auto_now=True)
    def __str__(self):
        return str(self.numeroCalzado)

class Producto(models.Model):
    class Meta:
        db_table = 'GEN_Producto'
    id = models.AutoField(primary_key=True)

    nombreProducto = models.CharField(max_length=100)
    idMarca = models.ForeignKey(Marca, on_delete=models.CASCADE)
    idModelo = models.ForeignKey(Modelo, on_delete=models.CASCADE)
    idColor = models.ForeignKey(Color, on_delete=models.CASCADE)
    idTalla = models.ForeignKey(Talla, on_delete=models.CASCADE)
    imagenBase64 = models.TextField(blank=True, null=True)
    precioVenta = models.DecimalField(max_digits=10, decimal_places=2)
    fechaCreacion = models.DateTimeField(auto_now_add=True)
    fechaModificacion = models.DateTimeField(auto_now=True)
    def __str__(self):

        return self.nombreProducto

class Modulo(models.Model):
    class Meta:
        db_table = 'GEN_Modulo'
    id = models.AutoField(primary_key=True)
    nombreModulo = models.CharField(max_length=100)
    imagenBase64 = models.TextField( blank=True, null=True)
    idPermiso = models.ForeignKey(Permiso, on_delete=models.CASCADE, null=True)
    fechaCreacion = models.DateTimeField(auto_now_add=True)
    fechaModificacion = models.DateTimeField(auto_now=True)
    def __str__(self):

        return self.nombreModulo
    

class CargaCSV(models.Model):
    class Meta:
        db_table = 'GEN_Archivo'
    archivo = models.FileField(upload_to='csv/')
    fechaCreacion = models.DateTimeField(auto_now_add=True)
    registrosProcesados = models.IntegerField(default=0)
    registrosErroneos = models.IntegerField(default=0)
    estado = models.CharField(
        max_length=20,
        choices=[
            ('PENDIENTE', 'Pendiente'),
            ('PROCESANDO', 'Procesando'),
            ('COMPLETADO', 'Completado'),
            ('ERROR', 'Error')
        ],
        default='PENDIENTE'
    )



