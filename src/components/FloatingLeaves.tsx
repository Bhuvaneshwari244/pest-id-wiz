import { motion } from "framer-motion";

const floatingObjects = [
  // Early Leaf Spot 🍂
  { emoji: "🍂", x: "3%", y: "5%", size: 28, delay: 0, duration: 20, rotate: 360 },
  { emoji: "🍂", x: "70%", y: "50%", size: 22, delay: 6, duration: 24, rotate: -200 },
  // Late Leaf Spot 🍁
  { emoji: "🍁", x: "92%", y: "15%", size: 24, delay: 3, duration: 25, rotate: -200 },
  { emoji: "🍁", x: "25%", y: "70%", size: 20, delay: 8, duration: 22, rotate: 300 },
  // Rust 🟤
  { emoji: "🟫", x: "85%", y: "60%", size: 18, delay: 7, duration: 22, rotate: 300 },
  { emoji: "🟫", x: "40%", y: "30%", size: 14, delay: 2, duration: 18, rotate: -150 },
  // Collar Rot 🪵
  { emoji: "🪵", x: "10%", y: "75%", size: 22, delay: 1.5, duration: 18, rotate: -360 },
  { emoji: "🪵", x: "60%", y: "10%", size: 18, delay: 5, duration: 20, rotate: 180 },
  // Aphid 🐛
  { emoji: "🐛", x: "20%", y: "10%", size: 22, delay: 2, duration: 24, rotate: 180 },
  { emoji: "🐛", x: "80%", y: "80%", size: 18, delay: 9, duration: 20, rotate: -270 },
  // Thrips 🦟
  { emoji: "🦟", x: "75%", y: "8%", size: 24, delay: 4, duration: 20, rotate: -180 },
  { emoji: "🦟", x: "15%", y: "45%", size: 20, delay: 7.5, duration: 26, rotate: 270 },
  // Tobacco Caterpillar 🐛🐞
  { emoji: "🐞", x: "50%", y: "85%", size: 20, delay: 6, duration: 26, rotate: 270 },
  { emoji: "🐞", x: "35%", y: "15%", size: 16, delay: 1, duration: 22, rotate: -180 },
  // Healthy 🌿🍃🥜
  { emoji: "🥜", x: "15%", y: "30%", size: 24, delay: 5, duration: 19, rotate: 360 },
  { emoji: "🥜", x: "55%", y: "65%", size: 20, delay: 3, duration: 23, rotate: -270 },
  { emoji: "🌿", x: "88%", y: "40%", size: 22, delay: 1, duration: 22, rotate: -150 },
  { emoji: "🌿", x: "45%", y: "3%", size: 26, delay: 3.5, duration: 21, rotate: 200 },
  { emoji: "🍃", x: "5%", y: "50%", size: 20, delay: 3, duration: 26, rotate: 180 },
  { emoji: "🍃", x: "65%", y: "35%", size: 18, delay: 8, duration: 20, rotate: -300 },
  // Peanut plant leaves
  { emoji: "🌱", x: "30%", y: "90%", size: 22, delay: 2.5, duration: 24, rotate: 200 },
  { emoji: "🌱", x: "95%", y: "70%", size: 18, delay: 4.5, duration: 20, rotate: -180 },
  // Accent dots
  { emoji: "🟢", x: "25%", y: "40%", size: 8, delay: 0, duration: 15, rotate: 0 },
  { emoji: "🟡", x: "55%", y: "20%", size: 6, delay: 4, duration: 18, rotate: 0 },
  { emoji: "🟤", x: "40%", y: "65%", size: 7, delay: 2, duration: 16, rotate: 0 },
  { emoji: "🟢", x: "65%", y: "90%", size: 8, delay: 5, duration: 14, rotate: 0 },
];

export default function FloatingLeaves() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {floatingObjects.map((obj, i) => (
        <motion.div
          key={i}
          className="absolute select-none"
          style={{
            left: obj.x,
            top: obj.y,
            fontSize: obj.size,
            opacity: obj.size <= 10 ? 0.5 : 0.15,
          }}
          animate={{
            y: [0, -20, 0, 20, 0],
            x: [0, Math.sin(i * 0.7) * 30, 0, Math.cos(i * 0.5) * -30, 0],
            rotate: [0, obj.rotate / 4, 0, -obj.rotate / 4, 0],
          }}
          transition={{
            duration: obj.duration,
            delay: obj.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {obj.emoji}
        </motion.div>
      ))}
    </div>
  );
}
