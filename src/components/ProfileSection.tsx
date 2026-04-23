import { motion } from "framer-motion"

interface ProfileSectionProps {
  name: string
  bio: string
  imageUrl: string
}

export function ProfileSection({ name, bio, imageUrl }: ProfileSectionProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="relative w-full overflow-hidden"
        style={{
          borderRadius: "24px",
          boxShadow: "0 4px 24px rgba(150, 100, 40, 0.15), 0 0 0 1px rgba(220, 180, 120, 0.2)",
        }}
      >
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={name}
          className="w-full object-cover"
          style={{ height: "320px", objectPosition: "center top" }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent 50%, rgba(245, 232, 210, 0.6) 100%)",
          }}
        />
      </motion.div>

      <div className="mt-5 w-full text-left">
        <p className="text-[13px] font-medium mb-1" style={{ color: "#b08060" }}>Семейный психолог</p>
        <h1 className="text-[22px] font-semibold tracking-tight leading-snug" style={{ color: "#4a3020" }}>{name}</h1>
        <p className="mt-2 text-[13px] font-semibold" style={{ color: "#c0956a" }}>20+ лет практики</p>

        <div className="mt-3 space-y-1">
          <p className="text-[14px] font-medium" style={{ color: "#7a5535" }}>Помогаю:</p>
          <p className="text-[14px]" style={{ color: "#9a7858" }}>— сохранить отношения</p>
          <p className="text-[14px]" style={{ color: "#9a7858" }}>— выйти из кризиса</p>
          <p className="text-[14px]" style={{ color: "#9a7858" }}>— наладить контакт с ребёнком</p>
        </div>

        <p className="mt-3 text-[13px] italic" style={{ color: "#b09070" }}>
          Работаю бережно и глубоко с причиной, а не симптомами
        </p>
      </div>
    </div>
  )
}
