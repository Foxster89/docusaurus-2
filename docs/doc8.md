---
id: doc8
title: Data analysis and preparation for machine learning
---

## Audio Processing 

At first we need to understand how to process our audio data properly. If you are new to the topic, we can recommend you this [tutorial](https://ccrma.stanford.edu/~unjung/mylec/WTpart1.html ) by Robi Polikar from the university of Stanford. It is about wavelet transforms, but first also gives an introduction to Fourier Transform etc. 

## Machine Learning (CNN)

We built a quite basic model to classify our collected data from test 04. In order to not have data with different amplitudes or other factors (weather etc.) which distorted our signal, we decided to use only the data collected in one session. 
There are several approaches on how to classify audio data. We decided to go with the MFCCs as features. 

As we had 4 recordings of 30 minutes, we split them into snippets of 5 seconds each. In this way we obtained a dataset of 1440 samples.

To split our files we used this python code: 

```python
import os
from collections import defaultdict
import numpy as np
from scipy.io.wavfile import read, write

#number of files is duration of file in seconds/number of seconds per new file

def split_wav(secs, l, path_origin, path_newfile):
    fname = path_origin
    rate, sound = read(fname)
    counts = defaultdict(lambda: 0)
    
    label = l
    length_in_s = sound.shape[0]/rate
    num_files = int(length_in_s/secs)
    for i in range (0, num_files):
        label = label
        start_idx = i * (rate * secs)
        stop_idx = start_idx + int(rate * secs)

        if stop_idx > len(sound):
            raise('Error: Sound ends before expected number of samples reached for index:' + str(i))

        new_audio = sound[start_idx:stop_idx]

        # Build filename
        outfile = label + "_" + str(counts[label]) + ".wav"
        outfile = path_newfile + os.sep + outfile

        # Write audio to file
        print ("writing", outfile)
        write(outfile, rate, new_audio)
        counts[label] += 1
```       

Our model is really basic, so it can surely be improved. But it helps us to gain a first impression of how well our data can be classified.

```python 
import matplotlib.pyplot as plt
import pandas as pd
import os
from scipy.io import wavfile
from scipy import signal
import numpy as np
import librosa
import librosa.display
import random
import tensorflow as tf
import keras
from keras.models import Sequential
from keras.utils import to_categorical
import seaborn as sns
import sklearn
from sklearn.model_selection import train_test_split
from keras.layers import Dense, Dropout, Flatten, Conv2D, MaxPooling2D
from keras import optimizers
from keras.layers.normalization import BatchNormalization
```

```python
data_directory = './Recordings_5Sec'
```

We shuffle the data and create out test and train dataset.

```python
files=[]
for flist in os.listdir(data_directory):
    files.append(flist)
```
```python
#shuffle
random.shuffle(files)
#split into test and train dataset, 80% training, 20% testing
training_dataset, test_dataset = sklearn.model_selection.train_test_split(files, train_size=0.8, test_size=0.2)
```

Now we calculate the mfcc features

```python
sr= 10000
n_fft= 2500
hop_length= 1250

train_mfccs = []
y_train = []
test_mfccs = []
y_test = []

#reshape
pad2d = lambda a, i: a[:, 0: i] if a.shape[1] > i else np.hstack((a, np.zeros((a.shape[0],i - a.shape[1]))))

#test set
for i in range(len(test_dataset)):
        
        #first part of filename is label
        struct = test_dataset[i].split('_')
        label = struct[0]
        audio = struct[1]
        #read file
        wav, sr = librosa.load((os.path.join(data_directory , test_dataset[i])), sr=None) 
        #calculate mfccs
        mfcc = librosa.feature.mfcc(y=wav, n_mfcc = 20, sr=sr, n_fft=n_fft, hop_length=hop_length, power=2.0)
        padded_mfcc = pad2d(mfcc,40) 
        test_mfccs.append(padded_mfcc)
        y_test.append(label)
    
#training set
for i in range(len(training_dataset)):
        
        #first part of filename is label
        struct = training_dataset[i].split('_')
        label = struct[0]
        audio = struct[1]
        #read file
        wav, sr = librosa.load((os.path.join(data_directory , training_dataset[i])), sr=None) 
        #calculate mfccs
        mfcc = librosa.feature.mfcc(y=wav, n_mfcc = 20, sr=sr, n_fft=n_fft, hop_length=hop_length, power=2.0)
        padded_mfcc = pad2d(mfcc,40) 
        train_mfccs.append(padded_mfcc)
        y_train.append(label)
        
train_mfccs = np.array(train_mfccs)
y_train = to_categorical(np.array(y_train))
test_mfccs = np.array(test_mfccs)
y_test = to_categorical(np.array(y_test))
X_train = np.expand_dims(train_mfccs, -1)
X_test = np.expand_dims(test_mfccs, -1)
```
Now create the model.

```python
model = Sequential()
model.add(Conv2D(32, kernel_size=(2, 2), activation='relu', input_shape=(X_train[0].shape)))
model.add(Conv2D(48, kernel_size=(2, 2), activation='relu'))
model.add(Conv2D(120, kernel_size=(2, 2), activation='relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Dropout(0.25))
model.add(Flatten())
model.add(Dense(128, activation='relu'))
model.add(Dropout(0.25))
model.add(Dense(64, activation='relu'))
model.add(Dropout(0.4))
model.add(Dense(4, activation='softmax'))
checkpoint_path = "cp.ckpt2"
cp_callback = tf.keras.callbacks.ModelCheckpoint(filepath=checkpoint_path,save_best_only=True,mode='max',monitor='val_accuracy',verbose=1)

model.summary()
```

```python
model.compile(loss='categorical_crossentropy',
              optimizer='adam',
              metrics=['accuracy'])

history = model.fit(X_train,
          y_train,
          epochs=100,
          batch_size=32,
          validation_data=(X_test, y_test),
          callbacks=[cp_callback])
```

After 65 epochs our validation accuracy improved to 0.60069.


For more info on deep learning audio classification see [kaggle.com](https://www.kaggle.com/ashirahama/simple-keras-cnn-with-mfcc) or this article on [medium](https://medium.com/analytics-vidhya/deep-learning-audio-classification-fcbed546a2dd ) where we based our classification on.