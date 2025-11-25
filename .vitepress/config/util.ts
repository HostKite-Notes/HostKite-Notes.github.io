export const formatNoteName = (name: string) => {
    return name?.replace(/[/📘📝]/g, '').trim()
}

export const resolveSidebarInfo = (line: string) => {
    const index = line.indexOf(".")
    return {seq: Number(line.substring(0, index)), name: (line.substring(index + 1) ?? '').trim()}
}