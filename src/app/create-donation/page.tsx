import { Metadata } from "next";
import CreateDonationForm from "./Form";

export const metadata: Metadata = {
  title: "Create donation | SustainWear",
};

export default function CreateDonation() {
  return <CreateDonationForm />;
}
