"use client";

import { motion } from "framer-motion";

type TextRevealProps = {
  text: string;
  trigger?: "mount" | "inView";
  delay?: number;
  wordDelay?: number;
};

export default function TextReveal({
  text,
  trigger = "inView",
  delay = 0,
  wordDelay = 0.045,
}: TextRevealProps) {
  const words = text.split(" ");
  const motionProps =
    trigger === "mount"
      ? { initial: "hidden" as const, animate: "visible" as const }
      : {
          initial: "hidden" as const,
          whileInView: "visible" as const,
          viewport: { once: true, margin: "-100px" },
        };

  return (
    <>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.1em]">
          <motion.span
            className="inline-block"
            style={{ transformPerspective: 400 }}
            variants={{
              hidden: { y: "110%", rotateX: -55 },
              visible: { y: "0%", rotateX: 0 },
            }}
            {...motionProps}
            transition={{
              duration: 0.75,
              delay: delay + i * wordDelay,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </>
  );
}
