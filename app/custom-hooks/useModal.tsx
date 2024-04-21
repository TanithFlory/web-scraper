"use client";
import { useState } from "react";

export default function useModal() {
  const [isModalOpen, setisModalOpen] = useState(false);

  const openModal = () => {
    setisModalOpen(true);
  };

  const closeModalButton = () => {
    setisModalOpen(false);
  };

  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (!target.closest(".modal-content")) {
      setisModalOpen(false);
    }
  };

  return { isModalOpen, openModal, closeModal, closeModalButton };
}
