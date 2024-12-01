namespace MyProject {
    export class Date {

        private timestamp: number

        constructor() {
            // Lua's os.time() returns the current time in seconds since the Unix epoch
            this.timestamp = os.time()
        }
    
        public static now(): Date {
            return new Date()
        }
    
        public getFullYear(): number {
            // Lua's os.date("*t", timestamp).year returns the year of the timestamp
            return os.date("*t", this.timestamp).year
        }
    
        public getMonth(): number {
            // Lua's os.date("*t", timestamp).month returns the month of the timestamp
            return os.date("*t", this.timestamp).month
        }
    
        public getDate(): number {
            // Lua's os.date("*t", timestamp).day returns the day of the timestamp
            return os.date("*t", this.timestamp).day
        }

        public getDay(): number {
            // Lua's os.date("*t", timestamp).wday returns the day of the week of the timestamp
            return os.date("*t", this.timestamp).wday
        }
    
        public getHours(): number {
            // Lua's os.date("*t", timestamp).hour returns the hour of the timestamp
            return os.date("*t", this.timestamp).hour
        }
    
        public getMinutes(): number {
            // Lua's os.date("*t", timestamp).min returns the minutes of the timestamp
            return os.date("*t", this.timestamp).min
        }
    
        public getSeconds(): number {
            // Lua's os.date("*t", timestamp).sec returns the seconds of the timestamp
            return os.date("*t", this.timestamp).sec
        }

        public getMilliseconds(): number {
            // Lua's os.clock() returns the amount of seconds of CPU time used by the program,
            // multiply by 1000 to get milliseconds
            return os.clock() * 1000
        }

        public toString(): string {
            // Lua's os.date("%c", timestamp) returns a string representation of the date and time
            return os.date("%c", this.timestamp)
        }

        public toDateString(): string {
            // Lua's os.date("%x", timestamp) returns a string representation of the date
            return os.date("%x", this.timestamp)
        }
    
        public toTimeString(): string {
            // Lua's os.date("%X", timestamp) returns a string representation of the time
            return os.date("%X", this.timestamp)
        }
    
        public getTime(): number {
            // Lua's os.time() returns the current time in seconds since the Unix epoch
            // Multiply by 1000 to convert to milliseconds
            return this.timestamp * 1000
        }

        public valueOf(): number {
            return this.timestamp * 1000
        }

        public setTime(time: number): number {
            this.timestamp = time / 1000  // Convert milliseconds to seconds
            return this.getTime()
        }
    
        public setMilliseconds(ms: number): number {
            // Lua doesn't have a built-in way to set milliseconds,
            // so we use os.clock and assume the system clock is set to local time
            this.timestamp = os.time() + ms / 1000  // Convert milliseconds to seconds
            return this.getMilliseconds()
        }

        public setSeconds(sec: number, ms?: number): number {
            const dateTable = os.date("*t", this.timestamp)
            dateTable.sec = sec
            if (ms != null) {
                dateTable.sec = dateTable.sec + ms / 1000  // Convert milliseconds to seconds
            }
            this.timestamp = os.time(dateTable)
            return this.getSeconds()
        }
    
        public setMinutes(min: number, sec?: number, ms?: number): number {
            const dateTable = os.date("*t", this.timestamp)
            dateTable.min = min
            if (sec != null) {
                dateTable.sec = sec
            }
            if (ms != null) {
                dateTable.sec = dateTable.sec + ms / 1000  // Convert milliseconds to seconds
            }
            this.timestamp = os.time(dateTable)
            return this.getMinutes()
        }
    
        public setHours(hours: number, min?: number, sec?: number, ms?: number): number {
            const dateTable = os.date("*t", this.timestamp)
            dateTable.hour = hours
            if (min != null) {
                dateTable.min = min
            }
            if (sec != null) {
                dateTable.sec = sec
            }
            if (ms != null) {
                dateTable.sec = dateTable.sec + ms / 1000  // Convert milliseconds to seconds
            }
            this.timestamp = os.time(dateTable)
            return this.getHours()
        }
    
        public setDate(date: number): number {
            const dateTable = os.date("*t", this.timestamp)
            dateTable.day = date
            this.timestamp = os.time(dateTable)
            return this.getDate()
        }

        public setMonth(month: number, date?: number): number {
            const dateTable = os.date("*t", this.timestamp)
            dateTable.month = month + 1  // Lua's months are 1-based
            if (date != null) {
                dateTable.day = date
            }
            this.timestamp = os.time(dateTable)
            return this.getMonth()
        }
    
        public setFullYear(year: number, month?: number, date?: number): number {
            const dateTable = os.date("*t", this.timestamp)
            dateTable.year = year
            if (month != null) {
                dateTable.month = month + 1  // Lua's months are 1-based
            }
            if (date != null) {
                dateTable.day = date
            }
            this.timestamp = os.time(dateTable)
            return this.getFullYear()
        }
    
        public toISOString(): string {
            // Lua's os.date("!%Y-%m-%dT%H:%M:%S", timestamp) returns a string in ISO 8601 format
            return os.date("!%Y-%m-%dT%H:%M:%S", this.timestamp)
        }
    
        public toJSON(key?: any): string {
            // Use the built-in JSON.stringify function to convert the Date object to a JSON string
            return JSON.stringify(this.toISOString())
        }

    }
}