export interface IComment {
    id: number
    name: string
    email: string
    body: string
}

export type GetComments = IComment[]