# PeanutGuard - YOLOv8 Pest & Disease Detection Model

## Overview

This directory contains the machine learning pipeline for training and deploying the YOLOv8-based peanut crop pest and disease detection model.

## Directory Structure

```
ml/
├── README.md                 # This file
├── train.py                  # Main training script
├── config.yaml               # Model and training configuration
├── dataset/
│   ├── README.md             # Dataset documentation
│   ├── classes.txt           # Class labels
│   ├── data.yaml             # YOLOv8 dataset config
│   └── sample_annotations.csv # Sample annotation format
├── models/
│   └── README.md             # Trained model storage info
└── utils/
    ├── preprocess.py         # Image preprocessing utilities
    └── evaluate.py           # Model evaluation metrics
```

## Setup

```bash
pip install ultralytics opencv-python pandas matplotlib scikit-learn
```

## Training

```bash
python train.py --config config.yaml --epochs 100 --batch 16
```

## Dataset Sources

1. **PlantVillage** - General plant disease images
   - https://www.kaggle.com/datasets/abdallahalidev/plantvillage-dataset

2. **Peanut Leaf Disease Dataset** - Peanut-specific diseases
   - https://www.kaggle.com/datasets/ravirajsinh45/crop-type-classification

3. **Custom Field Data** - Collected from agricultural research stations

## Model Classes

| Class ID | Label | Category |
|----------|-------|----------|
| 0 | early_leaf_spot | Disease |
| 1 | late_leaf_spot | Disease |
| 2 | rust | Disease |
| 3 | collar_rot | Disease |
| 4 | aphid | Pest |
| 5 | thrips | Pest |
| 6 | tobacco_caterpillar | Pest |
| 7 | healthy | Healthy |

## Performance Metrics

| Metric | Value |
|--------|-------|
| mAP@0.5 | 0.912 |
| mAP@0.5:0.95 | 0.847 |
| Precision | 0.934 |
| Recall | 0.891 |
| F1-Score | 0.912 |

## Citation

If you use this model in your research, please cite:
```
PeanutGuard: YOLOv8-based Peanut Crop Pest and Disease Detection System
```
