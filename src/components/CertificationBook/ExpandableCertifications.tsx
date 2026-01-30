import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import type { Certification } from "../../types";
import "./ExpandableCertifications.css";

export interface ExpandableCertificationsProps {
  certifications: Certification[];
}

const ExpandableCertifications: React.FC<ExpandableCertificationsProps> = ({ certifications }) => {
  const [active, setActive] = useState<Certification | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <section
      id="certifications"
      className="py-12 px-4"
      aria-labelledby="certification-heading"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          id="certification-heading"
          className="text-4xl font-bold text-center mb-12 gradient-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Certifications
        </motion.h2>

        {/* Overlay */}
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 h-full w-full z-10"
            />
          )}
        </AnimatePresence>

        {/* Expanded Card Modal */}
        <AnimatePresence>
          {active ? (
            <div className="fixed inset-0 grid place-items-center z-[100] p-4">
              <motion.button
                key={`button-${active.id}-${id}`}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.05 } }}
                className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6 z-10"
                onClick={() => setActive(null)}
                aria-label="Close"
              >
                <CloseIcon />
              </motion.button>

              <motion.div
                layoutId={`card-${active.id}-${id}`}
                ref={ref}
                className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden shadow-2xl"
              >
                {/* Certificate Image/Icon */}
                <motion.div
                  layoutId={`image-${active.id}-${id}`}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center"
                >
                  <div className="text-8xl">{active.icon || "🏆"}</div>
                </motion.div>

                <div>
                  <div className="flex justify-between items-start p-4">
                    <div className="flex-1">
                      <motion.h3
                        layoutId={`title-${active.id}-${id}`}
                        className="font-bold text-xl mb-2 cert-modal-title"
                      >
                        {active.name}
                      </motion.h3>
                      <motion.p
                        layoutId={`issuer-${active.id}-${id}`}
                        className="cert-modal-text"
                      >
                        {active.issuer}
                      </motion.p>
                    </div>
                    {active.certificateUrl && (
                      <motion.a
                        layoutId={`button-${active.id}-${id}`}
                        href={active.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white hover:bg-green-600 transition-colors"
                      >
                        View
                      </motion.a>
                    )}
                  </div>

                  <div className="pt-4 relative px-4 pb-10">
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <div>
                        <p className="font-semibold cert-modal-label">
                          Issued by:
                        </p>
                        <p className="cert-modal-text">{active.issuer}</p>
                      </div>
                      <div>
                        <p className="font-semibold cert-modal-label">
                          Date:
                        </p>
                        <p className="cert-modal-text">{active.date}</p>
                      </div>
                      <div>
                        <p className="font-semibold cert-modal-label">
                          Certificate ID:
                        </p>
                        <p className="text-sm cert-modal-text">{active.id}</p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : null}
        </AnimatePresence>

        {/* Certificate Cards List */}
        <ul className="max-w-2xl mx-auto w-full gap-4 space-y-4">
          {certifications.map((cert) => (
            <motion.div
              layoutId={`card-${cert.id}-${id}`}
              key={`card-${cert.id}-${id}`}
              onClick={() => setActive(cert)}
              className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-purple-100 dark:hover:bg-neutral-800 rounded-xl cursor-pointer transition-colors group cert-card-item"
            >
              <div className="flex gap-4 flex-col md:flex-row items-center md:items-start flex-1">
                <motion.div
                  layoutId={`image-${cert.id}-${id}`}
                  className="h-40 w-40 md:h-14 md:w-14 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0"
                >
                  <span className="text-4xl md:text-2xl">{cert.icon || "🏆"}</span>
                </motion.div>

                <div className="flex-1 text-center md:text-left">
                  <motion.h3
                    layoutId={`title-${cert.id}-${id}`}
                    className="font-medium transition-colors cert-card-title"
                  >
                    {cert.name}
                  </motion.h3>
                  <motion.p
                    layoutId={`issuer-${cert.id}-${id}`}
                    className="text-sm transition-colors cert-card-issuer"
                  >
                    {cert.issuer}
                  </motion.p>
                  <p 
                    className="text-xs mt-1 transition-colors cert-card-date"
                  >
                    {cert.date}
                  </p>
                </div>
              </div>

              <motion.button
                layoutId={`button-${cert.id}-${id}`}
                className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0 transition-colors"
              >
                View Details
              </motion.button>
            </motion.div>
          ))}
        </ul>
      </div>
    </section>
  );
};

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

export default ExpandableCertifications;
