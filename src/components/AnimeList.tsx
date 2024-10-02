import { motion } from "framer-motion";

import { PageResponse, PER_PAGE } from "../queries";
import { mediaTypesMap } from "../utils";

export const AnimeList: React.FC<{
  data?: PageResponse["Page"]["media"];
  page?: number;
}> = ({ data, page = 1 }) => {
  return (
    !!data?.length && (
      <div className="flex flex-wrap">
        {data?.map((m, i) => {
          const link = m?.externalLinks?.[0]?.url;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { delay: 0.05 * (i - PER_PAGE * (page - 1)) },
              }}
              className={`w-[50%] sm:w-[20%] lg:w-[20%] xl:w-[10%] relative group overflow-hidden ${
                !!link && "cursor-pointer"
              }`}
            >
              <a
                href={link || ""}
                target="_blank"
                rel="noopener noreferrer"
                className={`${!link && "pointer-events-none"}`}
              >
                <img
                  src={m?.coverImage?.extraLarge || ""}
                  alt="banner"
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
                />

                <div className="bg-[#000000BF] text-white p-2 h-full w-full absolute top-full group-hover:top-0 transition-all duration-300 flex flex-col">
                  <h6 className="text-[14px] font-medium line-clamp-2">
                    {m?.title?.english || m?.title?.native}
                  </h6>

                  <p className="text-[12px] mt-2 line-clamp-4">
                    {m?.description}
                  </p>

                  <div className="mt-auto">
                    <div className="flex gap-1 flex-wrap">
                      {m?.genres?.slice(0, 3).map((g, j) => {
                        return (
                          <div
                            key={"" + g + i + j}
                            className="bg-orange-500 p-[2px] text-[10px] text-center"
                          >
                            <span>{g}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-2 text-[12px] flex justify-between items-center">
                      {m?.type ? (
                        <span className="capitalize font-medium">
                          {mediaTypesMap[m?.type]}
                        </span>
                      ) : (
                        <div />
                      )}

                      <span className="font-medium text-[#FFFFFFCC]">
                        <span className="text-orange-500">
                          {m?.averageScore}
                        </span>
                        /100
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>
          );
        })}
      </div>
    )
  );
};
