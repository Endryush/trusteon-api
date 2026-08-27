import express from 'express';
import jwtAuth from '../middlewares/jwtAuth.js';
import walletController from '../controllers/wallet.controller.js';


const router = express.Router()

router
  .get('/', jwtAuth, walletController.getUserWallet)

export default router
