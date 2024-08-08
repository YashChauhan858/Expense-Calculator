import { CreateTag } from "@/components/tags/CreateTag";
import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_dashboardLayout/tags")({
  component: Tags,
});

function Tags() {
  const [createTagModal, setCreateTagModal] = useState(false);
  const openModal = () => setCreateTagModal(true);
  const closeModal = () => setCreateTagModal(false);
  return (
    <section className="pt-10">
      <h1 className="text-2xl font-bold">Manage Your Tags</h1>
      <p className="mt-2 w-[70%] text-gray-600">
        Create and manage tags to categorize your transactions for better
        analytics. You can create as many tags as you need.
      </p>
      <Button variant={"secondary"} className="mt-5" onClick={openModal}>
        Create Tag
      </Button>
      {createTagModal && <CreateTag close={closeModal} />}
      <div></div>
    </section>
  );
}
