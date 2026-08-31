import TrusteonComissioned from "../models/comissioned.model.js";

async function setComissionedValue (wallet, options = {}) {
  return await TrusteonComissioned.create(wallet, options)
}

export default {
  setComissionedValue
}
