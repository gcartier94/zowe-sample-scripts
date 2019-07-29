
import subprocess
import os
import re
import smtplib

file_path = os.path.join('..','..','job_output','output.txt')

os.system('zowe files dl ds "A118151.MEETUP.TEXT(MEETUP2)" -f '+file_path)

raw_file = open(file_path,'r')
records = raw_file.readlines()
email_list = []
for record in records:
    try:
        match = re.search(r'[\w\.-]+@[\w\.-]+', record)
        email_list.append(match.group(0))
    except:
        pass

email_body = ""
for email in email_list:
    email_body += email + "\n"

try:
    server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
    server.ehlo()
    print('Sending e-mail to gcartier.showcase@gmail.com')
    server.login('gcartier.showcase@gmail.com','showcase00')
    server.sendmail('gcartier.showcase@gmail.com','gcartier.showcase@gmail.com',email_body)
    print('Email sent!')
except:
    print('Something when wrong..')







