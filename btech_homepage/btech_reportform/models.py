from enum import unique
import random
import string
from django.db import models

# Create your models here.
class Btest_case(models.Model):
    Case_code = models.CharField(
        unique=True,
        default=''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(32)),
        max_length=40,
    )
    customer_name = models.CharField(max_length=80, blank=False, null=False)
    Command = models.TextField(blank = True, null = True)
    
    def getJson(self) -> dict:
        data = {
            'customer_name': self.customer_name,
            'Case_code': self.Case_code,
        }
        return data
    
    def __str__(self) -> str:
        return self.Case_code
    
class test_data(models.Model):
    Case = models.ForeignKey(Btest_case, on_delete=models.CASCADE)
    No = models.IntegerField()
    Regular_P = models.FloatField(blank=False, null=False)
    Suray = models.FloatField(blank=False, null=False)
    Pump_P = models.FloatField(blank=False, null=False)
    is_show = models.BooleanField(blank=False, null=False)
    
    def __str__(self) -> str :
        return ' 案件: {} の条件No.{} '.format(self.Case.Case_code, self.No)