import { toUtf8Bytes } from "ethers";
import { encode_input_from_js, decode_output_from_js } from "@sin7y/ola-abi-wasm";
import { poseidon_u64_bytes_for_bytes_wrapper } from "@sin7y/ola-crypto";

function getAbiBytes(abi: any[]) {
  const abiJson = JSON.stringify(abi);
  return toUtf8Bytes(abiJson);
}

/**
 *
 * @param abi abi array
 * @param method method signature
 * @param params params array
 * @returns BigUint64Array
 */
export function encodeAbi(abi: any[], method: string, params: Record<string, any>[]) {
  const result = encode_input_from_js(getAbiBytes(abi), method, params) as string[];
  return BigUint64Array.from(result.map((item) => BigInt(item)));
}

export function decodeAbi(abi: any[], method: string, data: BigUint64Array) {
  const result = decode_output_from_js(getAbiBytes(abi), method, data);
  return result;
}

export function poseidonHash(data: Uint8Array) {
  console.log("poseidon_u64_bytes_for_bytes_wrapper", data);
  const result = poseidon_u64_bytes_for_bytes_wrapper(data);
  return Uint8Array.from(result);
}
