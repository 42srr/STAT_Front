import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function NewSideBar() {
  let navigate = useNavigate();

  return (
    <>
      {/* LOGO section */}
      <div className="h-1/6">
        hello
        <img src="" alt="" />
      </div>
      {/* SEARCH section */}
      <div className="h-1/6">
        <div className="flex flex-row outline outline-slate-200 rounded-full justify-between">
          <div>searching. . . </div>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
        </div>
      </div>
      {/* NAVIGATION section */}
      <div>
        <div className="flex flex-row justify-around outline outline-violet-400 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
            <path fill-rule="evenodd" d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" clip-rule="evenodd" />
          </svg>
          <div>HOME</div>
        </div>
      </div>
    </>
  );
}
