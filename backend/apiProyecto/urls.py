import rest_framework.routers as routers
from .views import *
from django.urls import path, include


router = routers.DefaultRouter()

router.register('producto', ProductoViewSet)
router.register('marca', MarcaViewSet)
router.register('modelo', ModeloViewSet)
router.register('color', ColorViewSet)
router.register('talla', TallaViewSet)


router.register('entidad', EntidadViewSet)
router.register('rol', RolViewSet)
router.register('permiso', PermisoViewSet)
router.register('modulo', ModuloViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('registro/', UsuarioRegistroView.as_view(), name="registro"),
    path('login/', LoginView.as_view(), name="login"),
    path('usuario/', UsuarioView.as_view(), name="usuario"),
    path('logout/', LogoutView.as_view(), name="logout"),
    path('cargaMasiva/', CargaMasivaCSVView.as_view(), name='cargaMasiva'),
    path('estadoCarga/<int:carga_id>/', EstadoCargaView.as_view(), name='estadoCarga'),
    path('enviarCorreo/', EnviarCorreoView.as_view(), name='enviarCorreo')
]

