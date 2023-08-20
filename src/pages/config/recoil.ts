import { RecoilEnv } from 'recoil';

const env =  process.env.NODE_ENV || 'development';

if (env === 'development') {
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;
}