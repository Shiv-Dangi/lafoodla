from django.db import models


# Create your models here.
class CompleteAddress(models.Model):
    state = models.CharField(max_length=200)
    district = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    lendmark = models.CharField(max_length=200)
    street = models.CharField(max_length=200)
    pincode = models.IntegerField()


class ContactDetail(models.Model):
    phone_num = models.IntegerField()
    mobile_num = models.IntegerField()
    tollfree_num = models.IntegerField()
    website = models.URLField()
    email = models.EmailField()


class HospitalRegistration(models.Model):
    hospital_name = models.CharField(max_length=200)
    tagline = models.CharField(max_length=200)
    # Complete_Address = models.ForeignKey(CompleteAddress)
    # contact_details = models.ForeignKey(ContactDetail)
    chief_officer = models.CharField(max_length=100)
    establishment_act = models.CharField(max_length=300)
    issue_date = models.DateField(max_length=20)
    number_of_bades = models.IntegerField()
    about_us = models.TextField()
    logo = models.ImageField(upload_to='Images/logo/')
    hospital_photo = models.ImageField(upload_to='Images/hospital_photo/')
    reg_certificate = models.ImageField(upload_to='Images/reg_certificate/')
    license_certificate = models.ImageField(upload_to='Images/license_certificate/')

    def __unicode__(self):
            return str(self.hospital_name)
