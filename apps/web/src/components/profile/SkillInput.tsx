import { useState } from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface Props {
  skills: string[];
  setSkills: (skills: string[]) => void;
}

export default function SkillInput({
  skills,
  setSkills,
}: Props) {
  const [value, setValue] = useState("");

  const addSkill = () => {
    const skill = value.trim();

    if (!skill) return;

    if (skills.includes(skill)) return;

    setSkills([...skills, skill]);

    setValue("");
  };

  const removeSkill = (skill: string) => {
    setSkills(
      skills.filter((item) => item !== skill)
    );
  };

  return (
    <div className="space-y-4">

      <div className="flex gap-2">

        <Input
          value={value}
          onChange={(e) =>
            setValue(e.target.value)
          }
          placeholder="Enter skill"
        />

        <Button
          type="button"
          onClick={addSkill}
        >
          Add
        </Button>

      </div>

      <div className="flex flex-wrap gap-2">

        {skills.map((skill) => (
          <div
            key={skill}
            className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-2"
          >
            <span>{skill}</span>

            <button
              type="button"
              onClick={() =>
                removeSkill(skill)
              }
              className="font-bold text-red-500"
            >
              ×
            </button>
          </div>
        ))}

      </div>

    </div>
  );
}