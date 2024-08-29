class TimeLimitedCache {
  temp = new Map()

  set(key, value, duration) {
      const exists = this.temp.get(key)
      if(exists) {
          clearTimeout(exists.timeoutId)
      }
      const timeoutId = setTimeout(() => {
          this.temp.delete(key)
      }, duration)
      this.temp.set(key, {value, timeoutId})
      return Boolean(exists)
  }

  get(key) {
      if(this.temp.has(key)) {
          return this.temp.get(key).value
      }
      return -1
  }

  count() {
      return this.temp.size
  }
};

const timeLimitedCache = new TimeLimitedCache()
console.log(timeLimitedCache.set(1, 42, 1000)) // false
console.log(timeLimitedCache.get(1)) // 42
console.log(timeLimitedCache.count()) // 1
