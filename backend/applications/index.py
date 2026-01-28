import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context) -> dict:
    """Обработка заявок на запись в школу моделей"""
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'GET':
        try:
            database_url = os.environ.get('DATABASE_URL')
            schema_name = os.environ.get('MAIN_DB_SCHEMA')
            
            conn = psycopg2.connect(database_url)
            cursor = conn.cursor(cursor_factory=RealDictCursor)
            
            query = f"""
                SELECT id, child_name, age, parent_phone, email, comment, created_at 
                FROM {schema_name}.applications 
                ORDER BY created_at DESC
            """
            
            cursor.execute(query)
            results = cursor.fetchall()
            
            cursor.close()
            conn.close()
            
            applications = []
            for row in results:
                applications.append({
                    'id': row['id'],
                    'child_name': row['child_name'],
                    'age': row['age'],
                    'parent_phone': row['parent_phone'],
                    'email': row['email'],
                    'comment': row['comment'],
                    'created_at': str(row['created_at'])
                })
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'data': applications
                }),
                'isBase64Encoded': False
            }
            
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'error': f'Ошибка сервера: {str(e)}'
                }),
                'isBase64Encoded': False
            }
    
    if method == 'POST':
        try:
            body = json.loads(event.get('body', '{}'))
            
            child_name = body.get('child_name', '').strip()
            age = body.get('age')
            parent_phone = body.get('parent_phone', '').strip()
            email = body.get('email', '').strip()
            comment = body.get('comment', '').strip()
            
            if not child_name or not age or not parent_phone or not email:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({
                        'error': 'Все обязательные поля должны быть заполнены'
                    }),
                    'isBase64Encoded': False
                }
            
            try:
                age = int(age)
                if age < 7 or age > 14:
                    return {
                        'statusCode': 400,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps({
                            'error': 'Возраст должен быть от 7 до 14 лет'
                        }),
                        'isBase64Encoded': False
                    }
            except ValueError:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({
                        'error': 'Некорректный возраст'
                    }),
                    'isBase64Encoded': False
                }
            
            database_url = os.environ.get('DATABASE_URL')
            schema_name = os.environ.get('MAIN_DB_SCHEMA')
            
            conn = psycopg2.connect(database_url)
            cursor = conn.cursor(cursor_factory=RealDictCursor)
            
            query = f"""
                INSERT INTO {schema_name}.applications 
                (child_name, age, parent_phone, email, comment) 
                VALUES (%s, %s, %s, %s, %s)
                RETURNING id, child_name, age, parent_phone, email, comment, created_at
            """
            
            cursor.execute(query, (child_name, age, parent_phone, email, comment))
            result = cursor.fetchone()
            
            conn.commit()
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'message': 'Заявка успешно отправлена',
                    'data': {
                        'id': result['id'],
                        'child_name': result['child_name'],
                        'age': result['age'],
                        'parent_phone': result['parent_phone'],
                        'email': result['email'],
                        'comment': result['comment'],
                        'created_at': str(result['created_at'])
                    }
                }),
                'isBase64Encoded': False
            }
            
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'error': f'Ошибка сервера: {str(e)}'
                }),
                'isBase64Encoded': False
            }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'error': 'Метод не поддерживается'
        }),
        'isBase64Encoded': False
    }