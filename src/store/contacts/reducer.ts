import { v4 as uuidv4 } from 'uuid';
import {
  ADD_CONTACT,
  REMOVE_CONTACT,
  EDIT_CONTACT,
  VIEW_CONTACT
} from "./actionTypes"

const INIT_STATE: ContactState = {
  contactList: [],
  contactDetails: {},
  error: {},
}

const contacts = (state = INIT_STATE, action: ContactAction) => {
  switch (action.type) {

    case ADD_CONTACT:
      return {
        ...state,
        contactList: [...state.contactList, { id: uuidv4(), ...action.payload }],
      }

    case REMOVE_CONTACT:
      const copyData: any = [...state.contactList];
      copyData.splice(action?.payload, 1);
      return {
        ...state,
        contactList: copyData,
      }

    case EDIT_CONTACT:
      const tempData: any = [...state.contactList];
      const findIndex: number = state?.contactList?.findIndex(o => o?.id === action?.payload?.id)
      tempData[findIndex] = action?.payload
      return {
        ...state,
        contactList: tempData,
      }

    case VIEW_CONTACT:
      return {
        ...state,
        contactDetails: action?.payload
      }

    default:
      return state
  }
}

export default contacts
