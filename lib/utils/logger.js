const NODE_ENV = process.env.NODE_ENV || "development"

module.exports = {
  error(...arguments) {
    if(console) {
      console.error(...arguments)
    }
  },

  log(...arguments) {
    if(console && NODE_ENV === "development") {
      console.log(...arguments)
    }
  },

  warn(...arguments) {
    if(console) {
      console.warn(...arguments)
    }
  }
}
