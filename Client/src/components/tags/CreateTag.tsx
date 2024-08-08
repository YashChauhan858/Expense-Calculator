import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import color from "@/constant/colors.json";
import { useState } from "react";

export function CreateTag({ close }: { close: () => void }) {
  const [tagState, setTagState] = useState({
    tagName: "",
    tagColor: "",
  });

  return (
    <div className="flex items-center justify-center absolute top-0 left-0 h-full w-full backdrop-blur-md">
      <div
        className="absolute top-0 left-0 h-full w-full"
        onClick={close}
      ></div>
      <Card className="w-[350px] z-10">
        <CardHeader>
          <CardTitle>Create tag</CardTitle>
          <CardDescription>Create and upload tag</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col">
                <Label>Name</Label>
                <Input
                  placeholder="Name of your tag"
                  className="mt-3"
                  value={tagState?.tagName}
                  onChange={(e) =>
                    setTagState({ ...tagState, tagName: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="framework">Color</Label>
                <div className="mt-3">
                  <div className="w-full flex flex-wrap gap-2">
                    {color?.lightColors.map((color) => (
                      <div
                        className={`w-5 h-5 rounded-sm cursor-pointer`}
                        style={{ backgroundColor: color }}
                        key={color}
                        onClick={() =>
                          setTagState({ ...tagState, tagColor: color })
                        }
                      ></div>
                    ))}
                  </div>
                  <div className="w-full flex flex-wrap gap-2 mt-3">
                    {color?.darkColors.map((color) => (
                      <div
                        className="w-5 h-5 rounded-sm cursor-pointer"
                        style={{ backgroundColor: color }}
                        key={color}
                        onClick={() =>
                          setTagState({ ...tagState, tagColor: color })
                        }
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="mt-3">
                  <p className="flex items-center gap-3">
                    Selected Color :{" "}
                    {tagState.tagColor ? (
                      <div
                        className={`w-5 h-5 rounded-sm cursor-pointer`}
                        style={{ backgroundColor: tagState.tagColor }}
                      ></div>
                    ) : null}
                  </p>
                </div>
              </div>
            </div>
          </form>
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
