from django.shortcuts import render, render_to_response
from django import forms
from django.template import RequestContext
from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect
from django.views.decorators.csrf import csrf_protect
from registration.models import *
from django.contrib import auth
from django.core.context_processors import csrf
from .forms import MyRegistrationForm
from .hospital_registration import HospitalRegistrationForm
from .models import HospitalRegistration

# user login, Registeration and authentication view


def login(request):
    context = {}
    context.update(csrf(request))
    return render_to_response('login.html', context)


def auth_view(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    user = auth.authenticate(username=username, password=password)

    if user is not None:
        auth.login(request, user)
        return HttpResponseRedirect("/accounts/login")
    else:
        return HttpResponseRedirect("/accounts/login")


def register_user(request):
    if request.method == 'POST':

        form = MyRegistrationForm(request.POST)
        if form.is_valid():
            new_user = form.save()
            return HttpResponseRedirect("/registration")
    else:
        form = MyRegistrationForm()
    return render(request, "signup.html", {'form': form, })


def register_success(request):
    return render_to_response('register_success.html')


@csrf_protect
def registration_form(request):
    # Handle file upload
    if request.method == 'POST':
        form = HospitalRegistrationForm(request.POST, request.FILES)
        if form.is_valid():
            hospital_registration = HospitalRegistration(
                hospital_name=request.POST['hospital_name'],
                tagline=request.POST['tagline'],
                chief_officer=request.POST['cheif_officer'],
                establishment_act=request.POST['establishment_act'],
                issue_date=request.POST['issue_date'],
                number_of_bades=request.POST['number_of_beds'],
                about_us=request.POST['about_us'],
                logo=request.FILES['logo'],
                hospital_photo=request.FILES['hospital_photo'],
                reg_certificate=request.FILES['reg_certificate'],
                license_certificate=request.FILES['license_certificate'],
            )
            hospital_registration.save()

            # Redirect to the document list after POST
            return HttpResponseRedirect('/registration_success')
    else:
        form = HospitalRegistrationForm()  # A empty, unbound form

    # Render list page with the documents and the form
    csrfContext = RequestContext(request)
    return render_to_response('registrationform.html', {'form': form}, csrfContext)
