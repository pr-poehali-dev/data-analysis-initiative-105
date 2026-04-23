import json
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправляет заявку на консультацию на почту владельца сайта."""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body', '{}'))
    name = body.get('name', '')
    phone = body.get('phone', '')
    about = body.get('about', '')

    smtp_user = os.environ['SMTP_USER']
    smtp_password = os.environ['SMTP_PASSWORD']
    recipient = os.environ['RECIPIENT_EMAIL']

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка на консультацию от {name}'
    msg['From'] = smtp_user
    msg['To'] = recipient

    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 24px; background: #f9f9f9; border-radius: 12px;">
        <h2 style="color: #9333ea; margin-bottom: 20px;">Новая заявка на консультацию</h2>
        <table style="width: 100%; border-collapse: collapse;">
            <tr>
                <td style="padding: 10px 0; color: #666; width: 130px;">Имя:</td>
                <td style="padding: 10px 0; font-weight: bold; color: #1a1a2e;">{name}</td>
            </tr>
            <tr>
                <td style="padding: 10px 0; color: #666;">Телефон:</td>
                <td style="padding: 10px 0; font-weight: bold; color: #1a1a2e;">{phone}</td>
            </tr>
            <tr>
                <td style="padding: 10px 0; color: #666; vertical-align: top;">О себе:</td>
                <td style="padding: 10px 0; color: #1a1a2e;">{about}</td>
            </tr>
        </table>
    </div>
    """

    msg.attach(MIMEText(html, 'html'))

    with smtplib.SMTP_SSL('smtp.mail.ru', 465) as server:
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, recipient, msg.as_string())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True})
    }
