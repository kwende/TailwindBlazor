"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"

interface Toast {
  id: string
  title: string
  description?: string
  duration?: number
}

interface ToastContextType {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, "id">) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = ({ title, description, duration = 3000 }: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, title, description, duration }])
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div className="fixed bottom-0 right-0 p-4 space-y-2 z-50">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, toast.duration)

    return () => clearTimeout(timer)
  }, [toast.duration, onClose])

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-md animate-slide-up border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-gray-900 dark:text-gray-100">{toast.title}</h3>
          {toast.description && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{toast.description}</p>}
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
          ×
        </button>
      </div>
    </div>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

export const toast = {
  success: (props: { title: string; description?: string }) => {
    const context = useContext(ToastContext)
    if (context) {
      context.addToast(props)
    }
  },
  error: (props: { title: string; description?: string }) => {
    const context = useContext(ToastContext)
    if (context) {
      context.addToast(props)
    }
  },
  info: (props: { title: string; description?: string }) => {
    const context = useContext(ToastContext)
    if (context) {
      context.addToast(props)
    }
  },
  warning: (props: { title: string; description?: string }) => {
    const context = useContext(ToastContext)
    if (context) {
      context.addToast(props)
    }
  },
  // Generic toast function
  ...(props: { title: string; description?: string }) => {
    const context = useContext(ToastContext)
    if (context) {
      context.addToast(props)
    }
  },
}

