/** @noSelfInFile */
/* eslint-disable */

declare function print(...args: any[]): void

/**
 * ONLY AVAILABLE IN SNED LOADER ENV ONLY! 
 * starts SNED lua debugger */
declare function StartDebugger(): void
/** 
 * ONLY AVAILABLE IN SNED LOADER ENV ONLY!
 * stops SNED lua debugger */
declare function StopDebugger(): void

/** ONLY AVAILABLE IN SNED LOADER ENV ONLY! */
declare function PrintWarning(s: string): void
/** ONLY AVAILABLE IN SNED LOADER ENV ONLY! */
declare function PrintError(s: string): void
declare function out(s: string): void

/** JSON interface: campaign\mod\JSON.lua */
interface JSON {
    stringify(this: void, o: any): string
    /** 
    * @throws {Error} generic lua error, containing a message
    */
    parse(this: void, s: string): any
}

interface INullScript {
    is_null_interface(): boolean
}

interface IListScript {
    num_items(): number
    is_empty(): boolean
}

interface IRegionManagerScript extends INullScript {
    model(): IModelScript
    region_list(): IRegionListScript
    faction_region_list(factionKey: string): IRegionListScript
    region_by_key(regionKey: string): IRegionScript
    settlement_by_key(settlementKey: string): ISettlementScript
    slot_by_key(slotKey: string): ISlotScript
    resource_exists_anywhere(resourceKey: string): boolean
}

interface ISeaManagerScript extends INullScript {

}

interface IWorldScript extends INullScript {
    faction_list(): IFactionListScript
    region_manager(): IRegionManagerScript
    sea_region_manager(): ISeaManagerScript
    model(): IModelScript
    province_list(): IProvinceListScript
    province_exists(provinceKey: string): boolean
    province_by_key(provinceKey: string): IProvinceScript
    faction_by_key(factionKey: string): IFactionScript
    faction_exists(factionKey: string): boolean
    ancillary_exists(anciliaryKey: string): boolean
    climate_phase_index(): number
    whose_turn_is_it(): IFactionListScript
    whose_turn_is_it_single(): IFactionScript
    is_factions_turn_by_key(factionKey: string): boolean
    region_data(): IRegionDataScript
    land_region_data(): IRegionDataListScript
    sea_region_data(): IRegionDataListScript
    cooking_system(): ICookingSystemScript
    characters_owning_ancillary(anciliaryKey: string): ICharacterListScript
    faction_character_tagging_system(): IFactionCharacterTaggingSystemScript
    region_data_at_position(x: number, y: number): IRegionDataScript
    region_data_for_key(regionKey: string): IRegionDataScript
    /** honestly no idea what this function does, the doc also doesn't explain it clearly */
    observation_options_for_faction(whichFaction: IFactionScript, andWhoToObserve: IFactionScript): ICharacterObservationOptionsScript
    /** honestly no idea what this function does, the doc also doesn't explain it clearly */
    observation_options_for_allies(whichFaction: IFactionScript): ICharacterObservationOptionsScript
    /** honestly no idea what this function does, the doc also doesn't explain it clearly */
    observation_options_for_enemies(whichFaction: IFactionScript): ICharacterObservationOptionsScript
    /** honestly no idea what this function does, the doc also doesn't explain it clearly */
    observation_options_for_neutrals(whichFaction: IFactionScript): ICharacterObservationOptionsScript
    caravans_system(): ICaravanSystemScript
    lookup_route_network(): IRouteNetworkScript
    winds_of_magic_compass(): IWoMCompassScript
    teleportation_network_system(): ITeleportationScript
    faction_strength_rank(whichFaction: IFactionScript): number 
}

interface IModelScript extends INullScript {
    pending_battle(): IPendingBattleScript
    can_reach_character(who: ICharacterScript, againstWho: ICharacterScript): boolean
    can_reach_settlement(who: ICharacterScript, where: ISettlementScript): boolean
    can_reach_position(who: ICharacterScript, x: number, y: number): boolean
    can_reach_character_in_stance(who: ICharacterScript, againstWho: ICharacterScript, stanceKey: string): boolean
    can_reach_settlement_in_stance(who: ICharacterScript, where: ISettlementScript, stanceKey: string): boolean
    can_reach_position_in_stance(who: ICharacterScript, x: number, y: number, stanceKey: string): boolean
    has_effect_bundle(effectBundleKey: string): boolean
    /** Access campaign world interface */
    world(): IWorldScript
    /**
     * What is the local faction's difficulty level?
     */
    difficulty_level(): number
    /**
     * What is the combined difficulty level of all player factions?
     */
    combined_difficulty_level(): number
    /** Is campaign multiplayer? */
    is_multiplayer(): boolean
}

interface IRegionDataListScript extends INullScript {

}

interface IUnitListScript extends IListScript {
    has_unit(unitKey: string): boolean
    item_at(index: number): IUnitScript
    is_empty(): boolean    
}

interface IUnitPurchaseableEffectListScript extends IListScript {

}

interface ICharacterListScript extends IListScript {
    item_at(index: number): ICharacterScript
}

interface IMilitaryForceListScript extends IListScript {
    item_at(index: number): IMilitaryForceScript
}

interface IFactionListScript extends IListScript {
    item_at(index: number): IFactionScript
}

interface IRegionListScript extends IListScript {
    item_at(index: number): IRegionScript
}

interface IFactionProvinceManagerList extends IListScript {
    item_at(index: number): IFactionProvinceManager
}

interface IUniqueAgentDetailsListScript extends IListScript {

}

interface IEffectBundleListScript extends IListScript {
    item_at(index: number): IEffectBundleScript
}

interface IEffectListScript extends IListScript {
    item_at(index: number): IEffectScript
}

interface IProvinceListScript extends IListScript {

}

interface ISlotListScript extends IListScript {

}

interface IMercenaryPoolScript extends INullScript {

}



interface IProvinceScript extends INullScript {
    /**
     * Checks if the interface is null.
     * 
     * @returns {boolean} True if the interface is null, otherwise false.
     */
    is_null_interface(): boolean

    /**
     * Gets the key of the province.
     * 
     * @returns {string} The key of the province.
     */
    key(): string

    /**
     * Gets the faction provinces manager list.
     * 
     * @returns {IFactionProvinceManagerList} The faction provinces manager list.
     */
    faction_provinces(): IFactionProvinceManagerList

    /**
     * Gets the faction province manager for a specific faction.
     * 
     * @param {IFactionScript} faction - The faction to get the province manager for.
     * @returns {IFactionProvinceManager} The faction province manager for the specified faction.
     */
    faction_province_for_faction(faction: IFactionScript): IFactionProvinceManager

    /**
     * Gets the capital region of the province.
     * 
     * @returns {IRegionScript} The capital region of the province.
     */
    capital_region(): IRegionScript

    /**
     * Gets the list of regions in the province.
     * 
     * @returns {IRegionListScript} The list of regions in the province.
     */
    regions(): IRegionListScript

    /**
     * Gets the list of adjacent provinces.
     * 
     * @returns {IProvinceListScript} The list of adjacent provinces.
     */
    adjacent_provinces(): IProvinceListScript

    /**
     * Gets the pooled resource manager for the province.
     * 
     * @returns {IPooledResourceManagerScript} The pooled resource manager for the province.
     */
    pooled_resource_manager(): IPooledResourceManagerScript

    /**
     * Gets the mercenary pool for the province.
     * 
     * @returns {IMercenaryPoolScript} The mercenary pool for the province.
     */
    mercenary_pool(): IMercenaryPoolScript


}

interface ISettlementScript extends INullScript {
    /**  Returns the string key of this settlement */
    key(): string
    cqi(): number
    has_commander(): boolean
    logical_position_x(): number
    logical_position_y(): number
    display_position_x(): number
    display_position_y(): number
    /** Building chain used to display this settlement. May not be the same as the logical building chain */
    display_primary_building_chain(): string
    /** Primary building chain of this settlement */
    primary_building_chain(): string
    model(): IModelScript
    /** Returns the embedded military force commander 
     * @returns can return INullScript if if the settlement does not have a commander
     */
    commander(): ICharacterScript
    faction(): IFactionScript
    region(): IRegionScript
    slot_list(): ISlotListScript
    is_port(): boolean
    /**  Get the climate key for a settlement */
    get_climate(): string
    primary_slot(): ISlotScript
    /** Get the port slot for this settlement if it exists, INullScript if it doesn't */
    port_slot(): ISlotScript
    /** Get a list of all of the active secondary slots in this settlement. Try not to spam call this */
    active_secondary_slots(): ISlotListScript
    /** Get the first empty active secondary slot from the settement. May be INullScript if none are available */
    first_empty_active_secondary_slot(): ISlotScript
}

interface ISlotScript extends INullScript {

}

interface ICookingSystemScript extends INullScript {

}

interface IBonusValuesScript extends INullScript {

}

interface IForeignSlotManagerListScript extends INullScript { 

}

interface IFactionRitualsScript extends INullScript {

}

interface IFactionProvinceManager extends INullScript {

}

interface IFactionCharacterTaggingSystemScript extends INullScript {

}

interface ICharacterObservationOptionsScript extends INullScript {

}

interface IEffectScript extends INullScript {
    key(): string
    scope(): string
    value(): number
}

interface IEffectBundleScript extends INullScript {
    key(): string
    effects(): IEffectListScript
    duration(): number
    clone_and_create_custom_effect_bundle(): ICustomEffectBundleScript
}

interface ICustomEffectBundleScript extends INullScript {

}

interface ICaravanSystemScript extends INullScript {

}

interface IRouteNetworkScript extends INullScript {

}

interface IWoMCompassScript extends INullScript {

}

interface ITeleportationScript extends INullScript {

}

interface IGarrisonResidenceScript extends INullScript {
    /** Access the CQI of the garrison */
    command_queue_index(): number
    /** Is there a garrisoned army? */
    has_army(): boolean
    /** Is there a garrisoned navy? */
    has_navy(): boolean
    /** Access to the campaign model */
    model(): IModelScript
    /**  The faction that owns the garrison */
    faction(): IFactionScript
    /**  Returns the army in the garrison residence, if it has one otherwise it's INullScript */
    army(): IMilitaryForceScript
    /**  Returns the navy in the garrison residence, if it has one otherwise it's INullScript */
    navy(): IMilitaryForceScript
    /** The region for the garrison residence */
    region(): IRegionScript
    /** Number of units in a garrison */
    unit_count(): number|0
    /** Returns a list of buildings in the garrison */
    buildings(): IBuildingScript
    /**  Is the garrison under siege? */
    is_under_siege(): boolean
    /** Get the character besieging this garrison */
    besieging_character(): ICharacterScript
    /** Can the attacking army launch a seige */
    can_assault(): boolean
    /** Can the specified faction occupy this residence? */
    can_be_occupied_by_faction(factionKey: string): boolean
    /** Is this garrison a settlement type? */
    is_settlement(): boolean
    /**  Is this garrison a slot type? */
    is_slot(): boolean
    /** If this garrison is a settlement type, returns a settlement interface, otherwise INullScript */
    settlement_interface(): ISettlementScript
    /** If this garrison is a slot type, returns a slot interface, otherwise INullScript */
    slot_interface(): ISlotScript
}

interface IRegionScript extends INullScript {
    
    cqi(): number
    model(): IModelScript
    /** Access to the faction that owns the region */
    owning_faction(): IFactionScript
    /** A list of slots contained in the region */
    slot_list(): ISlotListScript
    /**  */
    settlement(): ISettlementScript
    /** The regions settlement as a garrison_residence */
    garrison_residence(): IGarrisonResidenceScript
    /** region key */
    name(): string
    /** Key of the province containing the region */
    province_name(): string
    /** public order level, the lower it is the worse */
    public_order(): number
    /** The number of buildings in a region */
    num_buildings(): number
    /** Does a slot with a given key exist in the region?
     *  @param slotKeys input a slot key, e.g. slot_type_exists("rice:jap_awa:farm")
     */
    slot_type_exists(slotKeys: string): boolean
    /**
     * Does a building with a given key exist in the region?
     * @param buildingKey input a building key, e.g. building_exists("key")
     */
    building_exists(buildingKey: string): boolean
    /** Returns the key of the last building constructed this region */
    last_building_constructed_key(): string
    /** Is a resource produced in this region?
     * @param resourceKey input a resource key, e.g. resource_exists("key")
     */
    resource_exists(resourceKey: string): boolean
    /** Is any resource, at all, produced in this region? */
    any_resource_available(): boolean
    /**
     * Returns the list of regions adjacent to this one (including where the connection is not traversable)
     */
    adjacent_region_list(): IRegionListScript
    /**
     *  Returns true if the region is abandoned
     */
    is_abandoned(): boolean
    /**
     *  Returns true if you can recruite the specified agent type at the regions settlement
     * @param agentKey the agent key
     */
    can_recruit_agent_at_settlement(agentKey: string): boolean
    /**
     * Returns the total amount of growth points accumulated in a province towards the next population point
     */
    faction_province_growth(): number
    /**
     *  Returns the amount of growth points added in a province towards the next population point this turn
     */
    faction_province_growth_per_turn(): number
    /** Returns the current gross domestic produce of this region */
    gdp(): number
    /**  Is this region the province capital? */
    is_province_capital(): boolean
    /**  Does this region have enough development points to upgrade? */
    has_development_points_to_upgrade(): boolean
    /** Does this region's owner support Faction Slaves */
    has_faction_province_slaves(): boolean
    /**  Number of slaves in the faction province */
    num_faction_province_slaves(): number
    /**  Maximum number of slaves for the faction province */
    max_faction_province_slaves(): number
    /** Percentage faction province slaves of the maximum */
    percentage_faction_province_slaves(): number
    /** Returns true if region has an active storm */
    has_active_storm(): boolean
    /** Gets the REGION_DATA interface of the region */
    region_data_interface(): IRegionDataScript
    /**  Gets the key of the currently selected edict of the region, returns "" if there is no edict active */
    get_selected_edict_key(): string
    /** Gets the key of the currently active edict of the region, returns "" if there is no edict active */
    get_active_edict_key(): string
    /** Returns the complete list of foreign slot managers currently active in this region */
    foreign_slot_managers(): IForeignSlotManagerListScript
    /** Returns the foreign slot manager that belongs to the specified faction. Will be null if they do not have a foreign slot manager in this region 
     * @param factionKey 
    */
    foreign_slot_manager_for_faction(factionKey: string): IForeignSlotManagerListScript
    /** Effect bundles currently active on the region */
    effect_bundles(): IEffectBundleListScript
    /**  Effect bundles currently active on the faction province */
    faction_province_effect_bundles(): IEffectBundleListScript
    /** Test if this region has the specified effect bundle */
    has_effect_bundle(effectBundleKey: string): boolean
    /** Test if this regions faction province has the specified effect bundle */
    faction_province_has_effect_bundle(effectBundleKey: string): boolean
    /** Geographical province that contains this region */
    province(): IProvinceScript
    /** Faction province that owns this region */
    faction_province(): IFactionProvinceManager
    pooled_resource_manager(): IPooledResourceManagerScript
    bonus_values(): IBonusValuesScript
    
    /**
     * Returns the list of characters in the region
     */
    characters_in_region(): ICharacterListScript
}

interface ISeaRegionScript extends INullScript {

}

interface IRegionDataScript extends INullScript {

}

interface IUnitScript extends INullScript {
    /** Command queue index of the unit */
    command_queue_index(): number
    /** Is the unit in a force with a commander? */
    has_force_commander(): boolean
    /** Does this unit have a character leading it? Not all units have one */
    has_unit_commander(): boolean
    /** Is this a land unit? */
    is_land_unit(): boolean
    /** Is this a naval unit? */
    is_naval_unit(): boolean
    /** Access to the campaign model interface */
    model(): IModelScript
    /** Returns the force commander if one exists, returns INullScript if it doesn't */
    force_commander(): ICharacterScript
    /** Returns the unit commander if one exists, returns INullScript if it doesn't */
    unit_commander(): ICharacterScript
    /** Returns the military force containing this unit */
    military_force(): IMilitaryForceScript
    /** Returns the faction that this unit belongs to */
    faction(): IFactionScript
    /**  The unit record key (main unit key) */
    unit_key(): string
    /** The unit record category */
    unit_category(): string
    /** The unit record class */
    unit_class(): string
    /** The % of soldiers in the unit. Returns a value 0.0-100.0 */
    percentage_proportion_of_full_strength(): number
    /** Returns whether the unit has a banner equipped */
    has_banner_ancillary(): boolean
    /** Returns the ancillary key of the banner equipped by the unit, or an empty string if no banner is equipped */
    banner_ancillary(): string
    /** Get the experience level of this unit, which is the number of chevrons it has */
    experience_level(): number
    /**  Can this unit upgrade its equipment */
    can_upgrade_unit_equipment(): boolean
    /** Can this unit be upgraded to another unit  */
    can_upgrade_unit(): boolean
    /** Get the cost of the unit in multiplayer or custom battle mode */
    get_unit_custom_battle_cost(): number
    /**  Can the specified purchase happen */
    can_purchase_effect(factionKey: string, effectKey: string): boolean
    /**  Can the specified unpurchase happen */
    can_unpurchase_effect(effectKey: string): boolean
    /** Get the list of unit purchasable effects linked to this unit */
    get_unit_purchasable_effects(): IUnitPurchaseableEffectListScript
    /** Get the list of purchasable effects purchased for the unit */
    get_unit_purchased_effects(): IUnitPurchaseableEffectListScript
    
}

interface IMilitaryForceTypeScript extends INullScript {

}

interface IMilitaryForceScript extends INullScript {
    command_queue_index(): number
    has_general(): boolean
    is_army(): boolean
    is_navy(): boolean
    model(): IModelScript
    unit_list(): IUnitListScript
    character_list(): ICharacterListScript
    general_character(): ICharacterScript
    faction(): IFactionScript
    has_garrison_residence(): boolean
    garrison_residence(): IGarrisonResidenceScript
    contains_mercenaries(): boolean
    upkeep(): number
    active_stance(): string
    can_activate_stance(whatStance: string): boolean
    morale(): number
    /** returns true if force is a garrison */
    is_armed_citizenry(): boolean
    will_suffer_any_attrition(): boolean
    can_recruit_agent_at_force(subagentKey: string): boolean
    can_recruit_unit(unitKey: string): boolean
    can_recruit_unit_class(unitClass: string): boolean
    can_recruit_unit_category(unitCategory: string): boolean
    /** returns army strength */
    strength(): number
    has_effect_bundle(bundleKey: string): boolean
    effect_bundles(): IEffectBundleListScript
    force_type(): IMilitaryForceTypeScript
    pooled_resource_manager(): IPooledResourceManagerScript
    bonus_values(): IBonusValuesScript
    is_set_piece_battle_army(): boolean
    /** returns battle_set_piece_armies record key for this military force. Will be empty if this is not a quest battle army */
    set_piece_battle_army_key(): string
    has_access_to_military_force_mercenary_pool_of_recruitment_source(recruitmentSourceKey: string): boolean
    lookup_streak_value(streakKey: string): number
}

interface IPendingBattleScript extends INullScript {
    has_attacker(): boolean
    has_defender(): boolean
    has_contested_garrison(): boolean
    model(): IModelScript
    attacker(): ICharacterScript
    secondary_attackers(): ICharacterScript
    defender(): ICharacterScript
    secondary_defenders(): ICharacterScript
    contested_garrison(): IGarrisonResidenceScript
    is_active(): boolean
    attacker_is_stronger(): boolean
    percentage_of_attacker_killed(): number
    percentage_of_defender_killed(): number
    percentage_of_attacker_routed(): number
    percentage_of_defender_routed(): number
    attacker_commander_fought_in_battle(): boolean
    defender_commander_fought_in_battle(): boolean
    attacker_commander_fought_in_melee(): boolean
    defender_commander_fought_in_melee(): boolean
    attacker_won(): boolean
    defender_won(): boolean
    is_draw(): boolean
    attacker_battle_result(): "close_victory"|"decisive_victory"|"heroic_victory"|"pyrrhic_victory"|"close_defeat"|"decisive_defeat"|"crushing_defeat"|"valiant_defeat"
    defender_battle_result(): "close_victory"|"decisive_victory"|"heroic_victory"|"pyrrhic_victory"|"close_defeat"|"decisive_defeat"|"crushing_defeat"|"valiant_defeat"
    attacker_casulaties(): number
    defender_casulaties(): number
    attacker_kills(): number
    defender_kills(): number
    attacker_ending_cp_kill_score(): number
    defender_ending_cp_kill_score(): number
    attacker_total_hp_lost(): number
    defender_total_hp_lost(): number
    naval_battle(): boolean
    siege_battle(): boolean
    ambush_battle(): boolean
    failed_ambush_battle(): boolean
    night_battle(): boolean
    /** The battle type. Asks a programmer for the battle type strings (found in campaign_battle_type_enum_ids, campaignbonusvalues.cpp???) */
    battle_type(): string
    attacker_strength(): number
    defender_strength(): number
    has_been_fought(): boolean
    set_piece_battle_key(): string
    /** True if the pending battle has the specified tile upgrade tag.? */
    has_scripted_tile_upgrade(tag: string): boolean
    /** Expects a faction CQI for and the String tag for the unit ability in question and will return the number of times it was used. */
    get_how_many_times_ability_has_been_used_in_battle(factionCqi: number, tag: string): number
    region_data(): IRegionDataScript
    logical_position(): LuaMultiReturn<[x: number, y: number]>
    display_position(): LuaMultiReturn<[realX: number, realY: number]>
    is_auto_resolved(): boolean
    ended_with_withdraw(): boolean
}

interface ICharacterScript extends INullScript, ICharacterDetailsScript, IModelScript {
    command_queue_index(): number
    has_garrison_residence(): boolean
    has_region(): boolean
    has_military_force(): boolean
    garrison_residence(): IGarrisonResidenceScript
    faction(): IFactionScript
    region(): IRegionScript
    sea_region(): ISeaRegionScript
    region_data(): IRegionDataScript
    military_force(): IMilitaryForceScript
    flag_path(): string
    in_settlement(): boolean
    in_port(): boolean
    is_besieging(): boolean
    is_blockading(): boolean
    is_carrying_troops(): boolean
    is_governor(): boolean

    battles_fought(): number
    action_points_remaining_percent(): number
    action_points_per_turn(): number

    performed_action_this_turn(): number
    is_ambushing(): boolean
    turns_at_sea(): number
    turns_in_own_regions(): number
    turns_in_enemy_regions(): number
    is_faction_leader(): boolean
    rank(): number
    defensive_sieges_fought(): number
    defensive_sieges_won(): number
    offensive_sieges_fought(): number
    offensive_sieges_won(): number
    /** Did the character fight in missile or melee combat in the battle? */
    fought_in_battle(): boolean
    /** Was the character in the winning alliance in a battle? */
    won_battle(): boolean
    percentage_of_own_alliance_killed(): number
    ministerial_position(): string
    logical_position_x(): number
    logical_position_y(): number
    display_position_x(): number
    display_position_y(): number
    battles_won(): number
    offensive_battles_won(): number
    offensive_battles_fought(): number
    defensive_battles_won(): number
    defensive_battles_fought(): number
    offensive_naval_battles_won(): number
    offensive_naval_battles_fought(): number
    defensive_naval_battles_won(): number
    defensive_naval_battles_fought(): number
    offensive_ambush_battles_won(): number
    offensive_ambush_battles_fought(): number
    defensive_ambush_battles_won(): number
    defensive_ambush_battles_fought(): number
    cqi(): number
    is_embedded_in_military_force(): boolean
    embedded_in_military_force(): IMilitaryForceScript

    is_hidden(): boolean
    routed_in_battle(): boolean
    body_guard_casulties(): number
    is_deployed(): boolean
    is_at_sea(): boolean
    has_recruited_mercenaries(): boolean
    
    interfaction_loyalty(): number
    
    is_politician(): boolean
    post_battle_ancilary_chance(): number
    is_caster(): boolean
    is_visible_to_faction(): boolean
    can_equip_ancillary(ancillaryKey: string): boolean
    is_wounded(): boolean
    character_details(): ICharacterDetailsScript
    effect_bundles(): IEffectBundleListScript

    bonus_values(): IBonusValuesScript
    post_battle_ancillary_chance(): number
    /**
     * returns a characters family member script interface
     */
    family_member(): IFamilyMemberScript
}

interface IFactionScript extends INullScript {
    command_queue_index(): number
    region_list(): IRegionListScript
    character_list(): ICharacterListScript
    military_force_list(): IMilitaryForceListScript
    model(): IModelScript
    is_factions_turn(): boolean
    /** returns true if player is human */
    is_human(): boolean
    is_idle_human(): boolean
    /** returns faction key */
    name(): string
    home_region(): IRegionScript 
    faction_leader(): ICharacterScript
    has_faction_leader(): boolean
    has_home_region(): boolean
    flag_path(): string
    started_war_this_turn(): boolean
    ended_war_this_turn(): boolean
    ancillary_exists(anciliaryKey: string): boolean
    num_allies(): number
    at_war(): boolean
    allied_with(WithWho: IFactionScript): boolean
    non_aggression_pact_with(withWho: IFactionScript): boolean
    trade_agreement_with(WithWho: IFactionScript): boolean
    military_allies_with(WithWho: IFactionScript): boolean
    defensive_allies_with(WithWho: IFactionScript): boolean
    is_vassal_of(WithWho: IFactionScript): boolean
    is_ally_vassal_or_client_state_of(WithWho: IFactionScript): boolean
    at_war_with(WithWho: IFactionScript): boolean
    trade_resource_exists(resourceKey: string): boolean
    trade_value(): number
    trade_value_percent(): number
    unused_international_trade_route(): boolean
    trade_route_limit_reached(): boolean
    sea_trade_route_raided(): boolean
    treasury(): number
    treasury_percent(): number
    losing_money(): boolean
    expenditure(): number
    income(): number
    net_income(): number
    tax_level(): number
    upkeep(): number
    upkeep_income_percent(): number
    upkeep_expenditure_percent(): number
    research_queue_idle(): number
    has_technology(technologyKey: string): boolean
    is_currently_researching(): boolean
    has_available_technologies(): boolean
    num_completed_technologies(): number
    num_generals(): number
    culture(): string
    subculture(): string
    has_food_shortages(): boolean
    imperium_level(): number
    diplomatic_standing_with(withWho: IFactionScript): number
    diplomatic_attitude_towards(withWho: IFactionScript): number
    factions_non_aggression_pact_with(): IFactionListScript
    factions_trading_with(): IFactionListScript
    factions_at_war_with(): IFactionListScript
    factions_met(): IFactionListScript
    factions_of_same_culture(): IFactionListScript
    factions_of_same_subculture(): IFactionListScript
    factions_allied_with(): IFactionListScript
    factions_defensive_allies_with(): IFactionListScript
    factions_military_allies_with(): IFactionListScript
    get_foreign_visible_characters_for_player(): ICharacterListScript
    get_foreign_visible_regions_for_player(): IRegionDataListScript
    is_quest_battle_faction(): boolean
    holds_entire_province(provinceKey: string, includeVassals: boolean): boolean
    is_vassal(): boolean
    is_dead(): boolean
    total_food(): number
    food_production(): number
    food_consumption(): number
    get_food_factor_value(): number
    get_food_factor_base_value(): number
    get_food_factor_multiplier(): number
    unique_agents(): IUniqueAgentDetailsListScript
    has_effect_bundle(effectBundleKey: string): boolean
    has_rituals(): boolean
    rituals(): IFactionRitualsScript
    has_faction_slaves(): boolean
    num_faction_slaves(): number
    max_faction_slaves(): number
    percentage_faction_slaves(): number
    pooled_resource_manager(): IPooledResourceManagerScript
    has_ritual_chain(ritualKey: string): boolean
    has_access_to_ritual_category(ritualCategoryKey: string): boolean
    get_climate_suitability(climateKey: string): string
    foreign_slot_managers(): IForeignSlotManagerListScript
    is_allowed_to_capture_territory(): boolean
    can_be_human(): boolean
    effect_bundles(): IEffectBundleListScript
    is_rebel(): boolean
    is_faction(): boolean
    unit_cap(): number
    unit_cap_remaining(): number
    bonus_values(): IBonusValuesScript
    agent_cap(): number
    agent_cap_remaining(): number
    agent_subtype_cap(): number
    agent_subtype_cap_remaining(): number
    team_mates(): IFactionListScript
    is_team_mate(withWho: IFactionScript): boolean
    is_primary_faction(): boolean
    turn_is_skipped(): boolean
    num_provinces(): number
    num_complete_provinces(): number
    provinces(): IFactionProvinceManagerList
    complete_provinces(): IFactionListScript
}

interface ICharacterInitiativeSetListScript extends INullScript {

}

interface IFactionProvinceScript extends INullScript {
    //TODO
}

interface IProvinceScript extends INullScript {
    /**
     * Checks if the interface is null.
     * 
     * @returns {boolean} True if the interface is null, otherwise false.
     */
    is_null_interface(): boolean

    /**
     * Gets the key of the province.
     * 
     * @returns {string} The key of the province.
     */
    key(): string

    /**
     * Gets the faction provinces manager list.
     * 
     * @returns {IFactionProvinceManagerList} The faction provinces manager list.
     */
    faction_provinces(): IFactionProvinceManagerList

    /**
     * Gets the faction province manager for a specific faction.
     * 
     * @param {IFactionScript} faction - The faction to get the province manager for.
     * @returns {IFactionProvinceManager} The faction province manager for the specified faction.
     */
    faction_province_for_faction(faction: IFactionScript): IFactionProvinceManager

    /**
     * Gets the capital region of the province.
     * 
     * @returns {IRegionScript} The capital region of the province.
     */
    capital_region(): IRegionScript

    /**
     * Gets the list of regions in the province.
     * 
     * @returns {IRegionListScript} The list of regions in the province.
     */
    regions(): IRegionListScript

    /**
     * Gets the list of adjacent provinces.
     * 
     * @returns {IProvinceListScript} The list of adjacent provinces.
     */
    adjacent_provinces(): IProvinceListScript

    /**
     * Gets the pooled resource manager for the province.
     * 
     * @returns {IPooledResourceManagerScript} The pooled resource manager for the province.
     */
    pooled_resource_manager(): IPooledResourceManagerScript

    /**
     * Gets the mercenary pool for the province.
     * 
     * @returns {IMercenaryPoolScript} The mercenary pool for the province.
     */
    mercenary_pool(): IMercenaryPoolScript
}

interface IPooledResourceScript extends INullScript {

    /** 
     * Record key for this resource pool 
     * @returns The resource pool key as a string
     */
    key(): string;

    /** 
     * Total value of this pool 
     * @returns The total value as an int32
     */
    value(): number;

    /** 
     * Returns the Pooled Resource Manager 
     * @returns The pooled resource manager interface
     */
    manager(): IPooledResourceManagerScript

    /** 
     * Percentage of the total capacity within min and max bounds 
     * @returns The capacity percentage as an int32
     */
    percentage_of_capacity(): number;

    /** 
     * Minimum value of this pool, including modifications from effects 
     * @returns Minimum value as an int32
     */
    minimum_value(): number;

    /** 
     * Maximum value of this pool, including modifications from effects 
     * @returns Maximum value as an int32
     */
    maximum_value(): number;

    /** 
     * Active effect bundle key for this resource's type for this faction 
     * @param type - The effect type as a card32
     * @returns The active effect key as a string
     */
    active_effect(type: number): string;

    /** 
     * Number of possible effect types, consistent across all pools 
     * @returns The effect type count as a card32
     */
    number_of_effect_types(): number;

    /** 
     * All factors contributing to this pool, including current turn transactions 
     * @returns The list of pooled resource factors
     */
    factors(): IPooledResourceFactorListScript

    /** 
     * Lookup a pooled resource factor by its key 
     * @param factor_key - The factor's unique key
     * @returns The pooled resource factor interface
     */
    factor_by_key(factor_key: string): IPooledResourceFactorScript

    /** 
     * Scope of the pooled resource, where it resides and gathers income 
     * @returns The scope as a string
     */
    scope(): string;

    /** 
     * Checks if this pooled resource has persistent factors 
     * @returns true if factors persist, otherwise false
     */
    has_persistent_factors(): boolean;
}

interface IPooledResourceListScript extends IListScript {

    /** 
     * Returns the item at the specified index 
     * @param index - A positive integer within the range [0, num_items - 1]
     * @returns The pooled resource interface at the specified index
     */
    item_at(index: number): IPooledResourceScript
}

interface IPooledResourceFactorListScript extends IListScript {

    /** 
     * Returns the item at the specified index 
     * @param index - A positive integer within the range [0, num_items - 1]
     * @returns The pooled resource interface at the specified index
     */
    item_at(index: number): IPooledResourceScript
}

interface IPooledResourceFactorScript extends INullScript {
    /** 
     * Pooled resource factor record key of this factor 
     * @returns The factor key as a string
     */
    key(): string

    /** 
     * Total value of this factor at the current time, potentially negative 
     * @returns The factor value as an int32
     */
    value(): number

    /** 
     * Percentage of the total capacity within min and max bounds 
     * @returns The capacity percentage as an int32
     */
    percentage_of_capacity(): number

    /** 
     * Minimum value of this factor, including modifications from effects 
     * @returns Minimum value as an int32
     */
    minimum_value(): number

    /** 
     * Maximum value of this factor, including modifications from effects 
     * @returns Maximum value as an int32
     */
    maximum_value(): number
}

interface IPooledResourceManagerScript extends INullScript {
    /** Is this the null script interface */
    is_null_interface(): boolean

    /** 
     * Test whether the resources contained in this manager could afford to pay the specified resource cost 
     * @param resource_cost_key - The key of the resource cost
     * @returns true if affordable, otherwise false
     */
    can_afford_resource_cost(resource_cost_key: string): IPooledResourceFactorListScript

    /** 
     * Scope of this pooled resource manager 
     * @returns The scope as a string
     */
    scope(): string

    /** 
     * Is the pooled resource manager associated with a faction?
     * True if associated with faction, character, military force, or region
     * @returns boolean
     */
    has_owning_faction(): boolean

    /** 
     * Faction that owns this pooled resource manager, if any 
     * @returns Faction interface
     */
    owning_faction(): IFactionScript

    /** 
     * Is the pooled resource manager associated with a region? 
     * @returns boolean
     */
    has_region(): boolean

    /** 
     * Gets the region associated with this pooled resource manager, if any 
     * @returns Region interface
     */
    region(): IRegionScript

    /** 
     * Is the pooled resource manager associated with a character? 
     * @returns boolean
     */
    has_character(): boolean

    /** 
     * Gets the character associated with this pooled resource manager, if any 
     * @returns Character interface
     */
    character(): ICharacterScript

    /** 
     * Is the pooled resource manager associated with a military force? 
     * @returns boolean
     */
    has_military_force(): boolean

    /** 
     * Gets the military force associated with this pooled resource manager, if any 
     * @returns Military force interface
     */
    military_force(): IMilitaryForceScript

    /** 
     * Is the pooled resource manager associated with a province? 
     * @returns boolean
     */
    has_province(): boolean

    /** 
     * Gets the province associated with this pooled resource manager, if any 
     * @returns Province interface
     */
    province(): IProvinceScript

    /** 
     * Is the pooled resource manager associated with a faction province manager? 
     * @returns boolean
     */
    has_faction_province(): boolean

    /** 
     * Gets the faction province associated with this pooled resource manager, if any 
     * @returns Faction province interface
     */
    faction_province(): IFactionProvinceScript

    /** 
     * List of all resources contained in this manager 
     * @returns List of pooled resources
     */
    resources(): IPooledResourceListScript

    /** 
     * Pooled resource with the specified record key. Null if not present 
     * @param pooled_resource_key - The key of the pooled resource
     * @returns Resource interface, or null if not present
     */
    resource(pooled_resource_key: string): IPooledResourceScript
}


interface IBuildingScript extends INullScript {
    model(): IModelScript
    faction(): IFactionScript
    /** Does this building unlock any technologies when constructed? */
    unlocks_technologies(): boolean
    /**  Does this building have a lifecycle? */
    has_lifecycle(): boolean
    /**  The shadow building level key, for if this building has a lifecycle. A blank string is returned if the building has no lifecycle. */
    shadow_building_level(): string
    /** Get the list of effects this building provides */
    effects(): IEffectListScript
    /** Get the list of effects this building provides */
    region(): IRegionScript
    /** The slot containing the building */
    slot(): ISlotScript
    /** The key for the building (building level record) */
    name(): string
    /** The key for the building chain (building_chain_record key) */
    chain(): string
    /** The key for the building superchain (building_superchain_record key) */
    superchain(): string
    /** health, in integer */
    percent_health(): number
    /** this buildiing level */
    building_level(): number
}

interface ICharacterDetailsScript extends INullScript {
    faction(): IFactionScript
    forename(fornameDbKey: string): boolean
    surname(surnameDbKey: string): boolean
    get_forename(): string
    get_surname(): string
    character_type(agentKey: string): boolean
    /** Returns the character's type key, from the agents table */
    character_type_key(): string
    character_subtype(agentSubtypeKey: string): boolean 
    /** Returns the character's subtype key, from the agents table */
    character_subtype_key(): string
    character_subtype_has_female_name(unknown: any): any
    is_part_of_subtype_set(unknown: any): any
    is_immortal(): boolean
    is_unique(): boolean
    has_trait(traitKey: string): boolean
    all_traits(): any
    trait_points(traitKey: string): number
    has_ancillary(anciliaryKey: string): boolean
    is_male(): boolean
    age(): number
    has_skill(skillKey: string): boolean
    background_skill(unknown: any): any
    number_of_traits(): number
    trait_level(traitKey: string): number
    loyalty(): number
    personal_loyalty_factor(): number
    has_father(): boolean
    has_mother(): boolean
    /** undefined in warhammer 3 anyway */
    father(): any
    /** undefined in warhammer 3 anyway */
    mother(): any
    /** undefined in warhammer 3 anyway */
    family_member(): any
    character_initiative_sets(): ICharacterInitiativeSetListScript
    lookup_character_initiative_set_by_key(recordKey: string): ICharacterInitiativeSetListScript
    pooled_resource_manager(): IPooledResourceManagerScript
    character(): ICharacterScript
}

interface IArmoryScript extends INullScript {
    /** 
     * Get the current equipment state of the family member, 
     * please refer to the armory_slot_types table for their names and to ARMORY_SLOT_TYPE which position in your result will contain which your slot. 
     * slot entries can be null signifying an empty slot. 
     * */
    get_all_active_variant_slot_states(): string[]
    /**
     *  Get the currently registered armory items of the family member.
     */
    get_currently_registered_armory_items(): string[]
    /**
     * Get the number of equipped items belonging to a given category.
     * @param categoryKey 
     */
    number_of_equipped_items_of_category(categoryKey: string): number 
    /**
     *  Get the number of equipped items belonging to a given ui type.
     * @param uiTypeKey 
     */
    number_of_equipped_items_of_ui_type(uiTypeKey: string): number

}

interface IFamilyMemberScript extends INullScript {
    
    /** returns true if this family member has a father (doesn't make sense on Warhammer games, I know) */
    has_father(): boolean
    /** returns true if this family member has a mother (doesn't make sense on Warhammer games, I know) */
    has_mother(): boolean
    /** returns IFamilyMemberScript if this family member has a father (doesn't make sense on Warhammer games, I know) */
    father(): IFamilyMemberScript
    /** returns IFamilyMemberScript if this family member has a mother (doesn't make sense on Warhammer games, I know) */
    mother(): IFamilyMemberScript
    /**
     * return true if the character has the trait
     * @param traitKey trait key
     */
    has_trait(traitKey: string): boolean
    /** return if the character has come of age (doesn't make sense on Warhammer games, I know) */
    come_of_age(): boolean
    command_queue_index(): number
    /** return persistent character details assosciated with this family member/character */
    character_details(): ICharacterDetailsScript
    /** return the armory interface for the current family member */
    armory(): IArmoryScript
    /** return the character attached to this family member. May be INullScript if the character is dead */
    character(): ICharacterScript

}


type CallbackCreateForce = {
    (cqi: number): void
}

interface ICommonGameAPI {
    /** retrive data or variable that stored in Scripted Object. contextCommand for example: ```ScriptObjectContext("peasant_count_wh_main_brt_bretonnia").NumericValue```. play around in context viewer window to test your queries
     * it will return null if it can't execute your query
     * you will also need to cast it like so ```common.get_context_value(`ScriptObjectContext("peasant_count_wh_main_brt_bretonnia").NumericValue`) as number```
     */
    get_context_value(this:void, contextQuery: string, functionId?: string | number | boolean): unknown | null
    set_context_value(this:void, contextQuery: string, arg?: string | number | boolean): void
    call_context_command(this:void, contextQuery: string, ...args: any[]): void
    /** Retrieves a localised string from the database by its full localisation key. This is in the form `[table]_[field]_[record_key]`. If the lookup fails, an empty string is returned. */
    get_localised_string(localisationKey: string): string | ""

     /**
     * Potentially adds the supplied ancillary to the character in the supplied context. 
     * When called, the function generates a random number between 0-100, and if this number is less than or equal to the supplied chance value, then the ancillary is added. 
     * The character to add the ancillary to is specified in the supplied context object, which must be a context object created by a character event (e.g. CharacterCompletedBattle, CharacterCreated).
     * This function is somewhat archaic and should only be used in exported ancillary scripts. 
     * For general script usage `force_add_ancillary` is greatly preferred.     
     * @param ancillaryKey 	Ancillary key, from the `ancillaries` table.
     * @param chance Ancillary key, from the ancillaries table.
     * @param context Context object, provided by a character event. 
     */
    ancillary(this: void, ancillaryKey: string, chance: number, context: IContext): void
     /**
      * Potentially adds the supplied trait points to the trait-recipient in the supplied context. 
      * When called, the function generates a random number between 0-100, and if this number is less than or equal to the supplied chance value then the trait points are added. 
      * The trait recipient is specified in the supplied context object, and the type of recipient must also be specified by a supplied string.
      * This function is somewhat archaic and should only be used in exported trait scripts. 
      * For adding traits to characters in general scripts `force_add_trait` is greatly preferred.
      * @param traitKey Trait key, from the `traits` table.
      * @param applicableToWhich Specifies the type of object to apply the trait to. Valid strings here are `agent` (for all characters), `region` and `unit`. Not all recipient types may currently be supported.
      * @param numberOfTrait Number of trait points to add, if successful.
      * @param chance Percentage chance that the trait will actually be added.
      * @param context Context object, provided by an event.
      */
    ancillary(this: void, traitKey: string, applicableToWhich: string, numberOfTrait: number, chance: number, context: IContext): void
     /**
      * Performs a VFS lookup of the supplied file and path, and returns whether the file exists in the virtual file system. The path should be specified from the working data folder.
      * @param path Path from data/ in which to look.
      */
    vfs_exists(path: string): boolean
 
}

interface IGameInterface {

}

interface ICampaignManager {
    null_interface(): any
    /** a function will fire right after loading has finished  */
    add_first_tick_callback(callback: Function): void
    spawn_character_to_pool(faction: string, forename: string, surname: string, clanname: string, othername: string, age: number, male: boolean, agentKey: string, agentSubtypeKey: string, immortal: boolean, artSetKey: string): ICharacterDetailsScript
    /** max and min are inclusive. multiplayer safe */
    random_number(max: number, min: number): number
    random_sort(list: Array<any>): Array<any>
    random_sort_copy(list: Array<any>): Array<any>
    shuffle_table(list: Array<any>): void
    /** forcefully add skill to a character. don't know what stringLookup is? search this in manual: Character Lookups 
     * @param stringLookUp Character lookup string. For more information, see Character Lookups.
     * @param skillKey Skill key, from the character_skills table.
    */
    add_skill(stringLookUp: string, skillKey: string): void
    /**
     * Attempts to trigger an incident from database records with one or more target game objects. 
     * The game object or objects to associate the incident with are specified by command-queue index. 
     * The incident will need to pass any conditions set up in the cdir_events_incident_option_junctions table in order to trigger.
     * A value of 0 may be supplied to omit a particular type of target.
     * @param factionCqi  Command-queue index of the faction to which the incident is issued. This must be supplied.
     * @param incidentKey Incident key, from the incidents table.
     * @param targetFactionCqi 	Command-queue index of a target faction. 0 may be specified to omit this target (and other target arguments following this one).
     * @param secondaryFactionCqi Command-queue index of a second target faction. May be 0.
     * @param characterCqi Command-queue index of a target character. May be 0.
     * @param militaryForceCqi Command-queue index of a target military force. May be 0.
     * @param regionCqi Command-queue index of a target region. May be 0.
     * @param settlementCqi Command-queue index of a target settlement. May be 0.
     */
    trigger_incident_with_targets( factionCqi: number, incidentKey: string, targetFactionCqi: number|0, secondaryFactionCqi: number|0, characterCqi: number|0, militaryForceCqi: number|0, regionCqi: number|0, settlementCqi: number|0): void
    /**
     * Remove a skill point from the specified character and skill. Returns true if successful.
     * @param stringLookUp Character lookup string. For more information, see Character Lookups.
     * @param skillKey Skill key, from the character_skills table.
     */
    remove_skill_point(stringLookUp: string, skillKey: string): true
    /** Various game interface functions lookup characters using a lookup string. This function converts a character into a lookup string that can be used by code functions to find that same character. It may also be supplied a character cqi in place of a character object. */
    char_lookup_str(whichCQIorWho: ICharacterScript | number): string
    set_saved_value(key: string, value: any): void
    get_saved_value(key: string): unknown 
    /** returns current turn number */
    turn_number(): number
    get_faction(factionKey: string, errorIfNotFound?: boolean): IFactionScript
    /**  Returns a character by it's command queue index. If no character with the supplied cqi is found then false is returned. */
    get_character_by_cqi(cqiNo: number): ICharacterScript | false
    /**
     * 
     * @param factionKey Faction key of the faction to which the force is to belong.
     * @param unitList Comma-separated list of keys from the land_units table. The force will be created with these units. This can be a blank string, or nil, if an empty force is desired.
     * @param regionKey Region key of home region for this force.
     * @param logialPosx logical co-ordinate of force.
     * @param logicalPosy y logical co-ordinate of force.
     * @param agentTypeKey Character type of character at the head of the army (should always be "general"?).
     * @param agentSubtypeKey 
     * @param forenameLocKey Localised string key of the created character's forename. This should be given in the localised text lookup format i.e. a key from the names table with "names_name_" prepended.
     * @param clanNameLocKey 
     * @param familyNameLocKey 
     * @param otherNameLocKey 
     * @param setAsFactionLeader 
     * @param successCallback Callback to call once the force is created. The callback will be passed the created military force leader's cqi as a single argument.
     * @param forceDiplomaticDiscovery Callback to call once the force is created. The callback will be passed the created military force leader's cqi as a single argument. (false as default)
     */
    create_force_with_general(factionKey: string, unitList: string | undefined, regionKey: string, logialPosx: number, logicalPosy: number, agentTypeKey: string, agentSubtypeKey: string, forenameLocKey: string, clanNameLocKey: string, familyNameLocKey: string, otherNameLocKey: string, setAsFactionLeader: boolean, successCallback?: CallbackCreateForce, forceDiplomaticDiscovery?: boolean): void
    find_valid_spawn_location_for_character_from_settlement(factionKey: string,regionKey: string, mustBeOnSea: boolean, mustBeInSameRegion: boolean, preferredSpawnDistance?: number): LuaMultiReturn<[logicalPosX: number, logicalPosY: number]>
    /** returns game model data for current campaign */
    model(): IModelScript
    /** Kills a specified character and their associated unit, and optionally also the entire military force they command. */
    kill_character_and_commanded_unit(characterLookUp: string, destroyTheForceToo: boolean): void
    /**
     * Grant the specified ancillary to the specified character.
     * @param who target character 
     * @param ancillaryKey 	Ancillary key, from the ancillaries table.
     * @param forceEquip if true the ancillary will be equipped and bypass any cooldowns or pre-conditions
     * @param dontShowNotification 	if true no event feed events will be generated by this action
     */
    force_add_ancillary(who: ICharacterScript, ancillaryKey: string, forceEquip: boolean, dontShowNotification: boolean): void
    /**
     * Remove the specified ancilliary from the specified character.
     * @param who  target character 
     * @param ancillaryKey Ancillary key, from the ancillaries table.
     * @param putItBackToPool Removes the ancillary from the character but leaves it in the pool of available ancillaries.
     * @param dontShowNotification if true no event feed events will be generated by this action
     */
    force_remove_ancillary(who: ICharacterScript, ancillaryKey: string, putItBackToPool: boolean, dontShowNotification: boolean): void
    /**
     * Grants the specified ancillary to the specified faction. The ancillary goes into that faction's ancillary pool, from where it may be equipped by a character.
     * @param whichFaction target faction
     * @param anciliaryKey 	Ancillary key, from the ancillaries table.
     * @param dontShowNotification if true no event feed events will be generated by this action
     */    
    add_ancillary_to_faction(whichFaction: IFactionScript, anciliaryKey: string, dontShowNotification: boolean): void
    /**
     * Remove all instances of the specified ancillary from every character, and the shared ancillary pool, of the specified faction.
     * @param whichFaction target faction
     * @param anciliaryKey 	Ancillary key, from the ancillaries table.
     */
    force_remove_ancillary_from_faction(whichFaction: IFactionScript, anciliaryKey: string): void
    /**
     * Reassign all ancillaries from one character to another.
     * @param who source character
     * @param toWhichGuy destination character
     */
    reassign_ancillaries_to_character_of_same_faction(who: ICharacterScript, toWhichGuy: ICharacterScript): void
    /**
     * Instructs the campaign director to attempt to trigger a mission of a particular type, based on a mission record from the database. The mission will be triggered if its conditions, session was successful     
     * defined in the cdir_events_mission_option_junctions, pass successfully. 
     * The function returns whether the mily triggered or not. 
     * Note that if the command is sent via the command queue then true will always be returned, regardless of whether the mission successfully triggers.
     * @param factionKey Faction key, from the factions table.
     * @param missionKey Mission key, from the missions table.
     * @param fireImmediately Set the mission to fire immediately, instead of waiting for the start of the faction's turn. This also overrides any delay set in the mission data.
     */
    trigger_mission(factionKey: string, missionKey: string, fireImmediately: boolean): boolean
    /**
     * Applies an effect bundle to a faction for a number of turns (can be infinite)
     * @param effectBundleKey Effect bundle key from the effect bundles table.
     * @param factionKey Faction key of the faction to apply the effect to.
     * @param turns Number of turns to apply the effect bundle for. Supply 0 here to apply the effect bundle indefinitely (it can be removed later with campaign_manager.remove_effect_bundle if required).
     */
    apply_effect_bundle(effectBundleKey: string, factionKey: string, turns: number): void
    remove_effect_bundle(effectBundleKey: string, factionKey: string): void
    /**
     * Constructs and displays an event. This wraps the cm.show_message_event function of the same name on the underlying episodic_scripting, although it provides input validation, output, whitelisting and a progression callback.
     * @param factionKey Faction key to who the event is targeted.
     * @param titleLocKey Localisation key for the event title. This should be supplied in the full `[table]_[field]_[key]` localisation format, or can be a blank string.
     * @param primaryLocKey Localisation key for the primary detail of the event. This should be supplied in the full `[table]_[field]_[key]` localisation format, or can be a blank string.
     * @param secondaryLocKey Localisation key for the secondary detail of the event. This should be supplied in the full `[table]_[field]_[key]` localisation format, or can be a blank string.
     * @param isPersistent Sets this event to be persistent instead of transient.
     * @param index Index indicating the type of event.
     * @param endCallback optional, default value=false Specifies a callback to call when this event is dismissed. Note that if another event message shows first for some reason, this callback will be called early.
     * @param callbackDelay optional, default value=0 Delay in seconds before calling the end callback, if supplied.
     * @param dontWhitelist optional, default value=false By default this function will whitelist the scripted event message type with campaign_manager.whitelist_event_feed_event_type. Set this flag to true to prevent this.
     */
    show_message_event(factionKey: string, titleLocKey: string, primaryLocKey: string, secondaryLocKey: string, isPersistent: boolean,  index: number, endCallback?: () => void, callbackDelay?: number, dontWhitelist?: boolean): void
    /**
     * Registers a turn countdown event. The supplied script event will be triggered after the specified number of turns has passed, when the FactionTurnStart event is received for the specified faction.
     * @param factionKey Key of the faction on whose turn start the event will be triggered.
     * @param turns Number of turns from now to trigger the event.
     * @param event Event to trigger. By convention, script event names begin with "ScriptEvent"
     * @param contextString optional, default value="" Optional context string to trigger with the event.
     */
    add_turn_countdown_event(factionKey: string, turns: number, event: string, contextString: string): void
    /** direct access to C++ game interface */
    get_game_interface(): IGameInterface
    /**
     * Forceably adds an trait to a character. This wraps the cm:force_add_trait function on the underlying episodic scripting interface, but adds validation and output. This output will be shown in the Lua - Traits debug console spool. 
     * @param stringLookup Character string of the target character, using the standard character string lookup system.
     * @param traitKey Trait key to add.
     * @param showMessage optional, default value=false Show message.
     * @param points optional, default value=1 Trait points to add. The underlying force_add_trait function is called for each point added.
     */
    force_add_trait(stringLookup: string, traitKey: string, showMessage?: boolean, points?: number): void
    /**
     * Removes the specified trait from the specified character. If the character is past the point of no return in the trait, it will be removed anyway.
     * @param stringLookup Character lookup string. For more information, see Character Lookups.
     * @param traitKey Trait key, from the character_traits database table.
     */
    force_remove_trait(stringLookup: string, traitKey: string): void
    /**
     * Spawns an agent of the specified type at the specified logical position.
     * @param faction Faction interface for the agent's faction.
     * @param x x logical co-ordinate.
     * @param y y logical co-ordinate.
     * @param agentTypeKey Agent type key, from the agents table.
     * @param agentSubtypeKey optional, default value="" Agent subtype key, from the agent_subtypes table. This can be omitted.
     */
    spawn_agent_at_position(faction: IFactionScript, x: number, y: number,  agentTypeKey: string,  agentSubtypeKey?: string): void
    /**
     * Replace the name of a character with a set of names from the database. Names must be specified by full localised text key, in the [table]_[key]_[field] format. Don't use this function on rebel characters.
     * If a value is not required for a particular name type then a blank string may be supplied for that parameter.
     * @param character Target character.
     * @param forename Localised forename key, in the `[table]_[key]_[field]` format. example: `"names_name_1053468021"`
     * @param surname  Localised surname key, in the `[table]_[key]_[field]` format.
     * @param clanName Localised clan name key, in the `[table]_[key]_[field]` format.
     * @param otherName Localised other name key, in the `[table]_[key]_[field]` format.
     */
    change_character_localised_name(character: ICharacterScript, forename: string, surname: string,  clanName: string,  otherName: string): void
    /**
     * Swap a model for a specific character. Same as add_unit_model_overrides, but doesn't use the character lookup.
     * @param character Character interface.
     * @param artSetKey Model key, from the campaign_character_art_sets database table.
     */
    add_character_model_override(character: ICharacterScript, artSetKey: string): void
    /**
     * Create and add a specifiec unit to a military force commanded by a specified character. The unit will only be created if there is room for it in the force.
     * @param stringLookup Character lookup string. For more information, see Character Lookups.
     * @param mainUnitKey Key of unit to create, from the main_units table.
     */
    grant_unit_to_character(stringLookup: string, mainUnitKey: string): void
    /**
     * Teleports a character to a logical position on the campaign map. This function is a wrapper for the cm:teleport_to function on the underlying episodic scripting interface. This wrapper adds debug output and argument validation.
This function can also reposition the camera, so it's best used on game creation to move characters around at the start of the campaign, rather than on the first tick or later.
     * @param stringLookup Character string of character to teleport. This uses the standard character string lookup system.
     * @param x Logical x co-ordinate to teleport to.
     * @param y Logical y co-ordinate to teleport to.
     */
    teleport_to(stringLookup: string, x: number, y: number): void
    /**
     * Kills the specified character, with the ability to also destroy their whole force if they are commanding one. The character may be specified by a lookup string or by character cqi.
     * @param stringLookupOrCqiNo Character string of character to kill. This uses the standard character string lookup system. Alternatively, a number may be supplied, which specifies a character cqi. 
     * @param destroyTheForceToo optional, default value=false Will also destroy the characters whole force if true.
     */
    kill_character(stringLookupOrCqiNo: string | number, destroyTheForceToo?: boolean): void
    /** Returns true if the pending battle has been won by the attacker, false otherwise. */
    pending_battle_cache_attacker_victory(): boolean
    /** Returns true if the pending battle has been won by the defender, false otherwise. */
    pending_battle_cache_defender_victory(): boolean
    /** Returns the number of attacking armies in the cached pending battle.
     * @returns number of attacking armies
     */
    pending_battle_cache_num_attackers(): number
    /**
     * Returns the family member cqi of a particular attacker in the cached pending battle. The attacker is specified by numerical index, with the first being accessible at record 1.
     * @param index index of attacker
     * @returns  family member cqi
     */
    pending_battle_cache_get_attacker_fm_cqi(index: number): number
    /**
     * Returns the family member cqi of a particular defender in the cached pending battle. The defender is specified by numerical index, with the first being accessible at record 1.
     * @param index index of defender
     */
    pending_battle_cache_get_defender_fm_cqi(index: number): number
    /**
     * Returns a family member by it's command queue index. If no family member with the supplied cqi is found then false is returned.
     * @param cqiNumber cqi
     */
    get_family_member_by_cqi(cqiNumber: number): IFamilyMemberScript
    /**
     * Returns the number of defending armies in the cached pending battle.
     * @returns number of defending armies (forces you see in the campaign map)
     */
    pending_battle_cache_num_defenders(): number
    /**
     * Returns records relating to a particular attacker in the cached pending battle. 
     * The attacker is specified by numerical index, with the first being accessible at record 1. 
     * This function returns the cqi of the commanding character, the cqi of the military force, and the faction name.
     * To get records of the units related to an attacker, use `cm.pending_battle_cache_num_attacker_units` and `cm.pending_battle_cache_get_attacker_unit`.
     * @param index starts from 1
     * @returns number character cqi
     * @returns number military force cqi
     * @returns string faction name
     */
    pending_battle_cache_get_attacker(index: number): LuaMultiReturn<[ characterCqi: number, militaryForceCqi: number, factionKey: string ]>
    /**
     * Returns records relating to a particular defender in the cached pending battle. 
     * The defender is specified by numerical index, with the first being accessible at record 1. 
     * This function returns the cqi of the commanding character, the cqi of the military force, and the faction name.
     * @param index starts from 1
     * @returns number character cqi
     * @returns number military force cqi
     * @returns string faction name
     */
    pending_battle_cache_get_defender(index: number): LuaMultiReturn<[ characterCqi: number, militaryForceCqi: number, factionKey: string ]>
    /** Returns true if the supplied character is a general and has an army, false otherwise. 
     * This includes garrison commanders - to only return true if the army is mobile use `cm.char_is_mobile_general_with_army`
     * @character character
     */
    char_is_general_with_army(character: ICharacterScript): boolean

    /**
     * Returns true if the supplied character is not a general, a colonel or a minister, false otherwise.
     * @param character character
     */
    char_is_agent(character: ICharacterScript): boolean

    /**
     * Returns true if the supplied character is of type 'general', false otherwise.
     * @param character 
     */
    char_is_general(character: ICharacterScript): boolean

    /**
     * Triggers dilemma with a specified key, based on a record from the database, preferentially wrapped in an intervention.   
     * The delivery of the dilemma will be wrapped in an intervention in singleplayer mode, whereas in multiplayer mode the dilemma is triggered directly.   
     * It is preferred to use this function to trigger a dilemma, unless the calling script is running from within an intervention in which case `cm.trigger_dilemma_raw` should be used.
     * @param factionKey Faction key, from the factions table.
     * @param dillemaKey Dilemma key, from the dilemmas table.
     * @param triggerCallback Callback to call when the intervention actually gets triggered. (default is null)
     * @returns Dilemma triggered successfully. true is always returned if an intervention is generated.
     */
    trigger_dilemma(factionKey: string, dillemaKey: string, triggerCallback?: VoidCallback): boolean
   
    /**
     * Replenishes the action points of a specified character.
     * @param characterLookup Character lookup string. For more information, see Character Lookups.
     */
    replenish_action_points(characterLookup: string): void

    /**
     * Adds all armory items in the specified armory set to the specified character.
     * @param characterObject The target
     * @param itemSetKey Key for armory item set to equip, from the armory_item_sets database table.
     * @param equipDefault 	Equips a default variant of each armory item (if one exists) if the target slot on the character is empty. Armory item variants are defined in the armory_item_variants database table.
     * @param clearConflictingItem 	Unequips any conflicting items when each item is equipped.
     * @returns any item was successfully equipped
     */
    add_armory_item_set_to_character(characterObject: ICharacterScript, itemSetKey: string, equipDefault: boolean, clearConflictingItem: boolean): boolean
    
    /**
     * Adds an armory item to a character.
     * @param characterObject Character to add item to.
     * @param itemKey Key for armory item to equip, from the `armory_items` database table.
     * @param equipDefault Equips a default variant of the armory item (if one exists) if the target slot on the character is empty. Armory item variants are defined in the `armory_item_variants` database table.
     * @param clearConflictingItem Unequips any conflicting items when this item is equipped.
     * @returns item was successfully equipped
     */
    add_armory_item_to_character(characterObject: ICharacterScript, itemKey: string, equipDefault?: boolean, clearConflictingItem?: boolean): boolean
    
    /**
     * Returns the active slot state for the specified armory item variant on the specified character. If no slot state value can be found then "INVALID" is returned.
     * @param characterObject 
     * @param itemVariant Variant of armory item to query, from the armory_item_variants database table
     */
    get_active_armory_item_variant_slot_state_for_character(characterObject: ICharacterScript, itemVariant: string): string

    /**
     * Equips a specific variant of an armory item on the specified character.
     * @param characterObj Character to add item to.
     * @param itemVariantKey 	Variant of armory item to equip, from the armory_item_variants database table.
     * @param clearConflictingItem Unequips any conflicting items when this item is equipped.
     */
    equip_armory_item_variant_on_character(characterObj: ICharacterScript, itemVariantKey: string, clearConflictingItem?: boolean): boolean

    /**
     * Removes an armory item from a character.
     * @param characterObject Character to remove item from
     * @param armoryItem Key for armory item to unequip, from the armory_items database table.
     */
    remove_armory_item_from_character(characterObject: ICharacterScript, armoryItem: string): boolean

    /**
     * Returns true if it's the supplied faction turn. The faction is specified by key.
     * @param factionKey Faction key, from the factions database table.
     */
    is_factions_turn_by_key(factionKey: string): boolean
    /**
     * Override the battle environment of upcoming battles. This needs to be cleared by calling it without any parameters.
     * @param enviromentGroupFileName The file path of the battle environment file. E.g. "weather/battle/wh_day_clear_02.environment_group"
     */
    set_battle_lighting_env_override(enviromentGroupFileName?: string): void
    /**
     * Remove the first instance of the specified unit from the force commanded by the specified character.
     * @param characterLookUp Character lookup string. For more information, see Character Lookups.
     * @param unitKey Key of unit to remove, from the main_units table.
     */
    remove_unit_from_character(characterLookUp: string, unitKey: string): void

    /**
     * Returns true if the supplied character's army contains an embedded character that is a caster, false otherwise.
     * @param character lord
     */
    general_has_caster_embedded_in_army(character: ICharacterScript): boolean
    /**
     * Swap a model for a certain character. This needs to be set up at a new session.
     * @param characterLookUp Character lookup string - see Character Lookups for more information.
     * @param campaignArtSetKey Model key, from the campaign_character_art_sets database table.
     */
    add_unit_model_overrides(characterLookUp: string, campaignArtSetKey: string): void

    /**
     * Suppresses or un-suppresses the immortality of the specified character. The character is specified by the command-queue index value of the related family_member interface.
     * @param cqiNumber Family member cqi.
     * @param surpressOrNot - true, Suppress immortality.
     */
    suppress_immortality(cqiNumber: number, surpressOrNot: boolean): void

    /**
     * Give some money to the faction
     */
    treasury_mod(factionKey: string, amount: number): void

    /**
     * Get region by key or script interface
     * If the region is not found, it will return false
     */
    get_region(region: string | IRegionScript): IRegionScript | false

    /**
     * Get province by key or script interface
     * If the province is not found, it will return false
     */
    get_province(province: string | IProvinceScript): IProvinceScript | false

    /**
     * Is the region owned by the faction?
     * @param regionName 
     * @param factionName 
     */
    is_region_owned_by_faction(regionName: string, factionName: string): boolean

    /**
     * Get the owner of the province  
     * Returns null if the province is not owned by any faction or multiple factions
     * @param province 
     */
    get_owner_of_province(province: IProvinceScript): IFactionScript | null
}

/** context of the callback or conditional checks, get your faction, char, etc. from here */
interface IContext {
    string?: string
    /**
     * This member is available for this following events:
     * 
     * - UITrigger
     */
    trigger?(): string
    /**
     * This member is available for this following events:
     * 
     * - UITrigger
     */
    faction_cqi?(): number
    /**
     * This member is available for this following events:
     * 
     * - ComponentLClickUp
     */
    component?: IUIComponentAddress 
    /** 
     * This function is available for this following events:  
     * 
     * - DilemmaChoiceMadeEvent
     * - FactionAboutToEndTurn  
     * - FactionBecomesActiveHuman  
     * - FactionBecomesIdleHuman  
     * - FactionBecomesLiberationVassal  
     * - FactionBeginTurnPhaseNormal  
     * - FactionCivilWarOccured  
     * - FactionCookedDish  
     * - FactionEvent  
     * - FactionJoinsConfederation    
     * - FactionRoundStart  
     * - FactionSubjugatesOtherFaction  
     * - FactionTurnEnd  
     * - FactionTurnStart  
     * - ImprisonmentEvent  
     * - ImprisonmentRejectionEvent  
     * - IncidentEvent  
     * - IncidentFailedEvent  
     * - IncidentOccuredEvent  
     * - MilitaryForceInfectionEvent  
     * - MissionCancelled  
     * - MissionEvent  
     * - MissionFailed  
     * - MissionIssued  
     * - MissionNearingExpiry  
     * - MissionStatusEvent  
     * - MissionSucceeded  
     * - PendingBankruptcy  
     * - PooledResourceChanged  
     * - PooledResourceEffectChangedEvent  
     * - PooledResourceEvent  
     * - PrisonActionTakenEvent  
     * - QueryShouldWaylayCaravan  
     * - RecruitmentItemIssuedByPlayer  
     * - RegionInfectionEvent  
     * - ResearchCompleted  
     * - ResearchStarted  
     * - TradeRouteEstablished  
     * - WarCoordinationRequestIssued  
     * - WoMCompassUserActionTriggeredEvent  
     * - WoMCompassUserDirectionSelectedEvent  
     * - FactionJoinsConfederation
     */
    faction?() : IFactionScript
    /**
     * This function is available for this following events:  
     * 
     * - CampaignArmiesMerge  
     * - CampaignCoastalAssaultOnCharacter
     * - CampaignCoastalAssaultOnGarrison
     * - CharacterAncillaryGained
     * - CharacterArmoryItemUnlocked
     * - CharacterAttacksAlly
     * - CharacterBecomesFactionLeader
     * - CharacterBlockadedPort
     * - CharacterBrokePortBlockade
     * - CharacterCanLiberate
     * - CharacterCandidateBecomesMinister
     * - CharacterCapturedSettlementUnopposed
     * - CharacterCharacterTargetAction
     * - CharacterComesOfAge
     * - CharacterCompletedBattle
     * - CharacterConvalescedOrKilled
     * - CharacterCreated
     * - CharacterDiscovered
     * - CharacterDisembarksNavy
     * - CharacterEmbarksNavy
     * - CharacterEntersAttritionalArea
     * - CharacterEntersGarrison
     * - CharacterEvent
     * - CharacterFactionCompletesResearch
     * - CharacterGarrisonTargetAction
     * - CharacterGarrisonTargetEvent
     * - CharacterInfoPanelOpened
     * - CharacterLeavesGarrison
     * - CharacterLootedSettlement
     * - CharacterMarriage
     * - CharacterParticipatedAsSecondaryGeneralInBattle
     * - CharacterPerformsActionAgainstFriendlyTarget
     * - CharacterPerformsSettlementOccupationDecision
     * - CharacterPerformsSettlementOccupationDecision
     * - CharacterPostBattleEnslave
     * - CharacterPostBattleRelease
     * - CharacterPostBattleSlaughter
     * - CharacterPromoted
     * - CharacterRankUp
     * - CharacterRankUpNeedsAncillary
     * - CharacterRazedSettlement
     * - CharacterRecruited
     * - CharacterRelativeKilled
     * - CharacterSackedSettlement
     * - CharacterSelected
     * - CharacterSkillPointAvailable
     * - CharacterTargetEvent
     * - CharacterTurnEnd
     * - CharacterTurnStart
     * - CharacterWaaaghOccurred
     * - CharacterWithdrewFromBattle
     * - FactionLeaderDeclaresWar
     * - FactionLeaderSignsPeaceTreaty
     * - GarrisonAttackedEvent
     * - GarrisonOccupiedEvent
     * - HaveCharacterWithinRangeOfPositionMissionEvaluationResultEvent
     * - LandTradeRouteRaided
     * - MovementPointsExhausted
     * - MultiTurnMove
     * - ScriptedCharacterUnhidden
     * - ScriptedCharacterUnhiddenFailed
     * - SeaTradeRouteRaided
     * - SpawnableForceCreatedEvent
     * - TeleportationNetworkCharacterNodeClosureHandedOver
     * - TeleportationNetworkMoveCompleted
     * - TeleportationNetworkMoveStart
     * - TradeNodeConnected
     * - TriggerPostBattleAncillaries
     * - CharacterArmoryItemEquipped
     * - CharacterArmoryItemUnequipped
     * - CharacterArmoryItemEvent
     * - CharacterArmoryItemUnlocked
     */
    character?(): ICharacterScript
    /** This function is available for this following events:  
     * 
     * - NewCharacterEnteredRecruitmentPool 
     */
    character_details?(): ICharacterDetailsScript
     /** This function is available for this following events:  
     * 
     * - CharacterSkillPointAllocated 
     */
    skill_point_spent_on?(): string
    /** This function is available for this following events:  
     * 
     * - CharacterCharacterTargetAction
     * - CharacterGarrisonTargetAction 
     */
    mission_result_critial_success?(): boolean
    /** This function is available for this following events:  
     * 
     * - CharacterCharacterTargetAction
     * - CharacterGarrisonTargetAction 
     */
    mission_result_success?(): boolean
    /**
     * This function is available for this following events:  
     * 
     * - CharacterRankUp
     */
    ranks_gained?(): number
    /**
     * This function is available for this following events:  
     * 
     * - BuildingCompleted
     * - BuildingConstructionIssuedByPlayer
     * - ForeignSlotBuildingCompleteEvent
     * - ForeignSlotBuildingDamagedEvent
     * - MilitaryForceBuildingCompleteEvent
     * - RegionAbandonedWithBuildingEvent
     */
    building?(): IBuildingScript
    /**
     * This function is available for this following events:  
     * 
     * - BuildingCancelled
     * - BuildingCompleted
     * - BuildingConstructionIssuedByPlayer
     * - CampaignBuildingDamaged
     * - CampaignCoastalAssaultOnGarrison
     * - CharacterBlockadedPort
     * - CharacterCapturedSettlementUnopposed
     * - CharacterEntersGarrison
     * - CharacterGarrisonTargetAction
     * - CharacterGarrisonTargetEvent
     * - CharacterLeavesGarrison
     * - CharacterLootedSettlement
     * - CharacterPerformsSettlementOccupationDecision
     * - CharacterRazedSettlement
     * - CharacterSackedSettlement
     * - GarrisonAttackedEvent
     * - GarrisonOccupiedEvent
     * - GarrisonResidenceEvent
     * - GarrisonResidenceExposedToFaction
     * - SettlementSelected
     * - TriggerPostBattleAncillaries
     */
    garrison_residence?(): IGarrisonResidenceScript
    /** This function is available for this following events:  
     * 
     *  - TriggerPostBattleAncillaries
     */
    pending_battle?(): IPendingBattleScript
    /** This function is available for this following events:  
     * 
     * ?
     */
    dilemma?(): string
    /** This function is available for this following events:  
     * 
     * - DilemmaChoiceMadeEvent
     */
    choice?(): number
    /** This function is available for this following events:  
     * 
     * - DilemmaChoiceMadeEvent 
     */
    choice_key?(): string
    /** This function is available for this following events:  
     * 
     * - DilemmaChoiceMadeEvent 
     */
    campaign_model?(): IModelScript
    /** This function is available for this following events:  
     * 
     * - DilemmaChoiceMadeEvent 
     */
    dilemma?(): string
    /** This function is available for this following events:  
     * 
     * - PositiveDiplomaticEvent 
     */
    proposer?(): IFactionScript
    /** This function is available for this following events:  
     * 
     * - PositiveDiplomaticEvent 
     */
    recipient?(): IFactionScript
    /** This function is available for this following events:  
     * 
     * - PositiveDiplomaticEvent 
     */
    is_alliance?(): boolean
    /** This function is available for this following events:  
     * 
     * - PositiveDiplomaticEvent 
     */
    is_military_alliance?(): boolean
    /** This function is available for this following events:  
     * 
     * - PositiveDiplomaticEvent 
     */
    is_defensive_alliance?(): boolean
    /** This function is available for this following events:  
     * 
     * - PositiveDiplomaticEvent 
     */
    is_peace_treaty?(): boolean
    /** This function is available for this following events:  
     * 
     * - PositiveDiplomaticEvent 
     */
    is_military_access?(): boolean
    /** This function is available for this following events:  
     * 
     * - PositiveDiplomaticEvent 
     */
    is_trade_agreement?(): boolean
    /** This function is available for this following events:  
     * 
     * - PositiveDiplomaticEvent 
     */
    is_non_aggression_pact?(): boolean
    /** This function is available for this following events:  
     * 
     * - PositiveDiplomaticEvent 
     */
    is_vassalage?(): boolean
    /** This function is available for this following events:  
     * 
     * - PositiveDiplomaticEvent 
     */
    proposer_is_vassal?(): boolean
    /** This function is available for this following events:  
     * 
     * - PositiveDiplomaticEvent 
     */
    is_state_gift?(): boolean
    /** This function is available for this following events:  
     * 
     * - PositiveDiplomaticEvent 
     */
    state_gift_amount?(): number

    /**
     *  This function is available for this following events:  
     * 
     *  - CharacterPerformsSettlementOccupationDecision
     */
    occupation_decision_type?(): string
    
    /**
     *  This function is available for this following events:  
     * 
     *  - TriggerPostBattleAncillaries
     */
    has_stolen_ancillary?(): boolean

    /**
     *   This function is available for this following events:  
     * 
     *  - CharacterArmoryItemUnlocked
     *  - CharacterArmoryItemUnequipped
     *  - CharacterArmoryItemEvent
     *  - CharacterArmoryItemEquipped
     */
    item_variant_key?(): string

    /**
     *   This function is available for this following events:  
     * 
     *  - CharacterAncillaryGained
     *  - FactionGainedAncillary
     */
    ancillary?(): string
    /**
     *   This function is available for this following events:  
     * 
     *  - ResearchCompleted
     */
    technology?(): string

     /**
     *   This function is available for this following events:  
     * 
     *  - FactionJoinsConfederation
     */
    confederation?(): IFactionScript
}

interface IRealTimer {
    /** it's recommended to use setInterval or setTimeout instead */
    unregister(this: void, name: string): void
    /** it's recommended to use setInterval or setTimeout instead */
    register_repeating(this: void, name: string, delayInMs: number): void
    /** it's recommended to use setInterval or setTimeout instead */
    register_singleshot(this: void, name: string, delayInMs: number): void
}

type VoidCallback = {
    (): void
}

type ConditionalTest = {
    (context: IContext) : boolean
}
type Callback = {
    (context: IContext) : void
}

type ConstString2Number = { 
    [id: string]: number 
}

type ConstString2String = {
    [id: string]: string
}

interface ICore {
    add_listener(listenerName: string, eventName: string, conditionalTest: ConditionalTest | Boolean, callback: Callback, persistsAfterCall :boolean): void
    trigger_event(whatEvent: string, ...varag: any[]): void
    /**
     * It is recommended to use `CommonUserInterface.GetRootUI` instead
     * @returns the root UI
     */
    get_ui_root(): IUIComponent
    /**
     * It is recommended to use `CommonUserInterface.New` instead
     * Creates a UI component with the supplied name, or retrieves it if it's already been created.
     * @param name Name to give uicomponent.
     * @param filePath File path to uicomponent layout, from the working data folder.
     * @param parent optional, default value=ui_root Parent uicomponent.
     */
    get_or_create_component(name: string,  filePath: string, parent?: IUIComponent): LuaMultiReturn<[createdUIComponent: IUIComponent, success: boolean]>    
}

interface ICampaignUI {
    /**
     * Allows the script running on one machine in a multiplayer game to cause a scripted event, UITrigger, to be triggered on all machines in that game. By listening for this event, scripts on all machines in a multiplayer game can therefore respond to a UI event occuring on just one of those machines.  
     * An optional string event id and number faction cqi may be specified.   
     * If specified, these values are passed from the triggering script through to all listening scripts, using the context objects supplied with the events.   
     * The event id (rpcEventString) may be accessed by listening scripts by calling `<context>.trigger()` on the supplied context object, and can be used to identify the script event being triggered.   
     * The faction cqi may be accessed by calling `<context>.faction_cqi()` on the context object, and can be used to identify a faction associated with the event.  
     * Both must be specified, or neither.
     * @param factionCqi 
     * @param rpcEventString 
     */
    TriggerCampaignScriptEvent(factionCqi: number, rpcEventString: string): void
}

declare const bit : {
    band(this: void, a: number, b: number): number
    bor(this: void, a: number, b: number): number
    bxor(this: void, a: number, b: number): number
    lshift(this: void, a: number, shiftBy: number): number
    rshift(this: void, a: number, shiftBy: number): number
    arshift(this: void, a: number, shiftBy: number): number
    bnot(this: void, a: number): number
}

declare const cm: ICampaignManager
declare const core: ICore
declare const common: ICommonGameAPI
declare const real_timer: IRealTimer
declare const CampaignUI: ICampaignUI



interface IDebugger {
    enterDebugLoop(this: void, stackDepth: number, whatMessage: string): void
    print(category: "error" | "warning" | "log", ...msg: string[]): void
}

/**
 * ONLY AVAILABLE when TW DEBUGGER mod is loaded!
 */
declare const debuggee: IDebugger | null