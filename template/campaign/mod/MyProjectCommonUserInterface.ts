namespace MyProject {

    /**
     * Displays alert dialog box
     * @param message the message to display
     * @param onAccept when ok button was clicked
     */
    export function alert(message: string, onAccept: VoidCallback = () => {}) { // eslint-disable-line
        new CommonUserInterface.MessageBox(message, onAccept)
    }

    /**
     * Displays confirmation dialog box (Yes/No)
     * @param message the message to display
     * @param onAccept what happens if yes clicked
     * @param onCancel what happens if no clicked (defaults does nothing)
     */
    export function confirm(message: string, onAccept: VoidCallback, onCancel: VoidCallback = () => {}) { // eslint-disable-line
        new CommonUserInterface.MessageBox(message, onAccept, onCancel)
    }

    export namespace CommonUserInterface {

        const logger = new Logger("MyProject CommonUserInterface")

        /** Destroy one or more components */
        export function Destroy(...components: IUIComponent[]) {
            const name = `Destroy_MyProject_${RandomString(5)}`
            const dummy = New(name, "ui/campaign ui/script_dummy", GetRootUI())
            if(dummy == null) return

            for (const component of components) {
                dummy.Adopt(component.Address())
            }
            dummy.DestroyChildren()
            dummy.Destroy()
        }

        /**
         * Creates new UI from a file.
         * @param identifier the name of this created UI
         * @param uiFilePath *.twui.xml file path. Must be valid. XML must be valid
         * @param parent parent of this UI. optional, defaults will be UI root.
         * @returns the created compoenent. Will return null if creation was failed
         */
        export function New(identifier: string, uiFilePath: string, parent: IUIComponent = GetRootUI()): IUIComponent | null {
            const result = core.get_or_create_component(identifier, uiFilePath, parent)
            if(result[1] == false) {
                logger.LogError(`Unable to initalise New component with this param identifier: ${identifier} uiFilePath: ${uiFilePath}. Verify the path or validity of the ui file!`)
                return null
            }
            return result[0]
        }

        /**
         * Gets the Root UI
         */
        export function GetRootUI(): IUIComponent {
            return core.get_ui_root()
        }

        /** 
         * Casts opaque pointer `IUIComponentAddress` into usable `IUIComponent` object
         */
        export function Cast(address: IUIComponentAddress | IUIComponent): IUIComponent {
            return UIComponent(address)
        }

        /**
         * Finds and returns a uicomponent based on a set of strings that define its path in the ui hierarchy. This parent uicomponent can be supplied as the first argument - if omitted, the root uicomponent is used. 
         * Starting from the parent or root, the function searches through all descendants for a uicomponent with the next supplied uicomponent name in the sequence. 
         * If a uicomponent is found, its descendants are then searched for a uicomponent with the next name in the list, and so on until the list is finished or no uicomponent with the supplied name is found. 
         * @param parentComponent 
         * @param componentNames 
         * @returns the component, returns null if it can't find what you're looking for.
         */
        export function Find(parentComponent?: IUIComponent, ...componentNames: string[]): IUIComponent | null {
            const result = find_uicomponent(parentComponent, ...componentNames)
            if(result != false) return result
            return null
        }

        export class MessageBox implements IPopupDialog {
            private static readonly PropagatePriority = 1000

            readonly identifier = `MessageBox_MyProject_${RandomString(5)}`
            private messageBoxComponent : IUIComponent
            private message: string
            private onAccept: VoidCallback
            private onCancel: VoidCallback | undefined
            
            constructor(message: string, onAccept: VoidCallback, onCancel?: VoidCallback) {
                const result = New(this.identifier, "ui/common ui/dialogue_box", GetRootUI())
                if(result == null) {
                    logger.LogError("Unable to initalise messagebox. get_or_create_component returned null!")
                    throw("Unable to initalise messagebox")
                }

                this.messageBoxComponent = result

                this.message = message
                this.onAccept = onAccept
                this.onCancel = onCancel
                this.Push()
                this.Show()
            }
            
            Push(): void {
                _TypescriptInternalState.ModalDialogsQueue.push(this)
            }

            Pop(): void {
                _TypescriptInternalState.ModalDialogsQueue.shift()
            }

            private Top(): IPopupDialog | null {
                if(_TypescriptInternalState.ModalDialogsQueue.length == 0) return null
                return _TypescriptInternalState.ModalDialogsQueue[0]
            }

            Show(): void {
                if(this != _TypescriptInternalState.ModalDialogsQueue[0]) return

                setTimeout(() => {
                    const bothGroup = Find(this.messageBoxComponent, `both_group`)
                    const okGroup = Find(this.messageBoxComponent, `ok_group`)
                    const dyText = Find(this.messageBoxComponent, `DY_text`)

                    if(bothGroup == null) {
                        logger.LogError("Unable to initalise messagebox. bothGroup returned null!")
                        throw("Unable to initalise messagebox")
                    }

                    if(okGroup == null) {
                        logger.LogError("Unable to initalise messagebox. okGroup returned null!")
                        throw("Unable to initalise messagebox")
                    }

                    if(dyText == null) {
                        logger.LogError("Unable to initalise messagebox. dyText returned null!")
                        throw("Unable to initalise messagebox")
                    }

                    bothGroup.SetDockingPoint(EDockingPoint.DOCK_POINT_BC)
                    bothGroup.SetDockOffset(0, 0)

                    okGroup.SetDockingPoint(EDockingPoint.DOCK_POINT_BC)
                    okGroup.SetDockOffset(0, 0)

                    dyText.SetDockingPoint(EDockingPoint.DOCK_POINT_C)

                    const textDimensionW = this.messageBoxComponent.Width() * 0.9
                    const textDimensionH = this.messageBoxComponent.Height() * 0.8

                    dyText.Resize(textDimensionW, textDimensionH)
                    dyText.SetDockOffset(1, -35)

                    dyText.SetVisible(true)

                    this.messageBoxComponent.PropagatePriority(MessageBox.PropagatePriority)
                    this.messageBoxComponent.LockPriority()
                    this.messageBoxComponent.RegisterTopMost()

                    if(this.onCancel != null) {
                        bothGroup.SetVisible(true)
                        okGroup.SetVisible(false)
                    } else {
                        bothGroup.SetVisible(false)
                        okGroup.SetVisible(true)
                    }

                    const dimension = dyText.TextDimensionsForText(this.message)
                    dyText.ResizeTextResizingComponentToInitialSize(dimension[0], dimension[1])
                    dyText.SetStateText(this.message, this.message)
                    dyText.Resize(textDimensionW, textDimensionH)

                    dyText.ResizeTextResizingComponentToInitialSize(textDimensionW, textDimensionH)
                    
                    this.Pop()
                    core.add_listener(
                        `onclick event messagebox ${this.identifier}`,
                        `ComponentLClickUp`,
                        context => {
                            if(context.component == null) return false
                            const button = Cast(context.component)
                            const buttonPressed = button.Id() == `button_tick` || button.Id() == `button_cancel`
                            const elementId = Cast(Cast(button.Parent()).Parent()).Id()
                            return buttonPressed && elementId == this.identifier
                        },
                        context => {
                            const selectedButton = context.string
                            if(selectedButton == "button_tick") {
                                this.onAccept()
                                this.Top()?.Show()

                            }
                            else {
                                if(this.onCancel) this.onCancel()
                                this.Top()?.Show()
                            }                            
                        }, 
                        false
                    )                    
                }, 10)
            }
        }
    }    
    
}