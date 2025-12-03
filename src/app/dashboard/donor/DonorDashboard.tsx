import Card from "@/app/components/Card";
import StatusPill from "@/app/components/StatusPill";
import Image from "next/image";

export default function DonorDashboard() {
  return (
    <div className="flex justify-around">
      <Card title="Recent Donation">
        <StatusPill status="success">Donation accepted</StatusPill>
        <StatusPill status="warning">Waiting for review</StatusPill>
        <StatusPill status="error">Donation rejected</StatusPill>

        <div className="aspect-3/2 overflow-hidden">
          <Image
            src="/images/jacket-1.jpeg"
            alt="Old Jacket"
            width={500}
            height={700}
            className="block"
          />
        </div>

        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti
          magnam, non illum eaque quas neque ipsa qui eum laudantium est, quo
          voluptates fugit ullam saepe, nihil ipsum quos dolor modi!
        </p>
      </Card>
      <Card title="Recent Statistics">
        <div
          className="aspect-1/1 bg-gray-300 rounded-full flex justify-center items-center"
          style={{
            backgroundImage:
              "conic-gradient(#729458 0, #729458 120deg, #44403b 120deg, #44403b 0)"
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
  );
}
