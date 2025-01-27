/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  IZKVerifier,
  IZKVerifierInterface,
} from "../../IVerifier.sol/IZKVerifier";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "proof",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "verify_instance",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "aux",
        type: "uint256[]",
      },
      {
        internalType: "uint256[][]",
        name: "target_instance",
        type: "uint256[][]",
      },
    ],
    name: "verify",
    outputs: [],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class IZKVerifier__factory {
  static readonly abi = _abi;
  static createInterface(): IZKVerifierInterface {
    return new Interface(_abi) as IZKVerifierInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): IZKVerifier {
    return new Contract(address, _abi, runner) as unknown as IZKVerifier;
  }
}
