// app/dashboard/team/_components/team-delete-modal.tsx

"use client";

import toast from "react-hot-toast";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";

import {
  HiOutlineTrash,
} from "react-icons/hi";
import { useDeleteUserMutation } from "@/store/services/user.api";

 

interface Props {
  isOpen: boolean;

  onOpenChange: (
    open: boolean
  ) => void;

  user: any;
}

export const TeamDeleteModal =
  ({
    isOpen,
    onOpenChange,
    user,
  }: Props) => {
    const [deleteUser, { isLoading }] =
      useDeleteUserMutation();

    // DELETE
    const handleDelete =
      async () => {
        try {
          await deleteUser(
            user?._id
          ).unwrap();

          toast.success(
            "User deleted successfully"
          );

          onOpenChange(false);
        } catch (error) {
          // console.log(error);

          toast.error(
            "Failed to delete user"
          );
        }
      };

    if (!user) return null;

    return (
      <Modal
        isOpen={isOpen}
        onOpenChange={
          onOpenChange
        }
        placement="center"
        size="md"
        backdrop="blur"
        classNames={{
          base: `
            bg-[#111113]
            border
            border-white/[0.06]
            rounded-[32px]
          `,

          body: "py-6",

          backdrop:
            "bg-black/70 backdrop-blur-md",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              {/* HEADER */}
              <ModalHeader>
                <div className="flex items-center gap-4">
                  <div
                    className="
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-3xl
                      bg-red-500/10
                      text-red-400
                    "
                  >
                    <HiOutlineTrash className="text-2xl" />
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold text-white">
                      Delete User
                    </h2>

                    <p className="mt-1 text-sm text-zinc-500">
                      This action
                      cannot be
                      undone
                    </p>
                  </div>
                </div>
              </ModalHeader>

              {/* BODY */}
              <ModalBody>
                <div
                  className="
                    rounded-3xl
                    border
                    border-red-500/10
                    bg-red-500/[0.03]
                    p-5
                  "
                >
                  <p className="text-sm leading-relaxed text-zinc-300">
                    Are you sure
                    you want to
                    permanently
                    delete{" "}
                    <span className="font-semibold text-white">
                      {
                        user?.name
                      }
                    </span>
                    ?
                  </p>
                </div>
              </ModalBody>

              {/* FOOTER */}
              <ModalFooter>
                <Button
                  variant="light"
                  onPress={onClose}
                  className="text-zinc-400"
                >
                  Cancel
                </Button>

                <Button
                  color="danger"
                  isLoading={
                    isLoading
                  }
                  onPress={
                    handleDelete
                  }
                  className="rounded-2xl"
                >
                  Delete User
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    );
  };