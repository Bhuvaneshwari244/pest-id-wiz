#!/usr/bin/env python3
"""
Model evaluation utilities for PeanutGuard detection pipeline.
Computes mAP, precision, recall, F1, and per-class metrics.
"""

import numpy as np
from typing import List, Dict, Tuple
from collections import defaultdict


def compute_iou(box1: np.ndarray, box2: np.ndarray) -> float:
    """Compute IoU between two bounding boxes [x1, y1, x2, y2]."""
    x1 = max(box1[0], box2[0])
    y1 = max(box1[1], box2[1])
    x2 = min(box1[2], box2[2])
    y2 = min(box1[3], box2[3])
    
    intersection = max(0, x2 - x1) * max(0, y2 - y1)
    area1 = (box1[2] - box1[0]) * (box1[3] - box1[1])
    area2 = (box2[2] - box2[0]) * (box2[3] - box2[1])
    union = area1 + area2 - intersection
    
    return intersection / union if union > 0 else 0


def compute_ap(recalls: np.ndarray, precisions: np.ndarray) -> float:
    """Compute Average Precision using 11-point interpolation."""
    ap = 0.0
    for t in np.arange(0.0, 1.1, 0.1):
        if np.sum(recalls >= t) == 0:
            p = 0
        else:
            p = np.max(precisions[recalls >= t])
        ap += p / 11.0
    return ap


def evaluate_detections(
    predictions: List[Dict],
    ground_truths: List[Dict],
    iou_threshold: float = 0.5,
    num_classes: int = 8,
    class_names: List[str] = None,
) -> Dict:
    """
    Evaluate detection results against ground truth.
    
    Args:
        predictions: List of {boxes, scores, labels} per image
        ground_truths: List of {boxes, labels} per image
        iou_threshold: IoU threshold for matching
        num_classes: Number of classes
        class_names: Optional class name mapping
    
    Returns:
        Dictionary with mAP, per-class AP, precision, recall
    """
    if class_names is None:
        class_names = [f"class_{i}" for i in range(num_classes)]
    
    all_detections = defaultdict(list)
    all_annotations = defaultdict(int)
    
    for img_idx, (pred, gt) in enumerate(zip(predictions, ground_truths)):
        gt_boxes = gt.get("boxes", [])
        gt_labels = gt.get("labels", [])
        
        pred_boxes = pred.get("boxes", [])
        pred_scores = pred.get("scores", [])
        pred_labels = pred.get("labels", [])
        
        # Count ground truth per class
        for label in gt_labels:
            all_annotations[label] += 1
        
        # Match predictions to ground truths
        matched_gt = set()
        
        for det_idx in np.argsort(-np.array(pred_scores)):
            det_box = pred_boxes[det_idx]
            det_label = pred_labels[det_idx]
            det_score = pred_scores[det_idx]
            
            best_iou = 0
            best_gt_idx = -1
            
            for gt_idx, (gt_box, gt_label) in enumerate(zip(gt_boxes, gt_labels)):
                if gt_label != det_label or gt_idx in matched_gt:
                    continue
                iou = compute_iou(np.array(det_box), np.array(gt_box))
                if iou > best_iou:
                    best_iou = iou
                    best_gt_idx = gt_idx
            
            tp = 1 if best_iou >= iou_threshold and best_gt_idx >= 0 else 0
            if tp:
                matched_gt.add(best_gt_idx)
            
            all_detections[det_label].append({
                "score": det_score,
                "tp": tp,
            })
    
    # Compute per-class AP
    results = {}
    aps = []
    
    for cls_id in range(num_classes):
        dets = sorted(all_detections[cls_id], key=lambda x: -x["score"])
        n_gt = all_annotations[cls_id]
        
        if n_gt == 0:
            results[class_names[cls_id]] = {"AP": 0.0, "precision": 0.0, "recall": 0.0}
            continue
        
        tp_cumsum = np.cumsum([d["tp"] for d in dets])
        fp_cumsum = np.cumsum([1 - d["tp"] for d in dets])
        
        recalls = tp_cumsum / n_gt
        precisions = tp_cumsum / (tp_cumsum + fp_cumsum)
        
        ap = compute_ap(recalls, precisions)
        aps.append(ap)
        
        results[class_names[cls_id]] = {
            "AP": float(ap),
            "precision": float(precisions[-1]) if len(precisions) > 0 else 0.0,
            "recall": float(recalls[-1]) if len(recalls) > 0 else 0.0,
            "n_predictions": len(dets),
            "n_ground_truth": n_gt,
        }
    
    mAP = np.mean(aps) if aps else 0.0
    
    return {
        "mAP@0.5": float(mAP),
        "per_class": results,
        "total_predictions": sum(len(v) for v in all_detections.values()),
        "total_ground_truth": sum(all_annotations.values()),
    }


def print_evaluation_report(results: Dict, class_names: List[str] = None):
    """Print formatted evaluation report."""
    print("\n" + "=" * 65)
    print("PeanutGuard Model Evaluation Report")
    print("=" * 65)
    
    print(f"\nmAP@0.5: {results['mAP@0.5']:.4f}")
    print(f"Total Predictions: {results['total_predictions']}")
    print(f"Total Ground Truth: {results['total_ground_truth']}")
    
    print(f"\n{'Class':<25} {'AP':>8} {'Prec':>8} {'Recall':>8} {'GT':>6}")
    print("-" * 65)
    
    for cls_name, metrics in results["per_class"].items():
        print(
            f"{cls_name:<25} "
            f"{metrics['AP']:>8.4f} "
            f"{metrics['precision']:>8.4f} "
            f"{metrics['recall']:>8.4f} "
            f"{metrics.get('n_ground_truth', 0):>6d}"
        )
    
    print("=" * 65)


if __name__ == "__main__":
    # Demo with synthetic data
    print("Running evaluation demo with synthetic data...")
    
    CLASS_NAMES = [
        "early_leaf_spot", "late_leaf_spot", "rust", "collar_rot",
        "aphid", "thrips", "tobacco_caterpillar", "healthy"
    ]
    
    # Simulate predictions and ground truths
    np.random.seed(42)
    predictions = []
    ground_truths = []
    
    for _ in range(50):
        n_gt = np.random.randint(1, 4)
        gt_boxes = np.random.rand(n_gt, 4).tolist()
        gt_labels = np.random.randint(0, 8, n_gt).tolist()
        
        n_pred = np.random.randint(0, 5)
        pred_boxes = np.random.rand(n_pred, 4).tolist()
        pred_scores = np.random.uniform(0.3, 0.99, n_pred).tolist()
        pred_labels = np.random.randint(0, 8, n_pred).tolist()
        
        ground_truths.append({"boxes": gt_boxes, "labels": gt_labels})
        predictions.append({"boxes": pred_boxes, "scores": pred_scores, "labels": pred_labels})
    
    results = evaluate_detections(predictions, ground_truths, class_names=CLASS_NAMES)
    print_evaluation_report(results, CLASS_NAMES)
