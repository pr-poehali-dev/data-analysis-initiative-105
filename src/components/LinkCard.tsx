import { motion } from "framer-motion"
import { ChevronRight, type LucideIcon } from "lucide-react"

interface LinkCardProps {
  title: string
  description?: string
  href?: string
  icon: LucideIcon
  onClick?: () => void
}

export function LinkCard({ title, description, href, icon: Icon, onClick }: LinkCardProps) {
  const cardStyle = {
    background: "rgba(255, 245, 230, 0.6)",
    backdropFilter: "blur(40px) saturate(180%)",
    WebkitBackdropFilter: "blur(40px) saturate(180%)",
    boxShadow: `
      inset 0 1px 1px rgba(255, 255, 255, 0.9),
      inset 0 -1px 1px rgba(200, 150, 80, 0.05),
      0 0 0 1px rgba(220, 180, 120, 0.2),
      0 2px 4px rgba(150, 100, 40, 0.04),
      0 4px 8px rgba(150, 100, 40, 0.06),
      0 8px 16px rgba(150, 100, 40, 0.06),
      0 16px 32px rgba(150, 100, 40, 0.05)
    `,
    border: "1px solid rgba(220, 180, 120, 0.3)",
    cursor: "pointer",
    display: "flex",
    width: "100%",
    textDecoration: "none",
  }

  const hoverStyle = {
    scale: 1.02,
    y: -4,
    boxShadow: `
      inset 0 1px 1px rgba(255, 255, 255, 1),
      inset 0 -1px 1px rgba(255, 255, 255, 0.2),
      0 0 0 1px rgba(255, 255, 255, 0.7),
      0 4px 8px rgba(0, 0, 0, 0.04),
      0 8px 16px rgba(0, 0, 0, 0.06),
      0 16px 32px rgba(0, 0, 0, 0.08),
      0 32px 64px rgba(0, 0, 0, 0.1),
      0 48px 96px rgba(0, 0, 0, 0.08)
    `,
  }

  const inner = (
    <>
      <div
        className="absolute inset-x-0 top-0 h-[50%] pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
          borderRadius: "20px 20px 0 0",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[30%] pointer-events-none"
        style={{
          background: "linear-gradient(0deg, rgba(0,0,0,0.02) 0%, transparent 100%)",
          borderRadius: "0 0 20px 20px",
        }}
      />
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "radial-gradient(ellipse at center, rgba(255,255,255,0.4), transparent 70%)" }}
      />
      <div
        className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
        style={{
          background: "rgba(255, 240, 215, 0.9)",
          color: "#9a6040",
          boxShadow: `
            inset 0 1px 2px rgba(255, 255, 255, 1),
            inset 0 -1px 1px rgba(180, 120, 60, 0.05),
            0 2px 4px rgba(150, 100, 40, 0.06),
            0 4px 8px rgba(150, 100, 40, 0.04)
          `,
          border: "1px solid rgba(220, 170, 100, 0.3)",
        }}
      >
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </div>
      <div className="relative flex-1 min-w-0">
        <h3 className="text-[15px] font-semibold tracking-tight" style={{ color: "#4a3020" }}>{title}</h3>
        {description && <p className="text-[12px] truncate mt-0.5" style={{ color: "#a07858" }}>{description}</p>}
      </div>
      <ChevronRight
        className="relative h-5 w-5 transition-all duration-200 group-hover:translate-x-0.5"
        style={{ color: "#c0956a" }}
        strokeWidth={2}
      />
    </>
  )

  if (onClick) {
    return (
      <motion.button
        type="button"
        onClick={onClick}
        className="group relative flex w-full items-center gap-4 rounded-[20px] px-4 py-4 overflow-hidden"
        style={cardStyle}
        whileHover={hoverStyle}
        whileTap={{ scale: 0.98, y: 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {inner}
      </motion.button>
    )
  }

  return (
    <motion.a
      href={href ?? "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex w-full items-center gap-4 rounded-[20px] px-4 py-4 overflow-hidden"
      style={cardStyle}
      whileHover={hoverStyle}
      whileTap={{ scale: 0.98, y: 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      {inner}
    </motion.a>
  )
}