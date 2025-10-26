import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Katakana from './katakana.jsx';
import Hiragana from './hiragana.jsx';
import Layout from "../components/Layout.jsx";
export function Home() {

  const navigate = useNavigate()
  return (
    <Layout>
      <div className=" w-full h-full p-4">
        <div className="border w-full h-[250px] rounded-xl">

        </div>
      </div>
    </Layout>
  );
}

