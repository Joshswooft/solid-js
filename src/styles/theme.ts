import { Status } from "../FileUploader/types"

const colors = {
    pending: '#3bb5e9',
    warning: '#ffb103',
    completed: '#007D1E',
    error: 'red',
    gray: '#959595'
}

function StatusToColor(s: Status): string {
    return colors[s.toLowerCase()]
}

export const theme = {
    colors,
    statusToColor: StatusToColor
}

