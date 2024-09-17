import TrusteonComissioned from "../models/comissioned.model.js";



async function setComissionedValue (wallet) {
  try {
    return await TrusteonComissioned.create(wallet);   
  } catch (error) {
    throw error
  }
}

export default {
  setComissionedValue
}