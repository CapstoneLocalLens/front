import { useEffect } from "react";

import { RadarChartComponent } from "./RadarChart";
import { DetailSheet } from "./DetailSheet";

import Image from "next/image";
import personLogo from "@/images/person.png";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuthenticatedFetch } from "@/hooks/useAuthenticatedFetch";

import { useAreaStore } from "@/lib/store";

export const AreaAnalysisPart = () => {
  const router = useRouter();
  const { authFetch } = useAuthenticatedFetch();
  const { name, setName } = useAreaStore();

  const handleCompareButton = () => {
    router.push("/marketAreaAnalysis/compare");
  };

  const handleDateCompareButton = () => {
    router.push("/marketAreaAnalysis/dateCompare");
  };

  useEffect(() => {
    const authFetchGetData = async () => {
      const response = await authFetch("http://backend", {
        method: "GET",
      });

      if (!response.ok) throw new Error("Failed to fetch data...");

      const data = await response.json();
      console.log(data);

      return data;
    };

    authFetchGetData();
  }, []);

  return (
    <>
      <div className="w-[42%] h-[90vh] flex flex-col">
        <div className="w-full h-[10vh] border-2 border-gray-100 flex justify-center items-center">
          <h1 className="flex items-center gap-2">
            <span className="areaAnalysis">{name}</span>
            <span className="areaAnalysis2">상권 분석 결과입니다.</span>
          </h1>
        </div>

        <div className="mt-6 h-[50vh]">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-4">
              <h3 className="areaAnalysis3 ml-8">{name} 상권 유형</h3>
              <h3 className="areaAnalysis4 ml-8">번화가 중심 상권</h3>
            </div>
            <motion.button
              className="areaAnalysis10 w-[30%] py-2 mr-12 rounded-md border-2 border-violet-400"
              style={{ backgroundColor: "#FFFFFF" }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDateCompareButton}
            >
              Date Compare
            </motion.button>
          </div>

          <div className="mt-6">
            <RadarChartComponent />
          </div>

          <div
            style={{ backgroundColor: "#FFE9D9" }}
            className="w-[90%] flex items-center mx-auto p-2 mt-3"
          >
            <span>
              <Image
                src={personLogo}
                alt="personLogo"
                width={24}
                height={24}
                className="mr-2"
              />
            </span>
            <p className="flex items-center gap-3">
              <span className="areaAnalysis5">평균 체류시간 변화율</span>
              <span className="areaAnalysis6">이 가장 높아요</span>
            </p>
          </div>

          <div className="w-[90%] mt-3 mx-auto py-2">
            <p className="areaAnalysis8 w-full m-1">
              {name} 상권의 2024년 평균 체류시간 변화율은 약
              <span className="areaAnalysis7 m-1">75%</span>입니다.
            </p>
            <p className="areaAnalysis8 w-full m-1">
              <span className="areaAnalysis7 mr-1">평균 체류시간 변화율</span>과
              <span className="areaAnalysis7 m-1">체류 방문 비율</span>이 높은
              것으로 보아{" "}
              <span className="areaAnalysis7 m-1">번화가 중심 상권</span>입니다.
            </p>
          </div>

          <div className="flex items-center justify-between mx-auto w-[90%] mt-4">
            <DetailSheet />
            <motion.button
              className="areaAnalysis10 w-[45%] py-3 rounded-md border-2 border-violet-400"
              style={{ backgroundColor: "#FFFFFF" }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCompareButton}
            >
              Area Compare
            </motion.button>
          </div>
        </div>
      </div>
    </>
  );
};
