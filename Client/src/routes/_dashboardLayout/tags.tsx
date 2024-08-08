import { CreateTag } from "@/components/tags/CreateTag";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { globalTags } from "@/constant/globalTags";
export const Route = createFileRoute("/_dashboardLayout/tags")({
  component: Tags,
});

function Tags() {
  const [userTag, setUserTag] = useState<{ name: string; color: string }[]>([]);

  const isValidTagList = userTag && userTag.length > 0;

  const [createTagModal, setCreateTagModal] = useState(false);
  const openModal = () => setCreateTagModal(true);
  const closeModal = () => setCreateTagModal(false);

  useEffect(() => {
    setUserTag([{ name: "Netflix", color: "#FFD700" }]);
    return () => {};
  }, []);

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
      <div className="mt-5">
        <h3 className="text-lg">Global Tags</h3>
        <div className="flex flex-wrap gap-3 mt-5 w-[90%]">
          {globalTags.map((tags) => (
            <Badge
              variant="outline"
              style={{ backgroundColor: tags?.color }}
              className="text-black select-none"
              key={tags?.name}
            >
              {tags?.name}
            </Badge>
          ))}
        </div>
      </div>
      <div className="mt-5">
        <h3 className="text-lg">Your Tags</h3>
        <div className="flex flex-wrap gap-3 mt-5 w-[90%]">
          {isValidTagList &&
            userTag.map((tags) => (
              <Badge
                variant="outline"
                style={{ backgroundColor: tags?.color }}
                className="text-black select-none"
                key={tags?.name}
              >
                {tags?.name}
              </Badge>
            ))}
          {!isValidTagList && <p className="text-sm">No Tags Created Yet</p>}
        </div>
      </div>
    </section>
  );
}
