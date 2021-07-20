---
id: doc8
title: Data analysis and preparation for machine learning
---

## Audio Processing 

At first we need to understand how to process our audio data properly. If you are new to the topic, we can recommend you this [tutorial](https://ccrma.stanford.edu/~unjung/mylec/WTpart1.html ) by Robi Polikar from the university of Stanford. It is about wavelet transforms, but first also gives an introduction to Fourier Transform etc. 

## Machine Learning 

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

        digit_audio = sound[start_idx:stop_idx]

        # Build filename
        outfile = label + "_" + str(counts[label]) + ".wav"
        outfile = path_newfile + os.sep + outfile

        # Write audio to file
        print ("writing", outfile)
        write(outfile, rate, digit_audio)
        counts[label] += 1
```       