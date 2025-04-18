import React from "react";

const SidebarSkeleton = () => {
  return (
    <div className="border-r border-base-300 p-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">👥</span>
        <h2 className="text-xl font-semibold">Chats</h2>
      </div>
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 rounded-lg animate-pulse"
          >
            <div className="w-10 h-10 rounded-full bg-base-300" />
            <div className="space-y-2">
              <div className="h-4 w-24 bg-base-300 rounded" />
              <div className="h-3 w-16 bg-base-300 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarSkeleton;
