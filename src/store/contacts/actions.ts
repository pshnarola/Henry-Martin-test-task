import {
  ADD_CONTACT,
  REMOVE_CONTACT,
  EDIT_CONTACT,
  VIEW_CONTACT,
} from "./actionTypes"


export const addNewContact = (payload: IContact) => ({
  type: ADD_CONTACT,
  payload,
})

export const updateContact = (payload: IContact) => ({
  type: EDIT_CONTACT,
  payload,
})

export const removeContact = (id: number) => ({
  type: REMOVE_CONTACT,
  payload: id,
})

export const viewContact = (payload: IContact) => ({
  type: VIEW_CONTACT,
  payload,
})

