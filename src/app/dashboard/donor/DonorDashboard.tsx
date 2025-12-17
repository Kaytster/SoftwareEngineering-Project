"use client";

import Card from "@/app/components/Card";
import StatusPill from "@/app/components/StatusPill";
import Image from "next/image";
import DonorNav from "@/app/components/donorNavigation";
import { useEffect, useState } from "react";
import { IDonation } from "@/app/api/getDonorLastMonthDonations/[userId]/route";

export default function DonorDashboard({ donorId }: { donorId: string }) {
  const [status, setStatus] = useState("fetch");
  const [mostRecentDonation, setMostRecentDonation] =
    useState<IDonation | null>(null);

  useEffect(() => {
    fetch(`/api/getDonorLastMonthDonations/${donorId}`)
      .then((res) => res.json())
      .then(({ data }: { data: IDonation[] }) => {
        setStatus("success");
        // Still in wrong order for some reason
        // So just grab the last one then
        setMostRecentDonation(data.length > 0 ? data[data.length - 1] : null);

        console.log(data)
      })
      .catch((err) => {
        setStatus("error");
        console.error(`Error while fetching donations:
        ${err}`);
      });


  }, []);

  return (
    <main>
      <header>
        <DonorNav />
      </header>

      <div className="flex justify-around mt-8">
        <Card title="Recent Donation">
          {status === "fetch" && (
            <StatusPill status="skeleton">Loading donations...</StatusPill>
          )}
          {status === "error" && (
            <StatusPill status="error">
              Failed to retrieve your donations.
            </StatusPill>
          )}

          {status === "success" && mostRecentDonation !== null ? (
            <>
              <StatusPill
                status={
                  mostRecentDonation.Status === "ACCEPTED"
                    ? "success"
                    : mostRecentDonation.Status === "REJECTED"
                      ? "error"
                      : "warning"
                }
              >
                {mostRecentDonation.Status}
              </StatusPill>
              <div className="overflow-hidden relative">
                <img
                  src={`/uploads/${mostRecentDonation.ServerName}`}
                  alt=""
                  // layout="fill"
                  // objectFit="contain"
                  // width={500}
                  // height={700}
                  className="block"
                />
              </div>
              <p>Date of donation: {mostRecentDonation.DateTime}</p>
            </>
          ) : (
            <StatusPill status="warning">
              You do not have any recent donations.
            </StatusPill>
          )}
        </Card>
        <Card title="Recent Statistics">
          <div
            className="aspect-1/1 bg-gray-300 rounded-full flex justify-center items-center"
            style={{
              backgroundImage:
                "conic-gradient(#729458 0, #729458 120deg, #44403b 120deg, #44403b 0)",
            }}
          >
            <div
              className="aspect-1/1 rounded-full bg-secondary flex justify-center items-center text-4xl font-bold"
              style={{ width: "calc(100% - 3rem)" }}
            >
              10 kg
            </div>
          </div>
          <p className="text-center text-xl">
            CO<sub>2</sub> saved this month
          </p>
        </Card>
      </div>
    </main>
  );
}
