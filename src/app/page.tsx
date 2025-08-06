"use client";

import Image from "next/image";
import { ConnectButton, TransactionButton, useActiveAccount, useReadContract } from "thirdweb/react";
import { getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { claimTo } from "thirdweb/extensions/erc1155";
import thirdwebIcon from "@public/thirdweb.svg";
import { client } from "./client";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

const CONTRACT_ADDRESS = "0xe7F4ABC55d3B05a9bf7619400c1235Bb2A0cBF09";

export default function Home() {
  const account = useActiveAccount();
  const { toast } = useToast();
  
  const contract = getContract({
    client,
    chain: sepolia,
    address: CONTRACT_ADDRESS,
  });

  // For now, we'll use placeholder values since the exact contract methods depend on your contract
  // You'll need to replace these with the actual contract calls for your ERC1155 contract
  const claimed = 0; // Replace with actual contract read
  const total = 1000; // Replace with actual contract read
  const progressPercent = Math.min((claimed / total) * 100, 100);

  return (
    <main className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center p-6 text-zinc-100">
      <Card className="max-w-md w-full bg-zinc-800 rounded-xl shadow-lg p-8 flex flex-col items-center space-y-6">
        <Image
          src={thirdwebIcon}
          alt="thirdweb logo"
          className="w-36 h-36 drop-shadow-lg"
          priority
        />
        <CardContent className="text-center">
          <CardTitle className="text-4xl font-bold">Mint your NFT on Sepolia</CardTitle>
          <CardDescription className="text-zinc-300 mt-2">
            Mint your NFT for free on Sepolia testnet. Just connect your wallet and mint 1 NFT for 0.0001 ETH.
          </CardDescription>
        </CardContent>

        <div className="flex space-x-4 w-full justify-center">
          <ConnectButton client={client} />
          
          {account && (
            <TransactionButton
              transaction={() => claimTo({
                contract,
                to: account.address,
                tokenId: 0n, // Adjust based on your token ID
                quantity: 1n,
              })}
              onTransactionConfirmed={() => {
                toast({
                  title: "Successfully minted NFT!",
                  description: "Your NFT has been minted successfully!",
                });
              }}
              className="px-6 py-3 rounded-lg font-semibold shadow-md transition bg-blue-600 hover:bg-blue-700"
            >
              Mint 1 NFT (0.0001 ETH)
            </TransactionButton>
          )}
        </div>

        <div className="w-full">
          <div className="flex justify-between mb-1 text-sm text-zinc-400">
            <span>Minted: {claimed} / {total}</span>
            <span>{Math.floor(progressPercent)}%</span>
          </div>
          <Progress value={progressPercent} className="h-4 rounded-full bg-zinc-700" />
        </div>

        <div className="mt-4 text-xs text-zinc-400 italic">
          Contract deployed on Sepolia testnet
        </div>
      </Card>
    </main>
  );
}
