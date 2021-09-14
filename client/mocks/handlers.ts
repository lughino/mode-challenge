import { rest } from 'msw';
import { walletId } from '../src/constants';

const getWallet = rest.get(`/wallet/${walletId}`, (req, res, ctx) => res(
    ctx.json({
      id: walletId,
    }),
  ));

// const createTransaction = rest.get(`/transaction/wallet/${walletId}`, (req, res, ctx) => {
//   const { username } = req.body;

//   return res(
//     ctx.json({
//       id: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
//       username,
//       firstName: 'John',
//       lastName: 'Maverick',
//     }),
//   );
// });

export const handlers = [getWallet];
