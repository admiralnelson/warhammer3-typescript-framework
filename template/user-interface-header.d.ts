/* eslint-disable */
/// <reference path="wahammer-header.d.ts" />

declare function find_uicomponent(this:void, componentName: string):  IUIComponent | false
/** it is recommended to use `CommonUserInterface.Find` instead */
declare function find_uicomponent(this:void, parentComponent?: IUIComponent, ...componentNames: string[]): IUIComponent | false
declare function uic_pairs(this:void, parentComponent: IUIComponent): Iterable<IUIComponent>

/**
 * Casts a component memory address, returned by several functions such as `uicomponent.Find`, 
 * into a valid uicomponent script object so that functions in the uicomponent script interface may be called on it.
 * @param address 
 */
declare function UIComponent(address: IUIComponentAddress | IUIComponent): IUIComponent

declare enum EDockingPoint {
    /** no dock */
    DOCK_POINT_NONE = 0,
    /** top left */
    DOCK_POINT_TL =	1,
    /** top centre */
    DOCK_POINT_TC =	2,
    /** top right */
    DOCK_POINT_TR =	3,
    /** centre left */
    DOCK_POINT_CL =	4,
    /** dead centre */
    DOCK_POINT_C  =	5,
    /** centre right */
    DOCK_POINT_CR =	6,
    /** bottom left */
    DOCK_POINT_BL =	7,
    /** bottom centre */
    DOCK_POINT_BC =	8,
    /** bottom right */
    DOCK_POINT_BR =	9
}

/**
 * An opaque pointer to IUIComponent
 */
interface IUIComponentAddress {

}

interface IUIComponent {
    /** Returns the number of images associated with the subject uicomponent. */
    NumImages(): number
    /** Returns the path of an image associated with the subject uicomponent. The image is specified by a 0-based index. */
    GetImagePath(index?: number): string
    /**
     * 
     * Sets a new image path for an image associated with the uicomponent, replacing the original image with something new. Multiple images can be associated with a uicomponent - the index of the image to overwrite can be set with the second parameter or by setting a "script_icon_index" user property on the uicomponent with uicomponent:SetProperty. If an index value is not set with either of these methods then the first image, image 0, is swapped.
     * The uicomponent:GetImagePath and uicomponent:NumImages functions can be used to query images related to a uicomponent.
     */
    SetImagePath(imagePath: string, imageIndex?: number, resize?: boolean): void
    /**
     * 
     * Sets the text on the current state of the uicomponent to the supplied text. 
     * Localised text must be specified - common.get_localised_string can be used to look this up from anywhere in the database.
     */
    SetStateText(localisedText: string, textSource: string): void
    /**
     * Returns the text on the current state of the uicomponent along with its dimensions. This text will be localised.
     * */
    GetStateText(): LuaMultiReturn<[localisedUicomponentText: string, stringtableKey: string]>
    /**
     * Sets the state of the uicomponent to the specified state name.
     * @param stateName  state name
     */
    
    /**
     * Sets the text on all available states of the uicomponent to the supplied text.  
     * Localised text must be specified  
     * common.get_localised_string can be used to look this up from anywhere in the database.
     * @param localisedText Localised text.
     * @param textSource source of text in format of a stringtable key (tablename_recordname_key)
     */
    SetText(localisedText: string, textSource?: string): void

    SetState(stateName: string): boolean
    /** Returns the name of the current state of the uicomponent. */
    CurrentState(): string
    /** Sets the visibility state of this uicomponent. */
    SetVisible(visible: boolean): void
    /** Sets the visibility state of this uicomponent and all its children */
    PropagateVisibility(visible: boolean): void
    /** Gets the context object (cco lua type) for the supplied type that is stored on the component */
    GetContextObject(contextTypeId: string): IComponentContextObject | null
    /** Gets the context object Id from context type Id */
    GetContextObjectId(contextTypeId: string): string | null
    /** Sets the docking point of the uicomponent to the specified value. 
     * @param dockPoint dock point
    */
    SetDockingPoint(dockPoint: EDockingPoint): void
    /**
     * Sets a docking offset for this component, which offsets where the component is drawn from the docking point set.
     * @param x X offset in pixels.
     * @param y Y offset in pixels.
     */
    SetDockOffset(x: number, y: number): void
    /**
     * Returns the current width of the uicomponent in pixels.
     */
    Width(): number
    /**
     * Returns the current height of the uicomponent in pixels.
     */
    Height(): number
    /**
     * Resizes the uicomponent. 
     * The uicomponent may be need to set to be resizeable before calling this - this can be done with `uicomponent.SetCanResizeHeight` and `uicomponent.SetCanResizeWidth`.
     * @param width 	New width of uicomponent in pixels.
     * @param height 	New width of uicomponent in pixels.
     * @param resizeChildren Also resize children. (Defaults: true)
     */
    Resize(width: number,  height: number,  resizeChildren?: boolean): void
    /**
     * Sets the component priority of this uicomponent and all its children to the supplied value. The old priority of the uicomponent is returned.
     * @param priority priority
     * @returns old priority number
     */
    PropagatePriority(priority: number): number
    /**
     * Activates a priority lock on the uicomponent. This disables all uicomponents with a priority value less than the priority of the lock. A priority may optionally be specified - if not, the uicomponent's own priority is used. 
     * `uicomponent.UnLockPriority` must be called after calling this function to restore normal ui functionality.
     * @param pritory priority number (Defaults: null)
     */
    LockPriority(pritory?: number): void
    /**
     * Deactivates a priority lock on the uicomponent.
     */
    UnLockPriority(): void
    /**
     * Returns the dimensions of the some supplied text, were it to be displayed on the uicomponent in its current state.
     * @param text 
     */
    TextDimensionsForText(text: string): LuaMultiReturn<[width: number, height: number, lines: number]>
    /**
     * Returns the dimensions of the text displayed on the uicomponent in its current state, if any.
     */
    TextDimensions(): LuaMultiReturn<[width: number, height: number, lines: number]>
    /**
     * Many uicomponents are set to resize based on the text they are displaying. Despite this, it is sometimes desireable to resize these uicomponents (to set a different width for a text box that can grow, for example). 
     * However, any attempt by script to resize these uicomponents will be overriden by the text resizing behaviour.
     * This function provides a method of working around this, temporarily disabling the text-resizing behaviour so that the desired resize can be applied.
     * @param width 
     * @param height 
     */
    ResizeTextResizingComponentToInitialSize(width: number, height: number): void
    /**
     * Compels this uicomponent to adopt a supplied uicomponent, which will then become a child of this uicomponent. 
     * The supplied uicomponent is removed from its previous parent. 
     * The target uicomponent must be supplied by its address, which may be retrieved with `uicomponent.Address`.
     * An insertion index may optionally be supplied, which determines where in this uicomponent's list of children this new child will be inserted. This can determine the display order in certain circumstances. By default, the new child is added to the end of the list.
     * @param uicomponentAddress uicomponent address
     * @param insertionIndex default is 1
     */
    Adopt(uicomponentAddress: IUIComponentAddress, insertionIndex?: number): void
    /** Returns the address of this uicomponent, which is used for certain other functions on this interface such as `uicomponent.Adopt`. 
     * @returns opaque pointer
    */
    Address(): IUIComponentAddress
    /** Destroys all children of this uicomponent. */
    DestroyChildren(): void
    /** Destroys this uicomponent. */
    Destroy(): void
    /**
     * Registers this uicomponent to be drawn topmost. Topmost uicomponents are drawn outside of the normal hierarchy on the top of all other uicomponents. 
     * This setting is useful for uicomponents such as tooltips that must always be drawn over the top of other visible parts of the UI.
     */
    RegisterTopMost(): void
    /**
     * Returns the string name of this uicomponent.
     */
    Id(): string
    /**
     * Finds a component via its guid (globally unique identifier). 
     * A 16 digit hex code that is guranteed to be unique across the game. 
     * No good for finding dynamic things, but useful for finding things that exist in layouts.
     * @param guid example: "730A2C75-2C65-4337-BCB8189F0C65FAC2"
     */
    FindByGuid(guid: string): IUIComponentAddress
    /**
     * Returns a link to the parent of the uicomponent. 
     * This is provided as a component address that must be cast to be a 
     * usable uicomponent script object using the `UIComponent` function or `CommonUserInterface.Cast` function
     */
    Parent(): IUIComponentAddress
    /**
     * Returns whether this uicomponent is visible, all its parents are visible, and the hierarchy is attached to the ui root. 
     * If the supplied parent (or an ancestor of it) is orphaned from the ui root this function will return false where `uicomponent.Visible` may return true, 
     * as the uicomponent would not be displayed if not attached to the ui root.
     */
    VisibleFromRoot(): boolean
    /**
     * Simulates a left-click on the uicomponent. 
     * Relative co-ordinates at which the click is simulated on the component may optionally be specified. Both arguments must be supplied to specify a position.
     * @param x X co-ordinate of click on component. Default null
     * @param y Y co-ordinate of click on component. Default null
     */
    SimulateLClick(x?:number, y?:number): void
    /**
     * Returns whether this uicomponent is interactive or not. Non-interactive uicomponents do not respond to any mouse events.
     */
    IsInteractive(): boolean
    /**
     * Sets this uicomponent to be interactive or not. Non-interactive uicomponents do not respond to any mouse events.
     * @param isInteractive 
     */
    SetInteractive(isInteractive: boolean): void
    /**
     * Returns whether or not the mouse cursor is currently over this uicomponent or any of its children.
     */
    IsMouseOverChildren(): boolean

    /**
     * Returns the number of immediate children this uicomponent has.  
     * These children can be individually retrieved by using uicomponent.Find and supplying a numeric value.  
     */
    ChildCount(): number

    /**
     * Finds and returns a child of this uicomponent by string name or by numeric index.  
     *  - If a numeric index is supplied, the immediate child uicomponent corresponding to this number is returned.  
     *  - If a string name is supplied, a recursive search is made through all children/descendants of this uicomponent. The first that is found with a matching name is returned.  
     *  - If the search target was not found then nil is returned.   
     *  - If it was found then it is returned as a component address, which must be cast to a uicomponent script object using the UIComponent function.   
     * The find_uicomponent function provided by the script libraries does this automatically, so it's recommended to use that function in place of this function.
     * @param index 
     * @param assertOnFail 
     */
    Find(index: number|string, assertOnFail?: boolean): IUIComponentAddress | null
}