import Card from "@/app/components/Card";
import DonorNav from "@/app/components/donorNavigation";

export default function DonorStats() {
  let co2Saved = 100;
  let co2Goal = 120;
  let deg = co2Saved / co2Goal * 360;

  return (
  <main>
    <header>
      <DonorNav />
    </header>
   <div className="flex justify-around">
    <Card title="Clothes Donated">
      <div className="aspect-square bg-[url('/images/parcel.png')] bg-cover bg-center flex items-center justify-center">

        <div className="text-8xl font-bold relative top-12">50</div>
      </div>
    </Card>
    <Card title="CO₂ Saved">
      <div
        className="aspect-1/1 bg-gray-300 rounded-full flex justify-center items-center"
        style={{
          backgroundImage:
            `conic-gradient(#729458 0, #729458 ${deg}deg, #44403b ${deg}deg, #44403b 0)`
        }}
      >
        <div
          className="aspect-1/1 rounded-full bg-secondary flex justify-center items-center text-6xl font-bold"
          style={{ width: "calc(100% - 3rem)" }}
        >
          {co2Saved} kg
        </div>
      </div>
    </Card>
  </div>
  </main>
  )
}
