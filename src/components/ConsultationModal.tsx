import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface ConsultationModalProps {
  open: boolean
  onClose: () => void
}

export function ConsultationModal({ open, onClose }: ConsultationModalProps) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [about, setAbout] = useState("")
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await fetch('https://functions.poehali.dev/30ba79e3-09c7-4f47-bf78-41a5b1698fc2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, about })
    })
    setSent(true)
  }

  function handleClose() {
    onClose()
    setTimeout(() => {
      setName("")
      setPhone("")
      setAbout("")
      setSent(false)
    }, 300)
  }

  const inputStyle = {
    width: "100%",
    borderRadius: "14px",
    padding: "12px 16px",
    fontSize: "15px",
    outline: "none",
    background: "rgba(255, 248, 238, 0.8)",
    border: "1px solid rgba(200, 160, 100, 0.3)",
    boxShadow: "inset 0 1px 3px rgba(0,0,0,0.03)",
    color: "#4a3728",
    transition: "border-color 0.2s",
  } as React.CSSProperties

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-40"
            style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(4px)" }}
          />

          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed z-50 inset-0 flex items-center justify-center px-4"
          >
            <div
              style={{
                background: "rgba(253, 246, 238, 0.97)",
                backdropFilter: "blur(40px) saturate(180%)",
                borderRadius: "28px",
                boxShadow: "0 8px 60px rgba(150, 100, 40, 0.15)",
                padding: "32px 24px 36px",
                width: "100%",
                maxWidth: "420px",
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[18px] font-semibold" style={{ color: "#4a3728" }}>Записаться на консультацию</h2>
                <button
                  onClick={handleClose}
                  className="flex items-center justify-center w-8 h-8 rounded-full transition-colors"
                  style={{ background: "rgba(150,100,50,0.1)", color: "#8a6040" }}
                >
                  <X size={16} />
                </button>
              </div>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8"
                >
                  <div className="text-4xl mb-4">✨</div>
                  <p className="text-[17px] font-semibold mb-2" style={{ color: "#4a3728" }}>Заявка отправлена!</p>
                  <p className="text-[14px]" style={{ color: "#9a7860" }}>Гульсина свяжется с вами в ближайшее время</p>
                  <button
                    onClick={handleClose}
                    className="mt-6 px-6 py-2.5 rounded-xl text-[14px] font-medium transition-colors"
                    style={{ background: "rgba(150,100,50,0.1)", color: "#7a5535" }}
                  >
                    Закрыть
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-[12px] font-medium mb-1.5 ml-1" style={{ color: "#9a7860" }}>Ваше имя</label>
                    <input
                      style={inputStyle}
                      type="text"
                      placeholder="Как вас зовут?"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-medium mb-1.5 ml-1" style={{ color: "#9a7860" }}>Номер телефона</label>
                    <input
                      style={inputStyle}
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-medium mb-1.5 ml-1" style={{ color: "#9a7860" }}>Немного о себе</label>
                    <textarea
                      style={{ ...inputStyle, resize: "none" } as React.CSSProperties}
                      rows={3}
                      placeholder="С чем хотите разобраться? Что беспокоит?"
                      value={about}
                      onChange={e => setAbout(e.target.value)}
                      required
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-3.5 rounded-[16px] text-[15px] font-semibold text-white mt-1"
                    style={{
                      background: "linear-gradient(135deg, #c8956a, #d4a06a)",
                      boxShadow: "0 4px 20px rgba(180, 120, 60, 0.3)",
                    }}
                  >
                    Отправить заявку
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}