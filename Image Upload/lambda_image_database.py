import json
import boto3
import base64
from io import BytesIO

import cv2
import six
import numpy as np
from PIL import Image
import uuid



s3 = boto3.client('s3')
def downloadFromS3(strBucket,strKey,strFile):
    s3_client = boto3.client('s3')
    s3_client.download_file(strBucket, strKey, strFile)
    
def lambda_handler(event, context):
    
    if event['httpMethod'] == 'POST' : 
         
        data = json.loads(event["body"])
        name = data['name']
        image = data['file']
        image = image[image.find(",")+1:]
        dec = base64.b64decode(image + "===")
        s3.put_object(Bucket='nad123', Key=name, Body=dec)
        

        strBucket = 'nad123'
        strKey = 'yolov3.weights'
        strWeightFile = '/tmp/yolov3.weights'
        downloadFromS3(strBucket,strKey,strWeightFile) 
           

        strKey = 'yolov3.cfg'
        strConfigFile = '/tmp/yolov3.cfg'
        downloadFromS3(strBucket,strKey,strConfigFile)

            
        strKey = 'coco.names'
        strConfigFile = '/tmp/coco.names'
        downloadFromS3(strBucket,strKey,strConfigFile)
         

        net = cv2.dnn.readNet('/tmp/yolov3.weights', '/tmp/yolov3.cfg')   
        classes = []
        with open("/tmp/coco.names", "r") as f:
            classes = [line.strip() for line in f.readlines()]
        #print(classes)
        src = Image.open(BytesIO(dec))
        process = cv2.cvtColor(np.asarray(src), cv2.COLOR_RGB2BGR)   

   
        layer_names = net.getLayerNames()
        output_layers = [layer_names[i[0] - 1]
                         for i in net.getUnconnectedOutLayers()]
        img = cv2.resize(process, None, fx=0.4, fy=0.4)
        blob = cv2.dnn.blobFromImage(
            process, 0.00392, (416, 416), (0, 0, 0), True, crop=False)
 
        net.setInput(blob)
        outs = net.forward(output_layers)
        
        id = data['name']
        tags = []
        url = 'https://nad123.s3.amazonaws.com/' + data['name']
        
    
        for out in outs:
    
            for detection in out:
    
                scores = detection[5:]
                class_id = np.argmax(scores)
                confidence = scores[class_id]
    
                if confidence > 0:
                    #print("afgbujrgf")
                    #print(confidence)
                    #print(str(classes[class_id]))
                    tags.append(str(classes[class_id]))
            
        addDBRecord(id, tags, url)
    
    print(tags)
        

    # return {'statusCode': 200, 'body': json.dumps({'message': 'successful lambda function call'}), 'headers': {'Access-Control-Allow-Origin': '*'}}
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'url':'https://nad123.s3.amazonaws.com/'+data['name'],'tags':tags})
        # 'body': json.dumps({'message': 'successful lambda function call'})
    };


dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('images')

def addDBRecord(id, tags, url):#id: String; tags: List; url: String
    table.put_item(
        Item={
            'id': id,
            'tags': tags,
            'url': url
        }
    )