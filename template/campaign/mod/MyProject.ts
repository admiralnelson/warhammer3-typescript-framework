namespace ProjectName {

    export const VERSION = 1

    export class YourEntryPoint {

        private Init(): void {
            console.log("Hello world, I'm compiled from Typescript project!");            
        }

        constructor() {
            OnCampaignStart( () => this.Init() )
        }
    }
    
    new YourEntryPoint()
}