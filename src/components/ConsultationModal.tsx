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
    background: "rgba(255, 255, 255, 0.7)",
    border: "1px solid rgba(200, 200, 220, 0.5)",
    boxShadow: "inset 0 1px 3px rgba(0,0,0,0.04)",
    color: "#1a1a2e",
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
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed z-50 left-1/2 bottom-0 w-full max-w-[420px]"
            style={{ transform: "translateX(-50%)" }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(40px) saturate(180%)",
                borderRadius: "28px 28px 0 0",
                boxShadow: "0 -8px 40px rgba(0,0,0,0.12)",
                padding: "28px 24px 40px",
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[18px] font-semibold text-gray-800">Записаться на консультацию</h2>
                <button
                  onClick={handleClose}
                  className="flex items-center justify-center w-8 h-8 rounded-full text-gray-500 hover:text-gray-700 transition-colors"
                  style={{ background: "rgba(0,0,0,0.06)" }}
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
                  <p className="text-[17px] font-semibold text-gray-800 mb-2">Заявка отправлена!</p>
                  <p className="text-[14px] text-gray-500">Гульсина свяжется с вами в ближайшее время</p>
                  <button
                    onClick={handleClose}
                    className="mt-6 px-6 py-2.5 rounded-xl text-[14px] font-medium text-gray-700 transition-colors"
                    style={{ background: "rgba(0,0,0,0.07)" }}
                  >
                    Закрыть
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-[12px] font-medium text-gray-500 mb-1.5 ml-1">Ваше имя</label>
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
                    <label className="block text-[12px] font-medium text-gray-500 mb-1.5 ml-1">Номер телефона</label>
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
                    <label className="block text-[12px] font-medium text-gray-500 mb-1.5 ml-1">Немного о себе</label>
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
                      background: "linear-gradient(135deg, #9333ea, #ec4899)",
                      boxShadow: "0 4px 20px rgba(147, 51, 234, 0.3)",
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