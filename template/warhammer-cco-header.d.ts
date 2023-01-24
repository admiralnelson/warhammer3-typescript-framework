interface IComponentContextObject {
    /**
     * Execute command on the CCO. Note: You need to cast it to string or number if you're executing a command like this `AgentSubtypeRecordContext().Key`
     * @param commandString Command such as SkillList.At()
     */
    Call(commandString: string): null | IComponentContextObject | string | number | boolean
    Isvalid(): boolean
    ObjectId(): string
    TypeId(): string
}

/**
 * Returns an IComponentContextObject from `ccoCommandStr` query. Returns null if failed
 * @param ccoCommandStr 
 * @param arg 
 */
declare function cco(this: void, ccoCommandStr: string, arg?: string | number): IComponentContextObject | null

