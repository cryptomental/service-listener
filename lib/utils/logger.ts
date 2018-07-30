const NODE_ENV = process.env.NODE_ENV || "development"

export default {
  error(...args) {
    if(console) {
      console.error(...args)
    }
  },

  log(...args) {
    if(console && NODE_ENV === "development") {
      console.log(...args)
    }
  },

  warn(...args) {
    if(console) {
      console.warn(...args)
    }
  }
}
