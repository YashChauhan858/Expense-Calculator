import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";

import { TStatementItem } from "@/types";
import { Badge } from "../ui/badge";
import { globalTags } from "@/constant/globalTags";
export function AddTags({
  close,
  transaction,
}: {
  close: () => void;
  transaction: TStatementItem;
}) {
  return (
    <div className="flex items-center justify-center absolute top-0 left-0 h-full w-full backdrop-blur-md z-10">
      <div
        className="absolute top-0 left-0 h-full w-full"
        onClick={close}
      ></div>
      <Card className="w-[50%] z-10">
        <CardHeader>
          <CardTitle>Add Tag to {transaction?.chqRefNo}</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label>Global Tags</Label>
            <div className="w-full mt-3 flex flex-wrap gap-3 ">
              {globalTags.map((tags) => (
                <Badge
                  variant="outline"
                  style={{ backgroundColor: tags?.color }}
                  className="text-black select-none cursor-pointer"
                  key={tags?.name}
                >
                  {tags?.name}
                </Badge>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <Label>Your Tags</Label>
            <div className="w-full mt-3 flex flex-wrap gap-3 ">
              {globalTags.map((tags) => (
                <Badge
                  variant="outline"
                  style={{ backgroundColor: tags?.color }}
                  className="text-black select-none cursor-pointer"
                  key={tags?.name}
                >
                  {tags?.name}
                </Badge>
              ))}
            </div>{" "}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button>Save</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
