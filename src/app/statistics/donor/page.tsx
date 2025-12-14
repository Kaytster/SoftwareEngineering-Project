import { Metadata } from "next";
import DonorStats from "./DonorStats";

export const metadata: Metadata = {
  title: "Statistics | SustainWear"
}

export default function Stats() {
  let signedAsDonor = true;

  if (signedAsDonor) {
    return <DonorStats />
  }

  return "Not signed in";
}
