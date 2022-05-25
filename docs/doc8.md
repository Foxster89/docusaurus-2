---
id: doc8
title: Data analysis and preparation for machine learning
---

## Audio Processing 

At first we need to understand how to process our audio data properly. If you are new to the topic, we can recommend you this [tutorial](https://ccrma.stanford.edu/~unjung/mylec/WTpart1.html ) by Robi Polikar from the university of Stanford. It is about wavelet transforms, but first also gives an introduction to Fourier Transform etc.
Other articles which we found to provide a first approach to the topic were
- [Simple Keras CNN with MFCC](https://www.kaggle.com/ashirahama/simple-keras-cnn-with-mfcc) on kaggle.com
- [Deep Learning Audio Classification](https://medium.com/analytics-vidhya/deep-learning-audio-classification-fcbed546a2dd ). on medium.com
- [Free Spoken Digits Dataset](https://www.kaggle.com/datasets/alanchn31/free-spoken-digits), a dataset for first attempts, also on kaggle.com
- [Audtio Deep Learning Made Simple](https://towardsdatascience.com/audio-deep-learning-made-simple-sound-classification-step-by-step-cebc936bbe5) and 
- [Getting to know the Mel Spectrogram](https://towardsdatascience.com/getting-to-know-the-mel-spectrogram-31bca3e2d9d0) on towardsdatascience.com.
    
A commonly used python package for audio analysis in python is [librosa](https://librosa.org/doc/main/index.html), which we used to preprocess our data.


## Machine Learning (CNN)

We built a quite basic model to classify our collected data from test 04. In order to not have data with different amplitudes or other factors (weather etc.) which distorted our signal, we decided to use only the data collected in one session. 
There are several approaches on how to classify audio data. We decided to go with the MFCCs as features, which is quite common.

As we had 4 recordings of 30 minutes, we split them into snippets of 5 seconds each. In this way we obtained a dataset of 1440 samples.
Then we shuffled the data and created a test and train dataset, for which we then calculated the MFCC features.

For the MFCC features, we used the same parameters as given in Oezkaya & Gloor 2020: 
- Number of MFCCs: 20
- Window Size: 2500
- Hop Length: 1250
- Power: 2.0

We created several models and ended up with a validation accuracy of 0.6 as optimum. Surely there is potential for optimizing the model, but it provides a first impression of the topic and its possibilities. 
