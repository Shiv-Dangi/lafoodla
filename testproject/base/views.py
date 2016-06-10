import json

from django.contrib.auth.decorators import login_required
from django.conf import settings
from django.core.urlresolvers import reverse
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.views import generic


# Index page.
class IndexView(generic.TemplateView):
    template_name = 'index.html'
