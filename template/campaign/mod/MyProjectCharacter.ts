namespace ProjectName {

    const CharacterLogger = new Logger("ProjectName CharacterLogger")

    type CharacterCreationOptions = {
        characterObject?: ICharacterScript
        factionKey?: string
        agentSubtypeKey?: string
        forename?: string
        familyName?: string
        agentType?: string
        spawnAsAgent?: boolean
        setAsFactionLeader?: boolean
        regionKey?: string
        suppressLog?: boolean
        onFailed?: VoidCallback
    }
    type CallbackLordCreated = { 
        (theLordHimself: Lord, reason?: "CreateFromKey" | "WrappingExistingObject"): void
    }
    type CallbackChampionCreated = { 
        (theChampionHimself: Champion, reason?: "CreateFromKey" | "WrappingExistingObject"): void
    }

    class TraitData {
        traitKey: string = ""
        traitLevel: number = 0
        traitPoints: number = 0
    }

    /**
     * Convert a CQI into Character
     * @param cqiNo characther command queue index number
     * @returns Character, null if cqiNo is invalid
     */
    export function FindCharacter(cqiNo: number): Character | null {
        const characterObject = cm.get_character_by_cqi(cqiNo)
        if(characterObject == false) return null
        return new Character({characterObject: characterObject})
    }

    /**
     * Converts ICharacterScript into Character
     * @param characterObject 
     * @returns Character
     */
    export function WrapICharacterObjectToCharacter(characterObject: ICharacterScript): Character {
        return new Character({characterObject: characterObject})
    }

    /**
     * Converts ICharacterListScript into Array of Character
     * @param characterListObject 
     * @returns 
     */
    export function WrapICharacterObjectListToCharacterArray(characterListObject: ICharacterListScript): Character[] {
        const ret = []
        for (let i = 0; i < characterListObject.num_items(); i++) {
            ret.push(WrapICharacterObjectToCharacter(characterListObject.item_at(i)))            
        }
        return ret
    }

    /**
     * Attempt to cast Character into a Champion
     * @param character character to cast
     * @returns A Champion or null if cast is failed
     */
    export function TryCastCharacterToChampion(character: Character): Champion | null {
        if(!character.IsValid()) return null
        try {
            const ret = new Champion({characterObject: character.GetInternalInterface(), suppressLog: true})
            return ret
        } catch {            
            return null
        }
    }

    /**
     * Attempt to cast Character into a Lord
     * @param character A Lord or null if cast is failed
     */
    export function TryCastCharacterToLord(character: Character): Lord | null {
        if(!character.IsValid()) return null
        try {
            const ret = new Lord({characterObject: character.GetInternalInterface(), suppressLog: true}) 
            return ret
        } catch {
            return null
        }
    }

    /**
     * ICharacterScript wrapper. It allows you to query and manipulate your lords and heroes in OOP style rather than relying cm APIs
     */
    export class Character {
        protected CommanQueueNumberID = -1
        /**
         * Not recommended to instantiate this directly. Use `FindCharacter` or `WrapICharacterObjectToCharacter` function instead. 
         * Or use `Lord` or `Champion` class instead.
         * @param options To wrap existing `ICharacterScript` object fill `option.characterObject`. 
         * To create new Character for general/lord from scratch, fill these fields: `option.agentSubtypeKey`, `options.factionKey`, `options.regionKey`
         * To spawn agent, fill the same fields as above and fill these too `options.spawnAsAgent`, `options.agentType`  
         * `onFailed` will be called if failed to spawn  (only when creating/spawning Agent from agentkey)  
         * @throws if characterObject is a INullScript
         * @returns Wrapped ICharacterScript inside Character
         */
        constructor(options: CharacterCreationOptions) {
            if(options.characterObject) {
                if(options.characterObject.is_null_interface()) {
                    if(!options.suppressLog) CharacterLogger.LogError(`options.characterObject is a INullScript!`)
                    throw(`options.characterObject is a INullScript!`)
                }
                this.CommanQueueNumberID = options.characterObject.command_queue_index()
                return
            }
            if(options.agentSubtypeKey) {
                if(options.factionKey) {
                    const checkFaction = cm.model().world().faction_by_key(options.factionKey)
                    if(checkFaction.is_null_interface()) {
                        if(!options.suppressLog) CharacterLogger.LogError(`invalid faction key "${options.factionKey}"`)
                        throw(`invalid faction key "${options.factionKey}"`)
                    }
                }
                if(options.regionKey) {
                    const checkRegtion = cm.model().world().region_manager().region_by_key(options.regionKey)
                    if(checkRegtion.is_null_interface()) {
                        if(!options.suppressLog) CharacterLogger.LogError(`invalid region key "${options.regionKey}"`)
                        throw(`invalid region key "${options.regionKey}"`)
                    }
                }

                if(options.regionKey == null) {
                    if(!options.suppressLog) CharacterLogger.LogError(`can't spawn lord/agent, options.factionKey was null`)
                    throw(`can't spawn lord/agent, options.factionKey was null`)
                }
                if(options.factionKey == null) {
                    if(!options.suppressLog) CharacterLogger.LogError(`can't spawn lord/agent, options.factionKey was null`)
                    throw(`can't spawn lord/agent, options.factionKey was null`)
                }

                const factionKey = options.factionKey

                //check if lord successfully spawned, otherwise tell an error
                const traceback = debug.traceback("", 2)
                const throwErrorLatent = setTimeout(()=> {
                    CharacterLogger.LogError(`failed to spawn character ${options.agentSubtypeKey}`, false)
                    CharacterLogger.LogWarn(`previous tracebacks: \n${traceback}`)
                    if(options.onFailed) options.onFailed()
                }, 200)
                //if the character did spawn make sure to store it into internal variable this.characterObj
                core.add_listener(
                    `create agent ${options.agentSubtypeKey} ${RandomString()}`,
                    "CharacterRecruited",
                    (context) => {
                        const theChar = context.character ? context.character() : null
                        if(theChar == null) return false
    
                        return theChar.character_subtype_key() == options.agentSubtypeKey
                    },
                    (context) => {
                        const theChar = context.character ? context.character() : null
                        if(theChar == null) return
                        this.CommanQueueNumberID = theChar.command_queue_index()                        
                        clearInterval(throwErrorLatent)
                    }, 
                    false
                )
                if(options.spawnAsAgent) {
                    if(options.agentType == null || options.agentType == "") {
                        if(!options.suppressLog) CharacterLogger.Log(`can't spawn agent, options.agentType was null`)
                        throw(`can't spawn agent, options.agentType was null`)
                    }
                    const theFaction = cm.model().world().faction_by_key(factionKey)
                    const agentType = options.agentType
                    const [x, y] = cm.find_valid_spawn_location_for_character_from_settlement(factionKey, options.regionKey, false, true)
                    cm.spawn_agent_at_position(theFaction, x, y, agentType, options.agentSubtypeKey)
                    return
                }

                if(options.forename == null || options.forename == "") CharacterLogger.LogWarn(`options.forename was empty for ${options.agentSubtypeKey}`)
                
                const [x, y] = cm.find_valid_spawn_location_for_character_from_settlement(options.factionKey, options.regionKey, false, true)
                cm.create_force_with_general(
                    options.factionKey, 
                    "", 
                    options.regionKey,
                    x, y, 
                    "general", 
                    options.agentSubtypeKey, 
                    options.forename ?? "", 
                    "", 
                    options.familyName ?? "", 
                    "", 
                    options.setAsFactionLeader ?? false, 
                    (cqi) => { CharacterLogger.Log(`spawned lord ${cqi}`) }, 
                    false
                )
                return
            }

        }

        /**
         * Forceably adds a skill to this character. 
         * @param skillKey Skill key to add from skill tables
         */
        public AddSkill(skillKey: string) {
            cm.add_skill(cm.char_lookup_str(this.GetInternalInterface()), skillKey)
        }

        /**
         * Add new trait for this character
         * @param traitKey Trait key from db
         * @param showNotification Show notification "trait gained" in event panel
         * @param level set trait level
         */
        public AddTrait(traitKey: string, showNotification: boolean = true, level: number = 1,) {
            cm.force_add_trait(cm.char_lookup_str(this.GetInternalInterface()), traitKey, showNotification, level)
        }

        /**
         * Remove trait from this character
         * @param traitKey Trait key from db
         */
        public RemoveTrait(traitKey: string) {
            cm.force_remove_trait(cm.char_lookup_str(this.GetInternalInterface()), traitKey)
        }

        /**
         * Change the model appearance of this character
         * @param campaignArtSetKey art sed id from campaign_character_art_sets_tables table
         */
        public ChangeModelAppearance(campaignArtSetKey: string) {
            //cm.add_character_model_override(this.GetInternalInterface(), campaignArtSetKey)
            cm.add_unit_model_overrides(cm.char_lookup_str(this.CqiNo), campaignArtSetKey)
        }

        /**
         * Get the character thumbnail/2d porthole filename
         */
        public get ThumbnailFileName(): string {
            const ccoFaction = cco(`CcoCampaignFaction`, this.FactionKey)
            if(ccoFaction == null) return ``
            const characterListLength = ccoFaction.Call(`CharacterList.Size`)
            if(characterListLength == null) return ``
            const characterListLengthNum = characterListLength as number
            for (let i = 0; i < characterListLengthNum; i++) {
                const characterCqi = ccoFaction.Call(`CharacterList[${i}].CQI`) as number
                if(characterCqi == this.CqiNo) {
                    return ccoFaction.Call(`CharacterList[${i}].PortraitPath`) as string
                }
            }
            return ``
        }

        /**
         * Replaces the underlying Character interface
         * @param newLord 
         */
        public SetInternalInterface(newLord: ICharacterScript) {
            this.CommanQueueNumberID = newLord.command_queue_index()
        }

        /**
         * Gets the underlying Character interface
         * @throws an exception if internal characterObj is null or if it's not valid
         * @returns ICharacterScript
         */
        public GetInternalInterface(): ICharacterScript {
            if(this.CommanQueueNumberID == -1) {
                CharacterLogger.LogError(`this.CommanQueueNumberID is -1, maybe it was not created? check console logs`)
                throw(`this.CommanQueueNumberID is -1, maybe it was not created? check console logs`)
            }
            if(!this.IsValid()) {
                CharacterLogger.LogError(`this.CommanQueueNumberID is INullScript, maybe it was killed? check console logs`)
                throw(`this.characterObj is INullScript, maybe it was killed? check console logs`)
            }
            if(cm.get_character_by_cqi(this.CommanQueueNumberID) != false)                
                return cm.get_character_by_cqi(this.CommanQueueNumberID) as ICharacterScript       
            else
                throw `unreachable statement`
        }

        /** gets the faction that belongs to this character, wrapped in Faction object */
        public get Faction(): Faction {
            const faction = GetFactionByKey(this.GetFactionInterface().name())
            if(faction == null) {
                CharacterLogger.LogError(`faction of this character returns null! something horribly went wrong in the game engine!`)
                throw(`faction of this character returns null! something horribly went wrong in the game engine!`)
            }
            return faction
        }

        /**
         * Trigger faction incident associated with this characther
         * @param incidentKey incident key from Incident table
         */
        public TriggerIncident(incidentKey: string): void {
            const charCqi = this.CqiNo
            cm.trigger_incident_with_targets(this.GetFactionInterface().command_queue_index(), incidentKey, 0, 0, charCqi, 0, 0, 0)
        }

        /**
         * Renames this character (localised)
         * @param forename Localised forename key, in the `[table]_[key]_[field]` format. example: `"names_name_1053468021"`
         * @param surname  Localised surname key, in the `[table]_[key]_[field]` format.
         * @param clanname Localised clan name key, in the `[table]_[key]_[field]` format.
         * @param othername Localised other name key, in the `[table]_[key]_[field]` format.
         */
        public RenameLocalised(forename: string, surname: string = "", clanname: string = "", othername: string = "") {
            cm.change_character_localised_name(this.GetInternalInterface(), forename, surname, clanname, othername)
        }

        /**
         * Gets faction interface from the internally referenced ICharacterScript
         * @returns IFactionScript
         */
        public GetFactionInterface() : IFactionScript {
            return this.GetInternalInterface().faction()
        }

        /** gets all anciliaries equipped by this character, it uses CcoCampaignFaction API to queries it */
        public get AnciliaryKeys(): string[] {
            const ccoFaction = cco(`CcoCampaignFaction`, this.FactionKey)
            if(ccoFaction == null) return []
            const characterListLength = ccoFaction.Call(`CharacterList.Size`) as number
            if(characterListLength == null) return []
            for (let i = 0; i < characterListLength; i++) {
                const characterCqi = ccoFaction.Call(`CharacterList[${i}].CQI`) as number
                if(characterCqi == this.CqiNo) {
                    const anciliariesLen = ccoFaction.Call(`CharacterList[${i}].AncillaryList.Size`) as number 
                    if(anciliariesLen == null) return []                    
                    const result = []
                    for (let j = 0; j < anciliariesLen; j++) {
                        const anciliaryKey = ccoFaction.Call(`CharacterList[${i}].AncillaryList[${j}].AncillaryRecordContext.Key`) as string
                        if(anciliaryKey != null) result.push(anciliaryKey)
                    }
                    return result
                }                
            }
            return []
        }

        /**
         * Implement Daniel's Armory system to this character (if your character has a mount, it won't work properly in battle **(IF the mount type is `war_beast`)**)
         * @param itemSetKey item set key in armory_item_sets
         * @param equipDefault Equips a default variant of each armory item (if one exists) if the target slot on the character is empty. Armory item variants are defined in the armory_item_variants database table.
         * @param clearConflictingItem Unequips any conflicting items when each item is equipped.
         * @returns any item was successfully equipped
         */
        public AddArmoryItemSet(itemSetKey: string, equipDefault: boolean = false, clearConflictingItem: boolean = false): boolean {
            return cm.add_armory_item_set_to_character(this.GetInternalInterface(), itemSetKey, equipDefault, clearConflictingItem)
        }

        /**
        * Adds an armory item to a character.
        * @param itemKey Key for armory item to equip, from the `armory_items` database table.
        * @param equipDefault Equips a default variant of the armory item (if one exists) if the target slot on the character is empty. Armory item variants are defined in the `armory_item_variants` database table.
        * @param clearConflictingItem Unequips any conflicting items when this item is equipped.
        * @returns item was successfully equipped
        */
        public AddArmoryItem(itemKey: string, equipDefault: boolean = false, clearConflictingItem: boolean = false) {
            return cm.add_armory_item_to_character(this.GetInternalInterface(), itemKey, equipDefault, clearConflictingItem)
        }

        /**
         * (getter) Was the character in the winning alliance in a battle?
         */
        public get IsRecentlyWonBattle(): boolean {
            return this.GetInternalInterface().won_battle()
        }

        /** (getter) Character is at sea? */
        public get IsAtSea(): boolean {
            return this.GetInternalInterface().is_at_sea()
        }

        /** gets all characters in a military force IF this character is IN military force, otherwise an empty array is returned */
        public get AllCharactersInMilitaryForce(): Character[] {
            if(!this.IsInMilitaryForce) return []
            return WrapICharacterObjectListToCharacterArray(this.GetInternalInterface().military_force().character_list())
        }
        
        /**
         * (getter) gets all traits assigned to this character
         */
        public get Traits(): TraitData[] {
            const traitKeys = this.GetInternalInterface().all_traits()
            const result = []
            for (const trait of traitKeys) {
                const data = new TraitData
                data.traitKey = trait
                data.traitLevel = this.GetTraitLevel(trait)
                data.traitPoints = this.GetTraitPoints(trait)
                result.push(data)
            }
            return result
        }

        /** Returns true if the character in military force */
        public get IsInMilitaryForce(): boolean {
            return this.GetInternalInterface().has_military_force()
        }

        /** (Getter) Forename key */
        public get RawForename(): string {
            return this.GetInternalInterface().get_forename()
        }

        /** (Getter) Surename key */
        public get RawSurename(): string {
            return this.GetInternalInterface().get_surname()
        }
        
        /** (Getter) Localised Fullname */
        public get LocalisedFullName(): string {
            return `${this.LocalisedForename} ${this.LocalisedSurename}`
        }

        /** (Getter) Localised Forename */
        public get LocalisedForename(): string {
            return common.get_localised_string(this.RawForename)
        }

        /** (Getter) Localised Surename */
        public get LocalisedSurename(): string {
            return common.get_localised_string(this.RawSurename)
        }

        /** (Getter) AgentSubtype key */
        public get SubtypeKey() : string {
            return this.GetInternalInterface().character_subtype_key()
        }

        /** (Getter) Faction key */
        public get FactionKey(): string {
            return this.GetFactionInterface().name()
        }

        /** (Getter) Command queue index number */
        public get CqiNo() : number {
            return this.CommanQueueNumberID
        }

        /** (Getter) is the character in valid region? */
        public get IsInRegion(): boolean {
            return this.GetInternalInterface().has_region()
        }

        /**
         * Returns true if the character is a general and has an army, false otherwise.
         */
        public get IsGeneralAndHasArmy(): boolean {
            return cm.char_is_general_with_army(this.GetInternalInterface())
        }

        /** (Getter) get character region key */
        public get CurrentRegionKey(): string {
            if(!this.IsInRegion) return ""
            return this.GetInternalInterface().region().name()
        }

        /** (getter) has this character won in recent battle? */
        public get WasWinningBefore(): boolean {
            return this.GetInternalInterface().won_battle()
        }

        /**
         * Check if internally referenced character is not null and it is not INullScript
         * @returns 
         */
        public IsValid(): boolean {
            return !isNaN(this.CqiNo) && this.CqiNo != -1 && cm.get_character_by_cqi(this.CqiNo) != false
        }

        /**
         * Check if this character has a skill
         * @param skillKey skill key from skill tables
         * @returns 
         */
        public HasSkill(skillKey: string): boolean {
            return this.GetInternalInterface().has_skill(skillKey)
        }
        
        /**
         * Check if this character has a trait
         * @param traitKey trait key from trait tables
         * @returns 
         */
        public HasTrait(traitKey: string): boolean {
            return this.GetInternalInterface().has_trait(traitKey)
        }

        /**
         * Check if this character has an ancillary
         * @param anciliaryKey ancillary key from ancillary tables
         * @returns 
         */
        public HasAncillary(anciliaryKey: string): boolean {
            return this.GetInternalInterface().has_ancillary(anciliaryKey)
        }

        /**
         * Gets character trait level, if it's not found it will return -1
         * @param traitKey trait key from trait tables
         * @returns 
         */
        public GetTraitLevel(traitKey: string): number {
            return this.GetInternalInterface().trait_level(traitKey)
        }

        /**
         * Gets trait point (the points thing that is next to skill node in character skill tree)
         * @param traitKey trait key
         * @returns 
         */
        public GetTraitPoints(traitKey: string): number {
            return this.GetInternalInterface().trait_points(traitKey)
        }

        /**
         * Give item to this character and equips it
         * @param anciliaryKey the item key (aka anciliary) from anciliary info table
         */
        public GiveItem(anciliaryKey: string): void {
            cm.force_add_ancillary(this.GetInternalInterface(), anciliaryKey, true, false)
        }

        /**
         * Kills this character. WARNING: this can render methods of this object to be invalid!
         * @param destroyTroop destroy the troop too? (for general/lord only)
         */
        public Kill(destroyTroop: boolean = false) {
            cm.kill_character_and_commanded_unit(cm.char_lookup_str(this.GetInternalInterface()), destroyTroop)
        }

        /**
         * Rather than doing this lordA == lordB (although both instances have the same reference, the objects wrapper are still different), use this method to check if both object is equal
         * @param otherCharacter 
         * @returns 
         */
        public IsEqual(otherCharacter: Character): boolean {
            return this.CqiNo == otherCharacter.CqiNo
        }

        /**
         * Rather than doing this lordA == lordB (although both instances have the same reference, the objects wrapper are still different), use this method to check if both object is equal
         * @param otherCharacter 
         * @returns 
         */
        public HasSameInternalReferenceTo(otherCharacter: ICharacterScript): boolean {
            return this.CqiNo == otherCharacter.cqi()
        }

        /** reset movement and/or action points of this character */
        public ResetActionPoints() {
            cm.replenish_action_points(cm.char_lookup_str(this.GetInternalInterface()))
        }

        /**
         * Grant the specified ancillary to this character
         * @param anciliaryKey Grant the specified ancillary to the specified character.
         * @param forceEquip if true the ancillary will be equipped and bypass any cooldowns or pre-conditions
         * @param supressEventFeed if true no event feed events will be generated by this action
         */
        public AddAnciliary(anciliaryKey: string, forceEquip: boolean = false, supressEventFeed: boolean = true) {
            cm.force_add_ancillary(this.GetInternalInterface(), anciliaryKey, forceEquip, supressEventFeed)
        }
        
        /**
         * Remove the specified ancilliary from this character
         * @param anciliaryKey Ancillary key, from the ancillaries table.
         * @param putItBackToPool Removes the ancillary from the character but leaves it in the pool of available ancillaries.
         * @param supressEventFeed emoves the ancillary from the character but leaves it in the pool of available ancillaries.
         */
        public RemoveAnciliary(anciliaryKey: string, putItBackToPool: boolean = true, supressEventFeed: boolean = true) {
            cm.force_remove_ancillary(this.GetInternalInterface(), anciliaryKey, putItBackToPool, supressEventFeed)
        }

        /** returns the agentsubtype key of this object */
        public toString(): string {
            if(!this.IsValid()) return ""
            return this.SubtypeKey
        }
    }

    type LordCreationOptions = {
        characterObject?: ICharacterScript,
        cqi?: number,
        agentKey?: string,
        factionKey?: string,
        regionKey?: string,
        lordCreatedCallback?: CallbackLordCreated,
        suppressLog?: boolean,
        onFailed?: VoidCallback
    }

    type Troop = {
        unitKey: string,
        health: number,
        experience: number,
        bannerAncillaryKey: string,
        unitCategory: string,
        unitClass: string,
    }

    /** Inherits from Character, you can extend this class if you want to have additional methods or maybe to differentiate between Lord type */
    export class Lord extends Character {
        private lordCreatedCallback: CallbackLordCreated | undefined = undefined

        /**
         * @param options to create Lord from scratch, following attribute `agentKey`, `factionKey`, `regionKey` must be supplied to `options`. `lordCreatedCallback` is a callback when character spawned successfully   
         * if you want to wrap existing ICharacter object, fill either `characterObject` or `cqi` into `options`  
         * `onFailed` will be called if failed to spawn (only when creating/spawning Lord from agentkey)  
         * @throws if characterObject is a INullScript
         * @throws if the character is not a "general type", or the cqi inputted was invalid
         */
        constructor(options?: LordCreationOptions) {
            if(options == null) return
            if(options.agentKey && options.characterObject == null) {
                core.add_listener(
                    `create lord ${options.agentKey} ${RandomString()}`,
                    "CharacterRecruited",
                    (context) => {
                        const theChar = context.character ? context.character() : null
                        if(theChar == null) return false
    
                        return theChar.character_subtype_key() == options.agentKey
                    },
                    (context) => {
                        const theChar = context.character ? context.character() : null
                        if(theChar == null) return
                        if(this.lordCreatedCallback) this.lordCreatedCallback(this, "CreateFromKey")
                    }, 
                    false
                )
            }
            if(options.characterObject) {
                super({})
                this.CommanQueueNumberID = options.characterObject.command_queue_index()
                if(options.characterObject.is_null_interface()) {
                    if(!options.suppressLog) CharacterLogger.LogError(`options.characterObject is a INullScript!`)
                    throw(`options.characterObject is a INullScript!`)
                }
                if(!cm.char_is_general(this.GetInternalInterface())) {
                    if(!options.suppressLog) CharacterLogger.LogError(`the supplied character ${this.GetInternalInterface().character_subtype_key()} is not a type of "general"!`)
                    throw(`the supplied character ${this.GetInternalInterface().character_subtype_key()} is not a type of "general"!`)
                }
            }
            else if(options.cqi) {
                super({})
                const theChar = cm.get_character_by_cqi(options.cqi)
                if(theChar) {                    
                    this.CommanQueueNumberID = theChar.command_queue_index()
                    if(!cm.char_is_general(this.GetInternalInterface())) {
                        if(!options.suppressLog) CharacterLogger.LogError(`the supplied character ${this.GetInternalInterface().character_subtype_key()} is not a type of "general"!`)
                        throw(`the supplied character ${this.GetInternalInterface().character_subtype_key()} is not a type of "general"!`)
                    }
                }
                else {
                    if(!options.suppressLog) CharacterLogger.LogError(`this cqi ${options.cqi} is invalid cqi`)
                    throw(`this cqi ${options.cqi} is invalid cqi`)
                }

            } else {
                super({
                    characterObject: options.characterObject, 
                    factionKey: options.factionKey,
                    regionKey: options.regionKey,
                    agentSubtypeKey: options.agentKey,
                    onFailed: options.onFailed
                })
            }
            this.lordCreatedCallback = options.lordCreatedCallback
            if(options.characterObject) {
                if(this.lordCreatedCallback) this.lordCreatedCallback(this, "WrappingExistingObject")
            }
            
        }

        /**
         * Add troops for this Lord
         * @param mainUnitKey main unit keys from main unit table
         */
        public AddTroops(mainUnitKey: string[]) {
            for (const iterator of mainUnitKey) {
                cm.grant_unit_to_character(cm.char_lookup_str(this.GetInternalInterface()), iterator)
            }
        }

        /**
         * Returns troops associated with this lord
         */
        public get Troops(): Troop[] {
            if(!this.IsGeneralAndHasArmy) return []
            const forceInterface = this.GetInternalInterface().military_force()
            const unitsList = forceInterface.unit_list()
            const result = []
            for (let i = 0; i < unitsList.num_items(); i++) {
                const theTroop = unitsList.item_at(i)
                result.push({
                    unitKey: theTroop.unit_key(),
                    health: theTroop.percentage_proportion_of_full_strength(),
                    experience: theTroop.experience_level(),
                    bannerAncillaryKey: theTroop.banner_ancillary(),
                    unitCategory: theTroop.unit_category(),
                    unitClass: theTroop.unit_class(),
                })
                
            }
            return result
        }

        /**
         * Remove troops from this Lord
         * @param mainUnitKey keys from main_units table
         */
        public RemoveTroops(mainUnitKey: string[]) {
            for (const troop of mainUnitKey) {
                cm.remove_unit_from_character(cm.char_lookup_str(this.GetInternalInterface()), troop)
            }
        }

        /**
         * (getter) returns true if Lord is a caster or he has a wizard hero in his army
         */
        public get HasCaster(): boolean {
            return this.GetInternalInterface().is_caster() ||
                   cm.general_has_caster_embedded_in_army(this.GetInternalInterface())
        }

        /**
         * Kills this lord and his armies.  
         * WARNING: Methods of this object will be invalid!
         */
        public Destroy() {
            this.Kill(true)
        }
        
    }

    type ChampionCreationOptions = {
        characterObject?: ICharacterScript,
        cqi?: number,
        agentKey?: string,
        factionKey?: string,
        regionKey?: string,
        agentType?: string
        championCreatedCallback?: CallbackChampionCreated,
        suppressLog?: boolean,
        onFailed?: VoidCallback
    }
    /** Inherits from Character, you can extend this class if you want to have additional methods or maybe to differentiate between agent type */
    export class Champion extends Character {
        private championCreatedCallback: CallbackChampionCreated | undefined = undefined

        /**
         * @param options to create Champion from scratch, following attribute `agentKey`, `factionKey`, `regionKey`, `agentType` must be supplied to `options`. `championCreatedCallback` is a callback when character spawned successfully   
         * if you want to wrap existing ICharacter object, fill either `characterObject` or `cqi` into `options`   
         * `onFailed` will be called if failed to spawn (only when creating/spawning Champion from agentkey)  
         * @throws if characterObject is a INullScript
         * @throws if the cqi is invalid, if the supplied characterObject is not an agent, or agentType is not supplied when spawning an agent
         */
        constructor(options?: ChampionCreationOptions) {
            if(options == null) return
            if(options.agentKey && options.characterObject == null) {
                core.add_listener(
                    `create champion ${options.agentKey} ${RandomString()}`,
                    "CharacterRecruited",
                    (context) => {
                        const theChar = context.character ? context.character() : null
                        if(theChar == null) return false
    
                        return theChar.character_subtype_key() == options.agentKey
                    },
                    (context) => {
                        const theChar = context.character ? context.character() : null
                        if(theChar == null) return
                        if(this.championCreatedCallback) this.championCreatedCallback(this, "CreateFromKey")
                    }, 
                    false
                )
            }
            if(options.characterObject) {
                super({})
                this.CommanQueueNumberID = options.characterObject.command_queue_index()
                if(options.characterObject.is_null_interface()) {
                    if(!options.suppressLog) CharacterLogger.LogError(`options.characterObject is a INullScript!`)
                    throw(`options.characterObject is a INullScript!`)
                }
                if(!cm.char_is_agent(this.GetInternalInterface())) {
                    if(options.suppressLog) CharacterLogger.Log(`cannot wrap this character ${this.GetInternalInterface().character_subtype_key()} as it's not an agent, aborting`)
                    throw(`cannot wrap this character ${this.GetInternalInterface().character_subtype_key()} as it's not an agent, aborting`)
                }
            }
            else if(options.cqi) {
                super({})
                const theChar = cm.get_character_by_cqi(options.cqi)
                if(theChar) {
                    this.CommanQueueNumberID = theChar.command_queue_index() 
                    if(!cm.char_is_agent(this.GetInternalInterface())) {
                        if(options.suppressLog) CharacterLogger.Log(`cannot wrap this character ${this.GetInternalInterface().character_subtype_key()} as it's not an agent, aborting`)
                        throw(`cannot wrap this character ${this.GetInternalInterface().character_subtype_key()} as it's not an agent, aborting`)
                    }
                }else {
                    if(options.suppressLog) CharacterLogger.LogError(`this cqi ${options.cqi} is invalid cqi`)
                    throw(`this cqi ${options.cqi} is invalid cqi`)
                }
            } else {
                if(options.agentType == null || options.agentType == "") {
                    if(options.suppressLog) CharacterLogger.Log(`cannot create new champion because you didn't pass options.agentType. options.agentKey ${options.agentKey}`)
                    throw(`cannot create new champion because you didn't pass options.agentType. options.agentKey ${options.agentKey}`)
                }
                super({
                    characterObject: options.characterObject, 
                    factionKey: options.factionKey,
                    regionKey: options.regionKey,
                    agentSubtypeKey: options.agentKey,
                    agentType: options.agentType,
                    spawnAsAgent: true,
                    onFailed: options.onFailed
                })
            }
            this.championCreatedCallback = options.championCreatedCallback
            if(options.characterObject) {
                if(this.championCreatedCallback) this.championCreatedCallback(this, "WrappingExistingObject")
            }
            
        }
        
    }

}