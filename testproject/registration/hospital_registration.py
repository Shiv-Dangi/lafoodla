# -*- coding: utf-8 -*-
from django import forms


class HospitalRegistrationForm(forms.Form):
    hospital_name = forms.CharField(max_length=200, label='Hospital Name')
    tagline = forms.CharField(max_length=300,
                              required=False,
                              label='Tagline of the company')
    cheif_officer = forms.CharField(max_length=200)
    establishment_act = forms.CharField(max_length=400)
    issue_date = forms.DateField(initial="2016-6-12")
    number_of_beds = forms.IntegerField(required=False)
    about_us = forms.CharField(widget=forms.Textarea, required=False)
    logo = forms.ImageField(label='Select a file',
                            help_text='max. 12 megabytes')
    hospital_photo = forms.ImageField(label='Select a file',
                                      help_text='max. 12 megabytes')
    reg_certificate = forms.ImageField(label='Select a file',
                                       help_text='max. 12 megabytes')
    license_certificate = forms.ImageField(label='Select a file',
                                           help_text='max. 12 megabytes')
