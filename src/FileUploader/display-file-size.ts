export function DisplayFileSize(bytes: number): string {
    if (bytes > 1000000) {
        return (bytes / 1000000).toFixed(2).toString() + " Mb"
    }
    if (bytes > 1000) {
        return (bytes / 1000).toFixed(2).toString() + " Kb" 
    }
    return bytes + " b"
}