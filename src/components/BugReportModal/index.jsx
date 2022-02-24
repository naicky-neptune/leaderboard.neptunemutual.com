import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import styles from "./styles.module.scss";
import DateLib from "../../../lib/date/DateLib";

export function BugReportModal({ underlying }) {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div>
        <button type="button" onClick={openModal}>
          Bug Report
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className={styles.dialog} onClose={closeModal}>
          <div className={styles.dialog_content}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className={styles.dialog_overlay} />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className={styles.trick} aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className={styles.modal_wrapper}>
                {/* Header with close */}
                <div className={styles.modal_header}>
                  <p>Bug Report #{underlying.id}</p>
                  <button type="button" onClick={closeModal}>
                    <XIcon width={18} height={18} />
                  </button>
                </div>

                {/* Content Container */}
                <div className={styles.modal_content}>
                  {/* Title */}
                  <Dialog.Title as="h3" className={styles.modal_title}>
                    {underlying.title}
                  </Dialog.Title>
                  <p className={styles.modal_subtitle}>
                    Reported On:{" "}
                    {DateLib.toLongDateFormat(
                      Math.floor(parseInt(underlying.createdAt, 10) / 1000),
                      "UTC"
                    )}
                  </p>

                  <div className={styles.modal_description}>
                    {underlying.description.split("\n").map((line, idx) => {
                      return <p key={idx}>{line}</p>;
                    })}

                    <a
                      href="https://example.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.read_more}
                    >
                      Read more
                    </a>
                  </div>

                  <div className={styles.status}>
                    <p>
                      Status:{" "}
                      <span className={styles.status_badge}>Accepted</span>
                    </p>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}