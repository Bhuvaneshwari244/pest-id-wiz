#!/usr/bin/env python3
"""
Image preprocessing utilities for PeanutGuard detection pipeline.
Handles image loading, resizing, normalization, and augmentation.
"""

import cv2
import numpy as np
from pathlib import Path
from typing import Tuple, List, Optional


def load_image(path: str) -> np.ndarray:
    """Load image in BGR format."""
    img = cv2.imread(str(path))
    if img is None:
        raise FileNotFoundError(f"Cannot load image: {path}")
    return img


def resize_with_padding(
    image: np.ndarray,
    target_size: int = 640,
    pad_color: Tuple[int, int, int] = (114, 114, 114)
) -> Tuple[np.ndarray, float, Tuple[int, int]]:
    """
    Resize image maintaining aspect ratio and pad to square.
    Returns: (padded_image, scale_factor, (pad_w, pad_h))
    """
    h, w = image.shape[:2]
    scale = target_size / max(h, w)
    new_h, new_w = int(h * scale), int(w * scale)
    
    resized = cv2.resize(image, (new_w, new_h), interpolation=cv2.INTER_LINEAR)
    
    canvas = np.full((target_size, target_size, 3), pad_color, dtype=np.uint8)
    pad_h = (target_size - new_h) // 2
    pad_w = (target_size - new_w) // 2
    canvas[pad_h:pad_h + new_h, pad_w:pad_w + new_w] = resized
    
    return canvas, scale, (pad_w, pad_h)


def normalize(image: np.ndarray) -> np.ndarray:
    """Normalize pixel values to [0, 1]."""
    return image.astype(np.float32) / 255.0


def preprocess_for_inference(
    image_path: str,
    target_size: int = 640
) -> Tuple[np.ndarray, dict]:
    """
    Full preprocessing pipeline for YOLOv8 inference.
    Returns preprocessed image and metadata for post-processing.
    """
    img = load_image(image_path)
    original_shape = img.shape[:2]
    
    padded, scale, padding = resize_with_padding(img, target_size)
    normalized = normalize(padded)
    
    # Add batch dimension and convert to CHW format
    input_tensor = np.transpose(normalized, (2, 0, 1))[np.newaxis, ...]
    
    metadata = {
        "original_shape": original_shape,
        "scale": scale,
        "padding": padding,
        "target_size": target_size,
    }
    
    return input_tensor, metadata


def augment_image(
    image: np.ndarray,
    hsv_h: float = 0.015,
    hsv_s: float = 0.7,
    hsv_v: float = 0.4,
    rotation: float = 10.0,
    flip_lr: float = 0.5,
) -> np.ndarray:
    """Apply data augmentation to training images."""
    augmented = image.copy()
    
    # HSV augmentation
    if np.random.random() < 0.5:
        hsv = cv2.cvtColor(augmented, cv2.COLOR_BGR2HSV).astype(np.float32)
        hsv[:, :, 0] *= 1 + np.random.uniform(-hsv_h, hsv_h)
        hsv[:, :, 1] *= 1 + np.random.uniform(-hsv_s, hsv_s)
        hsv[:, :, 2] *= 1 + np.random.uniform(-hsv_v, hsv_v)
        hsv = np.clip(hsv, 0, 255).astype(np.uint8)
        augmented = cv2.cvtColor(hsv, cv2.COLOR_HSV2BGR)
    
    # Random rotation
    if np.random.random() < 0.5:
        h, w = augmented.shape[:2]
        angle = np.random.uniform(-rotation, rotation)
        M = cv2.getRotationMatrix2D((w / 2, h / 2), angle, 1.0)
        augmented = cv2.warpAffine(augmented, M, (w, h), borderValue=(114, 114, 114))
    
    # Horizontal flip
    if np.random.random() < flip_lr:
        augmented = cv2.flip(augmented, 1)
    
    return augmented


def batch_preprocess(
    image_paths: List[str],
    target_size: int = 640
) -> Tuple[np.ndarray, List[dict]]:
    """Preprocess a batch of images for inference."""
    batch = []
    metadata_list = []
    
    for path in image_paths:
        tensor, meta = preprocess_for_inference(path, target_size)
        batch.append(tensor[0])  # Remove batch dimension
        metadata_list.append(meta)
    
    batch_tensor = np.stack(batch, axis=0)
    return batch_tensor, metadata_list


if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        tensor, meta = preprocess_for_inference(sys.argv[1])
        print(f"Input shape: {tensor.shape}")
        print(f"Original size: {meta['original_shape']}")
        print(f"Scale factor: {meta['scale']:.4f}")
    else:
        print("Usage: python preprocess.py <image_path>")
