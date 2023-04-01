
# import the necessary packages
from imutils import paths
import face_recognition
#import argparse
import pickle
import cv2
import os
import time


f = pickle.load(open("encodings.pickle", "rb"))
length = len(f['encodings'])
print('length of existing pickle file ', length)
encodings = f['encodings']
names = f['names']

def trainmodel(username):
# our images are located in the dataset folder
    print("[INFO] start processing faces...")
    parentdir = "/home/pi/facial-recognition-main/dataset"
    path = os.path.join(parentdir,username) 
    imagePaths = list(paths.list_images(path))
    times = time.time()
    # loop over the image paths
    for (i, imagePath) in enumerate(imagePaths):
        # extract the person name from the image path
        print("[INFO] processing image {}/{}".format(i + 1,
            len(imagePaths)))
        name = imagePath.split(os.path.sep)[-2]

        # load the input image and convert it from RGB (OpenCV ordering)
        # to dlib ordering (RGB)
        image = cv2.imread(imagePath)
        rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        # detect the (x, y)-coordinates of the bounding boxes
        # corresponding to each face in the input image
        boxes = face_recognition.face_locations(rgb,
            model="hog")

        # compute the facial embedding for the face
        faceencodings = face_recognition.face_encodings(rgb, boxes)

        # loop over the encodings
        for encoding in faceencodings:
            # add each encoding + name to our set of known names and
            # encodings
            encodings.append(encoding)
            names.append(name)

    # dump the facial encodings + names to disk
    print("[INFO] serializing encodings...")
    data = {"encodings": encodings, "names": names}
    f = open("encodings.pickle", "wb")
    f.write(pickle.dumps(data))
    f.close()
    print(time.time()-times)
    return True
    
#trainmodel()
def delmodel(username):
    # print(encodings)
    for i in range(0,length):
        if names[i] == username:
            print(f'deleting model of {username} at index {i} ')
            encodings.pop(i)
            names.pop(i)
            # print(f['encodings'][i])
            # print(f['names'][i])
    print(len(f['encodings']))
    # print(encodings)
    # print(names)
    data = {"encodings": encodings, "names": names}
    f = open("encodings.pickle", "wb")
    f.write(pickle.dumps(data))
    f.close()
# f = pickle.load(open(r"C:\Users\mohd noor ahmed\Downloads\encodings-main\encodings-main\encodings.pickle", "rb"))
# print(len(f['names']))
# print(f)
