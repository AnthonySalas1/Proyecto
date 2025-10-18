import rest_framework.routers as routers
from .api import *

router = routers.DefaultRouter()

router.register('api/producto', ProductoViewSet)
router.register('api/marca', MarcaViewSet)
router.register('api/modelo', ModeloViewSet)
router.register('api/color', ColorViewSet)
router.register('api/talla', TallaViewSet)
router.register('api/usuario', UsuarioViewSet)
router.register('api/entidad', EntidadViewSet)
router.register('api/rol', RolViewSet)

urlpatterns = router.urls