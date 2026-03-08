import { motion } from "framer-motion";

const leaves = [
  { x: "5%", y: "-10%", size: 24, delay: 0, duration: 18, rotate: 360 },
  { x: "15%", y: "-15%", size: 18, delay: 2, duration: 22, rotate: -360 },
  { x: "25%", y: "-5%", size: 20, delay: 4, duration: 20, rotate: 270 },
  { x: "40%", y: "-12%", size: 16, delay: 1, duration: 25, rotate: -270 },
  { x: "55%", y: "-8%", size: 22, delay: 3, duration: 19, rotate: 360 },
  { x: "70%", y: "-14%", size: 14, delay: 5, duration: 23, rotate: -360 },
  { x: "80%", y: "-6%", size: 20, delay: 2.5, duration: 21, rotate: 300 },
  { x: "90%", y: "-10%", size: 16, delay: 0.5, duration: 24, rotate: -300 },
];

export default function FloatingLeaves() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {leaves.map((leaf, i) => (
        <motion.div
          key={i}
          className="absolute text-primary/10"
          style={{ left: leaf.x, top: leaf.y }}
          animate={{
            y: ["0vh", "110vh"],
            rotate: [0, leaf.rotate],
            x: [0, Math.sin(i) * 60],
          }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg
            width={leaf.size}
            height={leaf.size}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
