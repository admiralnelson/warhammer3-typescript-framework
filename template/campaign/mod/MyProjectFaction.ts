namespace ProjectName {

    const FactionLogger = new Logger("ProjectName FactionLogger")

    /**
     * Gets all the faction in the campaign. If this fires for the first time, it will take time to caches first.
     * @returns Array of Wrapped IFactionScript in Faction object
     */
    export function GetFactions(): Faction[] {
        return Faction.GetFactions()
    }

    /**
     * Get a wrapped IFactionScript inside Faction class given a faction key.
     * @param factionKey faction key from faction table
     * @returns Faction object or null if such key was not found
     */
    export function GetFactionByKey(factionKey: string): Faction | undefined {
        const faction = GetFactions()
        return faction.find( faction => faction.FactionKey == factionKey)
    }

    /**
     *  Get a wrapped IFactionScript inside Faction class given an IFactionScript object
     * @param faction 
     * @returns 
     */
    export function WrapIFactionScriptToFaction(faction: IFactionScript): Faction | undefined {
        return GetFactionByKey(faction.name())
    }

    export class Faction {
        
        static readonly CachedFactions: Faction[] = []
        static GetFactions(): Faction[] {
            if(Faction.CachedFactions.length == 0) {
                const theWorld = cm.model().world()
                const factions = theWorld.faction_list()
                for (let i = 0; i < factions.num_items(); i++) {
                    const theFaction = factions.item_at(i)
                    Faction.CachedFactions.push(new Faction(theFaction.name()))
                }
            }
            return Faction.CachedFactions
        }

        private factionKey: string = ""

        /**
         * Wraps IFactionScript object into Faction object so you can manipulate and query this faction with OOP style (no need to touch cm API again)  
         * PRIVATE. Use WrapIFactionScriptToFaction(), GetFactions(), or GetFactionByKey() instead.
         * @param faction IFactionScript
         * @throws execption if the user puts invalid IFactionScript object (i.e if it's INullScript)
         */
        private constructor(faction: IFactionScript | string) {
            if(typeof(faction) == "string") {
                this.factionKey = faction
            } else {
                if(faction.is_null_interface()) {
                    FactionLogger.LogError(`the faction interface is null interface!`)
                    throw(`the faction interface is null interface!`)
                }
                this.factionKey = faction.name()
            }

        }

        /**
         * Removes effect budle from this faction
         * @param effectBundleKey effect bundle key from effect bundle table
         */
        public RemoveEffectBundle(effectBundleKey: string): void {
            cm.remove_effect_bundle(effectBundleKey, this.FactionKey)
        }

        /**
         * Trigger a dillema associated with this faction
         * @param dillemaKey Dilemma key, from the dilemmas table.
         */
        public TriggerDilemma(dillemaKey: string): boolean {
            return cm.trigger_dilemma(this.FactionKey, dillemaKey)
        }

        /**
         * Check if this faction is human
         * @returns true if human
         */
        public get IsHuman(): boolean {
            return this.factionInterface.is_human()
        }

        /**
         * Returns faction leader character
         * @returns may return null if faction is dead or invalid
         */
        public get FactionLeader(): Character | null {
            if(!this.IsValid()) return null
            if(this.IsDead) return null

            const lord = WrapICharacterObjectToCharacter(this.factionInterface.faction_leader())
            return lord
        }

        /**
         *  Check if this faction is dead
         * @returns true if dead
         */
        public get IsDead(): boolean {
            return this.factionInterface.is_dead()
        }

        /**
         * Gets internal IFactionScript referenced by this wrapper
         * @returns IFactionScript
         */
        public GetFactionInterface(): IFactionScript {
            return this.factionInterface
        }

        /**
         * Check if the internal IFactionScript is valid
         * @returns true if still valid
         */
        public IsValid(): boolean {
            return !this.factionInterface.is_null_interface()
        }

        /** returns faction culture */
        public get Culture(): string {
            return this.GetFactionInterface().culture()
        }

        /**
         * Constructs and displays an event for this faction. This wraps the cm.show_message_event function of the same name on the underlying episodic_scripting, although it provides input validation, output, whitelisting and a progression callback.
         * @param titleLocKey Localisation key for the event title. This should be supplied in the full `[table]_[field]_[key]` localisation format, or can be a blank string.
         * @param primaryLocKey Localisation key for the primary detail of the event. This should be supplied in the full `[table]_[field]_[key]` localisation format, or can be a blank string.
         * @param secondaryLocKey Localisation key for the secondary detail of the event. This should be supplied in the full `[table]_[field]_[key]` localisation format, or can be a blank string.
         * @param isPersistent Sets this event to be persistent instead of transient.
         * @param index Index indicating the type of event.
         * @param endCallback optional, default value=false Specifies a callback to call when this event is dismissed. Note that if another event message shows first for some reason, this callback will be called early.
         * @param callbackDelay optional, default value=0 Delay in seconds before calling the end callback, if supplied.
         * @param dontWhitelist optional, default value=false By default this function will whitelist the scripted event message type with campaign_manager.whitelist_event_feed_event_type. Set this flag to true to prevent this.
         */
        public ShowMessageEvent(titleLocKey: string, primaryLocKey: string, secondaryLocKey: string, isPersistent: boolean,  index: number, endCallback?: () => void, callbackDelay?: number, dontWhitelist?: boolean): void {
            cm.show_message_event(this.FactionKey, titleLocKey, primaryLocKey, secondaryLocKey, isPersistent, index, endCallback, callbackDelay, dontWhitelist)
        }

        /**
         * Applies an effect bundle to this faction for a number of turns (can be infinite)
         * @param effectBundleKey Effect bundle key from the effect bundles table.
         * @param turns Number of turns to apply the effect bundle for. Supply 0 here to apply the effect bundle indefinitely (it can be removed later with `.RemoveEffectBundle` if required).
         */
        public ApplyEffectBundle(effectBundleKey: string, turns: number = 0): void {
            cm.apply_effect_bundle(effectBundleKey, this.FactionKey, turns)
        }

        public HasEffectBundle(effectBundleKey: string): boolean {
            return this.GetFactionInterface().has_effect_bundle(effectBundleKey)
        }

       /**
        * Registers a turn countdown event for this faction. The supplied script event will be triggered after the specified number of turns has passed, when the FactionTurnStart event is received for the specified faction.
        * @param turns Number of turns from now to trigger the event.
        * @param event Event to trigger. By convention, script event names begin with "ScriptEvent"
        * @param contextString optional, default value="" Optional context string to trigger with the event.
        */
        public AddTurnCountdownEvent(turns: number, event: string, contextString: string): void {
            cm.add_turn_countdown_event(this.FactionKey, turns, event, contextString)
        }

        /**
         * Put a lord into the spawn pool
         * @param agentSubtypeKey subtype agent key defined in the database
         */
        public AddLordToPool(agentSubtypeKey: string): void {
            cm.spawn_character_to_pool(this.FactionKey, "", "", "", "", 18, true, "general", agentSubtypeKey, false, "")
        }

        /**
         * Trigger a mission from this faction
         * @param missionKey Mission key from Mission tables
         * @param fireImmediately start the mission immediately after this method is fired
         */
        public TriggerMission(missionKey: string, fireImmediately: boolean = true): void {
            cm.trigger_mission(this.FactionKey, missionKey, fireImmediately)
        }

        /**
         * Add money to faction
         * @param someMoney Money to be added
         */
        public AddMoney(someMoney: number): void {
            cm.treasury_mod(this.FactionKey, someMoney)
        }
        
        /**
         * Get pooled resource associated with the faction. I.E measuring the amount of chivalry
         * @returns Returns NAN if resourceKey is invalid!
         * @param resourceKey 
         */
        GetPooledResource(resourceKey: string): number {
            const faction = this.GetFactionInterface()
            const query   = faction.pooled_resource_manager()
                                   .resource(resourceKey)
            const isQueryValid = !query.is_null_interface()
            
            if(!isQueryValid) {
                console.error("Invalid resource key id: " + resourceKey)
                return Number.NaN
            }

            return query.value()
        }

        /**(Getter) gets all lords and champions, wrap them in generic Character class */
        public get Characters(): Character[] {
            const result = []
            const characters = this.factionInterface.character_list()
            for (let i = 0; i < characters.num_items(); i++) {
                const theCharacter = characters.item_at(i)
                if(cm.char_is_general_with_army(theCharacter))
                    result.push(new Character({characterObject: theCharacter}))
                else if(cm.char_is_agent(theCharacter))
                    result.push(new Character({characterObject: theCharacter}))
            }
            return result
        }
        
        /**(Getter) Gets all lords in this faction, wrapped in Lord class */
        public get Lords(): Lord[] {
            const result = []
            const armies = this.factionInterface.military_force_list()
            for (let i = 0; i < armies.num_items() ; i++) {
                const theArmy = armies.item_at(i)
                if(!theArmy.is_armed_citizenry() && theArmy.has_general()) {
                    const theGeneral = theArmy.general_character()
                    const toCharacter = WrapICharacterObjectToCharacter(theGeneral)
                    const toLord = TryCastCharacterToLord(toCharacter)
                    if(toLord != null && toLord.IsGeneralAndHasArmy) result.push(toLord)
                }
            }    
            return result
        }

        public get Champions(): Champion[] {
            const characters = this.Characters
            const result = []
            for (const char of characters) {
                const champion = TryCastCharacterToChampion(char)
                if(champion) result.push(champion) 
            }
            return result
        }

        /**(Getter) array of effect bundle keys on this faction */
        public get EffectBundles(): string[] {
            const res = []
            const effectBundles = this.factionInterface.effect_bundles()
            for (let i = 0; i < effectBundles.num_items(); i++) {
                const effectBundle = effectBundles.item_at(i)
                res.push(effectBundle.key())
            }
            return res
        }

        public get Regions(): Region[] {
            const result = []
            const regions = this.factionInterface.region_list()
            for (let i = 0; i < regions.num_items(); i++) {
                const theRegion = regions.item_at(i)
                result.push(WrapIRegionObjectToRegion(theRegion)!)
            }
            return result
        }
        
        /**(Getter) get faction key */
        public get FactionKey() : string {
            return this.factionInterface.name()
        }

        public toString(): string {
            return this.FactionKey
        }

        /** (getter) returns true if this faction is currently on its turn */
        public get IsCurrentTurn(): boolean {
            return  cm.is_factions_turn_by_key(this.FactionKey)
        }

        /** (Getter) returns true if local human faction (the human who currently control his faction on turn) */
        public get IsHumanTurn() : boolean {
            return this.IsHuman && this.IsCurrentTurn
        }

        public get CQI(): number {
            return this.factionInterface.command_queue_index()
        }


        /**
         * Rather than doing this factionA == factionB (although both instances have the same reference, the objects wrapper are still different), use this method to check if both object is equal
         * @param otherFaction 
         * @returns 
        */
        public IsEqual(otherFaction: Faction) {
            return this.FactionKey == otherFaction.FactionKey
        }

        public get factionInterface() : IFactionScript {
            return cm.get_faction(this.factionKey)
        }
    }
}