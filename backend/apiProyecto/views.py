from .models import *
from rest_framework import viewsets, permissions, status
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.parsers import MultiPartParser, FormParser
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail,EmailMultiAlternatives
from django.conf import settings
from django.contrib import messages
from django.template.loader import render_to_string
from decimal import Decimal
from django.views import View
import csv
import io
import jwt
import json






import datetime

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    permission_classes = [permissions.AllowAny]

class MarcaViewSet(viewsets.ModelViewSet):
    queryset = Marca.objects.all()
    serializer_class = MarcaSerializer
    permission_classes = [permissions.AllowAny]

class ModeloViewSet(viewsets.ModelViewSet):
    queryset = Modelo.objects.all()
    serializer_class = ModeloSerializer
    permission_classes = [permissions.AllowAny]

class ColorViewSet(viewsets.ModelViewSet):
    queryset = Color.objects.all()
    serializer_class = ColorSerializer
    permission_classes = [permissions.AllowAny]

class TallaViewSet(viewsets.ModelViewSet):
    queryset = Talla.objects.all()
    serializer_class = TallaSerializer
    permission_classes = [permissions.AllowAny]


class UsuarioRegistroView(APIView):
    def post(self, request):
        serializer = UsuariorSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

class LoginView(APIView):
    def post(self, request):
        username = request.data['username']
        password = request.data['password']
        try:
            user = Usuario.objects.get(username=username)

            if not user.check_password(password):
                raise AuthenticationFailed('Contraseña incorrecta')

            payload = {
                'id': user.id,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
                'iat': datetime.datetime.utcnow()
            }
            token = jwt.encode(payload, 'secret', algorithm='HS256')
            response = Response()

            response.set_cookie(key='jwt', value=token, httponly=True)
            response.data = {
                'jwt': token
            }
            return response


        except Usuario.DoesNotExist:
            raise AuthenticationFailed('Usuario no encontrado')

class UsuarioView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('No autenticado 1!')
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('No autenticado 2!')

        user = Usuario.objects.filter(id=payload['id']).first()
        serializer = UsuariorSerializer(user)

        return Response(serializer.data)

class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'Sesión finalizada exitosamente'
        }
        return response

class EntidadViewSet(viewsets.ModelViewSet):
    queryset = Entidad.objects.all()
    serializer_class = EntidadSerializer
    permission_classes = [permissions.AllowAny]

class RolViewSet(viewsets.ModelViewSet):
    queryset = Rol.objects.all()
    serializer_class = RolSerializer
    permission_classes = [permissions.AllowAny]

class PermisoViewSet(viewsets.ModelViewSet):
    queryset = Permiso.objects.all()
    serializer_class = PermisoSerializer
    permission_classes = [permissions.AllowAny]

class ModuloViewSet(viewsets.ModelViewSet):
    queryset = Modulo.objects.all()
    serializer_class = ModuloSerializer
    permission_classes = [permissions.AllowAny]

@method_decorator(csrf_exempt, name='dispatch')
class CargaMasivaCSVView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        try:
            archivo_csv = request.FILES['archivo']

            
            carga = CargaCSV.objects.create(
                archivo=archivo_csv,
                estado='PROCESANDO'
            )

            if not archivo_csv:
                return JsonResponse(
                    {'error': 'No se proporcionó archivo'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            if not archivo_csv.name.endswith('.csv'):
                return JsonResponse(
                    {'error': 'El archivo debe ser CSV'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )

            registros_procesados = 0
            errores = []
            total_registros = 0

            # Procesar CSV
            for num_fila, field in enumerate(archivo_csv, start=1):
                fila = str(field).split(";")
                total_registros += 1
              
                if num_fila == 1:
                    print('')
                else:

                    if len(fila) >1:

                        data_dict = {}
                        data_dict["nombreProducto"] = str(fila[0]).replace('\'','')[1:]
                        data_dict["idMarca"] = fila[1].replace("'",'')
                        data_dict["idModelo"] = fila[2].replace('"','')
                        data_dict["idColor"] = fila[3].replace('"','')
                        data_dict["idTalla"] = fila[4].replace('"','')
                        data_dict["imagenBase64"] = fila[5]
                        print(fila[6])
                        data_dict["precioVenta"] = str(fila[6]).replace('\\','').replace('rn','').replace('\'','')
                        print(data_dict)
                        form = Producto.objects.create(
                            nombreProducto=data_dict['nombreProducto'],
                            idMarca = Marca.objects.get
                                        (id = int(data_dict['idMarca'])),
                            idModelo= Modelo.objects.get
                                        (id = int(data_dict['idModelo'])),
                            idColor= Color.objects.get
                                        (id = int(data_dict['idColor'])),
                            idTalla= Talla.objects.get
                                        (id = int(data_dict['idTalla'])),
                            imagenBase64=data_dict['imagenBase64'],
                            precioVenta=data_dict['precioVenta']
                        )
                        
                        print(f" Fila {num_fila}: producto  {form.nombreProducto} guardado") 
                        registros_procesados += 1
            return JsonResponse({
                'mensaje': 'Carga completada exitosamente',
                'registros_procesados': registros_procesados,
                'registros_error': len(errores),
                'errores': errores,
                'carga_id': carga.id
            })

        except Exception as e:
            print(f"Error procesando archivo: {str(e)}")
            return JsonResponse({
                'error': f'Error procesando archivo: {str(e)}'
            }, status=500)

class EstadoCargaView(APIView):
    def get(self, request, carga_id):
        try:
            carga = CargaCSV.objects.get(id=carga_id)
            serializer = CargaCSVSerializer(carga)
            return JsonResponse(serializer.data)
        except CargaCSV.DoesNotExist:
            return JsonResponse(
                {'error': 'Carga no encontrada'},
                status=status.HTTP_404_NOT_FOUND
            )

class EnviarCorreoView(APIView):

    def post(self, request):
        if request.method == 'POST':
            try:
            
                data = json.loads(request.body)
                print(data)
              
                # Datos del correo
                destinatario = data.get('destinatario')
                subject = data.get('asunto') 
                message = data.get('mensaje')
                recipient_list=[destinatario]
                email_from = settings.EMAIL_HOST_USER

                send_mail( subject,message, email_from, recipient_list )

                # Enviar correo

                return JsonResponse({'estado': 'success', 'mensaje': 'Correo enviado'})
                
            except Exception as e:
                return JsonResponse({'estado': 'error', 'mensaje': str(e)})
    
        return JsonResponse({'estado': 'error', 'mensaje': 'Método no permitido'})






