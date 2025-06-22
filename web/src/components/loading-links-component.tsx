import { motion } from "motion/react"

export function LoadingLinksComponent() {
  return (
    <div className="flex flex-col items-center justify-center border-t border-gray-200">
      <div className="mt-8 flex space-x-2">
        {[0, 1, 2, 3].map(i => (
          <motion.div
            key={i}
            className="h-2 w-2 rounded-full bg-gray-400"
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 0.6,
              delay: i * 0.1,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <p className="mt-3 text-[10px] leading-3.5 text-gray-500 uppercase">
        CARREGANDO LINKS
      </p>
    </div>
  )
}
