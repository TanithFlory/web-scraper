"use client";
import images from "@/app/constants/images";
import useModal from "@/app/custom-hooks/useModal";
import Modal from "@/app/utils/Modal/Modal";
import Wrapper from "@/app/utils/Wrapper/Wrapper";
import Image from "next/image";
import Register from "../Register/Register";
import { useEffect, useState } from "react";

type ModalType = "signIn" | "signUp" | undefined;

export default function Navbar() {
  const { isModalOpen, openModal, closeModal } = useModal();
  const [modalType, setModalType] = useState<ModalType>();
  const [isScrolling, setIsScrolling] = useState(false);

  function renderModal(type: ModalType) {
    return (
      <Modal closeModalHandler={closeModal}>
        <Register isSignIn={type !== "signIn"} />
      </Modal>
    );
  }

  function authClickHandler(type: ModalType) {
    setModalType(type);
    openModal();
  }

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setIsScrolling(true);
    });

    return () => {
      window.removeEventListener("scroll", () => {
        setIsScrolling(false);
      });
    };
  }, []);
  return (
    <>
      <nav
        className={`h-[96px] fixed w-screen top-0 left-0 z-[999] ${
          isScrolling ? "bg-primary" : "bg-transparent"
        }`}
      >
        <Wrapper className="flex items-center justify-between h-full !pt-0">
          <div>
            <Image
              src={images.logo}
              alt="web-scraper_logo"
              width={150}
              height={150}
              className="h-[50px]"
            />
          </div>
          <div className="flex items-center gap-4 text-fs-100">
            <div
              onClick={() => authClickHandler("signIn")}
              className="bg-white text-black font-bold py-2 px-4 rounded transition-all cursor-pointer duration-500 ease-in-out h-[35px]"
            >
              Login
            </div>
            <div
              onClick={() => authClickHandler("signUp")}
              className="bg-gradientBackground text-white font-bold py-2 px-4 rounded transition-all cursor-pointer  duration-500 ease-in-out h-[35px]"
            >
              Signup
            </div>
          </div>
        </Wrapper>
      </nav>
      {isModalOpen ? renderModal(modalType) : null}
    </>
  );
}
