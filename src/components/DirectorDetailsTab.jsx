import React from "react";

function DirectorDetailsTab() {
  return (
    <div className="border rounded-lg overflow-hidden animate-fadeIn overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-slate-100 border-b">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Role</th>
            <th className="p-3">Share</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3">Kubasu Ivan</td>
            <td className="p-3">Director</td>
            <td className="p-3 font-bold text-blue-600">50%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default DirectorDetailsTab;
