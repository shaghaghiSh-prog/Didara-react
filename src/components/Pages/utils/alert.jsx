// "use client"

// import { useState, useEffect } from "react"

// const Alert = ({ message, type = "info", onClose }) => {
//   const [progress, setProgress] = useState(0)

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setProgress((oldProgress) => {
//         if (oldProgress === 100) {
//           clearInterval(timer)
//           return 100
//         }
//         return oldProgress + 2 // 2% every 100ms for 5 seconds
//       })
//     }, 100)

//     return () => {
//       clearInterval(timer)
//     }
//   }, [])

//   const getAlertColor = () => {
//     switch (type) {
//       case "success":
//         return "bg-green-100 border-green-500 text-green-700"
//       case "error":
//         return "bg-red-100 border-red-500 text-red-700"
//       case "warning":
//         return "bg-yellow-100 border-yellow-500 text-yellow-700"
//       default:
//         return "bg-blue-100 border-blue-500 text-blue-700"
//     }
//   }

//   const getProgressColor = () => {
//     switch (type) {
//       case "success":
//         return "bg-green-500"
//       case "error":
//         return "bg-red-500"
//       case "warning":
//         return "bg-yellow-500"
//       default:
//         return "bg-blue-500"
//     }
//   }

//   return (
//     <div  style={{ zIndex: 999999999999999999 }} className={`fixed top-4 flex  mt-2 right-4 w-80 border-l-4 p-4 rounded shadow-lg ${getAlertColor()} `}>
//       <div className="flex justify-between items-center mb-2">
//         <strong className="font-bold">{type.charAt(0).toUpperCase() + type.slice(1)}</strong>
//         <button onClick={onClose} className="text-lg font-semibold">
//           &times;
//         </button>
//       </div>
//       <p>{message}</p>
//       <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
//         <div className={`h-1.5 rounded-full ${getProgressColor()}`} style={{ width: `${progress}%` }}></div>
//       </div>
//     </div>
//   )
// }

// export default Alert





"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const Alert = ({ message, type = "info", style }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer)
          return 100
        }
        return oldProgress + 57.5 // 2% every 100ms for 5 seconds
      })
    }, 650)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const getAlertColor = () => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-500 text-green-700"
      case "error":
        return "bg-red-50 border-red-500 text-red-700"
      case "warning":
        return "bg-yellow-50 border-yellow-500 text-yellow-700"
      default:
        return "bg-blue-50 border-blue-500 text-blue-700"
    }
  }

  const getProgressColor = () => {
    switch (type) {
      case "success":
        return "bg-green-500"
      case "error":
        return "bg-red-500"
      case "warning":
        return "bg-yellow-500"
      default:
        return "bg-blue-500"
    }
  }

  const getIcon = () => {
    switch (type) {
      case "success":
        return (
          <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        )
      case "error":
        return (
          <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        )
      case "warning":
        return (
          <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        )
      default:
        return (
          <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        )
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.3 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
        className={`w-96 border-l-4 p-4 rounded-md shadow-lg ${getAlertColor()} flex items-start`}
        style={style}
      >
        <div className="flex-shrink-0">{getIcon()}</div>
        <div className="ml-3 w-full">
          <p className="text-sm font-medium">{message}</p>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
            <motion.div
              className={`h-1.5 rounded-full ${getProgressColor()}`}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 5, ease: "linear" }}
            />
          </div>
        </div>
        
      </motion.div>
    </AnimatePresence>
  )
}

export default Alert

