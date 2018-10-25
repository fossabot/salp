// Exports information about the current environment
export const isDebug = process.env.NODE_ENV === "development"

export const isElectronMainProcess = process.type === 'browser'
export const isElectronRendererProcess = process.type === 'renderer'
export const electronProcess = process.type
