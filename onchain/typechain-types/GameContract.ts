/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export interface GameContractInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "DEV_ONLY_setStates"
      | "getStates"
      | "highscore"
      | "owner"
      | "playerHighScore"
      | "setOwner"
      | "setVerifier"
      | "setVerifierImageCommitments"
      | "settleProof"
      | "verifier"
      | "x_position"
      | "y_position"
      | "zk_image_commitments"
  ): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: "VerificationSucceeded"): EventFragment;

  encodeFunctionData(
    functionFragment: "DEV_ONLY_setStates",
    values: [BigNumberish, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "getStates", values?: undefined): string;
  encodeFunctionData(functionFragment: "highscore", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "playerHighScore",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setOwner",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setVerifier",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setVerifierImageCommitments",
    values: [[BigNumberish, BigNumberish, BigNumberish]]
  ): string;
  encodeFunctionData(
    functionFragment: "settleProof",
    values: [BigNumberish[], BigNumberish[], BigNumberish[], BigNumberish[][]]
  ): string;
  encodeFunctionData(functionFragment: "verifier", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "x_position",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "y_position",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "zk_image_commitments",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "DEV_ONLY_setStates",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getStates", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "highscore", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "playerHighScore",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setOwner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setVerifier",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setVerifierImageCommitments",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "settleProof",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "verifier", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "x_position", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "y_position", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "zk_image_commitments",
    data: BytesLike
  ): Result;
}

export namespace VerificationSucceededEvent {
  export type InputTuple = [sender: AddressLike];
  export type OutputTuple = [sender: string];
  export interface OutputObject {
    sender: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface GameContract extends BaseContract {
  connect(runner?: ContractRunner | null): GameContract;
  waitForDeployment(): Promise<this>;

  interface: GameContractInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  DEV_ONLY_setStates: TypedContractMethod<
    [
      _x_position: BigNumberish,
      _y_position: BigNumberish,
      _highscore: BigNumberish,
      _playerHighscore: BigNumberish
    ],
    [void],
    "nonpayable"
  >;

  getStates: TypedContractMethod<
    [],
    [[bigint, bigint, bigint, bigint]],
    "view"
  >;

  highscore: TypedContractMethod<[], [bigint], "view">;

  owner: TypedContractMethod<[], [string], "view">;

  playerHighScore: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;

  setOwner: TypedContractMethod<[new_owner: AddressLike], [void], "nonpayable">;

  setVerifier: TypedContractMethod<
    [verifier_address: AddressLike],
    [void],
    "nonpayable"
  >;

  setVerifierImageCommitments: TypedContractMethod<
    [commitments: [BigNumberish, BigNumberish, BigNumberish]],
    [void],
    "nonpayable"
  >;

  settleProof: TypedContractMethod<
    [
      proof: BigNumberish[],
      verify_instance: BigNumberish[],
      aux: BigNumberish[],
      instances: BigNumberish[][]
    ],
    [void],
    "nonpayable"
  >;

  verifier: TypedContractMethod<[], [string], "view">;

  x_position: TypedContractMethod<[], [bigint], "view">;

  y_position: TypedContractMethod<[], [bigint], "view">;

  zk_image_commitments: TypedContractMethod<
    [arg0: BigNumberish],
    [bigint],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "DEV_ONLY_setStates"
  ): TypedContractMethod<
    [
      _x_position: BigNumberish,
      _y_position: BigNumberish,
      _highscore: BigNumberish,
      _playerHighscore: BigNumberish
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "getStates"
  ): TypedContractMethod<[], [[bigint, bigint, bigint, bigint]], "view">;
  getFunction(
    nameOrSignature: "highscore"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "playerHighScore"
  ): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "setOwner"
  ): TypedContractMethod<[new_owner: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setVerifier"
  ): TypedContractMethod<[verifier_address: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setVerifierImageCommitments"
  ): TypedContractMethod<
    [commitments: [BigNumberish, BigNumberish, BigNumberish]],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "settleProof"
  ): TypedContractMethod<
    [
      proof: BigNumberish[],
      verify_instance: BigNumberish[],
      aux: BigNumberish[],
      instances: BigNumberish[][]
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "verifier"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "x_position"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "y_position"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "zk_image_commitments"
  ): TypedContractMethod<[arg0: BigNumberish], [bigint], "view">;

  getEvent(
    key: "VerificationSucceeded"
  ): TypedContractEvent<
    VerificationSucceededEvent.InputTuple,
    VerificationSucceededEvent.OutputTuple,
    VerificationSucceededEvent.OutputObject
  >;

  filters: {
    "VerificationSucceeded(address)": TypedContractEvent<
      VerificationSucceededEvent.InputTuple,
      VerificationSucceededEvent.OutputTuple,
      VerificationSucceededEvent.OutputObject
    >;
    VerificationSucceeded: TypedContractEvent<
      VerificationSucceededEvent.InputTuple,
      VerificationSucceededEvent.OutputTuple,
      VerificationSucceededEvent.OutputObject
    >;
  };
}
