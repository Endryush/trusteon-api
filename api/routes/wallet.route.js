import express from 'express';
import jwtUserAuth from '../middlewares/jwtUserAuth.js';
import walletController from '../controllers/wallet.controller.js';


const router = express.Router()

router
  .get('/', jwtUserAuth , walletController.getUserWallet)

export default router