"""hashgrowth URL Configuration
The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin

from base.views import IndexView
from registration.views import register_user, registration_form, register_success, login, auth_view

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', IndexView.as_view(), name="index"),
    # user auth urls
    url(r'^accounts/login/$', login, name='login'),
    url(r'^accounts/auth/$', auth_view, name='auth_view'),
    url(r'^registration/$', registration_form, name='registration_form'),
    url(r'^signup/$', register_user, name='register_user'),
    url(r'^registration_success/$', register_success, name='register_success'),
] + static(
    settings.STATIC_URL,
    document_root=settings.STATIC_ROOT)
