import { Metadata } from "next";
import CreateDonationForm from "./Form";
import { verifySession } from "../../../lib/session";
import DonorNav from "../components/donorNavigation";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Create donation | SustainWear",
};

export default async function CreateDonation() {
  const session = await verifySession();

  if (session && session.userRole === "Donor") {
    return (
      <>
        <DonorNav />
        <CreateDonationForm />
      </>
    );
  }

  return (
    <div className="text-center p-8">
      You must be{" "}
      <Link href="/login" className="underline text-primary">
        logged in
      </Link>{" "}
      as a donor to access this page.
    </div>
  );
}
