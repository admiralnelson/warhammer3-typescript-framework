namespace ProjectName {
    export class Logger {

        private _name: string = ""
    
        constructor(name: string) { this._name = name }
    
        /**
         * log into output stream
         * @param s message
         * @param showName prints the name associated to this log (defaults true)
         */
        public Log(s: string, showName: boolean = true): void {
             showName ? out(`${this._name}: ${s}`) : out(s) 
        }
    
        /**
         * log into output stream with WARNING prefix,  
         * if the game is launched from SNED Loader, it will be highlighted yellow
         * @param s message
         * @param showName prints the name associated to this log (defaults true)
         */
        public LogWarn(s: string, showName: boolean = true): void
        {
            if(PrintWarning != null) {
                (showName) ? PrintWarning(`${this._name}: ${s}\n`) : PrintWarning(`${s}\n`)
            } else {
                (showName) ? out(`${this._name} WARNING :${s}`) : out(`WARNING: ${s}`)
            } 
        }
    
         /**
         * log into output stream with ERROR prefix,  
         * if the game is launched from SNED Loader, it will be highlighted red
         * @param s message
         * @param showTraceback prints the trackback up to this error statement (defaults true)
         * @param showName prints the name associated to this log (defaults true)
         */
        public LogError(s: string, showTraceback: boolean = true, showName: boolean = true): void
        {
            const traceback = debug.traceback("", 2)
            if(PrintError != null) {
                (showName) ? PrintError(`${this._name}: ${s}\n`) : PrintError(`${s}\n`)
            } else {
                (showName) ? out(`${this._name} ERROR: ${s}`) : out(`ERROR: ${s}`)
            }
            if(showTraceback) {
                this.LogWarn("================\n")
                this.LogWarn(`${traceback} \n`)
                this.LogWarn("================\n")
            }            
        }    
    }
}