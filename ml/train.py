#!/usr/bin/env python3
"""
PeanutGuard - YOLOv8 Training Script
=====================================
Fine-tunes YOLOv8n on custom peanut crop pest/disease dataset.

Usage:
    python train.py --config config.yaml --epochs 100 --batch 16
    python train.py --resume runs/detect/train/weights/last.pt

Requirements:
    pip install ultralytics opencv-python pandas matplotlib scikit-learn
"""

import argparse
import os
import sys
import yaml
from pathlib import Path
from datetime import datetime

try:
    from ultralytics import YOLO
    import cv2
    import numpy as np
except ImportError:
    print("Required packages not installed. Run:")
    print("pip install ultralytics opencv-python numpy")
    sys.exit(1)


# ============================================================
# Configuration
# ============================================================

DEFAULT_CONFIG = {
    "model": {
        "architecture": "yolov8n",  # nano variant for edge deployment
        "pretrained": True,
        "input_size": 640,
        "num_classes": 8,
    },
    "training": {
        "epochs": 100,
        "batch_size": 16,
        "learning_rate": 0.01,
        "optimizer": "SGD",
        "momentum": 0.937,
        "weight_decay": 0.0005,
        "warmup_epochs": 3,
        "patience": 20,  # early stopping patience
    },
    "augmentation": {
        "hsv_h": 0.015,
        "hsv_s": 0.7,
        "hsv_v": 0.4,
        "degrees": 10.0,
        "translate": 0.1,
        "scale": 0.5,
        "fliplr": 0.5,
        "flipud": 0.0,
        "mosaic": 1.0,
        "mixup": 0.1,
    },
    "dataset": {
        "path": "dataset/data.yaml",
        "train_split": 0.8,
        "val_split": 0.1,
        "test_split": 0.1,
    },
}

# Class definitions matching our detection system
CLASS_NAMES = [
    "early_leaf_spot",      # Cercospora arachidicola
    "late_leaf_spot",       # Phaeoisariopsis personata
    "rust",                 # Puccinia arachidis
    "collar_rot",           # Aspergillus niger
    "aphid",                # Aphis craccivora
    "thrips",               # Thrips palmi
    "tobacco_caterpillar",  # Spodoptera litura
    "healthy",              # No disease/pest
]

CLASS_INFO = {
    "early_leaf_spot": {
        "scientific_name": "Cercospora arachidicola",
        "category": "disease",
        "severity_range": ["medium", "high"],
    },
    "late_leaf_spot": {
        "scientific_name": "Phaeoisariopsis personata",
        "category": "disease",
        "severity_range": ["high"],
    },
    "rust": {
        "scientific_name": "Puccinia arachidis",
        "category": "disease",
        "severity_range": ["medium", "high"],
    },
    "collar_rot": {
        "scientific_name": "Aspergillus niger",
        "category": "disease",
        "severity_range": ["medium", "high"],
    },
    "aphid": {
        "scientific_name": "Aphis craccivora",
        "category": "pest",
        "severity_range": ["medium", "high"],
    },
    "thrips": {
        "scientific_name": "Thrips palmi",
        "category": "pest",
        "severity_range": ["low", "medium"],
    },
    "tobacco_caterpillar": {
        "scientific_name": "Spodoptera litura",
        "category": "pest",
        "severity_range": ["high"],
    },
    "healthy": {
        "scientific_name": "Arachis hypogaea",
        "category": "healthy",
        "severity_range": ["low"],
    },
}


# ============================================================
# Training Pipeline
# ============================================================

def load_config(config_path: str = None) -> dict:
    """Load training configuration from YAML or use defaults."""
    if config_path and os.path.exists(config_path):
        with open(config_path, 'r') as f:
            user_config = yaml.safe_load(f)
        # Merge with defaults
        config = DEFAULT_CONFIG.copy()
        for key in user_config:
            if isinstance(user_config[key], dict) and key in config:
                config[key].update(user_config[key])
            else:
                config[key] = user_config[key]
        return config
    return DEFAULT_CONFIG


def setup_dataset(config: dict) -> str:
    """Verify dataset structure and return data.yaml path."""
    data_yaml = config["dataset"]["path"]
    
    if not os.path.exists(data_yaml):
        print(f"Warning: Dataset config not found at {data_yaml}")
        print("Creating template data.yaml...")
        
        os.makedirs("dataset", exist_ok=True)
        template = {
            "path": os.path.abspath("dataset"),
            "train": "images/train",
            "val": "images/val",
            "test": "images/test",
            "nc": len(CLASS_NAMES),
            "names": CLASS_NAMES,
        }
        with open(data_yaml, 'w') as f:
            yaml.dump(template, f, default_flow_style=False)
        
        # Create directory structure
        for split in ["train", "val", "test"]:
            os.makedirs(f"dataset/images/{split}", exist_ok=True)
            os.makedirs(f"dataset/labels/{split}", exist_ok=True)
        
        print(f"Created dataset template at {data_yaml}")
        print("Please add your images and labels before training.")
    
    return data_yaml


def preprocess_image(image_path: str, target_size: int = 640) -> np.ndarray:
    """
    Preprocess image for YOLOv8 inference.
    
    Steps:
    1. Read image in BGR format
    2. Resize to target_size maintaining aspect ratio
    3. Pad to square
    4. Normalize pixel values to [0, 1]
    """
    img = cv2.imread(image_path)
    if img is None:
        raise ValueError(f"Failed to read image: {image_path}")
    
    h, w = img.shape[:2]
    scale = target_size / max(h, w)
    new_h, new_w = int(h * scale), int(w * scale)
    
    img_resized = cv2.resize(img, (new_w, new_h), interpolation=cv2.INTER_LINEAR)
    
    # Pad to square
    canvas = np.full((target_size, target_size, 3), 114, dtype=np.uint8)
    pad_h = (target_size - new_h) // 2
    pad_w = (target_size - new_w) // 2
    canvas[pad_h:pad_h + new_h, pad_w:pad_w + new_w] = img_resized
    
    # Normalize
    canvas = canvas.astype(np.float32) / 255.0
    
    return canvas


def train(config: dict, resume: str = None):
    """
    Main training function.
    
    Pipeline:
    1. Load pretrained YOLOv8n model
    2. Configure augmentation and training parameters
    3. Fine-tune on peanut disease dataset
    4. Save best model weights
    5. Generate evaluation metrics
    """
    print("=" * 60)
    print("PeanutGuard YOLOv8 Training Pipeline")
    print(f"Started: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 60)
    
    # Setup dataset
    data_yaml = setup_dataset(config)
    
    # Load model
    model_arch = config["model"]["architecture"]
    if resume:
        print(f"Resuming training from: {resume}")
        model = YOLO(resume)
    else:
        print(f"Loading pretrained {model_arch} model...")
        model = YOLO(f"{model_arch}.pt")
    
    # Training parameters
    train_config = config["training"]
    aug_config = config["augmentation"]
    
    print(f"\nTraining Configuration:")
    print(f"  Epochs:        {train_config['epochs']}")
    print(f"  Batch Size:    {train_config['batch_size']}")
    print(f"  Learning Rate: {train_config['learning_rate']}")
    print(f"  Image Size:    {config['model']['input_size']}")
    print(f"  Classes:       {len(CLASS_NAMES)}")
    print(f"  Dataset:       {data_yaml}")
    print()
    
    # Start training
    results = model.train(
        data=data_yaml,
        epochs=train_config["epochs"],
        batch=train_config["batch_size"],
        imgsz=config["model"]["input_size"],
        lr0=train_config["learning_rate"],
        optimizer=train_config["optimizer"],
        momentum=train_config["momentum"],
        weight_decay=train_config["weight_decay"],
        warmup_epochs=train_config["warmup_epochs"],
        patience=train_config["patience"],
        
        # Augmentation
        hsv_h=aug_config["hsv_h"],
        hsv_s=aug_config["hsv_s"],
        hsv_v=aug_config["hsv_v"],
        degrees=aug_config["degrees"],
        translate=aug_config["translate"],
        scale=aug_config["scale"],
        fliplr=aug_config["fliplr"],
        flipud=aug_config["flipud"],
        mosaic=aug_config["mosaic"],
        mixup=aug_config["mixup"],
        
        # Output
        project="runs/detect",
        name="peanutguard",
        exist_ok=True,
        save=True,
        plots=True,
        verbose=True,
    )
    
    print("\n" + "=" * 60)
    print("Training Complete!")
    print(f"Best model saved to: runs/detect/peanutguard/weights/best.pt")
    print("=" * 60)
    
    return results


def evaluate(model_path: str, data_yaml: str):
    """Evaluate trained model on test set."""
    print("Loading model for evaluation...")
    model = YOLO(model_path)
    
    results = model.val(
        data=data_yaml,
        split="test",
        imgsz=640,
        batch=16,
        plots=True,
        save_json=True,
    )
    
    print("\nEvaluation Results:")
    print(f"  mAP@0.5:      {results.box.map50:.3f}")
    print(f"  mAP@0.5:0.95: {results.box.map:.3f}")
    print(f"  Precision:     {results.box.mp:.3f}")
    print(f"  Recall:        {results.box.mr:.3f}")
    
    return results


def predict(model_path: str, image_path: str):
    """Run inference on a single image."""
    model = YOLO(model_path)
    
    results = model.predict(
        source=image_path,
        imgsz=640,
        conf=0.25,
        iou=0.45,
        save=True,
        save_txt=True,
    )
    
    for result in results:
        for box in result.boxes:
            cls_id = int(box.cls[0])
            conf = float(box.conf[0])
            class_name = CLASS_NAMES[cls_id]
            info = CLASS_INFO[class_name]
            
            print(f"\nDetected: {class_name}")
            print(f"  Scientific Name: {info['scientific_name']}")
            print(f"  Category:        {info['category']}")
            print(f"  Confidence:      {conf:.2%}")
            print(f"  Bounding Box:    {box.xyxy[0].tolist()}")
    
    return results


# ============================================================
# CLI Entry Point
# ============================================================

def main():
    parser = argparse.ArgumentParser(
        description="PeanutGuard YOLOv8 Training Pipeline"
    )
    parser.add_argument(
        "--mode", type=str, default="train",
        choices=["train", "eval", "predict"],
        help="Pipeline mode: train, eval, or predict"
    )
    parser.add_argument(
        "--config", type=str, default="config.yaml",
        help="Path to training configuration YAML"
    )
    parser.add_argument(
        "--epochs", type=int, default=None,
        help="Override number of training epochs"
    )
    parser.add_argument(
        "--batch", type=int, default=None,
        help="Override batch size"
    )
    parser.add_argument(
        "--resume", type=str, default=None,
        help="Path to checkpoint to resume training"
    )
    parser.add_argument(
        "--model", type=str, default="runs/detect/peanutguard/weights/best.pt",
        help="Path to trained model (for eval/predict)"
    )
    parser.add_argument(
        "--image", type=str, default=None,
        help="Image path for prediction"
    )
    
    args = parser.parse_args()
    config = load_config(args.config)
    
    # Apply CLI overrides
    if args.epochs:
        config["training"]["epochs"] = args.epochs
    if args.batch:
        config["training"]["batch_size"] = args.batch
    
    if args.mode == "train":
        train(config, resume=args.resume)
    elif args.mode == "eval":
        evaluate(args.model, config["dataset"]["path"])
    elif args.mode == "predict":
        if not args.image:
            print("Error: --image required for predict mode")
            sys.exit(1)
        predict(args.model, args.image)


if __name__ == "__main__":
    main()
