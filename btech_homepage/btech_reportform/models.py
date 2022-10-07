from enum import unique
import random
import string
from django.db import models

# Create your models here.
class Btest_case(models.Model):
    Case_code = models.IntegerField(
        unique=True,
        default=''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(32)),
    )
    customer_name = models.CharField(max_length=80, blank=False, null=False)
    
    def __str__(self) -> str:
        return self.Case_code