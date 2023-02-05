_G.EDockingPoint = _G.EDockingPoint or {
    DOCK_POINT_NONE = 0,
    DOCK_POINT_TL =	1,
    DOCK_POINT_TC =	2,
    DOCK_POINT_TR =	3,
    DOCK_POINT_CL =	4,
    DOCK_POINT_C  =	5,
    DOCK_POINT_CR =	6,
    DOCK_POINT_BL =	7,
    DOCK_POINT_BC =	8,
    DOCK_POINT_BR =	9
}

_G._TypescriptInternalState = _G._TypescriptInternalState or {
    ModalDialogsQueue = {}
}


out("typescript api compat is loaded!")
