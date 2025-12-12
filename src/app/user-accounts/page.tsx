import { getAllUsers } from "@/app/actions";
import AdminNav from "@/app/components/adminNavigation";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Accounts | SustainWear",
};

export default async function UserAccounts() {
  let res = await getAllUsers();

  if (res.status === 200 && res.data) {
    let { admins, charities, donors } = res.data;

    return (
      <>
        <AdminNav />
        <main className="p-8">
          <h2 className="rounded-full bg-primary p-2 text-center text-2xl font-bold text-white">
            User Accounts
          </h2>

          <section className="my-8">
            <h3 className="text-xl font-bold">
              Admins{admins.length > 0 && ` (${admins.length})`}
            </h3>
            {admins.length === 0 ? (
              <p>No users.</p>
            ) : (
              <div className="w-full overflow-x-auto">
                <table className="w-full users-table mb-4">
                  <thead>
                    <tr className="border-b">
                      <th>ID</th>
                      <th>E-mail</th>
                      <th>Name</th>
                      <th>Address</th>
                      <th>Postcode</th>
                      <th>Phone number</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admins.map(
                      ({
                        UserID,
                        Email,
                        FirstName,
                        MiddleName,
                        LastName,
                        Address,
                        Postcode,
                        PhoneNumber,
                        Status,
                      }) => (
                        <tr key={UserID} className="border-b">
                          <td>{UserID}</td>
                          <td>{Email}</td>
                          <td>{[FirstName, MiddleName, LastName].join(" ")}</td>
                          <td>{Address}</td>
                          <td>{Postcode}</td>
                          <td>{PhoneNumber}</td>
                          <td>{Status}</td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <section className="my-8">
            <h3 className="text-xl font-bold">
              Charities{charities.length > 0 && ` (${charities.length})`}
            </h3>
            {charities.length === 0 ? (
              <p>No users.</p>
            ) : (
              <div className="w-full overflow-x-auto">
                <table className="users-table mb-4">
                  <thead className="border-b">
                    <tr>
                      <th>ID</th>
                      <th>E-mail</th>
                      <th>Name</th>
                      <th>Charity Name</th>
                      <th>Description</th>
                      <th>Address</th>
                      <th>Postcode</th>
                      <th>Phone number</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {charities.map(
                      ({
                        UserID,
                        Email,
                        FirstName,
                        MiddleName,
                        LastName,
                        Address,
                        Postcode,
                        PhoneNumber,
                        Status,
                        CharityName,
                        Description,
                      }) => (
                        <tr key={UserID} className="border-b">
                          <td>{UserID}</td>
                          <td>{Email}</td>
                          <td>{[FirstName, MiddleName, LastName].join(" ")}</td>
                          <td>{CharityName}</td>
                          <td className="whitespace-normal! min-w-50">
                            {Description}
                          </td>
                          <td>{Address}</td>
                          <td>{Postcode}</td>
                          <td>{PhoneNumber}</td>
                          <td>{Status}</td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <section className="my-4">
            <h3 className="text-xl font-bold">
              Donors{donors.length > 0 && ` (${donors.length})`}
            </h3>
            {donors.length === 0 ? (
              <p>No users.</p>
            ) : (
              <div className="w-full overflow-x-auto">
                <table className="users-table mb-4">
                  <thead>
                    <tr className="border-b">
                      <th>ID</th>
                      <th>E-mail</th>
                      <th>Name</th>
                      <th>Address</th>
                      <th>Postcode</th>
                      <th>Phone number</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donors.map(
                      ({
                        UserID,
                        Email,
                        FirstName,
                        MiddleName,
                        LastName,
                        Address,
                        Postcode,
                        PhoneNumber,
                        Status,
                      }) => (
                        <tr key={UserID} className="border-b">
                          <td>{UserID}</td>
                          <td>{Email}</td>
                          <td>{[FirstName, MiddleName, LastName].join(" ")}</td>
                          <td>{Address}</td>
                          <td>{Postcode}</td>
                          <td>{PhoneNumber}</td>
                          <td>{Status}</td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </main>
      </>
    );
  }

  // return 404 to hide the fact that page exists at all
  return notFound();

  /*<div className="text-center p-8 text-xl">
    You must be logged in to access this page.
  </div>;*/
}
