from django.db import models

# Create your models here.
class Entidad(models.Model):
    class Meta:
        db_table = 'GEN_Entidad'
    id = models.AutoField(primary_key=True)
    nombreEntidad = models.CharField(max_length=100)
    documentoIdentidad = models.CharField(max_length=50, unique=True)
    direccion = models.CharField(max_length=200)
    correo = models.EmailField(unique=True)
    telefono = models.CharField(max_length=20)
    fechaCreacion = models.DateTimeField(auto_now_add=True)
    fechaModificacion = models.DateTimeField(auto_now=True)

class Rol(models.Model):
    class Meta:
        db_table = 'GEN_Rol'
    id = models.IntegerField(primary_key=True)
    rol = models.CharField(max_length=50)
    fechaCreacion = models.DateTimeField(auto_now_add=True)
    fechaModificacion = models.DateTimeField(auto_now=True)

class Permiso(models.Model):
    class Meta:
        db_table = 'GEN_Permiso'
    id = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=50)
    acceso = models.CharField(max_length=100)
    tipo = models.CharField(max_length=50)
    activo = models.BooleanField(default=True)
    descripcion = models.TextField()
    fechaCreacion = models.DateTimeField(auto_now_add=True)
    fechaModificacion = models.DateTimeField(auto_now=True)

class Usuario(models.Model):
    class Meta:
        db_table = 'GEN_Usuario'
    id = models.AutoField(primary_key=True)
    usuario = models.CharField(max_length=50, unique=True)
    idEntidad = models.ForeignKey(Entidad, on_delete=models.CASCADE)
    idRol = models.ForeignKey(Rol, on_delete=models.CASCADE)
    idPermiso = models.ForeignKey(Permiso, on_delete=models.CASCADE)
    clave = models.CharField(max_length=128)
    fechaCreacion = models.DateTimeField(auto_now_add=True)
    fechaModificacion = models.DateTimeField(auto_now=True)

class Marca(models.Model):
    class Meta:
        db_table = 'PRO_Marca'
    id = models.IntegerField(primary_key=True)
    nombreMarca = models.CharField(max_length=100)
    fechaCreacion = models.DateTimeField(auto_now_add=True)
    fechaModificacion = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nombreMarca


class Modelo(models.Model):
    class Meta:
        db_table = 'PRO_Modelo'
    id = models.IntegerField(primary_key=True)
    nombreModelo = models.CharField(max_length=100)
    fechaCreacion = models.DateTimeField(auto_now_add=True)
    fechaModificacion = models.DateTimeField(auto_now=True)

class Color(models.Model):
    class Meta:
        db_table = 'PRO_Color'
    id = models.IntegerField(primary_key=True)
    nombreColor = models.CharField(max_length=50)
    codigoHex = models.CharField(max_length=7)  # e.g., #FF5733
    fechaCreacion = models.DateTimeField(auto_now_add=True)
    fechaModificacion = models.DateTimeField(auto_now=True)

class Talla(models.Model):
    class Meta:
        db_table = 'PRO_Talla'
    id = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=50)
    fechaCreacion = models.DateTimeField(auto_now_add=True)
    fechaModificacion = models.DateTimeField(auto_now=True)

class Producto(models.Model):
    class Meta:
        db_table = 'GEN_Producto'
    id = models.IntegerField(primary_key=True)
    nombreProducto = models.CharField(max_length=100)
    idMarca = models.ForeignKey(Marca, on_delete=models.CASCADE)
    idModelo = models.ForeignKey(Modelo, on_delete=models.CASCADE)
    idColor = models.ForeignKey(Color, on_delete=models.CASCADE)
    idTalla = models.ForeignKey(Talla, on_delete=models.CASCADE)
    imagen = models.URLField()
    precioVenta = models.DecimalField(max_digits=10, decimal_places=2)
    fechaCreacion = models.DateTimeField(auto_now_add=True)
    fechaModificacion = models.DateTimeField(auto_now=True)