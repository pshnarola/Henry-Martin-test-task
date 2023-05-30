type IContact = {
    id?: number
    firstName?: string
    lastName?: string
    status?: string
}

type ContactState = {
    contactList: IContact[],
    contactDetails: IContact
    error: any
}

type ContactAction = {
    type: string
    payload: IContact
}

type DispatchType = (args: ContactAction) => ContactAction