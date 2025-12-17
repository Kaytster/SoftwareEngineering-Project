import React from "react";
import DonorDashboard from "./DonorDashboard";
import { Metadata } from "next";
import { verifySession } from "../../../../lib/session";

export const metadata: Metadata = {
  title: "Dashboard | SustainWear",
};

export default async function Dashboard() {
  const session = await verifySession();

  if (!session) {
    return <div>You must be logged in to access this page!</div>;
  }

  return <DonorDashboard donorId={session.userId} />;
}
