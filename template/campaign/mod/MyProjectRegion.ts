namespace ProjectName {

    const RegionLogger = new Logger("ProjectName RegionLogger")

    /**
     * Get a region by its region key from the campaign map.
     * @param regionKey region key from regions table
     * @returns Region object or undefined if such key was not found
     */
    export function GetRegionByKey(regionKey: string): Region | null {
        const region = cm.get_region(regionKey)
        if(region == false) {
            RegionLogger.LogError(`Region with key ${regionKey} not found`)
            return null
        }

        return new Region(region)
    }

    /**
     * Get a province by its province key from the campaign map.
     * @param provinceKey 
     * @returns Region object or undefined if such key was not found
     */
    export function GetProvinceByKey(provinceKey: string): Province | null {
        const province = cm.get_province(provinceKey)
        if(province == false) {
            RegionLogger.LogError(`Province with key ${provinceKey} not found`)
            return null
        }

        return new Province(province)
    }

    export function WrapIRegionObjectToRegion(region: IRegionScript): Region | null {
        const isNullInterface = region == null || region.is_null_interface()
        if(isNullInterface) {
            RegionLogger.LogError(`Region is null`)
            return null
        }

        return new Region(region)
    }

    export class Province {
        private readonly province: string

        constructor(province: IProvinceScript) {
            this.province = province.key()
        }

        /**
         * Get the province key
         */
        public get ProvinceKey(): string {
            return this.provinceInterface.key()
        }

        /**
         * Get the capital region of this province
         */
        public get CapitalRegion(): Region {
            return new Region(this.provinceInterface.capital_region())
        }

        /**
         * Get the owning faction of this province 
         * @returns Faction object or null if the province is not owned by any faction or multiple factions
         */
        public get Faction(): Faction | null {
            const factionInterface = cm.get_owner_of_province(this.provinceInterface)

            if(!factionInterface) {
                return null
            }

            return WrapIFactionScriptToFaction(factionInterface)!
        }

        /**
         * Get Regions in this province
         */
        public get Regions(): Region[] {
            const regions = this.provinceInterface.regions()
            const wrappedRegions: Region[] = []
            for (let index = 0; index < regions.num_items(); index++) {
                const element = regions.item_at(index)
                wrappedRegions.push(WrapIRegionObjectToRegion(element)!)
            }

            return wrappedRegions
        }

        public get provinceInterface(): IProvinceScript {
            const province = cm.get_province(this.province)
            if(!province) {
                throw new Error(`Province with key ${this.province} not found. This should never happened!`)
            }

            return province
        }

        /**
         * Is this province equal to another province  
         * Do not use == operator to compare two provinces, as the wrapped object is different than its internal interface
         * @param otherProvince 
         * @returns 
         */
        public IsEqual(otherProvince: Province): boolean {
            return this.provinceInterface == otherProvince.provinceInterface
        }
    }

    export class Region {
        
        private readonly region: string

        /**
         * Wrap IRegionScript object into Region object so you can manipulate and query this region with OOP style
         * @param region 
         */
        constructor(region: IRegionScript) {
            this.region = region.name()
        }

        /**
         * Checks if a specific building slot type exists in the region
         * @param buildingKey The building slot type to check
         * @returns boolean indicating if the slot type exists
         */
        public IsBuildingExists(buildingKey: string): boolean {
            return this.regionInterface.building_exists(buildingKey)
        }

        /**
         * Is it abandoned?
         * @returns boolean 
         */
        public IsAbandoned(): boolean {
            return this.regionInterface.is_abandoned()
        }

        /**
         * Is it under siege?
         * @returns boolean 
         */
        public IsUnderSiege(): boolean {
            const garrison = this.regionInterface.garrison_residence()
            return garrison.is_under_siege()
        }

        /**
         * Adjacent regions to this region
         * @returns 
         */
        public AdjacentRegions(): Region[] {
            const adjacentRegions = this.regionInterface.adjacent_region_list()
            const wrappedRegions: Region[] = []
            for (let index = 0; index < adjacentRegions.num_items(); index++) {
                const element = adjacentRegions.item_at(index)
                wrappedRegions.push(WrapIRegionObjectToRegion(element)!)
            }

            return wrappedRegions
        }

        /**
         * Get public order
         */
        public get PublicOrder(): number {
            return this.regionInterface.public_order()
        }

        /**
         * Get the province name
         */
        public get Province(): Province {
            return new Province(this.regionInterface.province())
        }

        /**
         * Get the owning faction of this region
         */
        public get Faction(): Faction | null {
            const faction = this.regionInterface.owning_faction()
            const isFactionNullInterface = faction.is_null_interface()
            if(isFactionNullInterface) {
                return null
            }

            return WrapIFactionScriptToFaction(faction)!
        }

        /**
         * Get the region's gdp (total income)
         */
        public get Gdp(): number {
            const gdp = this.regionInterface.gdp()
            return gdp
        }

        /**
         * Get the region key
         */
        public get RegionKey(): string {
            return this.regionInterface.name()  
        }

        
        /**
         * Get the characters in this region
         */
        public get Characters(): Character[] {
            const characters = this.regionInterface.characters_in_region()
            const wrappedCharacters: Character[] = []
            for (let index = 0; index < characters.num_items(); index++) {
                const element = characters.item_at(index)
                wrappedCharacters.push(WrapICharacterObjectToCharacter(element)!)
            }

            return wrappedCharacters
        }

        public get regionInterface(): IRegionScript {
            const region = cm.get_region(this.region)
            if(!region) {
                throw new Error(`Region with key ${this.region} not found. This should never happened!`)
            }

            return region
        }

        /**
         * Check if this region is equal to another region  
         * Do not use == operator to compare two regions, as the wrapped object is different than its internal interface
         * @param otherRegion 
         * @returns 
         */
        public IsEqual(otherRegion: Region): boolean {
            return this.regionInterface == otherRegion.regionInterface
        }
    }
}