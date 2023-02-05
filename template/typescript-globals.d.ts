interface IPopupDialog {
    Push(): void
    Pop(): void
    Show(): void
}

interface ITypescriptInternalState {
    readonly ModalDialogsQueue: IPopupDialog[]
}

/** DO NOT TOUCH THIS VARIABLE. YOU CAN BREAK OTHER MODS! */
declare const _TypescriptInternalState: ITypescriptInternalState