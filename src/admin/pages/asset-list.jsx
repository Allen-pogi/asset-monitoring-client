// src/components/AssetsDashboard.jsx
import React from "react";

const AssetsDashboard = () => {
  // Sample data for the table
  const assets = [
    {
      name: "Server A1",
      type: "Server",
      status: "Online",
      statusColor: "bg-primary",
      location: "Data Center 1, Rack 3",
      lastMaintenance: "2023-11-15",
    },
    {
      name: "Laptop B2",
      type: "Laptop",
      status: "In Use",
      statusColor: "bg-primary/70",
      location: "Office, Desk 5",
      lastMaintenance: "2023-12-01",
    },
    {
      name: "Network Switch C3",
      type: "Network",
      status: "Online",
      statusColor: "bg-primary",
      location: "Data Center 1, Rack 2",
      lastMaintenance: "2023-11-20",
    },
    {
      name: "Desktop D4",
      type: "Desktop",
      status: "Offline",
      statusColor: "bg-black/40 dark:bg-white/40",
      location: "Storage Room",
      lastMaintenance: "2023-10-10",
    },
    {
      name: "Printer E5",
      type: "Printer",
      status: "Online",
      statusColor: "bg-primary",
      location: "Office, Desk 1",
      lastMaintenance: "2023-12-05",
    },
  ];

  return (
    <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8 bg-background-light h-screen   dark:bg-background-dark">
      <div className="mx-auto max-w-7xl ">
        {/* Header */}
        <div className="mb-6 flex flex-col w-full bg-background-light dark:bg-background-dark text-black dark:text-white items-start justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="text-3xl font-bold text-black dark:text-white">
            Assets
          </h1>
          <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90">
            <span className="material-symbols-outlined text-base"> add </span>
            <span>Add New Asset</span>
          </button>
        </div>

        {/* Filters */}
        <div className="mb-4 flex flex-wrap items-center gap-4">
          <div className="relative">
            <button className="flex items-center gap-2 rounded-lg border border-black/20 dark:border-white/20 bg-background-light dark:bg-background-dark px-4 py-2 text-sm font-medium text-black dark:text-white hover:bg-primary/10 dark:hover:bg-primary/20">
              <span>Asset Type</span>
              <span className="material-symbols-outlined text-base">
                {" "}
                expand_more{" "}
              </span>
            </button>
          </div>
          <div className="relative">
            <button className="flex items-center gap-2 rounded-lg border border-black/20 dark:border-white/20 bg-background-light dark:bg-background-dark px-4 py-2 text-sm font-medium text-black dark:text-white hover:bg-primary/10 dark:hover:bg-primary/20">
              <span>Status</span>
              <span className="material-symbols-outlined text-base">
                {" "}
                expand_more{" "}
              </span>
            </button>
          </div>
        </div>

        {/* Assets Table */}
        <div className="overflow-x-auto rounded-lg border border-black/20 dark:border-white/20 bg-background-light dark:bg-background-dark shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-black/5 dark:bg-white/5">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-black dark:text-white">
                  Asset Name
                </th>
                <th className="px-6 py-4 text-left font-semibold text-black dark:text-white">
                  Type
                </th>
                <th className="px-6 py-4 text-left font-semibold text-black dark:text-white">
                  Status
                </th>
                <th className="px-6 py-4 text-left font-semibold text-black dark:text-white">
                  Location
                </th>
                <th className="px-6 py-4 text-left font-semibold text-black dark:text-white">
                  Last Maintenance
                </th>
                <th className="px-6 py-4 text-left font-semibold text-black dark:text-white"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10 dark:divide-white/10">
              {assets.map((asset, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-black dark:text-white font-medium">
                    {asset.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-black/70 dark:text-white/70">
                    {asset.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${asset.statusColor} text-primary`}
                    >
                      <span
                        className={`mr-1.5 h-2 w-2 rounded-full ${asset.statusColor}`}
                      ></span>
                      {asset.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-black/70 dark:text-white/70">
                    {asset.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-black/70 dark:text-white/70">
                    {asset.lastMaintenance}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary hover:text-primary/80">
                      <span className="material-symbols-outlined text-xl">
                        more_horiz
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default AssetsDashboard;
