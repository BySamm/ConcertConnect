#!/usr/bin/python3
"""
initialize the models package
"""
from dotenv import load_dotenv
from os import getenv

load_dotenv()

test = getenv('SECRET_KEY')
print(test)
