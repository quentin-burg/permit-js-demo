import { PUBLIC_TEZOS_RPC } from '$env/static/public';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { TezosToolkit } from "@taquito/taquito";
import { writable } from 'svelte/store';

export const Tezos = new TezosToolkit(PUBLIC_TEZOS_RPC);

export let myAccount = writable(undefined);

const wallet = new BeaconWallet ({
  name: 'Training',
  preferredNetwork: 'custom',
});

export async function connectWallet() {
  const a = await wallet.requestPermissions({
    network: {
      type: 'custom',
      name: "Local node",
      rpcUrl: "http://localhost:20000",
    }
  });

  console.log(a);
  Tezos.setWalletProvider(wallet);
  myAccount.set(await wallet.client.getActiveAccount());
}

export async function getPKH() {
  return await wallet.getPKH();
}

export async function getBalance() {
  const activeAccount = wallet.client.getActiveAccount();
  if (activeAccount) {
    return await Tezos.tz.getBalance(activeAccount.address);
  }
}

console.log("My tezos library loaded successfully");
