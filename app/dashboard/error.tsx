"use client";

import React from "react";

const error = ({ error, reset }: { error: string; reset: () => void }) => {
  return (
    <div className="modal-box">
      <h3 className="font-bold text-lg">Hello!</h3>
      <p className="py-4">{error}</p>
      <div className="modal-action">
        <form method="dialog">
          <button className="btn" onClick={reset}>
            Retry
          </button>
        </form>
      </div>
    </div>
  );
};

export default error;
