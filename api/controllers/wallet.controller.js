import walletService from "../services/wallet.service.js"

async function getUserWallet (req, res, next) {
  try {
    const { authorId } = req.query

    res.send(await walletService.getUserWallet(authorId))
    logger.info('GET IN getUserWallet')
  } catch (error) {
    next(error)
  }
}

export default {
  getUserWallet
}